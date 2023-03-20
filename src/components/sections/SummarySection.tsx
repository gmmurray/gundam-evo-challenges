import { ChallengeSummary, UnitChallengeSummary } from '../../types/challenges';
import {
  Fade,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import UnitSummary from '../units/UnitSummary';
import { unitOptions } from '../../data/units';
import { useSummaryContext } from '../../contexts/summary/SummaryContext';

type VisibleSummary = {
  unitId: string;
  summary: ChallengeSummary;
};

const getVisibleSummaries = (summary: UnitChallengeSummary): VisibleSummary[] =>
  Object.keys(summary).map(key => ({
    unitId: key,
    summary: summary[key],
  }));

const SummarySection = () => {
  const { unitSummary } = useSummaryContext();
  const [search, setSearch] = useState('');
  const [visibleSummaries, setVisibleSummaries] = useState<VisibleSummary[]>(
    getVisibleSummaries(unitSummary),
  );

  // update visible summaries when the search value changes
  useEffect(() => {
    const allSummaries = getVisibleSummaries(unitSummary);
    let result: VisibleSummary[];
    if (search === '') {
      result = allSummaries;
    } else {
      result = allSummaries.filter(s => {
        const name = unitOptions[s.unitId].name.toLocaleLowerCase();
        return name.includes(search.toLocaleLowerCase());
      });
    }
    setVisibleSummaries(result);
  }, [search, unitSummary]);

  const handleReset = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
            variant="standard"
            label="Search"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleReset} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        {visibleSummaries.map(visible => {
          return (
            <Grid key={visible.unitId} item xs={12}>
              <UnitSummary unitId={visible.unitId} summary={visible.summary} />
            </Grid>
          );
        })}
        {visibleSummaries.length === 0 && (
          <Grid item xs={12}>
            <Fade in timeout={250}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">No results</Typography>
              </Paper>
            </Fade>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

export default SummarySection;
