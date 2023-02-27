import {
  Dialog,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Fragment, useMemo, useState } from 'react';
import { UnitGrouping, unitGroupings } from '../../data/unitGroupings';
import {
  groupingsAreEqual,
  sortUnitGroupings,
} from '../../helpers/unitHelpers';

import Button from '@mui/material/Button';
import CreateGroupingDialog from './CreateGroupingDialog';
import DialogTitleWithClose from '../material/DialogTitleWithClose';
import UnitGroupingDisplay from './UnitGroupingDisplay';
import { useStorageContext } from '../../contexts/storage/storageContext';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedGrouping?: UnitGrouping;
  onUpdate: (grouping: UnitGrouping) => void;
};

const UnitGroupingDialog = ({
  open,
  selectedGrouping,
  onClose,
  onUpdate,
}: Props) => {
  const {
    localStorage: { userGroupings },
  } = useStorageContext();

  const [createGroupingOpen, setCreateGroupingOpen] = useState(false);

  const allGroupings = useMemo(
    () => sortUnitGroupings([...unitGroupings, ...userGroupings]),
    [userGroupings],
  );

  return (
    <Fragment>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
        <DialogTitleWithClose title="Pick units" onClose={onClose} />
        <DialogContent>
          <Button onClick={() => setCreateGroupingOpen(true)}>
            Add new group
          </Button>
          <List dense>
            {allGroupings.map((grouping, index) => {
              const selected =
                selectedGrouping &&
                groupingsAreEqual(selectedGrouping, grouping);
              return (
                <ListItemButton
                  key={index}
                  onClick={() => onUpdate(grouping)}
                  selected={selected}
                >
                  <ListItemText disableTypography>
                    <UnitGroupingDisplay grouping={grouping} />
                  </ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
      <CreateGroupingDialog
        open={createGroupingOpen}
        onClose={() => setCreateGroupingOpen(false)}
      />
    </Fragment>
  );
};

export default UnitGroupingDialog;
