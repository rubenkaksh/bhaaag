// DOM HUD for the spike page. Plain element updates, no framework.
import type { RunState } from '../run';

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
    $('sub').textContent = `${Math.max(0, Math.round(ride.cfg.distance - ride.z))} m to go`;
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
  h.style.opacity = hintOn ? '1' : '0';
  h.textContent = melee;
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
        ? `${Math.round(run.ride.z)} m of ${run.ride.cfg.distance} m`
        : `survived ${Math.round(camp.t)} s · ${camp.kills} kills`;
  }
}

export function hideEnd(): void {
  $('end').classList.remove('show');
}
