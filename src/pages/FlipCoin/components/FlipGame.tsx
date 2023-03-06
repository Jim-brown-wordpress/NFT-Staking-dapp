import styled, {
  createGlobalStyle,
  css,
  keyframes,
} from 'styled-components';
import colors from '../../../styles/colors';
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
// import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useEffect, useState, useRef } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import fetch from 'cross-fetch';
import Stats from './Stats';
import { useNavigate } from 'react-router-dom';
import FlipStats from 'components/Flip-Stats';
import { BackgroundTitle } from 'components/Home';
import Footer from 'components/Footer';
import fonts from 'styles/fonts';
import {useMediaQuery} from '@mui/material'

import CoinFlipVideo from '../../../assets/video/coin-flip.mp4';


const GlobalStyles = createGlobalStyle`
  body {
    transition: background-color .5s;
    overflow-y: scroll !important;
  }

  * {
    transition: all .5s;
  }
`;

const FlipGame = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  console.log(isMobile);

  const [startGame, setStartGame] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [bet, setBet] = useState<number | null>(null);
  const [preparing, setPreparing] = useState<boolean>(false);
  const [startingGame, setStartingGame] = useState<boolean>(false);
  const [finalMessage, setFinalMessage] = useState<any>(null);
  const [count, setCount] = useState<string>('0');
  const [balance, setBalance] = useState<number | null>(null);
  const [openStats, setOpenStats] = useState<boolean>(false)
  const wallet = useWallet();
  const { connection } = useConnection();

  let videoRef = useRef<HTMLVideoElement>(null);

  const playGame = selectedType && bet && !startGame && wallet.publicKey &&
    (balance || 0) >= 0.05 && !startingGame

  const [stats, setStats] = useState<any>([]);
  const refreshStats = () => {
    fetch('https://games-api-five.vercel.app/api/coin-game/stats?blockchain=SOL', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then((res: any) => {
        return res.json();
      })
      .then((result: any) => {
        setStats(result?.games || []);
      });
  };

  useEffect(() => {

    if (wallet) {
      refreshStats();

      (async () => {
        if (wallet.publicKey) {
          const balance = await connection.getBalance(wallet.publicKey);
          setBalance(balance / 1000000000);
        }
      })();
    }
  }, [wallet]);

  useEffect(() => {
    if(videoRef.current != null) {
      if(preparing || startGame){
        videoRef.current.play();
      }
      else {
        videoRef.current.pause();
      }
    }
  } , [preparing || startGame]);

  const playTheGame = async () => {
    if (!wallet.publicKey) {
      wallet.disconnect();
      return;
    }

    setPreparing(true);
    const blockhash = await connection.getLatestBlockhash('finalized');

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey('5qXbrmKb7RW1okFUFQA1e5JdTLCQMHGV9kKrnDAfsDkD'),
        lamports: 1000000000 * (bet || 0.1)
      })
      // toPubkey: new PublicKey('64AGj5PCKjfaXt3KqiTny2Az4QEppAD3mZYuz2snXZY'),
    );

    transaction.recentBlockhash = blockhash.blockhash;
    transaction.feePayer = wallet.publicKey;

    let rawTransaction: any;
    if (wallet.signTransaction) {
      try {
        rawTransaction = await wallet.signTransaction(transaction);
      } catch (e) {
        // wallet.disconnect()
        setPreparing(false);
        return;
      }
    }

    if (balance && bet && balance >= bet) {
      fetch('https://games-api-five.vercel.app/api/coin-game', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wallet: wallet.publicKey.toString(),
          bet: selectedType,
          amount: bet,
          rawTransaction: rawTransaction.serialize()
        })
      })
        .then((res) => {
          return res.json();
        })
        .then(async (result) => {
          if (result.won === undefined) {
            setPreparing(false)
            return
          }
          if (result.won) {
            setStartingGame(true);
            setPreparing(false);
            setTimeout(() => {
              if (selectedType === 'HEADS') {
                setCount('3960');
                console.log('User is winning, heads');
              } else {
                setCount('4140');
                console.log('User is winning, tails');
              }

              setStartingGame(false);
              setStartGame(true);
              setTimeout(async () => {
                refreshStats();
                setFinalMessage({
                  won: true
                });
                if (wallet.publicKey) {
                  const balance = await connection.getBalance(wallet.publicKey);
                  setBalance(balance / 1000000000);
                }
              }, 3000);
            }, 1000);
          } else {
            setStartingGame(true);
            setPreparing(false);
            setTimeout(() => {
              if (selectedType === 'HEADS') {
                setCount('4140');
                console.log('User is NOT winning, tails');
              } else {
                setCount('3960');
                console.log('User is NOT winning, heads');
              }
              setStartingGame(false);
              setStartGame(true);
              setTimeout(async () => {
                refreshStats();
                setFinalMessage({
                  won: false
                });
                if (wallet.publicKey) {
                  const balance = await connection.getBalance(wallet.publicKey);
                  setBalance(balance / 1000000000);
                }
              }, 3000);
            }, 1000);
          }
        }).catch(() => {
          setPreparing(false)
        });
    } else {
      setPreparing(false)
    }
  };

  return (
    <TopWrapper>
      <GlobalStyles />
      {/* <DisconnectWrapper>
        {wallet.publicKey ? <WalletDisconnectButton /> : null}
      </DisconnectWrapper> */}
      {openStats ?
        <BackgroundTitle src='/images/flip-coin/new/statistics-background-title.svg' alt='Statistics' $order={'statistics'}/>
        :
        <BackgroundTitle src='/images/flip-coin/new/background-title.svg' alt='Flip Coin' $order={'flip-coin'} />
      }
      {openStats && <FlipStats blockchain='SOL' openStats={setOpenStats} />}
      <OuterContainer  style = {{ display: isTablet? 'block':'' , marginTop:  '50px'}}>
        <MainCointainer $openStats={openStats}>
          <CoinsWrapper>
            {
              preparing || startGame?
                <video src = {CoinFlipVideo} loop muted ref = {videoRef}  style = {{
                  position: 'fixed',
                  zIndex: 5,
                  top: isMobile? '50px':0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: 'auto',
                  backfaceVisibility: 'hidden',
                }} />
                :
                <Coins $animate={startGame} $count={count}>
                  <FrontCoin
                    $start={startGame}
                    src='/images/flip-coin/new/coin.svg'
                  />
                  <BackCoin
                    $start={startGame}
                    src='/images/flip-coin/new/back.png'
                  />
                </Coins>
            }
          </CoinsWrapper>
          <div>
            <ConnectButton $activate={wallet.publicKey}>
              <ConnectAndPlayButton>Connect wallet & play</ConnectAndPlayButton>
            </ConnectButton>
            <PlayWrapper
              $activate={wallet.publicKey}
              $moveOut={preparing || startingGame || startGame}

            >
              <PlayLabel>I LIKE</PlayLabel>
              <PlayRow>
                <Button
                  $selected={selectedType === 'HEADS'}
                  onClick={() => {
                    if (selectedType === 'HEADS') {
                      setSelectedType(null);
                    } else {
                      setSelectedType('HEADS');
                    }
                  }}
                >
                  HEADS
                </Button>
                <Button
                  $selected={selectedType === 'TAILS'}
                  onClick={() => {
                    if (selectedType === 'TAILS') {
                      setSelectedType(null);
                    } else {
                      setSelectedType('TAILS');
                    }
                  }}
                >
                  TAILS
                </Button>
              </PlayRow>
              <PlayLabel>FOR</PlayLabel>
              <PlayRow>
                <Button
                  $amount
                  $selected={bet === 0.05}
                  onClick={() => {
                    if (bet === 0.05) {
                      setBet(null);
                    } else {
                      setBet(0.05);
                    }
                  }}
                >
                  0.05 <span>SOL</span>
                </Button>
                <Button
                  $amount
                  $selected={bet === 0.1}
                  onClick={() => {
                    if (bet === 0.1) {
                      setBet(null);
                    } else {
                      setBet(0.1);
                    }
                  }}
                >
                  0.1 <span>SOL</span>
                </Button>
                <Button
                  $amount
                  $selected={bet === 0.25}
                  onClick={() => {
                    if (bet === 0.25) {
                      setBet(null);
                    } else {
                      setBet(0.25);
                    }
                  }}
                >
                  0.25 <span>SOL</span>
                </Button>
              </PlayRow>
              <PlayRow>
                <Button
                  $amount
                  $selected={bet === 0.5}
                  onClick={() => {
                    if (bet === 0.5) {
                      setBet(null);
                    } else {
                      setBet(0.5);
                    }
                  }}
                >
                  0.5 <span>SOL</span>
                </Button>
                <Button
                  $amount
                  $selected={bet === 1}
                  onClick={() => {
                    if (bet === 1) {
                      setBet(null);
                    } else {
                      setBet(1);
                    }
                  }}
                >
                  1 <span>SOL</span>
                </Button>
                <Button
                  $amount
                  $selected={bet === 2}
                  onClick={() => {
                    if (bet === 2) {
                      setBet(null);
                    } else {
                      setBet(2);
                    }
                  }}
                >
                  2 <span>SOL</span>
                </Button>
              </PlayRow>
                <Button $flip $preparing={preparing} onClick={playTheGame} disabled={selectedType === null || bet === null}  >
                  {preparing ? 'Preparing...' : 'Flip'}
                </Button>
            </PlayWrapper>
            <FinalMessage $show={finalMessage && wallet.publicKey}>
              {finalMessage ? (
                <p>
                  {finalMessage.won
                    ? `Congrats! You won ${bet}SOL`
                    : `Better luck next time!`}
                </p>
              ) : null}
              {finalMessage ? (
                <Button
                  onClick={() => {
                    setStartGame(false);
                    setFinalMessage(null);
                  }}
                >
                  Play again
                </Button>
              ) : null}
            </FinalMessage>
          </div>
        </MainCointainer>
        <Stats wallet={wallet.publicKey} stats={stats} openStats={setOpenStats} hide={openStats || !wallet.publicKey} sol  />
      </OuterContainer>
      <Footer />
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  height: 100%;
  position: relative;
`
const OuterContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
`;

const MainCointainer = styled.div<any>`
  max-width: 600px;
  margin: 10% auto;
  text-align: center;
  position: relative;
  height: 100%;

  // @media screen and (max-width: 1000px) {
  //   overflow-y: scroll;
  // }

  ${({ $openStats }) => $openStats && `
    display: none;
  `}
`;

const FlipLabel = styled.img`
  margin: 40px 0;
  max-width: 150px;
  width: 100%;
`;
const flip = ($count: string) => keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(${$count}deg);
  }
