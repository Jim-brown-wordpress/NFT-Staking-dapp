import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fonts from 'styles/fonts';

interface Tab {
  text: string
  slug?: any
}

const DaoHeader = ({ activeTab, setActiveTab, data }: { activeTab: number, setActiveTab: (tab: number) => void, data: Tab[]}) => {
  const navigate = useNavigate()
  const setActiveTabHandler = (order: number, data: Tab[]) => {
    const slug = data[order - 1].slug
    if (slug) {
      setActiveTab(order)
      return navigate(`/${slug}`)
    }
    setActiveTab(order)
  }
  return (
    <Container>
      <Wrapper style={{ margin: 'auto' }}>
        <Button onClick={() => setActiveTabHandler(1, data)} $active={activeTab === 1}>{data[0].text}</Button>
        <Button onClick={() => setActiveTabHandler(2, data)} $active={activeTab === 2}>{data[1].text}</Button>
      </Wrapper>

      {/* { !address ? (
        <ConnectWrapper>
          <ConnectButton onClick={()=>{ navigate(routeNames.daoUnlock)}}>CONNECT WALLET</ConnectButton>
        </ConnectWrapper>
      ) : null}

      { address ? (
        <AddressWrapper>
          <WalletWrapper>
            <Address>{`${address.substring(0, 6)}...${address.slice(-4)}`}</Address>
            <StyledButton onClick={()=>{ logout(`${window.location.origin}/dao`) }}>Disconnect wallet</StyledButton>
          </WalletWrapper>

          <InfoWrapper>
            <InfoLabel>
              <Number>{nfts || 0}</Number>
              <NumberText>nfts</NumberText>
            </InfoLabel>
            <InfoLabel>
              <Number>{openProposals}</Number>
              <NumberText>open votings</NumberText>
            </InfoLabel>
            <InfoLabel>
              <Number>{votes}</Number>
              <NumberText>total votes</NumberText>
            </InfoLabel>
          </InfoWrapper>
        </AddressWrapper>
      ): null} */}
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  text-align: left;
`;

const Wrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #9D72FF;
  max-width: 200px;
  overflow: hidden;
`;

const Button = styled.div<{$active: boolean}>`
  cursor: pointer;
  width: 50%;
  display: inline-block;
  color: #fff;
  text-align: center;
  font-size: 15px;
  background: transparent;
  padding: 2px 5px;
  transition: all .4s;
  font-family: ${fonts.HelveticaBold};

  ${({$active}) => $active && `
    background: #9D72FF;
  `}
`

export default DaoHeader;
