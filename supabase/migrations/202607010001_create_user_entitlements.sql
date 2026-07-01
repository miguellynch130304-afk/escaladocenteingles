create table if not exists public.user_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  premium_started_at timestamptz,
  premium_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_entitlements enable row level security;

revoke all on public.user_entitlements from anon, authenticated;
grant select on public.user_entitlements to authenticated;

drop policy if exists "Users can read their own entitlement"
  on public.user_entitlements;

create policy "Users can read their own entitlement"
  on public.user_entitlements
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user_entitlement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_entitlements (user_id, plan)
  values (new.id, 'free')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user_entitlement() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_entitlement on auth.users;

create trigger on_auth_user_created_entitlement
  after insert on auth.users
  for each row execute procedure public.handle_new_user_entitlement();

insert into public.user_entitlements (user_id, plan)
select id, 'free'
from auth.users
on conflict (user_id) do nothing;

comment on table public.user_entitlements is
  'Controls Free and Premium access. Only administrators can change plans.';
