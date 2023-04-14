import { Fragment, useCallback } from 'react';
import { ListItem, ListItemIcon, Stack } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { ChallengeProgress } from '../../types/challenges';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgressWithLabel from '../material/LinearProgressWithLabel';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import UnitGroupingDisplay from '../units/UnitGroupingDisplay';
import { challengeTypes } from '../../data/challengeTypes';
import { usePreferences } from '../../contexts/preferences/PreferencesContext';
import { useRecommendationContext } from '../../contexts/recommendations/RecommendationContext';

type Props = {
  challenge: ChallengeProgress;
  onChange: (value?: ChallengeProgress) => void;
  onClear: () => any;
  divider: boolean;
};

const ChallengeListItem = ({
  challenge,
  onChange,
  onClear,
  divider,
}: Props) => {
  const { recommendations } = useRecommendationContext();
  const { preferences } = usePreferences();
  const challengeType = challengeTypes[challenge.type];
  const isComplete = challenge.total === challenge.progress;
  const canIncrement = !isComplete;
  const canDecrement = challenge.progress > 0;

  const handleComplete = useCallback(() => {
    const progress = isComplete ? 0 : challenge.total;

    onChange({ ...challenge, progress });
  }, [challenge, isComplete, onChange]);

  const handleUpdateProgress = useCallback(
    (isIncrement: boolean) => {
      onChange({
        ...challenge,
        progress: challengeType.updateProgress(
          challenge.progress,
          challenge.total,
          isIncrement,
        ),
      });
    },
    [challenge, challengeType, onChange],
  );

  const handleClear = useCallback(() => {
    onClear();
  }, [onClear]);

  const hidden = isComplete && preferences.list.hideCompleted;

  return (
    <Fragment>
      <ListItem
        divider={divider}
        className={isComplete ? 'Mui-selected' : undefined}
        sx={{
          my: 1,
          display: hidden ? 'none' : undefined,
        }}
      >
        <ListItemIcon>
          <IconButton onClick={handleComplete}>
            {isComplete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        </ListItemIcon>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid item xs>
            <Grid container spacing={1}>
              <Grid item xs={12} md>
                <Typography variant="body1">{challengeType.title}</Typography>
                <LinearProgressWithLabel
                  numerator={challenge.progress}
                  denominator={challenge.total}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <UnitGroupingDisplay
                  grouping={challenge.grouping}
                  viewEnabled={true}
                  recommendations={isComplete ? [] : recommendations}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs="auto">
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
              {isComplete ? (
                <IconButton onClick={handleClear}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                <Stack direction="column">
                  <IconButton
                    onClick={() => handleUpdateProgress(true)}
                    disabled={!canIncrement}
                    size="medium"
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdateProgress(false)}
                    disabled={!canDecrement}
                    size="medium"
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </Fragment>
  );
};

export default ChallengeListItem;
