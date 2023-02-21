import { BackgroundTitle, Container, Text, TextWrapper } from 'components/Home'
import { useState } from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import {useMediaQuery} from '@mui/material';

const GovernanceComponent = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container dark>
      <BackgroundTitle $order={3} src="/images/about/background-text3.svg" alt="Governance" />
      <BackgroundTitle $mobile $order={3} src="/images/about/mobile/background-text3.svg" alt="Governance" />
      <TextWrapper>
        <Governance style = {{ lineHeight: '55px' }}>Governance</Governance>
        <p>As a decentralized society we make decisions based on governance votings. For every 1 NFT you hold you have 1 voting power in the DAO dApp.</p>
      </TextWrapper>
      <Text>We also have tier system, depending on how many NFTs do you hold</Text>
      <CellWrapper>
        <Cell>
          <Back className="back">
            <HoverText>We also have tier system, depending on how many NFTs do you hold</HoverText>
          </Back>
          <Front className="front">
            <CellImage src="/images/about/arab-woman.svg" id='#s1' />
            <CellTextWrapper>
              <CellTitle style = {{ fontSize: '20px' , lineHeight: '20px' }}>Degen</CellTitle>
              <NFTS style = {{ fontSize: '13px' }}>1-6 NFTs</NFTS>
            </CellTextWrapper>
          </Front>
        </Cell>
        <Cell>
          <Back className="back">
            <HoverText>We also have tier system, depending on how many NFTs do you hold</HoverText>
          </Back>
          <Front className="front">
            <CellImage src="/images/about/nefertiti-bust.svg" id='#s2'/>
            <CellTextWrapper>
              <CellTitle style = {{ fontSize: '20px' , lineHeight: '20px' }}>Vizier</CellTitle>
              <NFTS style = {{ fontSize: '13px' }}>7-16 NFTs</NFTS>
            </CellTextWrapper>
          </Front>
        </Cell>
        <Cell style={{ marginTop: isMobile? '12px':'' }}>
          <Back className="back">
            <HoverText>We also have tier system, depending on how many NFTs do you hold</HoverText>
          </Back>
          <Front className="front">
            <CellImage src="/images/about/pharaoh.svg" id='#s3' />
            <CellTextWrapper>
              <CellTitle style = {{ fontSize: '20px' , lineHeight: '20px' }}>Pharaoh</CellTitle>
              <NFTS style = {{ fontSize: '13px' }}>17-76 NFTs</NFTS>
            </CellTextWrapper>
          </Front>
        </Cell>
        <Cell>
          <Back className="back">
            <HoverText>We also have tier system, depending on how many NFTs do you hold</HoverText>
          </Back>
          <Front className="front">
            <CellImage src="/images/about/anubis.svg" id='#s4'/>
            <CellTextWrapper>
              <CellTitle style = {{ fontSize: '20px' , lineHeight: '20px' }}>Ancient Guardian</CellTitle>
              <NFTS style = {{ fontSize: '13px' }}>77+ NFTs</NFTS>
            </CellTextWrapper>
          </Front>
        </Cell>
      </CellWrapper>
      <Text>(more info in Discord)</Text>
    </Container>
  )
}

export default GovernanceComponent

const Governance = styled.h1`
  font-size: 60px;
  color: ${colors.white};
  border-bottom: 4px solid ${colors.purple};
  width: 100%;
  max-width: 800px;
  text-align: left;
  text-transform: capitalize;
  z-index: 1;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 2.5rem;
  }
`

const HoverText = styled.div`
  min-width: 120px;
  display: flex;
  align-items: center;
  height: 100%;
`

const CellTextWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 59px;
  left: 10px;
  right: 10px;
  text-align: center;
  width: calc(100% - 20px);
`

const Cell = styled.div`
  width: calc(25% - 20px);
  box-shadow: 0px 3px 20px #00000029;
  border: 2px solid #395583;
  border-radius: 20px;
  padding: 10px;
  position: relative;
  background-color: #182844;
  position: relative;
  height: 200px;
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;

  & > .front {
    display: block;
  }

  & > .back {
    display: none;
  }

  // &:hover {
  //   & > .front {
  //     display: none;
  //   }
  //   & > .back {
  //     display: block;
  //   }
  // }


  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    width: calc(50% - 20px);
  }
`

const CellTitle = styled.p`
  font-size: 30px;
  height: 70px;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px dashed ${colors.white};
  font-family: ${fonts.HelveticaBold};
  padding-bottom: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const NFTS = styled.p`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  font-family: ${fonts.HelveticaBold};
  margin: 0;
`

const CellImage = styled.img`
  width: 100%;
  mix-blend-mode: overlay;
`

const CellWrapper = styled.div`
  max-width: 660px;
  width: 100%;
  margin: 30px auto;
`

const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
`
const Back = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
