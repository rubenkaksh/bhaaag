-- L6: "delete my data" for name-only players. Removes the player row; runs, bests and friendships go with it
-- (ON DELETE CASCADE). The secret is the only proof of ownership, same as every other player RPC.
create function lb_private.delete_my_data(p_player_id uuid, p_secret text) returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  perform lb_private.check_player(p_player_id, p_secret);
  delete from lb_private.redeem_log where player_id = p_player_id;
  delete from public.players where id = p_player_id;
  return true; -- not void: PostgREST answers a void function with an empty body, which the client cannot tell from a failure
end $$;

create function public.delete_my_data(p_player_id uuid, p_secret text) returns boolean
language sql security invoker set search_path = '' as $$ select lb_private.delete_my_data(p_player_id, p_secret) $$;

revoke all on function lb_private.delete_my_data(uuid, text) from public;
revoke all on function public.delete_my_data(uuid, text) from public;
grant execute on function lb_private.delete_my_data(uuid, text) to anon, authenticated;
grant execute on function public.delete_my_data(uuid, text) to anon, authenticated;
