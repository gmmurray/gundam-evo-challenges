import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

type Props = {
  title: string;
  onClose: () => void;
};
const DialogTitleWithClose = ({ title, onClose }: Props) => {
  return (
    <DialogTitle>
      {title}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default DialogTitleWithClose;
