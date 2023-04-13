import { Avatar, AvatarGroup, Box, Popover, Typography } from '@mui/material';
import { Fragment, useState } from 'react';

import UnitGroupingDisplay from './UnitGroupingDisplay';
import { getUnitAvatarUrl } from '../../helpers/unitHelpers';
import { unitOptions } from '../../data/units';

const recBorderLookup: Record<number, 'gold' | 'silver' | 'bronze'> = {
  0: 'gold',
  1: 'silver',
  2: 'bronze',
};
type Props = {
  units: string[];
  count: number;
  position: number;
};
const RecommendedUnitDisplay = ({ units, count, position }: Props) => {
  const [detailsAnchor, setDetailsAnchor] = useState<HTMLElement | undefined>(
    undefined,
  );
  const avatars = units.map(id => getUnitAvatarUrl(unitOptions[id]));

  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup
          max={1}
          sx={{ cursor: 'pointer' }}
          onMouseEnter={e => setDetailsAnchor(e.currentTarget)}
          onMouseLeave={() => setDetailsAnchor(undefined)}
        >
          {avatars.map((src, index) => {
            return (
              <Avatar
                key={index}
                src={src}
                sx={{
                  backgroundColor: 'black',
                  borderColor: theme =>
                    `${theme.medals[recBorderLookup[position]]} !important`,
                }}
              />
            );
          })}
        </AvatarGroup>
      </Box>
      <Popover
        open={!!detailsAnchor}
        anchorEl={detailsAnchor}
        onClose={() => setDetailsAnchor(undefined)}
        disableRestoreFocus
        sx={{ pointerEvents: 'none' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="overline" gutterBottom>
            {count} challenges
          </Typography>
          <UnitGroupingDisplay grouping={units} />
        </Box>
      </Popover>
    </Fragment>
  );
};

export default RecommendedUnitDisplay;
