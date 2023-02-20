import React from 'react';
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  return (
    <AuthenticatedRoutesWrapper
      routes={routes}
      unlockRoute={`${routeNames.unlock}${search}`}
    >
      {children}
    </AuthenticatedRoutesWrapper>
  );
};

export default Layout;
