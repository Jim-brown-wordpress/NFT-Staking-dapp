import React from 'react';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core/utils';
import * as DappUI from '@elrondnetwork/dapp-core/UI';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const {
    ExtensionLoginButton,
    WebWalletLoginButton,
    LedgerLoginButton,
    WalletConnectLoginButton
  } = DappUI;

  React.useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (isLoggedIn) {
      window.location.href = routeNames.home;
    }
  }, []);

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              callbackRoute={routeNames.home}
              loginButtonText={'Extension'}
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.home}
              loginButtonText={'Web wallet'}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              callbackRoute={routeNames.home}
              // className={'test-class_name'}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.home}
              loginButtonText={'Maiar'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
