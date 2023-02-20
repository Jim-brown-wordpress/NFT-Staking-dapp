import { NetworkType } from '@elrondnetwork/dapp-core/types';

export const decimals = 4;
export const denomination = 18;
export const gasPerDataByte = 1500;
export const timeout = 10000; // 10 sec

export const walletConnectBridgeAddresses: string[] = [
  'https://bridge.walletconnect.org'
];
export const walletConnectBridge: string =
  walletConnectBridgeAddresses[
    Math.floor(Math.random() * walletConnectBridgeAddresses.length)
  ];

export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqyu6n9qr7f7yzzda5ays73nr8xrdwhxyl5zvsrr4zpq';
export const NFT_COLLECTION_ID = 'ABCDE-21319b';

// export const serverURL = 'https://newdegenorder-dao-server.vercel.app/api'
export const serverURL = 'http://localhost:3001/api'

export const dAppName = 'NewDegenOrder';
export const NFT_STAKING_CONTRACT_NAME = 'NewDegenOrder';
// export const network = {
//   id: 'devnet',
//   name: 'Devnet',
//   egldLabel: 'xEGLD',
//   walletAddress: 'https://devnet-wallet.elrond.com',
//   apiAddress: 'https://devnet-api.elrond.com',
//   // gatewayAddress: 'https://devnet-gateway.elrond.com',
//   explorerAddress: 'http://devnet-explorer.elrond.com',
//   graphQlAddress: 'https://devnet-exchange-graph.elrond.com/graphql'
// };


export const network = {
  id: '1',
  name: 'Mainnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://wallet.elrond.com',
  apiAddress: 'https://api.elrond.com',
  explorerAddress: 'http://explorer.elrond.com',
  graphQlAddress: 'https://exchange-graph.elrond.com/graphql'
};