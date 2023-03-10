import { useState } from 'react'
import styled from 'styled-components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Link, useNavigate } from 'react-router-dom';
import { contractAddress } from '../config';
import { routeNames } from 'routes';
import {
  useGetAccountInfo,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core/hooks';
import {
  sendTransactions
} from '@elrondnetwork/dapp-core/services';
import {
  refreshAccount,
  logout
} from '@elrondnetwork/dapp-core/utils';
import MobileHeader from './MobileHeader';
import { breakpoints } from 'styles/breakpoints';


const Header = () => {
  const navigate = useNavigate();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
    string | null
  >(null);
  const { address } = useGetAccountInfo();
  const isLoggedIn = Boolean(address);
  const [countDownTimer, setCountDownTimer] = useState<string | null>(null)
  const countDownDatePlus15 = new Date("Feb 24, 2022 19:00:00").getTime() - new Date("Feb 24, 2022 19:00:00").getTimezoneOffset() * 60000;
  const countDownDate = new Date("Jun 21, 2022 18:45:00").getTime() - new Date("Jun 21, 2022 18:45:00").getTimezoneOffset() * 60000;
  const [isConnected, setIsConnected] = useState(false);

  const sendMintTransaction = async () => {
    const now = new Date().getTime();
    const distancePlus15 = countDownDatePlus15 - now

    const mintTransaction = {
      value: distancePlus15 < 0 ? '770000000000000000' : '700000000000000000',
      data: 'mint',
      receiver: contractAddress
    };
    await refreshAccount();
    console.log(mintTransaction);
    const { sessionId , error } = await sendTransactions({
      transactions: mintTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured during Mint',
        successMessage: 'Mint transaction successful',
        transactionDuration: 10000
      }
    });
    console.log(sessionId);
    console.log(error);
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };
  // useEffect(() => {
  //   const countDownInterval = setInterval(() => {

  //     isWalletConnected();
  //     const now = new Date().getTime();
  //     const distance = countDownDate - now

  //     const distancePlus15 = countDownDatePlus15 - now

  //     // Time calculations for days, hours, minutes and seconds
  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Display the result in the element with id="demo"
  //     setCountDownTimer(fixNumber(days) + ":" + fixNumber(hours) + ":"
  //       + fixNumber(minutes) + ":" + fixNumber(seconds))

  //     // If the count down is finished, write some text
  //     if (distance < 0) {
  //       setCountDownTimer("MINT NOW");
  //     }
  //     if (distancePlus15 < 0) {
  //       clearInterval(countDownInterval)
  //     }
  //   }, 1000);
  // }, [])

  const isWalletConnected = () =>{
    if(localStorage.getItem("persist:dapp-core-store") === null){
      return setIsConnected(false);
    }
    return setIsConnected(true);
  }

  const slug = window.location.pathname

  return (

    <>
      <Container>
        <Wrapper>
          <ImageContainer>
            <Link to="/">
              <Image src={'/images/header-symbol.png'} />
            </Link>
          </ImageContainer>
          <Cell active={slug === '/'}>
            <LabelLink to="/">
              About
            </LabelLink>
          </Cell>
          <Cell active={slug === '/dao'}>
            <LabelLink to="/dao">
              DAO
            </LabelLink>
          </Cell>
          <Cell active={slug === '/staking'}>
            <LabelLink  to="/staking" >
              Staking
              {/* <span>Coming soon</span> */}
            </LabelLink>
          </Cell>
          <Cell active={slug === '/raffles'}>
            <LabelLink $disabled  to="/raffles"  onClick={e => e.preventDefault()}>
              Raffles
              <span>Coming soon</span>
            </LabelLink>
          </Cell>
          {/* <Cell active={slug === '/derug'}>
            <LabelLink $disabled  to="/derug"   onClick={e => e.preventDefault()}>
              DeRug
              <span>Coming soon</span>
            </LabelLink>
          </Cell> */}
          <Cell active={slug === '/elrond-flip-coin'}>
            <LabelLink to="/elrond-flip-coin">
              Coin Flip
            </LabelLink>
          </Cell>
          <Cell active={slug === '/flappy-degen'}>
              <LabelLink to="/flappy-degen">
                Flappy Degen
              </LabelLink>
          </Cell>
          {
            !isLoggedIn &&
            <StyledButton onClick={()=>{ setIsConnected(true); navigate(routeNames.unlock)}}>Connect wallet</StyledButton>
          }
          {
            isLoggedIn &&
            <StyledButton onClick={()=>{ setIsConnected(false); handleLogout(); }}>Disconnect wallet</StyledButton>
          }
        </Wrapper>
      </Container>
      <MobileHeader />
      {/* <Timer scrollPosition={scrollPosition}> */}
        {/* {countDownTimer !== 'MINT NOW' ? (<TimerLabel>PUBLIC SALE</TimerLabel>) : null} */}
        {/* {"PRE-SALE SOLD OUT"} */}
        {/* {countDownTimer} */}
        {/* {countDownTimer !== 'MINT NOW' ? (
          <SpanWrapper>
            <TimeSpan days>days</TimeSpan>
            <TimeSpan>hours</TimeSpan>
            <TimeSpan minutes>minutes</TimeSpan>
            <TimeSpan seconds>seconds</TimeSpan>
          </SpanWrapper>) : null} */}
      {/* </Timer> */}

      {/* <MintWrapper>
        <Mint onClick={()=>{sendMintTransaction()}}>MINT</Mint>
      </MintWrapper> */}
      {/* <MobileContainer>
          {
            !isLoggedIn &&
            <MobileButton onClick={()=>{ navigate(routeNames.unlock)}}>Connect wallet</MobileButton>
          }
          {
            isLoggedIn &&
            <MobileButton onClick={()=>{ setIsConnected(false); handleLogout();}}>Disconnect wallet</MobileButton>
          }

          <MobileMint onClick={()=>{sendMintTransaction()}}>MINT</MobileMint>
      </MobileContainer> */}
    </>
  );
};

const Container = styled.div`
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 99999;

  @media screen and (max-width: ${breakpoints.maxTablet}px) {
    display: none;
  }
`;

const MintWrapper = styled.div`
  text-align: center;
  position: sticky;
  top: calc(100% - 100px);
  left: 0;
  right: 0;
  z-index: 9900;
  @media screen and (max-width: 767px) {
    display:none;
  }

`

const Wrapper = styled.div`
  height: 68px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;

  @media screen and (max-width: 767px) {
    height: 50px;
  }
`;

const Cell = styled.div`
  display: inline-block;

  ${({ active }: { active: boolean }) => active && `
    border-bottom: 4px solid ${colors.purple};
  `}
`;


const LabelLink = styled(Link)<{$disabled?: boolean}>`
  display: inline-block;
  color: ${colors.white} !important;
  text-decoration: none;
  font-size: 19px;
  vertical-align: middle;
  font-family: ${fonts.HelveticaBold};
  cursor: pointer;
  position: relative;

  &:hover {
    text-decoration: none !important;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }

  ${({$disabled}) => $disabled && `
    color: ${colors.grey02} !important;
    cursor: not-allowed;

    & > span {
      font-size: 12px;
      color: ${colors.red};
      position: absolute;
      bottom: 0;
      right: -30px;
      transform: rotate(-25deg);
    }
  `}
`;

export const Image = styled.img`
  width: 70px;
`;

export const ImageContainer = styled.div`
  padding: 10px 0;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.white};
  font-size: 30px;
  margin-top: 5px;
  font-family: ${fonts.HelveticaConBold};

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default Header;
