// import { useCallback, useEffect, useMemo, useState } from 'react';
// import * as anchor from '@project-serum/anchor';

// import styled, { createGlobalStyle } from 'styled-components';
// import { Container, Snackbar } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
// import Alert from '@material-ui/lab/Alert';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import {
//   Commitment,
//   Connection,
//   PublicKey,
//   Transaction,
// } from '@solana/web3.js';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
// import {
//   awaitTransactionSignatureConfirmation,
//   CANDY_MACHINE_PROGRAM,
//   CandyMachineAccount,
//   createAccountsForMint,
//   getCandyMachineState,
//   getCollectionPDA,
//   mintOneToken,
//   SetupState,
// } from './candy-machine';
// import { AlertState, formatNumber, getAtaForMint, toDate } from './utils';
// import { MintCountdown } from './MintCountdown';
// import { MintButton } from './MintButton';
// import { GatewayProvider } from '@civic/solana-gateway-react';
// import { sendTransaction } from './connection';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import Header from './MintHeader'
// import colors from 'styles/colors';

// const ConnectButton = styled(WalletDialogButton)`
//   width: 100%;
//   height: 60px;
//   margin-top: 10px;
//   margin-bottom: 5px;
//   background: ${colors.red};
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
// `;

// const MintContainer = styled.div`
// `; // add your owns styles here

// export interface HomeProps {
//   candyMachineId?: anchor.web3.PublicKey;
//   connection: anchor.web3.Connection;
//   txTimeout: number;
//   rpcHost: string;
//   network: WalletAdapterNetwork;
// }

// const Home = (props: HomeProps) => {
//   const [isUserMinting, setIsUserMinting] = useState(false);
//   const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
//   const [alertState, setAlertState] = useState<AlertState>({
//     open: false,
//     message: '',
//     severity: undefined,
//   });
//   const [isActive, setIsActive] = useState(false);
//   const [endDate, setEndDate] = useState<Date>();
//   const [itemsRemaining, setItemsRemaining] = useState<number>();
//   const [isWhitelistUser, setIsWhitelistUser] = useState(false);
//   const [isPresale, setIsPresale] = useState(false);
//   const [isValidBalance, setIsValidBalance] = useState(false);
//   const [discountPrice, setDiscountPrice] = useState<anchor.BN>();
//   const [needTxnSplit, setNeedTxnSplit] = useState(true);
//   const [setupTxn, setSetupTxn] = useState<SetupState>();
//   const [showRemaining, setshowRemaining] = useState(false);

//   const rpcUrl = props.rpcHost;
//   const wallet = useWallet();
//   const cluster = props.network;
//   const anchorWallet = useMemo(() => {
//     if (
//       !wallet ||
//       !wallet.publicKey ||
//       !wallet.signAllTransactions ||
//       !wallet.signTransaction
//     ) {
//       return;
//     }

//     return {
//       publicKey: wallet.publicKey,
//       signAllTransactions: wallet.signAllTransactions,
//       signTransaction: wallet.signTransaction,
//     } as anchor.Wallet;
//   }, [wallet]);
//   const countDownWhitelistDate = new Date("Jun 21, 2022 19:10:00").getTime() - new Date("Jun 21, 2022 19:10:00").getTimezoneOffset() * 60000;
//   const countDownDate = new Date("Jun 21, 2022 19:30:00").getTime() - new Date("Jun 21, 2022 19:30:00").getTimezoneOffset() * 60000;

//   const fixNumber = (num: number) => {
//     if (num < 10) {
//       return `0${num}`
//     }
//     return num
//   }

//   const [countDownTimerWL, setCountDownTimerWL] = useState<string | null>(null);
//   const calculateTimer=(distance: any) =>{
//       // Time calculations for days, hours, minutes and seconds
//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // Display the result in the element with id="demo"
//       const timer = fixNumber(days) + ":" + fixNumber(hours) + ":"
//         + fixNumber(minutes) + ":" + fixNumber(seconds);
//         return timer;
//   }

