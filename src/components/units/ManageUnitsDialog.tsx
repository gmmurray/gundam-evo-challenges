import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Fragment, useMemo, useState } from 'react';

import CreateGroupingDialog from './CreateGroupingDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitleWithClose from '../material/DialogTitleWithClose';
import UnitGroupingDisplay from './UnitGroupingDisplay';
import { sortUnitGroupings } from '../../helpers/unitHelpers';
import { unitGroupings } from '../../data/unitGroupings';
import { useDataContext } from '../../contexts/data/dataContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ManageUnitsDialog = ({ open, onClose }: Props) => {
  const {
    challengeData: { userGroupings },
    updateUserGroupings,
  } = useDataContext();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const sortedUnitGroupings = useMemo(
    () => sortUnitGroupings(unitGroupings),
    [],
  );

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitleWithClose title="Available Unit Groups" onClose={onClose} />
        <DialogContent>
          <Typography variant="subtitle1">
            If you are missing a group, you can add a custom group yourself. We
            will try to keep this list as up to date as possible.
          </Typography>
          <Button onClick={() => setCreateDialogOpen(true)}>Add group</Button>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Preset Groups</Typography>
            {sortedUnitGroupings.map((grouping, index) => {
              const isLast = index === sortedUnitGroupings.length - 1;
              return (
                <Fragment key={index}>
                  <UnitGroupingDisplay
                    key={index}
                    grouping={grouping}
                    viewEnabled={true}
                  />
                  {!isLast && <Divider sx={{ my: 1 }} />}
                </Fragment>
              );
            })}
            {userGroupings.length > 0 && (
              <Fragment>
                <Typography variant="h6">Custom Groups</Typography>
                {userGroupings.map((grouping, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <UnitGroupingDisplay
                        grouping={grouping}
                        viewEnabled={true}
                      />
                      <IconButton
                        sx={{ ml: 'auto' }}
                        onClick={() => updateUserGroupings(grouping)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  );
                })}
              </Fragment>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <CreateGroupingDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </Fragment>
  );
};

export default ManageUnitsDialog;
