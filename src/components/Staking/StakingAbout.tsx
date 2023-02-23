import { BackgroundTitle, Container } from 'components/Home'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { routeNames } from 'routes'
import {useMediaQuery} from '@mui/material';
import axios from 'axios';

import {
  useGetNetworkConfig,
  useGetAccount,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core/hooks';
import { useEffect, useState } from 'react';
import { AbiRegistry } from '@elrondnetwork/erdjs/out';



import {chainID , apiURL, NFT_COLLECTION_ID, contractAddress} from 'config';

const StakingAboutComponent = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 600px)');

  const {
    address
  } = useGetAccount();

  const {
    network: {
      apiAddress
    }
  } = useGetNetworkConfig();

  const {
    hasPendingTransactions
  } = useGetPendingTransactions();

  const [totalCount , setTotalCount] = useState<number>(0);
  const [stakedNftCount , setStakedNftCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
        let res = (await axios.get(`${apiURL}/collections/${NFT_COLLECTION_ID}/nfts/count`)).data;
        setTotalCount(res);
        res = (await axios.get(`${apiURL}/accounts/${contractAddress}/nfts?collection=${NFT_COLLECTION_ID}`)).data;
        setStakedNftCount(res?.length);
    })()
  } , []);

  return (
    <>
      <Container dark style={{ minHeight: isMobile? 'unset':'' }}>
        <MediaHeight350>
          <BackgroundTitle $order={8} src="/images/staking/staking-background-title.svg" alt="Staking" />
          {
            !isMobile?
            <Image src='/images/staking/staking-pyramid.svg' alt='pyramid' type='pyramid' />
            :''
          }
          {
            !isMobile?
            <TextWrapper width={500} style = {{ zIndex: 5 }}>
              <Heading margin><MediaFontSize20>You need a staking account to get started!</MediaFontSize20></Heading>
              <Button>CREATE ACCOUNT</Button>
            </TextWrapper>
            :''
          }
        </MediaHeight350>
      </Container>
      <Container dark style={{ minHeight: isMobile? 'unset':'' }}>
        <MediaHeight350>
          <BackgroundTitle $order={8} src="/images/staking/staking-background-title.svg" alt="Staking" />
          <Planet src='/images/staking/staking-planet.svg' alt='planet' />
          <ContentWrapper>
            <MediaTop5>
              <TextWrapper2 width={400} style = {{ top: isMobile? '-250px': '' }}>
                {
                  isMobile?''
                    :
                    <Heading>STAKE</Heading>

                }
                <Paragraph style={{ fontSize: isMobile?'35px':'' }}>Stake your Pyramid for $NDO</Paragraph>
                <Button onClick={()=> navigate(routeNames.stakingUnlock)}>Connect Wallet</Button>
              </TextWrapper2>
            </MediaTop5>
            <Text>
              <Title>Minimum value locked</Title>
              <Number>0</Number>
              <Title>Total Pyramids Staked</Title>
              <Number>{`${totalCount}`}</Number>
              <Title>% of Pyramids Staked</Title>
              <Number>{`${totalCount != 0? Math.floor( stakedNftCount / totalCount * 100 * 100 ) / 100 : 0}%`}</Number>
            </Text>
          </ContentWrapper>
        </MediaHeight350>
      </Container>
    </>
  )
}

export default StakingAboutComponent

const MediaHeight350 = styled.div`
  @media screen and (max-width: 500px) {
    min-height: unset;
    height: 350px;
  }
`

const MediaTop5 = styled.div`
  @media screen and (max-width: 500px) {
    top: 5px;
  }
`
const MediaFontSize20 = styled.div`
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`

const Heading = styled.h1`
  font-size: 50px;
  color: ${colors.white};

  ${({ margin }: { margin?: boolean }) => margin && `
    margin-bottom: 50px;
  `}

  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`

const Paragraph = styled.p`
  font-size: 40px;
  margin-top: 10px;
  font-family: ${fonts.HelveticaBold};

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`

const TextWrapper = styled.div`
  margin: 0 auto;
  text-align: left;

  ${({ width }: { width: number }) => width && `
    max-width: ${width}px;
  `}

  @media screen and (max-width: 500px) {
    text-align: center;
    top: 50px;
    position: relative;
  }
`

const TextWrapper2 = styled.div`
  margin: 0 auto;
  text-align: left;

  ${({ width }: { width: number }) => width && `
    max-width: ${width}px;
  `}

  @media screen and (max-width: 500px) {
    text-align: center;
    top: 5px;
    position: relative;
  }
`

const Text = styled.div`
  padding-left: 50px;

  @media screen and (max-width: 500px) {
    text-align: center;
    padding: 0;
    margin-top: 20px;
  }

`

const Button = styled.button`
  background-color: transparent;
  box-shadow: 0px 3px 15px #000000FD;
  border: 3px solid ${colors.purple};
  border-radius: 10px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  text-transform: uppercase;
  cursor: pointer;
  color: ${colors.white};
  padding: 10px 30px;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 50px;
  z-index: 1;

  @media screen and (min-width: 500px) {
    z-index: 5;
    position: relative;
    text-align: center;
    /* display: block; */
    padding-left: 200px;
  }


  @media screen and (max-width: 500px) {
    display: block;
    z-index: 5;
    position: relative;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-family: ${fonts.HelveticaBold};
`

const Number = styled.div`
  font-size: 50px;
  padding-bottom: 30px;

  @media screen and (max-width: 500px) {
    font-size: 20px;
    padding-bottom: 10px;
  }
`

const Image = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  ${({ type }: { type?: string }) => type === 'pyramid' && `
    top: calc(50% - 300px);
  `}


  @media screen and (max-width: 500px) {
    width: 300px;
    top: 20px;
    opacity: 0.7;
  }

`

const Planet = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  ${({ type }: { type?: string }) => type === 'pyramid' && `
    top: calc(50% - 300px);
  `}


  @media screen and (max-width: 500px) {
    width: 390px;
    margin: auto;
    top: 60px;
    left: -10px;
  }
`