//   useEffect(() => {
//     const countDownInterval = setInterval(() => {
//       const now = new Date().getTime();
//       const distanceWL = countDownWhitelistDate - now

//       // Time calculations for days, hours, minutes and seconds
//       const days = Math.floor(distanceWL / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distanceWL % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distanceWL % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distanceWL % (1000 * 60)) / 1000);

//       // Display the result in the element with id="demo"
//       setCountDownTimerWL(fixNumber(days) + ":" + fixNumber(hours) + ":"
//         + fixNumber(minutes) + ":" + fixNumber(seconds))

//       // If the count down is finished, write some text
//       if (distanceWL < 0) {
//         const distance = countDownDate - now;
//         if(distance < 0){
//           setCountDownTimerWL("PUBLIC MINT IS OPEN");
//         }
//         else if(candyMachine?.state?.isSoldOut){
//         }
//         else{
//           setCountDownTimerWL("WHITELIST MINT  "+ calculateTimer(distance));
//           setshowRemaining(true);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(countDownInterval)
//     }
//   }, [])

//   const refreshCandyMachineState = useCallback(
//     async (commitment: Commitment = 'confirmed') => {
//       if (!anchorWallet) {
//         return;
//       }

//       const connection = new Connection(props.rpcHost, commitment);
//       console.log(props.rpcHost)
//       if (props.candyMachineId) {
//         try {
//           const cndy = await getCandyMachineState(
//             anchorWallet,
//             props.candyMachineId,
//             connection,
//           );
//           let active =
//             cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
//           let presale = false;

//           // duplication of state to make sure we have the right values!
//           let isWLUser = false;
//           let userPrice = cndy.state.price;

//           // whitelist mint?
//           if (cndy?.state.whitelistMintSettings) {
//             // is it a presale mint?
//             if (
//               cndy.state.whitelistMintSettings.presale &&
//               (!cndy.state.goLiveDate ||
//                 cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
//             ) {
//               presale = true;
//             }
//             // is there a discount?
//             if (cndy.state.whitelistMintSettings.discountPrice) {
//               setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
//               userPrice = cndy.state.whitelistMintSettings.discountPrice;
//             } else {
//               setDiscountPrice(undefined);
//               // when presale=false and discountPrice=null, mint is restricted
//               // to whitelist users only
//               if (!cndy.state.whitelistMintSettings.presale) {
//                 cndy.state.isWhitelistOnly = true;
//               }
//             }
//             // retrieves the whitelist token
//             const mint = new anchor.web3.PublicKey(
//               cndy.state.whitelistMintSettings.mint,
//             );
//             const token = (
//               await getAtaForMint(mint, anchorWallet.publicKey)
//             )[0];

//             try {
//               const balance = await connection.getTokenAccountBalance(token);
//               isWLUser = parseInt(balance.value.amount) > 0;
//               // only whitelist the user if the balance > 0
//               setIsWhitelistUser(isWLUser);

//               if (cndy.state.isWhitelistOnly) {
//                 active = isWLUser && (presale || active);
//               }
//             } catch (e) {
//               setIsWhitelistUser(false);
//               // no whitelist user, no mint
//               if (cndy.state.isWhitelistOnly) {
//                 active = false;
//               }
//               // console.log(
//               //   'There was a problem fetching whitelist token balance',
//               // );
//               // console.log(e);
//             }
//           }
//           userPrice = isWLUser ? userPrice : cndy.state.price;

//           if (cndy?.state.tokenMint) {
//             // retrieves the SPL token
//             const mint = new anchor.web3.PublicKey(cndy.state.tokenMint);
//             const token = (
//               await getAtaForMint(mint, anchorWallet.publicKey)
//             )[0];
//             try {
//               const balance = await connection.getTokenAccountBalance(token);

//               const valid = new anchor.BN(balance.value.amount).gte(userPrice);