`;

const CoinsWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const Coins = styled.div<any>`
  position: absolute;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: all 0.5s ease;

  ${({ $animate, $count }) =>
    $animate &&
    css`
      animation: ${flip($count)} 2s forwards;
    `}
`;

const FrontCoin = styled.img<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  backface-visibility: hidden;
`;

const BackCoin = styled.img<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  backface-visibility: hidden;
  transform: rotateX(180deg);
`;

export const Button = styled.button<any>`
  background: transparent;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  color: ${colors.white};
  font-size: 18px;
  padding: 10px 20px;
  line-height: 22px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  font-family: ${fonts.HelveticaBold};

  &:hover {
    background: ${colors.purple};
  }

  & > span {
    font-size: 10px;
  }

  ${({ $activate }) =>
    $activate &&
    `
    transform: translateY(100px);
    opacity: 0;
  `}

  ${({ $selected }) =>
    $selected &&
    `
    background: ${colors.purple};
    color: #fff;
  `}

  ${({ $amount }) =>
    !$amount &&
    `
    min-width: 90px;
  `}

  ${({ $amount }) =>
    $amount &&
    `
    width: 25%;
    padding 3px 0;
    font-size: 17px;
  `}

  ${({ $flip }) => $flip && `
    box-shadow: 0px 3px 30px #00000029;
    mix-blend-mode: overlay;
    border-radius: 10px;
    min-width: 320px;

    &:disabled {
      cursor: not-allowed;
      background: #172844;
      border: none;
    }
  `}

  @media screen and (max-width: 1000px) {
    z-index: 700;
  }

  @media screen and (max-width: 600px) {
    // display: none;
  }
