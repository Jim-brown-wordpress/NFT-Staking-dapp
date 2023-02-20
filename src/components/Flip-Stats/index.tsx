import { useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import fetch from 'cross-fetch'
import ClipLoader from "react-spinners/ClipLoader";
import colors from "styles/colors";
import fonts from "styles/fonts";

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    height: 100%;
  }
`

const FlipStats = ({ blockchain, openStats } : { blockchain: string, openStats: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stats, setStats] = useState<any>(null)
  
  useEffect(() => {
    fetch(`https://games-api-five.vercel.app/api/coin-game/statistics?blockchain=${blockchain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then((res: any) => {
      return res.json()
    }).then((result: any) => {
      console.log(result, 'resultt')
      setIsLoading(false)
      setStats(result || {})
    })
  }, [])

  return (
    <>
      <GlobalStyles />    
      <Container>
        <Row>
          <Cell>
            <InnerCell>
              <CellTitle>Daily volume:</CellTitle>
              {stats ? (
                <Amount>{Math.floor(stats?.todayVolume * 100) / 100} {blockchain}</Amount>
              ) : <ClipLoader color='#fff' />}
            </InnerCell>
          </Cell>
          <Cell>
            <InnerCell>
              <CellTitle>All time volume:</CellTitle>
              {stats ? (
                <Amount>{Math.floor(stats.allVolume * 100) / 100} {blockchain}</Amount>
              ) : <ClipLoader color='#fff' />}
            </InnerCell>
          </Cell>
          <Cell>
            <InnerCell>
              <CellTitle>Dao profit:</CellTitle>
              {stats ? (
                <Amount>{Math.floor(stats.daoProfit * 100) / 100} {blockchain}</Amount>
              ) : <ClipLoader color='#fff' />}
            </InnerCell>
          </Cell>
        </Row>
        <Row>
          <SmallerCell>
            <InnerCell>
              <CellTitle>Top Winners 24h:</CellTitle>
              {stats ? (
                <>
                  {stats.topWinners24h?.map((player: any, index: number) => {
                    return (
                      <div key={player.wallet}>
                        <SmallCell $width={10}>
                          {index + 1}.
                        </SmallCell>
                        <SmallCell $width={50}>
                          {player.wallet.slice(0, 6)}
                        </SmallCell>
                        <SmallCell $width={40}>
                          {Math.floor(player.amount * 100) / 100} <span>{blockchain}</span>
                        </SmallCell>
                      </div>
                    )
                  })}
                </>
              ): <ClipLoader color='#fff' />}
            </InnerCell>
          </SmallerCell>
          <SmallerCell>
            <InnerCell>
              <CellTitle>Top Losers 24h:</CellTitle>
              {stats ? (
                <>
                  {stats.topLossers24h?.map((player: any, index: number) => {
                    return (
                      <div key={player.wallet}>
                        <SmallCell $width={10}>
                          {index + 1}.
                        </SmallCell>
                        <SmallCell $width={50}>
                          {player.wallet.slice(0, 6)}
                        </SmallCell>
                        <SmallCell $width={40}>
                          {Math.floor(player.amount * 100) / 100} <span>{blockchain}</span>
                        </SmallCell>
                      </div>
                    )
                  })}
                </>
              ) : <ClipLoader color='#fff' />}
            </InnerCell>
          </SmallerCell>
          <SmallerCell>
            <InnerCell>
              <CellTitle>Top Winners all time:</CellTitle>
              {stats ? (
                <>
                  {stats.topWinnersAll?.map((player: any, index: number) => {
                    return (
                      <div key={player.wallet}>
                        <SmallCell $width={10}>
                          {index + 1}.
                        </SmallCell>
                        <SmallCell $width={50}>
                          {player.wallet.slice(0, 6)}
                        </SmallCell>
                        <SmallCell $width={40}>
                          {Math.floor(player.amount * 100) / 100} <span>{blockchain}</span>
                        </SmallCell>
                      </div>
                    )
                  })}
                </>
              ) : <ClipLoader color='#fff' />}
            </InnerCell>
          </SmallerCell>
          <SmallerCell>
            <InnerCell>
              <CellTitle>Top Losers all time:</CellTitle>
              {stats ? (
                <>
                  {stats.topLossersAll?.map((player: any, index: number) => {
                    return (
                      <div key={player.wallet}>
                        <SmallCell $width={10}>
                          {index + 1}.
                        </SmallCell>
                        <SmallCell $width={50}>
                          {player.wallet.slice(0, 6)}
                        </SmallCell>
                        <SmallCell $width={40}>
                          {Math.floor(player.amount * 100) / 100} <span>{blockchain}</span>
                        </SmallCell>
                      </div>
                    )
                  })}
                </>
              ) : <ClipLoader color="#fff" />}
            </InnerCell>
          </SmallerCell>
        </Row>
        <Wrapper>
          <Button onClick={() => openStats(false)}>Go back</Button>
        </Wrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  z-index: 2;
  position: relative;
  padding-top: 10%;
`

const Row = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const Cell = styled.div`
  display: inline-block;
  width: 33.333%;
  vertical-align: top;
  padding: 40px;
  font-family: ${fonts.HelveticaBold};

  @media screen and (max-width: 750px) {
    width: 100%;
    padding: 20px 40px;
  }
`

const SmallerCell = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 25%;
  padding: 20px;

  @media screen and (max-width: 850px) {
    width: 50%;
    padding 20px 40px;
  }

  @media screen and (max-width: 460px) {
    width: 100%;
    padding 20px 40px;
  }
`

const InnerCell = styled.div`
  background: #182844 0% 0% no-repeat padding-box;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 3px 30px #00000029;
  mix-blend-mode: overlay;
  border-radius: 20px;
`

const CellTitle = styled.p`
  margin: 0 0 20px;
  font-family: ${fonts.HelveticaBold};
`

const Amount = styled.span`
  font-size: 20px;
  font-family: ${fonts.HelveticaRegular};
`

const SmallCell = styled.div<any>`
  width: ${props => props.$width}%;
  display: inline-block;
  text-align: left;
  font-size: 14px;
  font-family:${fonts.HelveticaRegular};

  ${({$width}) => $width === 50 && `
    padding-left: 10px;
  `}

  ${({$width}) => $width === 40 && `
    text-align: right;
  `}

  & > span {
    font-size: 10px;
  }
`

const Button = styled.button`
  background: transparent;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  color: ${colors.white};
  font-size: 20px;
  padding: 10px 20px;
  line-height: 22px;
  position: relative;
  z-index: 1000;
  transition: all .5s;
  margin: 0 auto;
  font-family: ${fonts.HelveticaConBold};
  min-width: 200px;

  &:hover {
    background-color: ${colors.purple};
  }

`

const Wrapper = styled.div`
  text-align: center;
  padding-top: 60px;
  padding-bottom: 60px;
`

export default FlipStats