//               // only allow user to mint if token balance >  the user if the balance > 0
//               setIsValidBalance(valid);
//               active = active && valid;
//             } catch (e) {
//               setIsValidBalance(false);
//               active = false;
//               // no whitelist user, no mint
//               // console.log('There was a problem fetching SPL token balance');
//               // console.log(e);
//             }
//           } else {
//             const balance = new anchor.BN(
//               await connection.getBalance(anchorWallet.publicKey),
//             );
//             const valid = balance.gte(userPrice);
//             setIsValidBalance(valid);
//             active = active && valid;
//           }

//           // datetime to stop the mint?
//           if (cndy?.state.endSettings?.endSettingType.date) {
//             setEndDate(toDate(cndy.state.endSettings.number));
//             if (
//               cndy.state.endSettings.number.toNumber() <
//               new Date().getTime() / 1000
//             ) {
//               active = false;
//             }
//           }
//           // amount to stop the mint?
//           if (cndy?.state.endSettings?.endSettingType.amount) {
//             let limit = Math.min(
//               cndy.state.endSettings.number.toNumber(),
//               cndy.state.itemsAvailable,
//             );
//             if (cndy.state.itemsRedeemed < limit) {
//               setItemsRemaining(limit - cndy.state.itemsRedeemed);
//             } else {
//               setItemsRemaining(0);
//               cndy.state.isSoldOut = true;
//             }
//           } else {
//             setItemsRemaining(cndy.state.itemsRemaining);
//           }

//           if (cndy.state.isSoldOut) {
//             active = false;
//           }

//           const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
//           const collectionPDAAccount = await connection.getAccountInfo(
//             collectionPDA,
//           );

//           setIsActive((cndy.state.isActive = active));
//           setIsPresale((cndy.state.isPresale = presale));
//           setCandyMachine(cndy);

//           const txnEstimate =
//             892 +
//             (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
//             (cndy.state.tokenMint ? 66 : 0) +
//             (cndy.state.whitelistMintSettings ? 34 : 0) +
//             (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
//             (cndy.state.gatekeeper ? 33 : 0) +
//             (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

//           setNeedTxnSplit(txnEstimate > 1230);
//         } catch (e) {
//           if (e instanceof Error) {
//             if (
//               e.message === `Account does not exist ${props.candyMachineId}`
//             ) {
//               // setAlertState({
//               //   open: true,
//               //   message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
//               //   severity: 'error',
//               //   hideDuration: null,
//               // });
//             } else if (
//               e.message.startsWith('failed to get info about account')
//             ) {
//               // setAlertState({
//               //   open: true,
//               //   message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
//               //   severity: 'error',
//               //   hideDuration: null,
//               // });
//             }
//           } else {
//             setAlertState({
//               open: true,
//               message: `${e}`,
//               severity: 'error',
//               hideDuration: null,
//             });
//           }
//           console.log(e);
//         }
//       } else {
//         setAlertState({
//           open: true,
//           message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
//           severity: 'error',
//           hideDuration: null,
//         });
//       }
//     },
//     [anchorWallet, props.candyMachineId, props.rpcHost],
//   );

//   const onMint = async (
//     beforeTransactions: Transaction[] = [],
//     afterTransactions: Transaction[] = [],
//   ) => {
//     try {
//       setIsUserMinting(true);
//       document.getElementById('#identity')?.click();
//       if (wallet.connected && candyMachine?.program && wallet.publicKey) {
//         let setupMint: SetupState | undefined;
//         if (needTxnSplit && setupTxn === undefined) {
//           setAlertState({
//             open: true,
//             message: 'Please sign account setup transaction',
//             severity: 'info',
//           });
//           setupMint = await createAccountsForMint(
//             candyMachine,
//             wallet.publicKey,
//           );
//           let status: any = { err: true };
//           if (setupMint.transaction) {
//             status = await awaitTransactionSignatureConfirmation(
//               setupMint.transaction,
//               props.txTimeout,
//               props.connection,
//               true,
//             );
//           }
//           if (status && !status.err) {
//             setSetupTxn(setupMint);
//             setAlertState({
//               open: true,
//               message:
//                 'Setup transaction succeeded! Please sign minting transaction',
//               severity: 'info',
//             });
//           } else {
            
