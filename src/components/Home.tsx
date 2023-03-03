import colors from '../styles/colors';
import styled from 'styled-components';
import GovernanceComponent from './About/Governance';
import StakingComponent from './About/Staking';
import UtilityComponent from './About/Utility';
import JoinUsComponent from './About/JoinUs';
import fonts from 'styles/fonts';
import FeelingBored from './About/FeelingBored';
import { breakpoints } from 'styles/breakpoints';
import Footer from './Footer';

import {useMediaQuery} from '@mui/material'
import React from 'react';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  console.log(isMobile);
  return (
    <>
      <Container>
        <MainTitle>
          <BackgroundTitle $order={1} src="/images/about/background-text1.svg" alt="New Degen Order" />
          <BackgroundTitle style = {{
            top: isMobile?'-90px':'',
            opacity: isMobile?0.3:''
           }} $mobile $order={1} src="/images/about/mobile/background-text1.svg" alt="New Degen Order" />
          {
            !isMobile?
              <TextContainer>NEW DEGEN ORDER</TextContainer>
              :
              <>
              <TextContainer>NEW</TextContainer>
              <TextContainer>DEGEN ORDER</TextContainer>
              </>
          }
          {
            !isMobile?
              <BackgroundText>International private community for <span style = {{ color: isMobile? '#9D72FF': '' }}>degens, builders and other cool people.</span> </BackgroundText>
              :
              <></>
          }
        </MainTitle>
        <Image style = {{
          marginTop: isMobile? '60px':''
         }} src="/images/home-pyramids.png" alt="pyramids"></Image>
        {
          isMobile?
            <BackgroundText style = {{
              marginTop: isMobile? '50px':'',
              maxWidth: isMobile? '300px':''
             }}>International private community for <span style = {{ color: isMobile? '#9D72FF': '' }}>degens, builders and other cool people.</span> </BackgroundText>
            :
            <></>
        }
        <ScrollText style={{ visibility: isMobile? 'hidden':'unset' }}>
          <Icon src="/images/about/arrow-down2.svg" alt="arrow" />
          <Icon src="/images/about/arrow-down.svg" alt="arrow" />
          <div>Scroll down</div>
        </ScrollText>
      </Container>

      <Container gray>
        <BackgroundTitle $order={2} src="/images/about/background-text2.svg" alt="Meet the Ogs"
        />
        <BackgroundTitle $mobile style = {{
            top: '100px' ,
            padding: isMobile? '20px':'',
            paddingBottom: isMobile? '0px':''
          }} $order={2} src="/images/about/mobile/background-text2-meet.svg" alt="Meet the ogs" />
        <BackgroundTitle  $mobile  style = {{
          padding: isMobile? '20px':'',
          paddingTop: isMobile? '0px':''
         }} $order={2.5} src="/images/about/mobile/background-text2-oggs.svg" alt="Meet the ogs" />
        <TextWrapper style = {{ textAlign: 'center' , marginTop: isMobile? '100px': '' }}>
          <h1 style = {{ fontSize: isMobile?'40px': '50px' , lineHeight: '1'}}>What can I do here?</h1>
          <p style = {{ textAlign: 'left', lineHeight: 1.3 , fontSize: isMobile?'':'25px'  }}>Meet the OGs!<br/> Holding just<span style = {{ fontWeight: isMobile?'bold': '' }}> 1 NFT from New Degen Order collections</span>  gives you access to the private community in Discord. Talk, laugh, exchange know-how, play games and vibe with the gang!</p>
          <Text black style = {{ color: isMobile? 'white': '' , paddingLeft: isMobile? '5px':'', paddingRight: isMobile? '5px':'' }}>Your network is your net worth!</Text>
        </TextWrapper>
        {/* <Footer /> */}
        <Circle style = {{
          left: isMobile? '-140px': '',
          bottom: isMobile? '-190px': '',
         }} src="/images/about/circle.svg" alt="circle" />
      </Container>
      <GovernanceComponent />
      <StakingComponent />
      <UtilityComponent />
      <JoinUsComponent />
      <FeelingBored />
    </>
  );
};

export default Home;

interface BackgroundTitleProps {
  $order?: number | string
  $mobile?: boolean
}

