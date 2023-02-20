import { BackgroundTitle, Container } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import fonts from 'styles/fonts'
import { Button, Link } from './JoinUs'
import {useMediaQuery} from '@mui/material';

const FeelingBored = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container>
      <BackgroundTitle $order={7} src='/images/about/flappy.svg' alt='Flappy' />
      <BackgroundTitle $order={7} $mobile src='/images/about/mobile/flappy.svg' alt='Flappy' />
      <TextWrapper>
        <Title>Feeling bored?</Title>
        <p>Check our Flappy Degen game now!</p>
        <Link href='/flappy-degen'>
          <Button small style={{ width: isMobile? '250px':''  }}>Flappy Degen</Button>
        </Link>
      </TextWrapper>
      <PipeImg src="/images/about/mobile/flappy1.png" alt="feeling bored" />
    </Container>
  )
}

export default FeelingBored

const Title = styled.h1`
  font-family: ${fonts.PressStart};
  font-size: 64px;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 2.5rem;
  }
`

const PipeImg = styled.img`
  width: 100px;
  position: absolute;
  bottom: -90px;
  z-index: 5;
  left: calc(50% - 50px);
`

const TextWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  z-index: 2;

  p {
    font-size: 20px;
    padding-top: 50px;
  }
`