//             setIsUserMinting(false);
//             return;
//           }
//         } else {
//           setAlertState({
//             open: true,
//             message: 'Please sign minting transaction',
//             severity: 'info',
//           });
//         }

//         let mintResult = await mintOneToken(
//           candyMachine,
//           wallet.publicKey,
//           beforeTransactions,
//           afterTransactions,
//           setupMint ?? setupTxn,
//         );

//         let status: any = { err: true };
//         let metadataStatus = null;
//         if (mintResult) {
//           status = await awaitTransactionSignatureConfirmation(
//             mintResult.mintTxId,
//             props.txTimeout,
//             props.connection,
//             true,
//           );

//           metadataStatus =
//             await candyMachine.program.provider.connection.getAccountInfo(
//               mintResult.metadataKey,
//               'processed',
//             );
//           // console.log('Metadata status: ', !!metadataStatus);
//         }

//         if (status && !status.err && metadataStatus) {
//           // manual update since the refresh might not detect
//           // the change immediately
//           let remaining = itemsRemaining! - 1;
//           setItemsRemaining(remaining);
//           setIsActive((candyMachine.state.isActive = remaining > 0));
//           candyMachine.state.isSoldOut = remaining === 0;
//           setSetupTxn(undefined);
//           setAlertState({
//             open: true,
//             message: 'Congratulations! Mint succeeded!',
//             severity: 'success',
//             hideDuration: 7000,
//           });
//           refreshCandyMachineState('processed');
//         } else if (status && !status.err) {
          
//           refreshCandyMachineState();
//         } else {
          
//           refreshCandyMachineState();
//         }
//       }
//     } catch (error: any) {
//       let message = error.msg || '';
//       if (!error.msg) {
//         if (!error.message) {
//           message = 'Transaction timeout! Please try again.';
//         } else if (error.message.indexOf('0x137')) {
          
//         } else if (error.message.indexOf('0x135')) {
//           message = `Insufficient funds to mint. Please fund your wallet.`;
//         }
//       } else {
//         if (error.code === 311) {
          
//           window.location.reload();
//         } else if (error.code === 312) {
//           message = `Minting period hasn't started yet.`;
//         }
//       }

//       // setAlertState({
//       //   open: true,
//       //   message,
//       //   severity: 'error',
//       // });
//       // updates the candy machine state to reflect the latest
//       // information on chain
//       refreshCandyMachineState();
//     } finally {
//       setIsUserMinting(false);
//     }
//   };

//   const toggleMintButton = () => {
//     let active = !isActive || isPresale;

//     if (active) {
//       if (candyMachine!.state.isWhitelistOnly && !isWhitelistUser) {
//         active = false;
//       }
//       if (endDate && Date.now() >= endDate.getTime()) {
//         active = false;
//       }
//     }

//     if (
//       isPresale &&
//       candyMachine!.state.goLiveDate &&
//       candyMachine!.state.goLiveDate.toNumber() <= new Date().getTime() / 1000
//     ) {
//       setIsPresale((candyMachine!.state.isPresale = false));
//     }

//     setIsActive((candyMachine!.state.isActive = active));
//   };

//   useEffect(() => {
//     refreshCandyMachineState();
//   }, [
//     anchorWallet,
//     props.candyMachineId,
//     props.connection,
//     refreshCandyMachineState,
//   ]);

//   useEffect(() => {
//     (function loop() {
//       setTimeout(() => {
//         refreshCandyMachineState();
//         loop();
//       }, 20000);
//     })();
//   }, [refreshCandyMachineState]);

