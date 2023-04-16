import { Button, ButtonProps, Menu, MenuItem, Tooltip } from '@mui/material';
import { Fragment, useCallback, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type MenuOption = { label: string; value: any; tooltip?: string };

type Props = {
  title: string;
  currentValue?: MenuOption['value'];
  onChange: (value: MenuOption['value']) => any;
  options: MenuOption[];
  buttonProps?: ButtonProps;
  hideEmpty?: boolean;
  customOption?: { label: string; onClick: () => void };
  showEndIcon?: boolean;
};

const SelectMenu = ({
  title,
  currentValue,
  onChange,
  options,
  hideEmpty = true,
  showEndIcon = false,
  buttonProps,
  customOption,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const onClick = useCallback(
    (value: Props['currentValue']) => {
      const newValue = currentValue === value ? undefined : value;
      setAnchorEl(undefined);
      onChange(newValue);
    },
    [currentValue, onChange],
  );

  if (hideEmpty && !options.length) {
    return null;
  }

  const label = options.find(o => o.value === currentValue)?.label ?? title;

  return (
    <Fragment>
      <Button
        disabled={!options.length}
        variant={currentValue === undefined ? 'outlined' : 'contained'}
        {...buttonProps}
        onClick={e => setAnchorEl(e.currentTarget)}
        endIcon={showEndIcon ? <ArrowDropDownIcon /> : undefined}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options.map(({ label, value, tooltip }, index) => {
          const selected = value === currentValue;
          return (
            <Tooltip title={tooltip} key={index}>
              <MenuItem
                key={index}
                selected={selected}
                onClick={() => onClick(value)}
              >
                {label}
              </MenuItem>
            </Tooltip>
          );
        })}
        {customOption && (
          <MenuItem onClick={customOption.onClick}>
            {customOption.label}
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default SelectMenu;
