import * as DappUI from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import { network, walletConnectBridge, walletConnectDeepLink } from 'config';
// import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
// import '@elrondnetwork/dapp-core/build/index.css';
import FlipCoin from './pages/FlipCoin/App';
import FlappyDegen from './pages/Flappy-Degen/pages/Home';
import Header from 'components/Header';
// import MintApp from 'pages/Mint/MintApp';

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
  DappCorePages: { UnlockPage }
} = DappUI;

const App = () => {
  return (
    <Router>
      <DappProvider
        // environment={'mainnet'}
        environment={'devnet'}
        customNetworkConfig={{ network, walletConnectBridge, walletConnectDeepLink }}
      >
        {/* <DappCoreUIWrapper> */}
          <Layout>
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals className='custom-class-for-modals' />
            <Header />
            <Routes>
              <Route
                path={routeNames.unlock}
                element={<UnlockPage loginRoute={routeNames.home} />}
              />
              <Route
                path={routeNames.daoUnlock}
                element={<UnlockPage loginRoute={routeNames.dao} />}
              />
              <Route
                path={routeNames.flipUnlock}
                element={<UnlockPage loginRoute={routeNames.elrondFlipCoin} />}
              />
              <Route
                path={routeNames.flappyUnlock}
                element={
                  <UnlockPage loginRoute={routeNames.elrondFlappyDegen} />
                }
              />
              <Route
                path={routeNames.stakingUnlock}
                element={<UnlockPage loginRoute={routeNames.staking} />}
              />
              {routes.map((route: any, index: number) => (
                <Route
                  path={route.path}
                  key={'route-key-' + index}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Layout>
        {/* </DappCoreUIWrapper> */}
      </DappProvider>
      <Routes>
        <Route path='/flip-coin' element={<FlipCoin />} />
        <Route path='/flappy-degen' element={<FlappyDegen />} />
        {/* <Route path='*' element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
