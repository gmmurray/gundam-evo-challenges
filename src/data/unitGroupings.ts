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
  ['gundam', 'sazabi', 'methuss', 'mahiroo'],
  ['gundam', 'barbatos', 'methuss', 'marasai'],
  ['gundam', 'asshimar', 'gm_sniper', 'hyperion'],
  ['pale_rider', 'sazabi', 'guntank', 'exia'],
  ['asshimar', 'gm', 'guntank', 'nu'],
  ['zaku_ranged', 'methuss', 'turn_a', 'exia'],
  ['gm_sniper', 'asshimar', 'gm', 'unicorn'],
  ['zaku_ranged', 'barbatos', 'guntank', 'heavyarms'],
  ['sazabi', 'asshimar', 'dom_trooper', 'heavyarms'],
  ['pale_rider', 'gm', 'turn_a', 'hyperion'],
  ['pale_rider', 'turn_a', 'gm_sniper', 'nu'],
  ['pale_rider', 'gundam', 'sazabi', 'marasai'],
  ['gm', 'sazabi', 'dom_trooper', 'dynames'],
  ['asshimar', 'zaku_ranged', 'exia', 'dynames'],
  ['pale_rider','gundam','turn_a','dynames']
];
