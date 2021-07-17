import React, { createContext, useMemo, useState } from 'react';

export const UserDataContext = createContext();
// eslint-disable-next-line react/prop-types
export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(['projectName', ', ', 'walls']);
  const userMemo = useMemo(() => [setUserData, userData], [userData]);

  return <UserDataContext.Provider value={userMemo}>{children}</UserDataContext.Provider>;
}
