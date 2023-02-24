import { Avatar, IconButton, Tooltip } from '@mui/material';

import { PropsWithChildren } from 'react';
import { Unit } from '../../data/units';
import { getUnitAvatarUrl } from '../../helpers/unitHelpers';
import { useViewUnitContext } from '../../contexts/viewUnit/viewUnitContext';

type Props = {
  unit: Unit;
  viewEnabled?: boolean;
};

const UnitAvatar = ({ unit, viewEnabled = false }: Props) => {
  const avatarUrl = getUnitAvatarUrl(unit);
  return (
    <Tooltip key={unit.id} title={unit.name} followCursor>
      <Wrapper unit={unit} viewEnabled={viewEnabled}>
        <Avatar src={avatarUrl} sx={{}} sizes="large" />
      </Wrapper>
    </Tooltip>
  );
};

export default UnitAvatar;

const Wrapper = ({
  unit,
  viewEnabled,
  children,
}: Props & PropsWithChildren) => {
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
