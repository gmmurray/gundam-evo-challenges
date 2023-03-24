import {
  Button,
  Fade,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { SummarySortOptions, UnitSummaryRecord } from '../../types/challenges';
import {
  getSummaryRecordsFromMap,
  searchAndSortSummaryRecords,
} from '../../helpers/challengeHelpers';

import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnitSummary from '../units/UnitSummary';
import { useSummaryContext } from '../../contexts/summary/SummaryContext';

const defaultSortOptions: SummarySortOptions = {
  sort: 'challengeCount',
  order: 'desc',
};

const sortLabels: Record<
  SummarySortOptions['sort'],
  { key: SummarySortOptions['sort']; label: string }
> = {
  name: {
    key: 'name',
    label: 'Name',
  },
  challengeCount: {
    key: 'challengeCount',
    label: 'Challenges',
  },
};

const SummarySection = () => {
  const { unitSummary } = useSummaryContext();
  const [search, setSearch] = useState('');
  const [sortOptions, setSortOptions] =
    useState<SummarySortOptions>(defaultSortOptions);
  const [visibleSummaries, setVisibleSummaries] = useState<UnitSummaryRecord[]>(
    getSummaryRecordsFromMap(unitSummary),
  );
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | undefined>(
    undefined,
  );

  // update visible summaries when the search value changes
  useEffect(() => {
    const allSummaries = getSummaryRecordsFromMap(unitSummary);
    const result = searchAndSortSummaryRecords(
      allSummaries,
      search,
      sortOptions,
    );
    setVisibleSummaries(result);
  }, [search, sortOptions, unitSummary]);

  const handleClearSearch = useCallback(() => {
    setSearch('');
  }, []);

  const handleUpdateSort = useCallback((key: SummarySortOptions['sort']) => {
    setSortOptions(state => {
      let newSort: SummarySortOptions['sort'];
      let newOrder: SummarySortOptions['order'];

      if (state.sort === key) {
        newSort = state.sort;
        newOrder = state.order === 'asc' ? 'desc' : 'asc';
      } else {
        newSort = key;
        newOrder = defaultSortOptions.order;
      }

      return {
        sort: newSort,
        order: newOrder,
      };
    });
  }, []);

  const sortOrderIcon =
    sortOptions.order === 'asc' ? (
      <KeyboardArrowUpIcon />
    ) : (
      <KeyboardArrowDownIcon />
    );

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                value={search}
                onChange={e => setSearch(e.target.value)}
                fullWidth
                variant="standard"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleClearSearch}
                      edge="end"
                      disabled={search === ''}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs="auto" sx={{ display: 'flex', alignItems: 'end' }}>
              <Tooltip title="Sort">
                <Button
                  variant="contained"
                  onClick={e => setMenuAnchor(e.currentTarget)}
                  endIcon={sortOrderIcon}
                  size="small"
                >
                  {sortLabels[sortOptions.sort].label}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        {visibleSummaries.map(visible => {
          return (
            <Grid key={visible.unitId} item xs={12} md={6} lg={4}>
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
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList>
          {Object.values(sortLabels).map(({ key, label }) => {
            const isActive = sortOptions.sort === key;

            return (
              <MenuItem
                key={key}
                selected={isActive}
                onClick={() => handleUpdateSort(key)}
              >
                {isActive && <ListItemIcon>{sortOrderIcon}</ListItemIcon>}
                <ListItemText inset={!isActive}>{label}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Fragment>
  );
};

export default SummarySection;
