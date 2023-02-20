import styled, { createGlobalStyle } from 'styled-components'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

interface Data {
  rewards: number[]
  halvingPeriod: number[]
}

interface Props {
  data: Data
  isOpen: boolean
  setIsOpen: (o: boolean) => void,
  currentReward: number
}

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const Information = ({ data, isOpen, setIsOpen , currentReward }: Props) => {
  return (
    <Modal $open={isOpen}>
      {isOpen ? <GlobalStyles /> : null}
      <h4>Info</h4>
      <Container>
        <Earnings>CURRENT REWARD:<span>${currentReward}</span></Earnings>
      </Container>
      <Text>Staking<span>Stake your NFT for a daily $NDO token reward.</span></Text>
      <Container>
        <Heading>$NDO Tokenomics:</Heading>
        <ColumnHeading>Stake 1 NFT</ColumnHeading>
        <ColumnsWrapper>
          <Column></Column>
          <Column $border>
            {data.rewards?.map((reward: number, index: number) => {
              return (
                <Cell key={index}>{reward}</Cell>
              )
            })}
          </Column>
          <Column>
            {data.halvingPeriod?.map((period: number, index: number) => {
              return (
                <Cell key={index}>{period}</Cell>
              )
            })}
          </Column>
        </ColumnsWrapper>
      </Container>
      <Button onClick={() => setIsOpen(false)}>CLOSE</Button>
    </Modal>
  )
}

export default Information

const Modal = styled.div<any>`
  display: none;
  height: 100vh;
  width: 40vw;
  z-index: 99999;
  background: ${colors.white}20 0% 0% no-repeat padding-box;
  border-radius: 20px 0px 0px 20px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 60vw;
  padding: 20px;

  h4 {
    font-size: 25px;
    margin: 0 0 20px;
    font-family: ${fonts.HelveticaBold};
  }

  @media screen and (max-width: 750px) {
    left: 0px;
    width: 100%;
  }

  ${({ $open }) => $open && `
    display: block;
  `}
`

const Container = styled.div`
  background-color: #1A2330;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 30px 20px;
`

const Earnings = styled.div`
  color: ${colors.white};
  font-size: 20px;
  font-family: ${fonts.HelveticaBold};

  span {
    font-size: 60px;
    display: block;
    margin-top: 8px;
    line-height: 50px;
    font-family: ${fonts.HelveticaConBold};
  }
`

const Heading = styled.div`
  font-family: ${fonts.HelveticaRegular};
  font-size: 20px;
`

const Text = styled.div`
  font-size: 60px;
  color: ${colors.white};
  text-align: left;
  line-height: 50px;
  margin: 20px 0;
  font-family: ${fonts.HelveticaBold};

  span {
    font-size: 20px;
    display: block;
    font-family: ${fonts.HelveticaRegular};
  }
`

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 300px;
  margin: 0 auto;
`

const Column = styled.div<any>`

${({ $border }) => $border && `
  border-right: 1px dashed #3C4E6E;
  border-left: 1px dashed #3C4E6E;
  padding: 0 50px;
`}
`

const ColumnHeading = styled.div`
  font-size: 20px;
  text-align: left;
  font-family: ${fonts.HelveticaRegular};
`

const Cell = styled.div`
  font-size: 20px;
  font-family: ${fonts.HelveticaRegular};
`

const Button = styled.button`
  background-color: #1A2330;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 20px 0;
  border: none;
  color: ${colors.white};
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
`
