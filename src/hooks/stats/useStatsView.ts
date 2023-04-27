import { useCallback, useState } from 'react';

export const useStatsView = () => {
  const [view, setView] = useState<'table' | 'graph'>('graph');

  const handleViewChange = useCallback((value?: string) => {
    if (value && isViewOption(value)) {
      setView(value);
    }
  }, []);

  return {
    view,
    handleViewChange,
  };
};

const isViewOption = (value: any): value is 'table' | 'graph' => {
  return value === 'table' || value === 'graph';
};
