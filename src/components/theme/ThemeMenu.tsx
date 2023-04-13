import { Menu, MenuItem, MenuProps, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';

import { specialThemeDefinitions } from '../../theme/theme';
import { useStorageContext } from '../../contexts/storage/storageContext';

type Props = {
  onClose:() => any
} & MenuProps;

const ThemeMenu = (props: Props) => {
  const {
    localStorage: { theme },
    updateTheme,
  } = useStorageContext();

  const handleClick = useCallback((key:any) => {
    updateTheme(key)
      props.onClose();
    
  },[props, updateTheme])
  return (
    <Menu {...props}>
      {Object.keys(specialThemeDefinitions).map((key: any) => {
        const { title, short } =
          specialThemeDefinitions[key as keyof typeof specialThemeDefinitions];
        return (
          <Tooltip title={title} followCursor>
            <MenuItem
              key={key}
              onClick={() => handleClick(key)}
              selected={key === theme}
            >
              {short}
            </MenuItem>
          </Tooltip>
        );
      })}
    </Menu>
  );
};

export default ThemeMenu;
