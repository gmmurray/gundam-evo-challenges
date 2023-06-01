import { Box, Button, Grid, IconButton, ListItem, Paper } from '@mui/material';
import {
  ChallengeProgress,
  ChallengesStorageKey,
} from '../../types/challenges';
import { Fragment, useCallback, useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitleWithClose from '../material/DialogTitleWithClose';
import RestoreIcon from '@mui/icons-material/Restore';
import SelectMenu from '../material/SelectMenu';
import TextField from '@mui/material/TextField';
import { UnitGrouping } from '../../data/unitGroupings';
import UnitGroupingDialog from '../units/UnitGroupingDialog';
import UnitGroupingDisplay from '../units/UnitGroupingDisplay';
import { challengeTypes } from '../../data/challengeTypes';
import { getDefaultChallengeTotal } from '../../helpers/challengeHelpers';

const getCanSave = (challenge: Partial<ChallengeProgress>) =>
  challenge.grouping !== undefined &&
  challenge.total !== undefined &&
  !!challenge.type;

type Props = {
  onSave: (value: ChallengeProgress) => void;
  resetType: ChallengesStorageKey;
  undoProgress?: ChallengeProgress;
  onUndo: () => any;
  defaultValue?: ChallengeProgress;
};

const ChallengeEditor = ({
  onSave,
  onUndo,
  undoProgress,
  resetType,
  defaultValue,
}: Props) => {
  const [challenge, setChallenge] = useState<Partial<ChallengeProgress>>(
    defaultValue ?? {},
  );
  const [unitsDialogOpen, setUnitsDialogOpen] = useState(false);
  const [customAmountDialogOpen, setCustomAmountDialogOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | undefined>(
    undefined,
  );

  const handleSave = useCallback(
    (ch: Partial<ChallengeProgress>) => {
      if (!getCanSave(ch)) {
        return;
      }

      onSave({ ...ch, progress: 0 } as ChallengeProgress);
    },
    [onSave],
  );

  const handleUpdate = useCallback(
    (key: keyof ChallengeProgress, value: any) => {
      setChallenge(state => {
        const newState = { ...state, [key]: value };

        return newState;
      });
    },
    [],
  );

  // set challenge whenever the components of the challenge have been properly selected
  useEffect(() => {
    if (!defaultValue && getCanSave(challenge)) {
      handleSave(challenge);
    }
  }, [challenge, defaultValue, handleSave]);

  // if the challenge type changes, change the total to the default for that type
  useEffect(() => {
    if (challenge.type) {
      setChallenge(state => ({
        ...state,
        total: getDefaultChallengeTotal(resetType, challenge.type),
      }));
    }
  }, [challenge.type, resetType]);

  const handleGroupingUpdate = useCallback(
    (grouping: UnitGrouping) => {
      if (challenge.grouping !== undefined) {
        handleUpdate('grouping', undefined);
        return;
      }

      handleUpdate('grouping', grouping);
      setUnitsDialogOpen(false);
    },
    [challenge.grouping, handleUpdate],
  );

  const handleReset = useCallback(() => {
    if (defaultValue && undoProgress) {
      onSave(undoProgress);
      return;
    }

    setChallenge({});
    setCustomAmount(undefined);
  }, [defaultValue, onSave, undoProgress]);

  const handleCloseCustomAmount = useCallback(() => {
    setCustomAmountDialogOpen(false);
    setCustomAmount(undefined);
  }, []);

  const handleSaveCustomAmount = useCallback(() => {
    if (customAmount === undefined) {
      alert('Custom amount must be a number');
      return;
    }

    handleUpdate('total', customAmount);
    handleCloseCustomAmount();
  }, [customAmount, handleCloseCustomAmount, handleUpdate]);

  const canUndo = !!undoProgress && Object.keys(challenge).length === 0;

  return (
    <Fragment>
      <Paper sx={{ my: 1, py: 1 }}>
        <ListItem
          secondaryAction={
            <Box>
              {!!defaultValue && (
                <IconButton onClick={() => handleSave(challenge)}>
                  {<CheckIcon />}
                </IconButton>
              )}
              <IconButton onClick={canUndo ? onUndo : handleReset}>
                {canUndo ? <RestoreIcon /> : <ClearIcon />}
              </IconButton>
            </Box>
          }
        >
          <Grid container spacing={2}>
            <Grid item>
              <SelectMenu
                title="Select challenge"
                currentValue={challenge.type}
                onChange={value => handleUpdate('type', value)}
                options={Object.keys(challengeTypes).map(key => ({
                  label: challengeTypes[key].title,
                  value: key,
                }))}
                buttonProps={{
                  variant: 'contained',
                }}
              />
            </Grid>
            <Grid item>
              <SelectMenu
                hideEmpty={false}
                showEndIcon
                title={challenge.total?.toLocaleString() ?? 'Qty'}
                currentValue={challenge.total}
                onChange={value => handleUpdate('total', value)}
                options={
                  challenge.type
                    ? challengeTypes[challenge.type].options.map(option => ({
                        label: option.toLocaleString(),
                        value: option,
                      }))
                    : []
                }
                customOption={{
                  label: 'Other...',
                  onClick: () => setCustomAmountDialogOpen(true),
                }}
                buttonProps={{
                  variant: 'contained',
                }}
              />
            </Grid>
            <Grid item xs={12} md={challenge.grouping ? undefined : 'auto'}>
              <Fragment>
                <Button
                  variant={
                    challenge.grouping === undefined ? 'contained' : undefined
                  }
                  onClick={() => setUnitsDialogOpen(true)}
                >
                  {challenge.grouping !== undefined ? (
                    <UnitGroupingDisplay grouping={challenge.grouping} />
                  ) : (
                    'Select units'
                  )}
                </Button>
              </Fragment>
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
      <UnitGroupingDialog
        open={unitsDialogOpen}
        onClose={() => setUnitsDialogOpen(false)}
        selectedGrouping={challenge.grouping}
        onUpdate={handleGroupingUpdate}
      />
      <Dialog
        open={customAmountDialogOpen}
        onClose={handleCloseCustomAmount}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitleWithClose
          title="Custom amount"
          onClose={handleCloseCustomAmount}
        />
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={customAmount}
            onChange={event => setCustomAmount(parseInt(event.target.value))}
            placeholder="Amount"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveCustomAmount}>Save</Button>
          <Button onClick={handleCloseCustomAmount}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ChallengeEditor;