//   return (
//     <>
//     <Wrapper>
//       <Header />
//       <Content>
//       <Container maxWidth="xs" style={{ position: 'relative', paddingBottom: '40px' }}>
//         <Timer>
//             {countDownTimerWL}
//         </Timer>
//         <Paper
//           style={{
//             backgroundColor: 'transparent',
//             border: 0,
//             boxShadow: 'none',
//           }}
//         >
//           {!wallet.connected ? (
//             <ConnectButton>Connect Wallet</ConnectButton>
//           ) : (
//             <>
//               <Paper
//                 style={{
//                   padding: 24,
//                   paddingBottom: 10,
//                   backgroundColor: '#151A1F',
//                   borderRadius: 6,
//                 }}
//               >
//                 {candyMachine && (
//                   <Grid
//                     container
//                     direction="row"
//                     justifyContent="center"
//                     wrap="nowrap"
//                   >
//                     <Grid item xs={3} style={{
//                       padding: '20px 0px 30px',
//                     }}>
//                       <Typography variant="body2" color="textSecondary">
//                         Remaining
//                       </Typography>
//                       <Typography
//                         variant="h6"
//                         color="textPrimary"
//                         style={{
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         {`${itemsRemaining}/5717`}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={3}  style={{
//                       padding: '20px 0px 30px',
//                     }}>
//                       <Typography variant="body2" color="textSecondary">
//                         {isWhitelistUser && discountPrice
//                           ? 'Discount Price'
//                           : 'Price'}
//                       </Typography>
//                       <Typography
//                         variant="h6"
//                         color="textPrimary"
//                         style={{ fontWeight: 'bold' }}
//                       >
//                         {isWhitelistUser && discountPrice
//                           ? `◎ ${formatNumber.asNumber(discountPrice)}`
//                           : `◎ ${formatNumber.asNumber(
//                               candyMachine.state.price,
//                             )}`}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} style={{
//                       padding: '10px 10px 30px',
//                       marginRight:'20px'
//                     }}>
//                       <MintContainer>
//                 {candyMachine?.state.isActive &&
//                 candyMachine?.state.gatekeeper &&
//                 wallet.publicKey &&
//                 wallet.signTransaction ? (
//                   <GatewayProvider
//                     wallet={{
//                       publicKey:
//                         wallet.publicKey ||
//                         new PublicKey(CANDY_MACHINE_PROGRAM),
//                       //@ts-ignore
//                       signTransaction: wallet.signTransaction,
//                     }}
//                     gatekeeperNetwork={
//                       candyMachine?.state?.gatekeeper?.gatekeeperNetwork
//                     }
//                     clusterUrl={rpcUrl}
//                     cluster={cluster}
//                     handleTransaction={async (transaction: Transaction) => {
//                       setIsUserMinting(true);
//                       const userMustSign = transaction.signatures.find(sig =>
//                         sig.publicKey.equals(wallet.publicKey!),
//                       );
//                       if (userMustSign) {
//                         setAlertState({
//                           open: true,
//                           message: 'Please sign one-time Civic Pass issuance',
//                           severity: 'info',
//                         });
//                         try {
//                           transaction = await wallet.signTransaction!(
//                             transaction,
//                           );
//                         } catch (e) {
//                           setAlertState({
//                             open: true,
//                             message: 'User cancelled signing',
//                             severity: 'error',
//                           });
//                           // setTimeout(() => window.location.reload(), 2000);
//                           setIsUserMinting(false);
//                           throw e;
//                         }
//                       } else {
//                         setAlertState({
//                           open: true,
//                           message: 'Refreshing Civic Pass',
//                           severity: 'info',
//                         });
//                       }
//                       try {
//                         await sendTransaction(
//                           props.connection,
//                           wallet,
//                           transaction,
//                           [],
//                           true,
//                           'confirmed',
//                         );
//                         setAlertState({
//                           open: true,
//                           message: 'Please sign minting',
//                           severity: 'info',
//                         });
//                       } catch (e) {
//                         setAlertState({
//                           open: true,
//                           message:
//                             'Solana dropped the transaction, please try again',
//                           severity: 'warning',
//                         });
//                         console.error(e);
//                         // setTimeout(() => window.location.reload(), 2000);
//                         setIsUserMinting(false);
//                         throw e;
//                       }
//                       await onMint();
//                     }}
//                     broadcastTransaction={false}
//                     options={{ autoShowModal: false }}
//                   >
//                     <MintButton
//                       candyMachine={candyMachine}
//                       isMinting={isUserMinting}
//                       setIsMinting={val => setIsUserMinting(val)}
//                       onMint={onMint}
//                       isActive={
//                         countDownTimerWL!=null &&
//                         countDownTimerWL.toLowerCase().includes("mint")
//                       }
//                     />
//                   </GatewayProvider>
//                 ) : (
//                   <MintButton
//                     candyMachine={candyMachine}
//                     isMinting={isUserMinting}
//                     setIsMinting={val => setIsUserMinting(val)}
//                     onMint={onMint}
//                     isActive={
//                       countDownTimerWL!=null && 
//                       countDownTimerWL.toLowerCase().includes("mint")
//                     }
//                   />
//                 )}
//               </MintContainer>
//                     </Grid>
//                   </Grid>
//                 )}
              
//               </Paper>
//             </>
//           )}
//         </Paper>
//       </Container>

//       <Snackbar
//         open={alertState.open}
//         autoHideDuration={
//           alertState.hideDuration === undefined ? 6000 : alertState.hideDuration
//         }
//         onClose={() => setAlertState({ ...alertState, open: false })}
//       >
//         <Alert
//           onClose={() => setAlertState({ ...alertState, open: false })}
//           severity={alertState.severity}
//         >
//           {alertState.message}
//         </Alert>
//       </Snackbar>
//       <Image src={'/images/mint-pyramid.png'} />
//       </Content>
//     </Wrapper>

//     </>
//   );
// };

// const getCountdownDate = (
//   candyMachine: CandyMachineAccount,
// ): Date | undefined => {
//   if (
//     candyMachine.state.isActive &&
//     candyMachine.state.endSettings?.endSettingType.date
//   ) {
//     return toDate(candyMachine.state.endSettings.number);
//   }

//   return toDate(
//     candyMachine.state.goLiveDate
//       ? candyMachine.state.goLiveDate
//       : candyMachine.state.isPresale
//       ? new anchor.BN(new Date().getTime() / 1000)
//       : undefined,
//   );
// };
// const Wrapper = styled.div`
//   padding-top: 40px;

//   @media screen and (max-width: 767px) {
//     padding: 0;
//   }
// `
// const Content = styled.div`
//   position: absolute;
//   top: 56%;
//   max-width: 800px;
//   width: 100%;
//   left: calc(50% - 400px);
//   text-align: center;

//   @media screen and (max-width: 1200px) {
//     top: 45%;
//   }

//   @media screen and (max-width: 880px) {
//     top: 60%;
//   }
  
//   @media screen and (max-width: 800px) {
//     max-width: 500px;
//     left: calc(50% - 250px);
//   }


//   @media screen and (max-width: 600px) {
//     width: 100%;
//     max-width: 100%;
//     left: 0;
//     top: 54%;
//     padding-top: 40px;
//   }
//   @media screen and (max-width: 500px) {
//     top: 45%;
//   }

//   @media screen and (max-width: 380px) {
//     top: 43%;
//   }
// `

// const Timer = styled.div`
//   color: #FFFFFF;
//   font-size: 90px;
//   font-family: 'American Captain';
//   width: 100%;

//   @media screen and (max-width: 767px) {
//     padding: 0 20px;
//     font-size: 70px;
//   }
// `
// const Image = styled.img`
//   width: 100%;
//   max-width: 400px;
//   position: absolute;
//   right: -200px;
//   bottom: -50px;

//   @media screen and (max-width: 880px) {
//     right: calc(50% - 200px);
//     max-width: 400px;
//     bottom: calc(150% - 40px);
//   }

//   @media screen and (max-width: 767px) {
//     right: calc(50% - 100px);
//     max-width: 200px;
//     bottom: calc(130% - 40px);
//   }


//   @media screen and (max-width: 380px) {
//     right: calc(50% - 100px);
//     max-width: 200px;
//     bottom: calc(120% - 40px);
//   }
// `

// const Mints = styled.div`
//   color: #FFFFFF;
//   font-size: 60px;
//   font-family: 'American Captain';

//   @media screen and (max-width: 767px) {
//     font-size: 40px;
//   }
// `
// export default Home;
export {}
