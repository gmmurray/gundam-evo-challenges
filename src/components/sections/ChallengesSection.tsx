import { Box, Button, List, Typography } from '@mui/material';
import {
  ChallengeProgress,
  ChallengesStorageKey,
} from '../../types/challenges';
import { Fragment, useCallback, useMemo, useState } from 'react';

import ChallengeEditor from '../challenges/ChallengeEditor';
import ChallengeListItem from '../challenges/ChallengeListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { useStorageContext } from '../../contexts/storage/storageContext';

type Props = {
  storageKey: ChallengesStorageKey;
  challengePoints: number;
  title: string;
  challengeCount: number;
};

const ChallengesSection = ({
  title,
  challengePoints,
  storageKey,
  challengeCount,
}: Props) => {
  const {
    localStorage: storage,
    updateChallenge,
    resetChallenges,
  } = useStorageContext();

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
      updateChallenge(storageKey, key, challenge);
    },
    [storageKey, updateChallenge],
  );

  const [hideSection, setHideSection] = useState(
    completedCount === challengeCount,
  );

  const handleReset = useCallback(() => {
    resetChallenges(storageKey);
  }, [resetChallenges, storageKey]);

  const handleToggleHidden = useCallback(
    () => setHideSection(state => !state),
    [],
  );

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
          <Typography variant="overline">{`${completedCount}/${challengeCount} completed`}</Typography>
          <Typography variant="subtitle1">
            These are worth {challengePoints} points each towards your battle
            pass
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </Box>
      <Collapse in={!hideSection}>
        <List sx={{ pl: 3 }}>
          {[...Array(challengeCount)].map((_, index) => {
            if (challenges[index]) {
              return (
                <ChallengeListItem
                  key={index}
                  challenge={challenges[index]}
                  onChange={challenge => handleUpdate(index, challenge)}
                />
              );
            } else {
              return (
                <ChallengeEditor
                  key={index}
                  onSave={challenge => handleUpdate(index, challenge)}
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
