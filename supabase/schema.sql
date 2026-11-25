-- =============================================================
-- Dars play — Supabase ma’lumotlar bazasi sxemasi
-- Supabase → SQL Editor → New query → shu faylni to‘liq qo‘yib, Run bosing.
-- =============================================================

-- Maktab nomini solishtirish uchun: katta-kichik harf va ortiqcha bo‘sh joylar hisobga olinmaydi
create or replace function public.norm_school(s text)
returns text language sql immutable set search_path = '' as $$
  select lower(regexp_replace(trim(coalesce(s, '')), '\s+', ' ', 'g'))
$$;

-- -------------------------------------------------------------
-- 1. Profillar: har bir login (o‘qituvchi yoki administrator)
-- -------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  login       text not null unique,
  name        text not null,
  school      text not null,
  school_norm text generated always as (public.norm_school(school)) stored,
  region      text,
  subject     text,
  grades      smallint[],  -- ochiq sinflar (null — barchasi); grade_access.sql
  role        text not null default 'teacher' check (role in ('teacher', 'admin')),
  created_at  timestamptz not null default now()
);

-- -------------------------------------------------------------
-- 2. Sinflar: maktab + sinf raqami + harf bo‘yicha yagona
-- -------------------------------------------------------------
create table if not exists public.classes (
  id              uuid primary key default gen_random_uuid(),
  school          text not null,
  school_norm     text generated always as (public.norm_school(school)) stored,
  grade           int  not null check (grade between 1 and 11),
  letter          text not null check (char_length(letter) between 1 and 3),
  students        text[] not null default '{}',
  created_by      uuid references public.profiles (id) on delete set null,
  created_by_name text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (school_norm, grade, letter)
);

create index if not exists classes_school_idx on public.classes (school_norm, grade);
create index if not exists classes_created_by_idx on public.classes (created_by);

-- updated_at ni avtomatik yangilash
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists classes_touch on public.classes;
create trigger classes_touch before update on public.classes
for each row execute function public.touch_updated_at();

-- -------------------------------------------------------------
-- 3. Yordamchi funksiyalar (RLS uchun) — API'ga ochilmagan "private" sxemada
-- -------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
$$;

create or replace function private.my_school()
returns text language sql stable security definer set search_path = '' as $$
  select school_norm from public.profiles where id = (select auth.uid())
$$;

revoke execute on function private.is_admin() from public, anon;
revoke execute on function private.my_school() from public, anon;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.my_school() to authenticated;

-- -------------------------------------------------------------
-- 4. Xavfsizlik qoidalari (Row Level Security)
-- -------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.classes  enable row level security;

-- Profillar: o‘z profilini ko‘radi; administrator — hammasini.
-- Profil yaratish/o‘zgartirish faqat server API (service role) orqali.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select private.is_admin()));

-- Sinflar: o‘qituvchi faqat o‘z maktabi sinflarini ko‘radi va tahrirlaydi
drop policy if exists classes_select on public.classes;
create policy classes_select on public.classes
  for select to authenticated using (school_norm = (select private.my_school()) or (select private.is_admin()));

drop policy if exists classes_insert on public.classes;
create policy classes_insert on public.classes
  for insert to authenticated with check (school_norm = (select private.my_school()) and created_by = (select auth.uid()));

drop policy if exists classes_update on public.classes;
create policy classes_update on public.classes
  for update to authenticated using (school_norm = (select private.my_school()) or (select private.is_admin()))
  with check (school_norm = (select private.my_school()) or (select private.is_admin()));

drop policy if exists classes_delete on public.classes;
create policy classes_delete on public.classes
  for delete to authenticated using ((select private.is_admin()));

-- -------------------------------------------------------------
-- 5. Administrator funksiyalari (RPC) — ichida admin ekanligi tekshiriladi
-- -------------------------------------------------------------
-- admin_create_teacher, admin_update_teacher, admin_reset_password, admin_delete_teacher
-- (to‘liq matni Supabase'da «admin_rpc_functions» migratsiyasida saqlangan)

-- -------------------------------------------------------------
-- 6. Ommaviy ro‘yxatdan o‘tish yopiq
-- -------------------------------------------------------------
-- auth.users jadvaliga Supabase Auth (supabase_auth_admin) nomidan yozish to‘siladi:
-- hisoblarni faqat administrator admin_create_teacher orqali yaratadi.

-- -------------------------------------------------------------
-- Bosh administrator «admin» allaqachon yaratilgan (login: admin).
-- -------------------------------------------------------------

-- ============================================================
-- O'qituvchilarning o'z savollari va o'yin natijalari (2026-11-22)
-- ============================================================
-- custom_sets(id, owner_id → profiles, owner_name, school, school_norm, subject, grade, title, shared, data jsonb, created_at, updated_at)
--   RLS: egasi yoki (shared va bir maktab) yoki admin ko'radi; faqat egasi o'z maktabiga yozadi/tahrirlaydi; egasi yoki admin o'chiradi.
-- game_results(id, class_id → classes ON DELETE CASCADE, teacher_id → profiles, teacher_name, subject, grade,
--              topic_id, topic_title, game_id, game_name, teams jsonb, students jsonb, played_at)
--   RLS: shu maktab sinflari bo'yicha ko'rish va qo'shish (teacher_id = auth.uid()); o'chirish — o'qituvchining o'zi yoki admin.
-- To'liq SQL: migratsiyalar custom_sets_and_game_results, game_results_students.
