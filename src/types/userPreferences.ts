import { SummarySortOptions } from './challenges';
import { UserThemeKey } from '../theme/theme';

export interface IUserPreferences {
  list: {
    hideCompleted: boolean;
  };
  summary: {
    sortOptions: SummarySortOptions;
  };
  theme: UserThemeKey;
}
