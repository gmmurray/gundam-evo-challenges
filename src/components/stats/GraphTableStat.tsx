import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import NoStatData from './NoStatData';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useStatsView } from '../../hooks/stats/useStatsView';

type Props = {
  table: JSX.Element;
  graph: JSX.Element;
  noData: boolean;
};

const GraphTableStat = ({ table, graph, noData }: Props) => {
  const { view, handleViewChange } = useStatsView();
  if (noData) {
    return <NoStatData />;
  }
  return (
    <Paper sx={{ flex: 1, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, value) => handleViewChange(value)}
        >
          <ToggleButton value="graph">
            <LeaderboardIcon />
          </ToggleButton>
          <ToggleButton value="table">
            <TableRowsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {view === 'graph' && <Box>{graph}</Box>}
      {view === 'table' && (
        <Box sx={{ overflow: 'hidden', py: 2 }}>{table}</Box>
      )}
    </Paper>
  );
};

export default GraphTableStat;
