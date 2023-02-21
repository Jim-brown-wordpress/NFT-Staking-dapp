import { BackgroundTitle, Container, TextWrapper } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import fonts from 'styles/fonts'

const StakingComponent = () => {
  return (
    <Container gray>
      <BackgroundTitle $order={4} src="/images/about/background-text4.svg" alt="Staking" />
      <BackgroundTitle $mobile $order={4} src="/images/about/mobile/background-title4.svg" alt="Staking" />
      <TextWrapper>
        <Staking>Staking</Staking>
        <StakingText style = {{ marginTop: '20px' }}>Stake your NFT for a daily $NDO token reward.</StakingText>
      </TextWrapper>
      <TableContainer>
        <Table src="images/about/staking-table.svg"  />
      </TableContainer>
    </Container>
  )
}

export default StakingComponent

const Staking = styled.h1`
  font-size: 60px;
  font-family: ${fonts.HelveticaBold};
  font-weight: 900;
  margin-bottom: 0;

  @media screen and (max-width: ${breakpoints.maxPhone}px) {
    font-size: 2.5rem;
  }
`

const StakingText = styled.p`
  margin: 0;
  font-size: 20px;
`

const TableContainer = styled.div`
  max-width: 800px;
`

const Table = styled.img`
  width: 100%;
`
