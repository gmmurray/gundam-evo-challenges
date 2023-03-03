import React, { PropsWithChildren } from 'react';

import { PersonalDetailsContext } from './PersonalDetailsContext';

const envVariableValue = process.env.REACT_APP_SHOW_PERSONAL_DETAILS ?? 'false';

type Props = {} & PropsWithChildren;
const PersonalDetailsProvider = ({ children }: Props) => {
  const showPersonalDetails = envVariableValue === 'true';

  return (
    <PersonalDetailsContext.Provider value={{ showPersonalDetails }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};

export default PersonalDetailsProvider;