`;

const PlayWrapper = styled.div<any>`
  opacity: 0;
  transition: all 0.5s;
  transform: translateY(0);
  position: relative;
  z-index: 999;
  width: 350px;
  padding: 80px 20px 0;
  margin: 0 auto;

  ${({ $activate }) =>
    $activate &&
    `
    opacity: 1;
    transform: translateY(-170px);
  `}

  ${({ $moveOut }) =>
    $moveOut &&
    `
    opacity: 0;
    transform: translateY(0);
  `}
  @media screen and (max-width: 600px) {
    // display: none
  }
`;

const ConnectButton = styled.div<any>`
  margin-top: 60px;

  ${({ $activate }) =>
    $activate &&
    `
    transform: translateY(100px);
    opacity: 0;
  `}
`;

const PlayRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PlayLabel = styled.p`
  margin-bottom: 3px;
  font-size: 12px;
  color: #fff;
`;

const PlayButton = styled(Button)`
  position: absolute;
  top: 103%;
  left: calc(50% - 45px);
  font-size: 22px;
  padding: 15px 20px;
  z-index: 9999;

  ${({ $preparing }: any) =>
    $preparing &&
    `
    left: calc(50% - 75px);
  `}
`;

const ConnectAndPlayButton = styled(WalletMultiButton)`
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  background: transparent;
  color: ${colors.white};
  font-size: 22px;
  padding: 12px 20px;
  line-height: 22px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  margin: 0 auto;
  font-family: ${fonts.HelveticaRegular};

  &:hover {
    background: ${colors.purple};
  }


`;

const DisconnectWrapper = styled.div`
  display: inline-block;
  float: right;
  padding: 20px;

  & > button {
    background-color: #6337f4;

    &:hover {
      background-color: #fff !important;
      color: #000;
    }
  }

  @media screen and (max-width: 1000px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    padding: 5px;

    & > button {
      padding: 0 7px;
      font-size: 12px;
      height: 38px;
    }
  }
`;

const FinalMessage = styled.div<any>`
  color: #fff;
  opacity: 0;
  transform: translateY(0);
  z-index: 801;
  position: relative;

  & > p {
    font-size: 22px;
  }

  ${({ $show }) =>
    $show &&
    `
    opacity: 1;
    transform: translateY(-430px);
  `}
`;

export default FlipGame;


// height: 100vh;
// position: relative;
// display: flex;
// align-items: center;
// justify-content: space-between;
// flex-direction: column;
