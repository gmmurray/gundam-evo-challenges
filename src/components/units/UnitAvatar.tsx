import { Avatar, IconButton, Tooltip, useTheme } from '@mui/material';

import { PropsWithChildren } from 'react';
import { Unit } from '../../data/units';
import { getUnitAvatarUrl } from '../../helpers/unitHelpers';
import { useViewUnitContext } from '../../contexts/viewUnit/viewUnitContext';

const recBorderLookup: Record<number, 'error' | 'warning' | 'success'> = {
  0: 'error',
  1: 'warning',
  2: 'success',
};

type Props = {
  unit: Unit;
  viewEnabled?: boolean;
  recommendationPosition?: number;
  size?: 'normal' | 'large';
};

const UnitAvatar = ({
  unit,
  viewEnabled = false,
  recommendationPosition = -1,
  size = 'normal',
}: Props) => {
  const theme = useTheme();
  const avatarUrl = getUnitAvatarUrl(unit);
  const avatarBorder =
    recommendationPosition === -1
      ? undefined
      : `2px solid ${
          theme.palette[recBorderLookup[recommendationPosition]].main
        }`;

  return (
    <Tooltip key={unit.id} title={unit.name} followCursor>
      <span>
        <Wrapper unit={unit} viewEnabled={viewEnabled}>
          <Avatar
            src={avatarUrl}
            sizes="large"
            sx={{
              border: avatarBorder,
              height: size === 'large' ? '75px' : undefined,
              width: size === 'large' ? '75px' : undefined,
            }}
          />
        </Wrapper>
      </span>
    </Tooltip>
  );
};

export default UnitAvatar;

const Wrapper = ({
  unit,
  viewEnabled,
  children,
}: Omit<Props, 'recommendationPosition'> & PropsWithChildren) => {
  const { toggleUnit } = useViewUnitContext();
  if (!viewEnabled) {
    return <span>{children}</span>;
  }

  return (
    <IconButton sx={{ p: '0.25rem' }} onClick={() => toggleUnit(unit)}>
      {children}
    </IconButton>
  );
};
