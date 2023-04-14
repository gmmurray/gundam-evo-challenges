import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Switch,
  Typography,
} from '@mui/material';
import { UserThemeKey, userThemeDefinitions } from '../../theme/theme';

import DialogTitleWithClose from '../material/DialogTitleWithClose';
import SelectMenu from '../material/SelectMenu';
import { useCallback } from 'react';
import { usePreferences } from '../../contexts/preferences/PreferencesContext';

type Props = {
  open: boolean;
  onClose: () => any;
};

const PreferencesEditor = ({ open, onClose }: Props) => {
  const { preferences, onPreferencesChange } = usePreferences();

  const handleHideCompletedChange = useCallback(() => {
    onPreferencesChange('list', {
      ...preferences.list,
      hideCompleted: !preferences.list.hideCompleted,
    });
  }, [onPreferencesChange, preferences.list]);

  const handleThemeChange = useCallback(
    (value: UserThemeKey) => {
      onPreferencesChange('theme', value);
    },
    [onPreferencesChange],
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitleWithClose title="Preferences" onClose={onClose} />
      <DialogContent>
        <Typography variant="h6" component="h2">
          List
        </Typography>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body1">Hide completed challenges</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Switch
              checked={preferences.list.hideCompleted}
              onChange={handleHideCompletedChange}
            />
          </Box>
        </Box>
        <Typography variant="h6" component="h2">
          Appearance
        </Typography>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body1">Theme</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <SelectMenu
              title={userThemeDefinitions[preferences.theme].short}
              currentValue={preferences.theme}
              onChange={value => handleThemeChange(value)}
              options={Object.keys(userThemeDefinitions).map((key: any) => {
                const { short } = userThemeDefinitions[key as UserThemeKey];
                return {
                  label: short,
                  value: key,
                };
              })}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesEditor;
