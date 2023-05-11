import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from 'chart.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';

import { Bar } from 'react-chartjs-2';
import { GetStatTotals } from '../../helpers/userStatHelpers';
import GraphTableStat from './GraphTableStat';
import StatsSubSection from './StatsSubSection';
import { getUniqueElements } from '../../helpers/arrayHelpers';
import { unitOptions } from '../../data/units';
import { useBarConfig } from '../../hooks/stats/useBarConfig';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Props = {
  data: GetStatTotals['units'];
};

const UnitChallengeStats = ({ data }: Props) => {
  const theme = useTheme();
  const barConfig = useBarConfig();

  const labelKeys = getUniqueElements([
    ...Object.keys(data.dailies),
    ...Object.keys(data.weeklies),
  ]);

  const orderedData = labelKeys
    .map(key => {
      const { name } = unitOptions[key];
      const dailies = data.dailies[key] ?? 0;
      const weeklies = data.weeklies[key] ?? 0;
      const total = dailies + weeklies;
      return {
        key,
        name,
        dailies,
        weeklies,
        total,
      };
    })
    .sort((a, b) => (a.total > b.total ? -1 : 1));

  const labels = orderedData.map(d => d.name);

  return (
    <StatsSubSection title="Completed Challenges By Unit">
      <GraphTableStat
        noData={
          Object.keys(data).length === 0 ||
          Object.keys(data.weeklies).length === 0
        }
        graph={
          <Bar
            options={barConfig}
            data={{
              labels,
              datasets: [
                {
                  label: 'Dailies',
                  data: orderedData.map(d => d.dailies),
                  backgroundColor: theme.palette.primary.main,
                },
                {
                  label: 'Weeklies',
                  data: orderedData.map(d => d.weeklies),
                  backgroundColor: theme.palette.secondary.main,
                },
              ],
            }}
          />
        }
        table={
          <TableContainer sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Unit</TableCell>
                  <TableCell align="right">Dailies</TableCell>
                  <TableCell align="right">Weeklies</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedData.map(({ key, name, dailies, weeklies, total }) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="right">
                        {dailies === 0 ? '--' : dailies}
                      </TableCell>
                      <TableCell align="right">
                        {weeklies === 0 ? '--' : weeklies}
                      </TableCell>
                      <TableCell align="right">{total}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
    </StatsSubSection>
  );
};
export default UnitChallengeStats;
