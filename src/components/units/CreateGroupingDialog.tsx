import { Divider, IconButton } from '@mui/material';
import { UnitGrouping, unitGroupings } from '../../data/unitGroupings';
import {
  groupingAlreadyExists,
  groupingIsCorrectLength,
} from '../../helpers/unitHelpers';
import { useCallback, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitleWithClose from '../material/DialogTitleWithClose';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UnitAvatar from './UnitAvatar';
import { unitOptions } from '../../data/units';
import { useStorageContext } from '../../contexts/storage/storageContext';

type Props = {
  open: boolean;
  onClose: () => void;
};
const CreateGroupingDialog = ({ open, onClose }: Props) => {
  const {
    localStorage: { userGroupings },
    updateUserGroupings,
  } = useStorageContext();

  const [selected, setSelected] = useState<string[]>([]);

  const canAdd = selected.length < 4;

  const isInvalidGrouping = useMemo(
    () => !groupingIsCorrectLength(selected),
    [selected],
  );

  const groupingExists = useMemo(
    () => groupingAlreadyExists([...unitGroupings, ...userGroupings], selected),
    [selected, userGroupings],
  );

  const handleSaveClick = useCallback(() => {
    if (isInvalidGrouping || groupingExists) {
      if (groupingExists) {
        alert(
          'A group with those units already exists, possibly in a different order.',
        );
      }
      return;
    }

    updateUserGroupings(selected as UnitGrouping);
    onClose();
  }, [
    groupingExists,
    isInvalidGrouping,
    onClose,
    selected,
    updateUserGroupings,
  ]);

  const toggleSelection = useCallback((selection: string) => {
    setSelected(state => {
      const newValue = state.includes(selection)
        ? state.filter(s => s !== selection)
        : [...state, selection];

      return newValue;
    });
  }, []);

  const selectableUnits = useMemo(
    () =>
      Object.values(unitOptions).filter(unit => !selected.includes(unit.id)),
    [selected],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithClose title="Add new unit group" onClose={onClose} />
      <DialogContent dividers>
        <Typography variant="body1">Each group contains 4 units</Typography>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {selected.map(selection => {
            return (
              <Grid item>
                <IconButton onClick={() => toggleSelection(selection)}>
                  <UnitAvatar unit={unitOptions[selection]} />
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
        {selected.length > 0 && <Divider sx={{ mb: 2 }} />}
        <Grid container>
          {selectableUnits.map(unit => {
            return (
              <Grid
                key={unit.id}
                item
                xs={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  disabled={!canAdd || selected.includes(unit.id)}
                  onClick={() => toggleSelection(unit.id)}
                >
                  <UnitAvatar unit={unit} />
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={canAdd} onClick={handleSaveClick}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupingDialog;