export const BackgroundTitle = styled.img`
  width: 100%;
  left: 0;
  position: absolute;
  mix-blend-mode: overlay;
  object-fit: cover;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    display: none;
  }

  ${({ $order }: BackgroundTitleProps) => $order === 1 && `
    top: -100px;

    @media screen and (max-width: 1240px) {
      top: -70px;
    }

  `}

  ${({ $order }: BackgroundTitleProps) => $order === 2 && `
    top: 200px;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 3 && `
    top: 100px;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 4 && `
    top: 0;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 5 && `
    width: 1000px;
    left: calc(50% - 500px);
    top: 260px;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 7 && `
    top: 85px;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 'dao-left' && `
    top: 85px;
    left: -45%;
    width: 50%;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 'dao-right' && `
    top: 85px;
    right: -45%;
    width: 50%;
    left: unset;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 'flip-coin' && `
    top: 10%;
  `}

  ${({ $order }: BackgroundTitleProps) => $order === 'statistics' && `
    top: -5%;
  `}

  ${({ $mobile, $order }: BackgroundTitleProps) => $mobile && `
    display: none;

    @media screen and (max-width: ${breakpoints.maxPhone}px) {
      display: block;

      ${$order === 2 ? `
        top: 100px;
        width: 80%;
      ` : ``}

      ${$order === 2.5 ? `
        top: 230px;
      ` : ``}

      ${$order === 3 ? `
        top: 20px;
        bottom: 20px;
        object-fit: initial;
        height: calc(100% - 40px);
      ` : ``}

      ${$order === 4 ? `
        top: 20px;
        bottom: 20px;
        object-fit: initial;
        height: calc(100% - 40px);
      ` : ``}
      ${$order === 5 ? `
        top: 20px;
        bottom: 20px;
        object-fit: initial;
        height: calc(100% - 40px);
      ` : ``}
      ${$order === 7 ? `
        top: 20px;
        bottom: 20px;
        object-fit: initial;
        height: calc(100% - 40px);
      ` : ``}
    }
  `}
`

const Circle = styled.img`
  opacity: 0.1;
  left: -40px;
  bottom: -40px;
  position: absolute;
  max-width: 400px;
`
interface ContainerProps {
  gray?: boolean
  dark?: boolean
  padding?: boolean
}

export const Container = styled.div`
  text-align: center;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ gray }: ContainerProps) => gray && `
    background-color: ${colors.grey};
    align-items: center;
  `}

  ${({ dark }: ContainerProps) => dark && `
    background-color: #0C1422;

    p {
      color: ${colors.white};
    }
  `}

  @media screen and (max-width: 500px) {
    //min-height: unset;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const ScrollText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  div {
    font-size: 22px;
    display: inline-block;
    padding-top: 10px;
  }

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    margin-top: 80px;
  }
`

const BackgroundText = styled.p`
  font-size: 20px;
  max-width: 500px;
  text-align: center;
  margin: 0 auto;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 16px;
    margin: 20px auto;
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 1000px;
  margin: 25px auto;
  transform: scale(1);
  transition: all .4s;

  &:hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    transform: scale(1.5);

    &:hover {
      transform: scale(1.5);
    }
  }
`

const MainTitle = styled.div`
  text-align: center;
  position: relative;
  color: ${colors.white};
  padding: 0 20px;
  margin-top: 100px;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    display: block;
    margin-top: 40px;
  }
`;

const TextContainer = styled.h1`
  margin: 0;
  font-size: 76px;
  line-height: 1.5;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    line-height: 1.2;
    font-size: 40px;
  }
`;

export const TextWrapper = styled.div`
  max-width: 660px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  text-align: left;
  line-height: 25px;
  color: black;
  z-index: 1;

  p {
    font-size: 15px;
  }
`

export const Text = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  padding-top: 40px;
  font-family: ${fonts.HelveticaBold};
  padding-left: 20px;
  padding-right: 20px;

  ${({ black }: { black?: boolean }) => black && `
    color: black;
    max-width: 100%;
    padding-bottom: 80px;
  `}


`

const Icon = styled.img`
  width: 20px;
`
