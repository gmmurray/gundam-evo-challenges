import { unitOptions } from './units';

export type UnitGrouping = (keyof typeof unitOptions)[];

export const unitGroupings: UnitGrouping[] = [
  ['asshimar', 'zaku_ranged', 'guntank', 'unicorn'],
  ['turn_a', 'barbatos', 'gm_sniper', 'nu'],
  ['gundam', 'gm', 'gm_sniper', 'zaku_melee'],
  ['turn_a', 'zaku_ranged', 'methuss', 'mahiroo'],
  ['gm', 'methuss', 'asshimar', 'hyperion'],
  ['asshimar', 'barbatos', 'dom_trooper', 'marasai'],
  ['pale_rider', 'zaku_ranged', 'dom_trooper', 'unicorn'],
  ['turn_a', 'sazabi', 'gm_sniper', 'zaku_melee'],
  ['pale_rider', 'gm', 'dom_trooper', 'exia'],
  ['turn_a', 'zaku_ranged', 'methuss', 'mahiroo'],
  ['gundam', 'sazabi', 'methuss', 'mahiroo'],
  ['gundam', 'barbatos', 'methuss', 'marasai'],
  ['gundam', 'asshimar', 'gm_sniper', 'hyperion'],
  ['pale_rider', 'sazabi', 'guntank', 'exia'],
  ['asshimar', 'gm', 'guntank', 'nu'],
  ['zaku_ranged', 'methuss', 'turn_a', 'exia'],
  ['gm_sniper', 'asshimar', 'gm', 'unicorn'],
  ['zaku_ranged', 'barbatos', 'guntank', 'heavyarms'],
];
