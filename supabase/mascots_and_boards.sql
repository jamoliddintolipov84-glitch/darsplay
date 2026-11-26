-- Sinf maskoti va o‘qituvchi doskasi (migratsiya: mascots_and_boards, 2026-11-26)
-- class_mascots: sinf bo‘yicha (maktabdagi o‘qituvchilar ko‘radi/yangilaydi), mascot_add — atomik yulduz qo‘shish.
-- teacher_boards: har o‘qituvchiga bitta yozuv, faqat egasi ko‘radi.
-- To‘liq SQL Supabase'da qo‘llangan; bu fayl hujjat sifatida.
create table public.class_mascots (
  class_id uuid primary key references public.classes(id) on delete cascade,
  name text not null default 'Humo' check (char_length(name) between 1 and 18),
  color text not null default 'firuza' check (color in ('firuza','lojuvard','anor','zafaron','binafsha')),
  xp integer not null default 0 check (xp >= 0),
  log jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
-- RLS: select/insert/update — sinf o‘z maktabida bo‘lsa (private.my_school()), select — admin ham.
-- public.mascot_add(p_class uuid, p_n integer, p_reason text) returns class_mascots — security invoker, |p_n| <= 500, log 30 ta.
create table public.teacher_boards (
  teacher_id uuid primary key references public.profiles(id) on delete cascade default auth.uid(),
  data jsonb not null default '{}'::jsonb,  -- { bg, pages: [[...obyektlar]] }
  updated_at timestamptz not null default now()
);
-- RLS: barcha amallar faqat teacher_id = auth.uid().
