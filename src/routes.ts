import { dAppName } from 'config';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import DaoPage from './pages/Dao';
import Transaction from './pages/Transaction';
import Launchpad from 'pages/Launchpad';
import UnderConstructionPage from 'pages/UnderConstruction';
import ElrondFlipCoin from 'pages/Elrond-FlipCoin';
// import MintPage from 'pages/Mint/MintPage';
import ElrondFlappyDegen from 'pages/Elrond-Flappy-Degen/pages/Home'
import FlappyDegenLeaderboard from 'pages/Flappy-Degen/pages/Leaderboard'
import StakingPage from 'pages/Staking';

export const routeNames = {
  home: '/',
  dashboard:'/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  daoUnlock: '/dao-unlock',
  flipUnlock: '/flip-unlock',
  flappyUnlock: '/flappy-unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  dao: '/dao',
  staking: '/staking',
  stakingUnlock: '/staking-unlock',
  launchpad: '/launchpad',
  elrondFlipCoin: '/elrond-flip-coin',
  elrondFlappyDegen: '/elrond-flappy-degen',
  // flappyDegen: '/flappy-degen',
  flappyDegenLeaderboard: '/flappy-degen-leaderboard'
  // test: '/test'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: HomePage
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  },
  {
    path: routeNames.dao,
    title: 'DAO',
    component: DaoPage
  },
  {
    path: routeNames.staking,
    title: 'Staking',
    component: StakingPage
  },
  {
    path: routeNames.launchpad,
    title: 'Launchpad',
    component: Launchpad
  },
  {
    path: routeNames.elrondFlipCoin,
    title: 'ElrondFlipCoin',
    component: ElrondFlipCoin
  },
  {
    path: routeNames.elrondFlappyDegen,
    title: 'ElrondFlappyDegen',
    component: ElrondFlappyDegen
  },
  {
    path: routeNames.flappyDegenLeaderboard,
    title: 'FlappyDegen',
    component: FlappyDegenLeaderboard
  },
  // {
  //   path: routeNames.test,
  //   title: 'Test',
  //   component: HomePage
  // }
];

const mappedRoutes = routes.map((route) => {
  const requiresAuth = Boolean(route.authenticatedRoute);

  return {
    path: route.path,
    component: route.component,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
