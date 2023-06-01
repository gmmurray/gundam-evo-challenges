import { Fragment, useCallback, useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Stack,
} from '@mui/material';

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
  onEdit: () => any;
  onMoveUp?: () => any;
  onMoveDown?: () => any;
};

const ChallengeListItem = ({
  challenge,
  onChange,
  onClear,
  onEdit,
  onMoveUp,
  onMoveDown,
}: Props) => {
  const [contextMenu, setContextMenu] = useState<
    { mouseX: number; mouseY: number } | undefined
  >(undefined);
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

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === undefined
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : undefined,
      );
    },
    [contextMenu],
  );

  const hidden = isComplete && preferences.list.hideCompleted;

  return (
    <Fragment>
      <Paper
        component="div"
        onContextMenu={handleContextMenu}
        style={{ cursor: 'context-menu' }}
      >
        <ListItem
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
        <Menu
          open={!!contextMenu}
          onClose={() => setContextMenu(undefined)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== undefined
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={onEdit}>Edit</MenuItem>
          <MenuItem onClick={handleClear}>Remove</MenuItem>
          <MenuItem disabled={!onMoveUp} onClick={onMoveUp}>
            Move up
          </MenuItem>
          <MenuItem disabled={!onMoveDown} onClick={onMoveDown}>
            Move down
          </MenuItem>
        </Menu>
      </Paper>
    </Fragment>
  );
};

export default ChallengeListItem;
