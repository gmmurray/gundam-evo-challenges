import { Avatar, Tooltip } from '@mui/material';

import React from 'react';
import { Unit } from '../../data/units';
import { getUnitAvatarUrl } from '../../helpers/unitHelpers';

type Props = {
  unit: Unit;
};

const UnitAvatar = ({ unit }: Props) => {
  const avatarUrl = getUnitAvatarUrl(unit);
  return (
    <Tooltip key={unit.id} title={unit.name} followCursor>
      <span>
        <Avatar src={avatarUrl} sx={{}} sizes="large" />
      </span>
    </Tooltip>
  );
};

export default UnitAvatar;
