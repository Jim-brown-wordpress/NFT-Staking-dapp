import { BackgroundTitle, Container } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import colors from 'styles/colors'
import fonts from 'styles/fonts';
import {useMediaQuery} from '@mui/material'

const JoinUsComponent = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container gray>
      <BackgroundTitle $order={7} src='/images/about/background-text7.svg' alt='Join us' />
      <BackgroundTitle $order={7} $mobile src='/images/about/mobile/background-title7.svg' alt='Join us' />
      <TextWrapper>
        <Heading style = {{ textAlign: isMobile?'left': 'center' , lineHeight: 1 , fontSize: isMobile? '30px': '40px' }}>Okay bruh, you got me! I want to join the DAO! Where can I buy your NFTs</Heading>
        <Paragraph>New Degen Order lives between the Elrond and Solana blockchains.</Paragraph>
      </TextWrapper>
      <ButtonWrapper style={{ display: isMobile? 'block':'' }}>
        <Link href='https://xoxno.com/collection/NDO-950433' target='_blank' style={{ width: isMobile? '100%':'' }}>
          <Button>XOXNO <br/>(powered by Elrond)</Button>
        </Link>
        <Link href='https://hyperspace.xyz/collection/131' target='_blank' style={{ marginTop: isMobile? '20px':'',display: isMobile? 'block':''  }}>
          <Button>HYPERSPACE <br/>(powered by Solana)</Button>
        </Link>
      </ButtonWrapper>
    </Container>
  )
}

export default JoinUsComponent

const Heading = styled.h1`
  font-size: 50px;
  font-family: ${fonts.HelveticaBold};

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 2.5rem;
  }
`

const TextWrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  text-align: left;
  line-height: 25px;
  color: black;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    padding: 0 20px;
  }
`

const Paragraph = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 0 30px;
  color: black;

  ${({ small }: { small?: boolean }) => small && `
    max-width: 400px;
    padding-top: 40px;
  `}
`

export const Link = styled.a`
  color: white;
  text-decoration: none;
  z-index: 1;
`

export const Button = styled.button`
  z-index: 1;
  border: 2px solid #395583;
  border-radius: 20px;
  opacity: 1;
  box-shadow: 0px 3px 20px #00000029;
  background: transparent linear-gradient(180deg, #182844 0%, #142138 100%) 0% 0% no-repeat padding-box;
  padding: 20px 34px;
  cursor: pointer;
  color: ${colors.white};
  font-family: ${fonts.HelveticaBold};

  &:hover {
    background: ${colors.grey};
  }

  ${({ small }: { small?: boolean }) => small && `
    border: 3px solid #15233B;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0px 3px 6px #00000029;
    background: #182742;
    transition: all .4s;

    &:hover {
      background: #0a111d;
    }
  `}
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 60px;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    gap: 20px;
    padding: 0 20px;
  }
`
