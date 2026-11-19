Run `leaderboard_v1.sql` after the migration on any Postgres with roles `anon`, `authenticated`,
`extensions.pgcrypto` and an `auth.users`/`auth.uid()` stub (or on a Supabase branch). Rolls back; prints `L1 OK`.
