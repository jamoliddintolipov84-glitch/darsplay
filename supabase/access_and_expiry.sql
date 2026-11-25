-- Dars play — har bir fan uchun alohida sinflar va obuna muddati
-- profiles.access: {"ona-tili":[9,10],"adabiyot":[9]} — fan → ochiq sinflar. null bo‘lsa eski subject/grades ishlatiladi.
-- profiles.expires_at: obuna tugash vaqti. null — muddatsiz (eski hisoblar).
alter table public.profiles add column if not exists access jsonb;
alter table public.profiles add column if not exists expires_at timestamptz;

drop function if exists public.admin_create_teacher(text, text, text, text, text, text, smallint[]);
drop function if exists public.admin_update_teacher(uuid, text, text, text, text, text, text, smallint[]);

create or replace function public.admin_create_teacher(
  p_login text, p_password text, p_name text, p_school text, p_region text default null, p_subject text default null,
  p_grades smallint[] default null, p_access jsonb default null, p_expires_at timestamptz default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_login text := lower(trim(coalesce(p_login, '')));
  v_id uuid := gen_random_uuid();
  v_email text;
begin
  if not private.is_admin() then raise exception 'Bu amal faqat administrator uchun' using errcode = '42501'; end if;
  if v_login !~ '^[a-z0-9._-]{3,30}$' then raise exception 'Login noto‘g‘ri'; end if;
  if char_length(trim(coalesce(p_password, ''))) < 6 then raise exception 'Parol kamida 6 ta belgidan iborat bo‘lsin'; end if;
  if char_length(trim(coalesce(p_name, ''))) < 3 or trim(coalesce(p_school, '')) = '' then raise exception 'Ism va maktabni kiriting'; end if;
  if p_grades is not null and exists (select 1 from unnest(p_grades) g where g is null or g < 5 or g > 11) then raise exception 'Sinflar 5–11 oralig‘ida bo‘lsin'; end if;
  if p_access is not null and (jsonb_typeof(p_access) <> 'object' or exists (
      select 1 from jsonb_each(p_access) e
      where jsonb_typeof(e.value) <> 'array'
         or exists (select 1 from jsonb_array_elements(e.value) v where jsonb_typeof(v) <> 'number' or v::int < 5 or v::int > 11))) then
    raise exception 'Fan va sinflar noto‘g‘ri';
  end if;
  v_email := v_login || '@darsplay.uz';
  if exists (select 1 from public.profiles where login = v_login) or exists (select 1 from auth.users where email = v_email) then
    raise exception 'Bu login band';
  end if;

  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change)
  values ('00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated', v_email,
    extensions.crypt(trim(p_password), extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '');
  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), v_id, v_id::text,
    jsonb_build_object('sub', v_id::text, 'email', v_email, 'email_verified', true), 'email', now(), now(), now());
  insert into public.profiles (id, login, name, school, region, subject, grades, access, expires_at, role)
  values (v_id, v_login, trim(p_name), trim(p_school), nullif(trim(coalesce(p_region, '')), ''), nullif(trim(coalesce(p_subject, '')), ''),
    case when p_grades is null then null else coalesce((select array_agg(distinct g order by g) from unnest(p_grades) g), '{}') end,
    p_access, p_expires_at, 'teacher');
  return v_id;
end $$;

create or replace function public.admin_update_teacher(
  p_id uuid, p_login text, p_name text, p_school text, p_region text default null, p_subject text default null, p_password text default null,
  p_grades smallint[] default null, p_access jsonb default null, p_expires_at timestamptz default null)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_login text := lower(trim(coalesce(p_login, '')));
  v_email text;
begin
  if not private.is_admin() then raise exception 'Bu amal faqat administrator uchun' using errcode = '42501'; end if;
  if not exists (select 1 from public.profiles where id = p_id and role = 'teacher') then raise exception 'O‘qituvchi topilmadi'; end if;
  if v_login !~ '^[a-z0-9._-]{3,30}$' then raise exception 'Login noto‘g‘ri'; end if;
  if char_length(trim(coalesce(p_name, ''))) < 3 or trim(coalesce(p_school, '')) = '' then raise exception 'Ism va maktabni kiriting'; end if;
  if p_grades is not null and exists (select 1 from unnest(p_grades) g where g is null or g < 5 or g > 11) then raise exception 'Sinflar 5–11 oralig‘ida bo‘lsin'; end if;
  if p_access is not null and (jsonb_typeof(p_access) <> 'object' or exists (
      select 1 from jsonb_each(p_access) e
      where jsonb_typeof(e.value) <> 'array'
         or exists (select 1 from jsonb_array_elements(e.value) v where jsonb_typeof(v) <> 'number' or v::int < 5 or v::int > 11))) then
    raise exception 'Fan va sinflar noto‘g‘ri';
  end if;
  v_email := v_login || '@darsplay.uz';
  if exists (select 1 from public.profiles where login = v_login and id <> p_id) then raise exception 'Bu login band'; end if;

  update auth.users set email = v_email, updated_at = now() where id = p_id;
  update auth.identities set identity_data = identity_data || jsonb_build_object('email', v_email), updated_at = now()
    where user_id = p_id and provider = 'email';
  if p_password is not null and trim(p_password) <> '' then
    if char_length(trim(p_password)) < 6 then raise exception 'Parol kamida 6 ta belgidan iborat bo‘lsin'; end if;
    update auth.users set encrypted_password = extensions.crypt(trim(p_password), extensions.gen_salt('bf')) where id = p_id;
  end if;
  update public.profiles set login = v_login, name = trim(p_name), school = trim(p_school),
    region = nullif(trim(coalesce(p_region, '')), ''), subject = nullif(trim(coalesce(p_subject, '')), ''),
    grades = case when p_grades is null then null else coalesce((select array_agg(distinct g order by g) from unnest(p_grades) g), '{}') end,
    access = p_access, expires_at = p_expires_at
  where id = p_id;
end $$;

revoke execute on function public.admin_create_teacher(text, text, text, text, text, text, smallint[], jsonb, timestamptz) from public, anon;
revoke execute on function public.admin_update_teacher(uuid, text, text, text, text, text, text, smallint[], jsonb, timestamptz) from public, anon;
grant execute on function public.admin_create_teacher(text, text, text, text, text, text, smallint[], jsonb, timestamptz) to authenticated;
grant execute on function public.admin_update_teacher(uuid, text, text, text, text, text, text, smallint[], jsonb, timestamptz) to authenticated;
