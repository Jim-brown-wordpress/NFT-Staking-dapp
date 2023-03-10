import styled, { createGlobalStyle, css, keyframes } from 'styled-components'
import colors from '../../../styles/colors';
import { useEffect, useState, useRef } from 'react';
import fetch from 'cross-fetch'
import Stats from '../../FlipCoin/components/Stats';
import { useGetAccountInfo, useTrackTransactionStatus } from '@elrondnetwork/dapp-core/hooks';
import { logout, refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { useNavigate } from "react-router-dom";
import { routeNames } from 'routes';
import FlipStats from 'components/Flip-Stats';
import { BackgroundTitle } from 'components/Home';
import fonts from 'styles/fonts';
import { useMediaQuery } from '@mui/material';

import CoinFlipVideo from '../../../assets/video/coin-flip.mp4';

import { conflipServerURl } from 'config';
import axios from 'axios'

const GlobalStyles = createGlobalStyle`
  body {
    transition: background-color .5s;
    overflow-y: scroll !important;
  }

  * {
    transition: all .5s;
  }
`

const FlipGame = () => {
  const { address, account } = useGetAccountInfo()
  const navigate = useNavigate()
  const [startGame, setStartGame] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [bet, setBet] = useState<number | null>(null)
  const [preparing, setPreparing] = useState<boolean>(false)
  const [startingGame, setStartingGame] = useState<boolean>(false)
  const [finalMessage, setFinalMessage] = useState<any>(null)
  const [sendRequest, setSendRequest] = useState<boolean>(false)
  const [count, setCount] = useState<string>("0")
  const [openStats, setOpenStats] = useState<boolean>(false)

  const [stats, setStats] = useState<any>([])
  const [sessionID, setSessionID] = useState<string>('')

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  let videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const refreshStats = async () => {
    console.log('refreshStte');
    // fetch('https://games-api-five.vercel.app/api/coin-game/stats?blockchain=EGLD', {
    try {


      const result = await axios.get(`${conflipServerURl}/api/coin-game/stats?blockchain=EGLD`)
      console.log(result);
      setStats(result.data?.games || [])

    } catch {
      console.log('err');
    }
    // .then((res: any) => {
    //   console.log('res.json(): ' ,res.json());
    //   return res.json()
    // }).then((result: any) => {
    //   console.log(result);
    //   setStats(result?.games || [])
    // })
    // .catch(err => console.log(err));
    // console.log(result)

  }

  const playTheFlipGame = async (trStatus: any) => {
    if (trStatus?.transactions?.[0]) {
      setSendRequest(true)

      // fetch('https://games-api-five.vercel.app/api/coin-game/elrond', {
      console.log(trStatus.transactions);
      try {
        setIsPlay(true);
        const res = await axios.post(`${conflipServerURl}/api/coin-game/elrond`, {
          wallet: address,
          bet: selectedType,
          amount: bet,
          transaction: trStatus.transactions[0]
        },
          {
            headers: { 'content-type': 'application/json' }
          }

        );
        if (res.data.won) {
          setStartingGame(true)
          setPreparing(false)
          setTimeout(() => {
            if (selectedType === 'HEADS') {
              setCount("3960")
              console.log('User is winning, heads')
            } else {
              setCount("4140")
              console.log('User is winning, tails')
            }
            setStartingGame(false)
            setStartGame(true)
            setTimeout(() => {
              refreshStats()
              setFinalMessage({
                won: true
              })
              refreshAccount()
              setSessionID('')
              setSendRequest(false)
            }, 3000)

          }, 1000)
        } else {
          // setIsPlay(true);
          setStartingGame(true)
          setPreparing(false)
          setTimeout(() => {
            if (selectedType === 'HEADS') {
              setCount("4140")
              console.log('User is NOT winning, tails')
            } else {
              setCount("3960")
              console.log('User is NOT winning, heads')
            }
            setStartingGame(false)
            setStartGame(true)
            setTimeout(() => {
              refreshStats()
              setFinalMessage({
                won: false
              })
              refreshAccount()
              setSessionID('')
              setSendRequest(false)
            }, 3000)
          }, 1000)
        }
      } catch {
        console.log('error in coin flip');
      }


    }
  }

  const transactionStatus = useTrackTransactionStatus({
    transactionId: sessionID,
    onSuccess: () => {
      console.log('onSuccess')
    },
    onFail: () => {
      console.log('onfail')
      setPreparing(false)
    },
    onCancelled: () => {
      console.log('onCancel')
      setPreparing(false)
    },
  });

  useEffect(() => {
    console.log(transactionStatus, sessionID);
    if (transactionStatus?.status === 'signed' && !sendRequest) {
      playTheFlipGame(transactionStatus)
    }
  }, [transactionStatus, sendRequest])

  useEffect(() => {
    if (address) {
      refreshStats()
    }
  }, [address])

  useEffect(() => {
    console.log(isPlay);
    if (videoRef.current != null) {
      if (isPlay) {
        console.log('playing');
        // setIsPlay(true);
        videoRef.current.play();
      }
      else {
        // if(isPlay){
        // setIsPlay(false);
        videoRef.current.pause();
        // }
      }
    }
  }, [isPlay]);
  const playTheGame = async () => {
    if (!address) throw new Error('no wallet');

    setPreparing(true)
    const txHash = await sendTransactions({
      transactions: [
        {
          value: `${(bet || 0) * 1000000000000000000}`,
          data: 'Flip coin',
          receiver: 'erd10zemyy2hnlh93wxd7sxz0z5p6e5u42wmqdrvka8jf293r6yjk4asfk7mv9'
        },
      ],
      // signWithoutSending: true
    },);
    const { sessionId } = txHash;
    console.log(sessionId, txHash);
    setSessionID(sessionId)
  }

  return (
    <TopWrapper>
      <GlobalStyles />
      {openStats ?
        <BackgroundTitle src='/images/flip-coin/new/statistics-background-title.svg' alt='Statistics' $order={'statistics'} />
        :
        <BackgroundTitle src='/images/flip-coin/new/background-title.svg' alt='Flip Coin' $order={'flip-coin'} />
      }
      {openStats && <FlipStats blockchain='EGLD' openStats={setOpenStats} />}
      <OuterContainer style={{ display: isTablet ? 'block' : '', marginTop: '50px' }}>
        <MainCointainer $openStats={openStats}>
          <CoinsWrapper>
            {
              (isPlay) && !finalMessage ?
                <video src={CoinFlipVideo} loop muted ref={videoRef} style={{
                  position: 'fixed',
                  zIndex: 5,
                  top: isMobile ? '200px' : 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: 'auto',
                  backfaceVisibility: 'hidden',
                }} />
                :

                <Coins $animate={startGame} $count={count}>
                  <FrontCoin $start={startGame} src="/images/flip-coin/new/ndo-coin.svg" />
                  <BackCoin $start={!preparing} src="/images/flip-coin/new/back.png" />
                </Coins>

            }

          </CoinsWrapper>
          <div>
            <ConnectButton $activate={address}>
              <ConnectAndPlayButton onClick={() => { navigate(routeNames.flipUnlock) }}>Connect wallet & play</ConnectAndPlayButton>
            </ConnectButton>
            <PlayWrapper $activate={address} $moveOut={preparing || startingGame || startGame}>
              <PlayLabel>I LIKE</PlayLabel>
              <PlayRow>
                <Button $selected={selectedType === 'HEADS'} onClick={() => {
                  if (selectedType === 'HEADS') {
                    setSelectedType(null)
                  } else {
                    setSelectedType('HEADS')
                  }
                }}>HEADS</Button>
                <Button $selected={selectedType === 'TAILS'} onClick={() => {
                  if (selectedType === 'TAILS') {
                    setSelectedType(null)
                  } else {
                    setSelectedType('TAILS')
                  }
                }}>TAILS</Button>
              </PlayRow>
              <PlayLabel>FOR</PlayLabel>
              <PlayRow>
                <Button $amount $selected={bet === 0.05} onClick={() => {
                  if (bet === 0.05) {
                    setBet(null)
                  } else {
                    setBet(0.05)
                  }
                }}>0.05 <span>EGLD</span></Button>
                <Button $amount $selected={bet === 0.1} onClick={() => {
                  if (bet === 0.1) {
                    setBet(null)
                  } else {
                    setBet(0.1)
                  }
                }}>0.1 <span>EGLD</span></Button>
                <Button $amount $selected={bet === 0.25} onClick={() => {
                  if (bet === 0.25) {
                    setBet(null)
                  } else {
                    setBet(0.25)
                  }
                }}>0.25 <span>EGLD</span></Button>
              </PlayRow>
              <PlayRow>
                <Button $amount $selected={bet === 0.5} onClick={() => {
                  if (bet === 0.5) {
                    setBet(null)
                  } else {
                    setBet(0.5)
                  }
                }}>0.5 <span>EGLD</span></Button>
                <Button $amount $selected={bet === 1} onClick={() => {
                  if (bet === 1) {
                    setBet(null)
                  } else {
                    setBet(1)
                  }
                }}>1 <span>EGLD</span></Button>
                <Button $amount $selected={bet === 2} onClick={() => {
                  if (bet === 2) {
                    setBet(null)
                  } else {
                    setBet(2)
                  }
                }}>2 <span>EGLD</span></Button>
              </PlayRow>
              {account?.balance &&
                <Button $flip onClick={playTheGame} disabled={!selectedType || !bet} >{preparing ? 'Preparing...' : 'Flip'}</Button>
              }
            </PlayWrapper>
            <FinalMessage $show={finalMessage && address}>
              {finalMessage ? (
                <p>{finalMessage.won ? `Congrats! You won ${bet}EGLD` : `Better luck next time!`}</p>
              ) : null}
              {finalMessage ? (
                <Button onClick={() => {
                  setStartGame(false)
                  setIsPlay(false);
                  setFinalMessage(null)

                }}>Play again</Button>
              ) : null}
            </FinalMessage>
          </div>
        </MainCointainer>
        <Stats wallet={address} stats={stats} openStats={setOpenStats} hide={openStats || !address} />
      </OuterContainer>
    </TopWrapper>
  )
}

const TopWrapper = styled.div`
  height: 100%;
  position: relative;
`

const OuterContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;

`

const MainCointainer = styled.div<any>`
  max-width: 600px;
  margin: 10% auto;
  text-align: center;
  position: relative;
  height: 100%;

  @media screen and (max-width: 1000px) {
    overflow-y: hidden;
  }

  ${({ $openStats }) => $openStats && `
    display: none;
  `}
`

const FlipLabel = styled.img`
  margin: 40px 0;
  max-width: 150px;
  width: 100%;
`
const flip = ($count: string) => keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(${$count}deg);
  }
`

const CoinsWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`

const Coins = styled.div<any>`
  position: absolute;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: all .5s ease;

  ${({ $animate, $count }) => $animate && css`
    animation: ${flip($count)} 0s forwards;
  `}
`

const FrontCoin = styled.img<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  backface-visibility: hidden;
`

const BackCoin = styled.img<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  backface-visibility: hidden;
  transform: rotateX(180deg);
`

export const Button = styled.button<any>`
  color: ${colors.white};
  font-size: 18px;
  padding: 10px 20px;
  line-height: 22px;
  background: transparent;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  position: relative;
  z-index: 1000;
  transition: all .5s;
  font-family: ${fonts.HelveticaBold};

  & > span {
    font-size: 10px;
  }

  &:hover {
    background: ${colors.purple};
  }

  ${({ $activate }) => $activate && `
    transform: translateY(100px);
    opacity: 0;
  `}

  ${({ $selected }) => $selected && `
    background: ${colors.purple};
    color: #fff;
  `}

  ${({ $amount }) => !$amount && `
    min-width: 90px;
  `}

  ${({ $amount }) => $amount && `
    width: 27%;
    padding 3px;
    font-size: 17px;
  `}

  ${({ $flip }) => $flip && `
    box-shadow: 0px 3px 30px #00000029;
    mix-blend-mode: overlay;
    border-radius: 10px;
    min-width: 360px;

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
    min-width: unset;
    width: 300px;
  }
`

const PlayWrapper = styled.div<any>`
  opacity: 0;
  transition: all .5s;
  transform: translateY(0);
  position: relative;
  z-index: 999;
  max-width: 400px;
  padding: 80px 20px 0;
  margin: 0 auto;

  ${({ $activate }) => $activate && `
    opacity: 1;
    transform: translateY(-170px);
  `}

  ${({ $moveOut }) => $moveOut && `
    opacity: 0;
    transform: translateY(0);
  `}
`

const ConnectButton = styled.div<any>`
  margin-top: 60px;

  ${({ $activate }) => $activate && `
    transform: translateY(100px);
    opacity: 0;
  `}

`

const PlayRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
`

const PlayLabel = styled.p`
  margin-bottom: 3px;
  font-size: 12px;
  color: #fff;
`

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
`

const ConnectAndPlayButton = styled.button`
  box-shadow: 0px 3px 6px #00000029;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  background: transparent;
  font-size: 22px;
  padding: 15px 20px;
  line-height: 22px;
  position: relative;
  z-index: 1000;
  transition: all .5s;
  margin: 0 auto;
  color: ${colors.white};
  font-family: ${fonts.HelveticaRegular};


  &:hover {
    background-color: ${colors.purple};
  }
`

const DisconnectWrapper = styled.div`
  display: inline-block;
  float: right;
  padding: 20px;

  & > button {
    background-color: #6337F4;

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

`

const Label = styled.span`
  color: #fff;
  padding: 0 15px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 243px;
  margin: 0 auto;
`

const BiggerButton = styled(Button)`
  min-width: 95px;
  margin-bottom: 15px;
`

const FinalMessage = styled.div<any>`
  color: #fff;
  opacity: 0;
  transform: translateY(0);
  z-index: 801;
  position: relative;

  & > p {
    font-size: 22px;
  }

  ${({ $show }) => $show && `
    opacity: 1;
    transform: translateY(-430px);
  `}

`

export default FlipGame
