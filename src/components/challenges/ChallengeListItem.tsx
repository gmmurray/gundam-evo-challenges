import { Fragment, useCallback } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { ChallengeProgress } from '../../types/challenges';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgressWithLabel from '../material/LinearProgressWithLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import UnitGroupingDisplay from '../units/UnitGroupingDisplay';
import { challengeTypes } from '../../data/challengeTypes';
import { useRecommendationContext } from '../../contexts/recommendations/RecommendationContext';

type Props = {
  challenge: ChallengeProgress;
  onChange: (value?: ChallengeProgress) => void;
};

const ChallengeListItem = ({ challenge, onChange }: Props) => {
  const { recommendations } = useRecommendationContext();
  const challengeType = challengeTypes[challenge.type];
  const isComplete = challenge.total === challenge.progress;

  const handleComplete = useCallback(() => {
    const progress = isComplete ? 0 : challenge.total;

    onChange({ ...challenge, progress });
  }, [challenge, isComplete, onChange]);

  const handleIncrement = useCallback(() => {
    onChange({
      ...challenge,
      progress: challengeType.increment(challenge.progress, challenge.total),
    });
  }, [challenge, challengeType, onChange]);

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <Fragment>
      <ListItem
        divider
        className={isComplete ? 'Mui-selected' : undefined}
        secondaryAction={
          <Tooltip title={isComplete ? 'Remove' : 'Increment'}>
            <span>
              <IconButton
                edge="end"
                onClick={isComplete ? handleClear : handleIncrement}
              >
                {isComplete ? <DeleteIcon /> : <AddIcon />}
              </IconButton>
            </span>
          </Tooltip>
        }
        sx={{
          my: 1,
        }}
      >
        <ListItemIcon>
          <IconButton onClick={handleComplete}>
            {isComplete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        </ListItemIcon>
        <ListItemText disableTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              <Typography variant="body1">{challengeType.title}</Typography>
              <LinearProgressWithLabel
                numerator={challenge.progress}
                denominator={challenge.total}
              />
            </Grid>
            <Grid item xs={12} md="auto">
              <UnitGroupingDisplay
                grouping={challenge.grouping}
                viewEnabled={true}
                recommendations={isComplete ? [] : recommendations}
              />
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
    </Fragment>
  );
};

export default ChallengeListItem;
