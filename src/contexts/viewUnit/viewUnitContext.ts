import { createContext, useContext } from 'react';

import { Unit } from '../../data/units';

export type ViewUnitContextType = {
  unit?: Unit;
  toggleUnit: (unit?: Unit) => void;
};

export const defaultViewUnitContext: ViewUnitContextType = {
  unit: undefined,
  toggleUnit: () => {},
};

export const ViewUnitContext = createContext(defaultViewUnitContext);

export const useViewUnitContext = () => useContext(ViewUnitContext);
