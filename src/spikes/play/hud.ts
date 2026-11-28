// DOM HUD for the spike page. Plain element updates, no framework.
import type { RunState } from '../run';
import type { FallCause } from '../ride';

/** What the rider did wrong, in the player's words. */
const FALL_TEXT: Record<FallCause, string> = {
  bend: 'Too fast into that bend',
  slope: 'Too steep across the slope',
  ford: 'Hit the ford too fast: slow down for water',
  river: 'Deep water: cross at the ford',
};

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;
const fill = (id: string, v: number): void => {
  ($(id).firstElementChild as HTMLElement).style.width = `${Math.max(0, Math.min(1, v)) * 100}%`;
};

export function setPhaseClass(phase: string): void {
  document.body.classList.toggle('ride', phase === 'ride');
  document.body.classList.toggle('camp', phase !== 'ride');
  $('inv').style.display = phase === 'ride' ? 'none' : 'block';
}

export function updateHud(run: RunState, melee: string, hintOn: boolean): void {
  // the bike has no jump (owner 2026-11-28): hide the button
  document.body.classList.toggle('nojump', run.cfg.ride.mount.jumpV <= 0);
  const ride = run.ride;
  const camp = run.camp;
  const inCamp = camp !== null && run.phase !== 'ride';
  const hp = inCamp && camp !== null ? camp.hp : ride.hp;
  const maxHp = inCamp && camp !== null ? camp.cfg.maxHp : ride.cfg.hp;
  $('hpn').textContent = String(Math.ceil(hp));
  fill('hpbar', hp / maxHp);
  const w = inCamp && camp !== null ? camp.weapon : ride.weapon;
  $('ammo').textContent =
    `${w.cfg.name}: ${w.mag} + ${w.reserve}${w.reloadLeft > 0 ? ' (reloading)' : ''}`;
  if (!inCamp) {
    fill('boostbar', ride.boost);
    $('ptitle').textContent = 'Ride to camp';
    const hearts = '♥'.repeat(ride.lives) + '♡'.repeat(Math.max(0, ride.cfg.lives - ride.lives));
    $('sub').textContent = `${hearts} · ${Math.max(0, Math.round(ride.cfg.distance - ride.z))} m to go`;
  } else if (camp !== null) {
    const left = Math.max(0, camp.cfg.nightLength - camp.t);
    $('ptitle').textContent = run.phase === 'dawn' ? 'Dawn' : 'Night at camp';
    $('sub').textContent =
      `dawn in ${Math.ceil(left)} s · wave ${camp.waveLevel}${camp.heat > 0.05 ? ' · noisy' : ''}`;
    $('invtext').textContent =
      `wood ${camp.wood} · raw ${camp.raw} · cooked ${camp.cooked}${camp.cooking ? ' · cooking' : ''}${camp.sickT > 0 ? ' · sick' : camp.regenT > 0 ? ' · healing' : ''}`;
    fill('fuelbar', camp.fuel / camp.cfg.fuelMax);
  }
  const h = $('hint');
  const fell = !inCamp && ride.fallT > 0 && ride.fallCause !== null;
  h.style.opacity = hintOn || fell ? '1' : '0';
  h.textContent = fell && ride.fallCause !== null ? `Fell! ${FALL_TEXT[ride.fallCause]}` : melee;
}

export function showEnd(run: RunState): void {
  const e = $('end');
  const camp = run.camp;
  e.classList.add('show');
  if (run.phase === 'dawn') {
    $('endTitle').textContent = 'You saw the dawn';
    $('endSub').textContent =
      camp === null
        ? ''
        : `${camp.kills} kills · ${camp.meatEaten} meals · ${camp.hp.toFixed(0)} HP left`;
  } else {
    $('endTitle').textContent = camp === null ? 'You fell on the ride' : 'The night won';
    $('endSub').textContent =
      camp === null
        ? `${Math.round(run.ride.z)} m of ${run.ride.cfg.distance} m${
            run.ride.lives <= 0 && run.ride.fallCause !== null
              ? ` · ${FALL_TEXT[run.ride.fallCause].toLowerCase()}`
              : ''
          }`
        : `survived ${Math.round(camp.t)} s · ${camp.kills} kills`;
  }
}

export function hideEnd(): void {
  $('end').classList.remove('show');
}
