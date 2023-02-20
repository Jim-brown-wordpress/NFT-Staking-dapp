import { NetworkType } from '@elrondnetwork/dapp-core/types';

export const decimals = 4;
export const denomination = 18;
export const gasPerDataByte = 1500;
export const timeout = 10000; // 10 sec

export const walletConnectBridgeAddresses: string[] = [
  'https://walletconnect-bridge.maiar.com'
];
export const walletConnectBridge: string =
  walletConnectBridgeAddresses[
    Math.floor(Math.random() * walletConnectBridgeAddresses.length)
  ];

export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqyu6n9qr7f7yzzda5ays73nr8xrdwhxyl5zvsrr4zpq';

export const daoContractAddress =
  'erd1qqqqqqqqqqqqqpgqx3yxq832rcnd4m2yv8y23w320dqve4nmneus70flxw';

export const daoVoteAddress =
  'erd1qqqqqqqqqqqqqpgq4ulzgn5wawvfkskj3rxud2j0hx0t9epyneus7e2kwc';

export const serverURL = 'http://localhost:8000'

export const dAppName = 'NewDegenOrder';

export const network = {
  id: 'devnet',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.elrond.com',
  apiAddress: 'https://devnet-api.elrond.com',
  // gatewayAddress: 'https://devnet-gateway.elrond.com',
  explorerAddress: 'http://devnet-explorer.elrond.com',
  graphQlAddress: 'https://devnet-exchange-graph.elrond.com/graphql'
};
