# Premium access administration

Run the migration in `migrations/202607010001_create_user_entitlements.sql`
from the Supabase SQL Editor.

## Grant one year of Premium access

Replace the email before running:

```sql
update public.user_entitlements
set
  plan = 'premium',
  premium_started_at = now(),
  premium_expires_at = now() + interval '1 year',
  updated_at = now()
where user_id = (
  select id
  from auth.users
  where email = 'customer@example.com'
);
```

## Return an account to the Free plan

```sql
update public.user_entitlements
set
  plan = 'free',
  premium_started_at = null,
  premium_expires_at = null,
  updated_at = now()
where user_id = (
  select id
  from auth.users
  where email = 'customer@example.com'
);
```

## View all plans

```sql
select
  users.email,
  entitlements.plan,
  entitlements.premium_started_at,
  entitlements.premium_expires_at
from public.user_entitlements entitlements
join auth.users users on users.id = entitlements.user_id
order by users.email;
```
