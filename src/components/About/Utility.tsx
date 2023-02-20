import { BackgroundTitle, Container } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

const UtilityComponent = () => {
  return (
    <>
      <Container dark>
        <BackgroundTitle $order={5} src="/images/about/background-text5.svg" alt="Utility" />
        <BackgroundTitle $mobile $order={5} src="/images/about/mobile/background-title5.svg" alt="Utility" />
        <TextWrapper>
          <Heading>Coming soon</Heading>
          <Heading border style = {{ lineHeight: 1 }}>Wen Utility for $NDO?</Heading>
          <Text>You can use your $NDO tokens in the Raffles Center! Burn your $NDO token for a chance to win Merchandise, ESDT tokens from other projects, WL spots for upcoming mints, NFTs and more!</Text>
        </TextWrapper>
      </Container>
      <Container dark>
        <BackgroundTitle $order={5} src="/images/about/background-text6.svg" alt="Gamble" />
        <BackgroundTitle $order={5} $mobile src='/images/about/mobile/background-title6.svg' alt='Gamble' />
        <TextWrapper>
          <Heading border style = {{ lineHeight: 1 }}>Gamble with us!</Heading>
          <Text>As degens love to risk and gamble with their capital we created our own Coin Flip owned by the DAO. Connect your wallet, choose Tails or Heads and try your luck!</Text>
          <p>(77% of the profit goes to the DAO wallet)</p>
        </TextWrapper>
      </Container>
    </>
  )
}

export default UtilityComponent

const Heading = styled.h1`
  font-size: 75px;
  color: ${colors.white};
  text-align: center;

  ${({ border }: { border?: boolean }) => border && `
    border-bottom: 4px solid ${colors.purple};
    font-size: 60px;
    font-family: ${fonts.HelveticaBold};
    font-weight: 900;
  `}

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 2.5rem;
  }
`

const Text = styled.p`
  text-align: center;
  font-size: 20px;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 10px;
`

const TextWrapper = styled.div`
  padding-bottom: 140px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 25px;
  z-index: 1;

  p {
    font-family: ${fonts.HelveticaBold};
    font-size: 20px;
  }
`
