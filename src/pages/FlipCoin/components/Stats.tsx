import DaoHeader from "components/DaoHeader"
import { useState } from "react"
import styled from "styled-components"
import fonts from "styles/fonts"
import { Button } from "./FlipGame"
import {useMediaQuery} from '@mui/material';

const Stats = ({ wallet, stats, openStats, hide, sol }: any) => {
  const [activeTab, setActiveTab] = useState(sol ? 2 : 1)
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet= useMediaQuery('(max-width: 900px)');
  if (hide) {
    return null
  }

  const data = [
    {
      text: 'NDO',
      slug: 'elrond-flip-coin'
    },
    {
      text: 'SOL',
      slug: 'flip-coin'
    }
  ]

  return (
    <StatsWrapper $activate={wallet} $hide={hide} >
      <DaoHeader activeTab={activeTab} setActiveTab={setActiveTab} data={data} />
      <Title>RECENT PLAYS</Title>
      <Container style = {{ marginLeft: isMobile? '10px':'' , marginRight: isMobile? '10px':'' }}>
        {stats.map((stat: any) => {
          return (
            <Row key={stat._id}>
              {`Wallet (${stat.wallet.slice(0, 6)}) flipped ${stat.amount} ${stat.blockchain} and ${stat.won ? 'won' : 'lost'}`}
            </Row>
          )
        })}
      </Container>
      <Button onClick={() => openStats(true)}>Statistics & leaderboard</Button>
    </StatsWrapper>
  )
}

const StatsWrapper = styled.div<any>`
  width: 400px;
  top: 50px;
  text-align: center;
  opacity: 0;
  transition: all .5s;
  z-index: 2;

  ${({$activate}) => $activate && `
    left: calc(50% - 600px);
    opacity: 1;
  `}

  & > p {
    color: #fff;
    margin-top: 30px;
  }

  @media screen and (max-width: 1000px) {
    position: relative;
    top: auto;
    left: auto;
    padding-bottom: 200px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  @media screen and (max-width: 900px) {
    padding-bottom: 80px;
  }

`

const Title = styled.p`
  font-family : ${fonts.HelveticaConBold};
`

const Container = styled.div`
  background: transparent linear-gradient(180deg, #182844 0%, #111C31 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 30px #00000029;
  mix-blend-mode: overlay;
  border-radius: 20px;
  padding: 20px 50px 30px;
  margin-bottom: 20px;
`


const Row = styled.div`
  padding: 12px 10px 5px;
  border-bottom: 1px solid #2C4A7E;
  font-size: 13px;
  color: #8B93A1;
  font-family: ${fonts.HelveticaRegular};
`

export default Stats
