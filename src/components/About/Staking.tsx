import { BackgroundTitle, Container, TextWrapper } from 'components/Home'
import styled from 'styled-components'
import { breakpoints } from 'styles/breakpoints'
import fonts from 'styles/fonts';
import {useMediaQuery} from '@mui/material';

const StakingComponent = () => {
  const isMobile = useMediaQuery('(max-width: 960px)');
  return (
    <Container gray>
      <BackgroundTitle $order={4} src="/images/about/background-text4.svg" alt="Staking" />
      {
        !isMobile?
        <BackgroundTitle $mobile $order={4} src="/images/about/mobile/background-title4.svg" alt="Staking" />
        :''
      }
      <TextWrapper>
        <Staking>Staking</Staking>
        <StakingText style = {{ marginTop: '20px' }}>Stake your NFT for a daily $NDO token reward.</StakingText>
      </TextWrapper>
      <TableContainer>
        {/* <Table src="images/about/staking-table.svg"  /> */}
        <table
          style = {{
            background : 'white',
            borderRadius: '5px',
            width: isMobile?'80vw': '800px',
            height: 'auto',
            color:'black',
            marginTop: '15px'
          }}
          className = 'fire'
        >
          <tr>
            <th colSpan={3} style = {{
              borderBottom: '1px  dashed'
             }}>
              $NDO Tokenomics
            </th>
          </tr>
          <tr>
            <td style = {{ width: '50%' }}>
              Stake 1 NFT
            </td>
            <td>Reward</td>
            <td>Halving period</td>
          </tr>
          <tr>
            <td rowSpan={7} style = {{ width: '50%' }}>
                <img src='images/pyramid.png'  style={{width: '100%' }}  />
            </td>
            <td>10.24</td>
            <td>1</td>
          </tr>
          <tr>
            <td>5.12</td>
            <td>2</td>
          </tr>

          <tr>
            <td>2.56</td>
            <td>3</td>
          </tr>

          <tr>
            <td>1.28</td>
            <td>4</td>
          </tr>

          <tr>
            <td>0.64</td>
            <td>5</td>
          </tr>

          <tr>
            <td>0.32</td>
            <td>6</td>
          </tr>

          <tr>
            <td>0.16</td>
            <td>7</td>
          </tr>


          <tr>
            <td colSpan={3}>1 halving period = 6 months</td>
          </tr>
        </table>
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
