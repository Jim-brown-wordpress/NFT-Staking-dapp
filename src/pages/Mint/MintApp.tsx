// // import './App.css';
// import { useMemo } from 'react';
// import * as anchor from '@project-serum/anchor';
// import SolMintPage from './SolMintPage';
// import { DEFAULT_TIMEOUT } from './connection';
// import { clusterApiUrl } from '@solana/web3.js';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import {
//   getPhantomWallet,
//   getSlopeWallet,
//   getSolflareWallet,
//   getSolletWallet,
//   getSolletExtensionWallet,
// } from '@solana/wallet-adapter-wallets';

// import {
//   ConnectionProvider,
//   WalletProvider,
// } from '@solana/wallet-adapter-react';
// import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

// import { ThemeProvider, createTheme } from '@material-ui/core';
// import { createGlobalStyle } from 'styled-components';

// import colors from 'styles/colors';
// const GlobalStyles = createGlobalStyle`
//   body {
//     background: url('/images/mint-background.jpg');
//     background-color: #0D1422;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: 50% 50%;
//     overflow-y: scroll;

//     @media screen and (max-width: 1500px) {
//       background-position: 50% -50%;
//     }

//     @media screen and (max-width: 880px) {
//       background: url('/images/mint-mobile-background.jpg');
//       background-color: #0D1422;
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: 50% 15%;
//     }
//   }
//   body #root .dapp-core-ui-wrapper {
//     display: none;
//   }

  
//   body .MuiButton-containedPrimary {
//     background: ${colors.white};
//     font-size: 24px;
//     font-family: 'American Captain';
//     color: ${colors.red};
//   }
//   body .MuiButton-containedPrimary:hover {
//     background: ${colors.red};
//     color: ${colors.white};
//   }
// `

// const theme = createTheme({
//   palette: {
//     type: 'dark',
//   },
// });

// const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
//   try {
//     const candyMachineId = new anchor.web3.PublicKey(
//       'Fm28vytKNQYympcMFjxsqYjJEvdxqjoTzPVXWZKJo88K',
//     );

//     return candyMachineId;
//   } catch (e) {
//     console.log('Failed to construct CandyMachineId', e);
//     return undefined;
//   }
// };

// const candyMachineId = getCandyMachineId();
// // const network = 'devnet' as WalletAdapterNetwork;
// // const rpcHost = 'https://api.devnet.solana.com';
// // const connection = new anchor.web3.Connection(
// //   rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
// // );

// const network = 'mainnet-beta' as WalletAdapterNetwork;
// const rpcHost = 'https://api.mainnet-beta.solana.com';
// const connection = new anchor.web3.Connection(
//   rpcHost ? rpcHost : anchor.web3.clusterApiUrl('mainnet-beta'),
// );


// const App = () => {
//   const endpoint = useMemo(() => clusterApiUrl(network), []);

//   const wallets = useMemo(
//     () => [
//       getPhantomWallet(),
//       getSolflareWallet(),
//       getSlopeWallet(),
//       getSolletWallet({ network }),
//       getSolletExtensionWallet({ network }),
//     ],
//     [],
//   );

//   return (
//     <>
//       <GlobalStyles/>
//       <ThemeProvider theme={theme}>
//         <ConnectionProvider endpoint={endpoint}>
//           <WalletProvider wallets={wallets} autoConnect>
//             <WalletDialogProvider>
//               <SolMintPage
//                 candyMachineId={candyMachineId}
//                 connection={connection}
//                 txTimeout={DEFAULT_TIMEOUT}
//                 rpcHost={rpcHost}
//                 network={network}
//               />
//             </WalletDialogProvider>
//           </WalletProvider>
//         </ConnectionProvider>
//       </ThemeProvider>
//     </>
//   );
// };

// export default App;
export {}
