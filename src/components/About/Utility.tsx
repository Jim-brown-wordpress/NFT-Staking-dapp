import { BackgroundTitle, Container } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import {useMediaQuery} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Button } from './JoinUs'

const UtilityComponent = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  return (
    <>
      <Container dark>
        <BackgroundTitle $order={5} src="/images/about/background-text5.svg" alt="Utility" />
        <BackgroundTitle $mobile $order={5} src="/images/about/mobile/background-title5.svg" alt="Utility" />
        <TextWrapper>

          {
            isMobile?
            <>
              <Heading  style = {{textAlign: isMobile?'left':'center' }}>Wen Utility</Heading>
              <Heading border style = {{  textAlign: isMobile?'left':'center' , paddingBottom: isMobile? '25px':'' , marginBottom: isMobile?'15px':'' }}>
              for $NDO?</Heading>
            </>

              :
              <Heading border style = {{ lineHeight: 1.1 , textAlign: isMobile?'left':'center' , paddingBottom: isMobile? '15px':'' , marginBottom: isMobile?'15px':'' }}>Wen Utility for $NDO?</Heading>
          }
          <Text>You can use your $NDO tokens in the Raffles Center! Burn your $NDO token for a chance to win Merchandise, ESDT tokens from other projects, WL spots for upcoming mints, NFTs and more!</Text>

          <Heading style = {{
            color:'#FC635F', transform: 'rotate(-25deg)' , top: isMobile? '40px': '180px'
           }}>Coming soon</Heading>

        </TextWrapper>
      </Container>
      <Container dark>
        <BackgroundTitle $order={5} src="/images/about/background-text6.svg" alt="Gamble" />
        <BackgroundTitle $order={5} $mobile src='/images/about/mobile/background-title6.svg' alt='Gamble' />
        <TextWrapper>
          {
            isMobile?
              <>
                <Heading style={{  textAlign: isMobile?'left':'center' , fontSize: isMobile?'50px':'' , marginBottom: isMobile?'0px':'' }}>Gamble </Heading>
                <Heading border style = {{paddingBottom: isMobile? '35px':'', textAlign: isMobile?'left':'center', marginTop: isMobile?'20px':''  }}>with us!</Heading>
              </>
            :
            <Heading border style = {{ lineHeight: 1, paddingBottom: isMobile? '15px':'' }}>Gamble with us!</Heading>
          }
          <Text style={{ fontSize: isMobile?'15px':'' }}>As degens love to risk and gamble with their capital we created our own Coin Flip owned by the DAO. Connect your wallet, choose Tails or Heads and try your luck!</Text>
          {/* <p style={{ fontSize: isMobile?'15px':'' }}>(77% of the profit goes to the DAO wallet)</p> */}
          {/* <button onClick={() =>navigate('/elrond-flip-coin')}  style = {{ width: '10rem' , marginTop: '30px' , fontSize: '1.2rem' , paddingTop: '0.3em' , paddingBottom :'0.3em' }} > */}
          {/* <Link href='/flappy-degen'> */}
          <Button small style={{ width: '250px' , marginTop: '25px' }} onClick={() =>navigate('/elrond-flip-coin')}>Coin Flip</Button>
        {/* </Link> */}
          {/* </button> */}
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
