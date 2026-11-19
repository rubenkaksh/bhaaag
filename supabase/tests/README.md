Run `leaderboard_v1.sql` after the migration on any Postgres with roles `anon`, `authenticated`,
`extensions.pgcrypto` and an `auth.users`/`auth.uid()` stub (or on a Supabase branch). Rolls back; prints `L1 OK`.

`game_config.sql` (after `20261119000200_game_config.sql`): `game_config` is readable by anon, not writable by anon/authenticated, key format enforced. Rolls back; prints `L2 OK`.
