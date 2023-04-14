import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconProps } from '@mui/material';
import React from 'react';

type Props = {
  visible: boolean;
} & IconProps<any>;
const ExpandIcon = ({ visible, ...iconProps }: Props) => {
  if (visible) {
    return <ExpandMoreIcon {...iconProps} />;
  } else {
    return <ExpandLessIcon {...iconProps} />;
  }
};

export default ExpandIcon;
