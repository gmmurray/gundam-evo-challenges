import { Box, Button, List, Typography, useTheme } from '@mui/material';
import {
  ChallengeProgress,
  ChallengesStorageKey,
} from '../../types/challenges';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import ChallengeEditor from '../challenges/ChallengeEditor';
import ChallengeListItem from '../challenges/ChallengeListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ReactTimeago from 'react-timeago';
import { useStorageContext } from '../../contexts/storage/storageContext';

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

type Props = {
  storageKey: ChallengesStorageKey;
  title: string;
  challengeCount: number;
  nextReset: Date;
};

const ChallengesSection = ({
  title,
  storageKey,
  challengeCount,
  nextReset,
}: Props) => {
  const theme = useTheme();
  const {
    localStorage: storage,
    updateChallenge,
    resetChallenges,
  } = useStorageContext();
  const [undoState, setUndoState] = useState<
    Record<number, ChallengeProgress | undefined>
  >({});

  const challenges = storage[storageKey];

  const completedCount = useMemo(
    () =>
      Object.values(challenges).filter(
        challenge => challenge.progress === challenge.total,
      ).length,
    [challenges],
  );

  const handleUpdate = useCallback(
    (key: number, challenge?: ChallengeProgress) => {
      if (undoState[key]) {
        setUndoState(state => ({ ...state, [key]: undefined }));
      }
      updateChallenge(storageKey, key, challenge);
    },
    [storageKey, undoState, updateChallenge],
  );

  const [hideSection, setHideSection] = useState(
    completedCount === challengeCount,
  );

  useEffect(() => {
    if (completedCount === challengeCount) {
      setHideSection(true);
    }
  }, [challengeCount, completedCount]);

  const handleReset = useCallback(() => {
    resetChallenges(storageKey);
    setHideSection(false);
  }, [resetChallenges, storageKey]);

  const handleToggleHidden = useCallback(
    () => setHideSection(state => !state),
    [],
  );

  const handleUndo = useCallback(
    (index: number) => {
      const challenge = undoState[index];
      if (!challenge) {
        return;
      }

      handleUpdate(index, challenge);
    },
    [undoState, handleUpdate],
  );

  const handleClearChallenge = useCallback(
    (index: number) => {
      const challenge = challenges[index];
      if (!challenge) {
        return;
      }

      handleUpdate(index, undefined);
      setUndoState(state => ({ ...state, [index]: challenge }));
    },
    [challenges, handleUpdate],
  );

  // change color if less than 2 hours away
  const resetTextColor =
    nextReset.getTime() - new Date().getTime() < TWO_HOURS_MS
      ? theme.palette.warning.main
      : 'text.secondary';

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <IconButton onClick={handleToggleHidden}>
            {hideSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: resetTextColor }}>
            Resets <ReactTimeago date={nextReset} />
          </Typography>
          <Typography variant="overline">{`${completedCount}/${challengeCount} completed`}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </Box>
      <Collapse in={!hideSection} timeout={500}>
        <List>
          {[...Array(challengeCount)].map((_, index) => {
            const isLast = index === challengeCount - 1;
            if (challenges[index]) {
              return (
                <ChallengeListItem
                  key={index}
                  challenge={challenges[index]}
                  onChange={challenge => handleUpdate(index, challenge)}
                  divider={!isLast}
                  onClear={() => handleClearChallenge(index)}
                />
              );
            } else {
              return (
                <ChallengeEditor
                  key={index}
                  resetType={storageKey}
                  onSave={challenge => handleUpdate(index, challenge)}
                  divider={!isLast}
                  undoProgress={undoState[index]}
                  onUndo={() => handleUndo(index)}
                />
              );
            }
          })}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default ChallengesSection;
