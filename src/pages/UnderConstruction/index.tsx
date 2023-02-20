import styled from "styled-components"
import { Link } from 'react-router-dom';

const UnderConstructionPage = () => {
  return (
    <Wrapper>
      <Pyramid src="/images/under-construction/constructor.png" />
      <UnderConstruction src="/images/under-construction/under-construction.png" />
      <Container>
        <Title>You can still use our dapps</Title>
        <div>
          <LeftCell>
            <Nav to="/launchpad">
              <DesktopPageImage src="/images/under-construction/launchpad-desktop.png" />
              <PageImage src="/images/under-construction/launchpad.png" />
              <TitleWrapper>
                <LaunchpadTitle>LAUNCHPAD</LaunchpadTitle>
              </TitleWrapper>
            </Nav>
          </LeftCell>
          <Cell>
            <Nav to="/dao">
              <DesktopPageImage src="/images/under-construction/dao-desktop.png" />
              <PageImage src="/images/under-construction/dao.png" />
              <DaoTitleWrapper>
                <DaoTitle>DAO</DaoTitle>
              </DaoTitleWrapper>
            </Nav>
          </Cell>
        </div>
        <div>
          <a href="https://twitter.com/newdegenorder" target="_blank">
            <Icon src="/images/twitter.png" />
          </a>
          <a href="https://www.instagram.com/newdegenorder" target="_blank">
            <InstaIcon src="/images/instagram.png" />
          </a>
          <a href="https://discord.com/invite/newdegenorder" target="_blank">
            <Icon src="/images/discord.png" />
          </a>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: end;
  flex-direction: column;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const Container = styled.div`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 30px;
  pointer-events: auto;
  position: relative;
`

const Pyramid = styled.img`
  width: 320px;

  @media screen and (min-width: 1090px) {
    transform: translateX(-200px);
  }

  @media screen and (min-width: 1200px) {
    transform: translateX(-220px);
  }

  @media screen and (min-width: 1425px) {
    transform: translateX(-250px);
  }

  @media screen and (min-width: 1550px) {
    transform: translateY(50px) translateX(-270px);
  }
    
  @media screen and (min-width: 2000px) {
    transform: translateY(100px) translateX(-400px);
    width: 420px;
  }

  
  @media screen and (max-width: 670px) {
    margin: 0 auto;
    max-width: 320px;
    display: block;
    margin-top: 30px;
  }
`

const Title = styled.h1`
  color: #fff;
  margin-top: 80px;


  @media screen and (min-width: 1550px) {
    margin-top: 200px;
  }


  @media screen and (min-width: 2000px) {
    margin-top: 260px;
  }

  @media screen and (max-width: 670px) {
    margin-top: 30px;
  }
`

const UnderConstruction = styled.img`
  position: absolute;
  top: -50px;
  left: 0;
  right: -10px;
  width: 100%;

  @media screen and (min-width: 1200px) {
    top: -120px;
  }

  @media screen and (min-width: 1425px) {
    top: -150px;
  }

  @media screen and (min-width: 2000px) {
    top: -180px;
  }


  @media screen and (max-width: 670px) {
    position: relative;
    top: auto;
    width: 120%;
    margin-top: -170px;
    left: auto;
    right: auto;
    transform: translateX(15%);
  }
`

const Cell = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align: top;
  text-align: left;
  padding: 15px;
`

const PageImage = styled.img`
  width: 100%;
  max-width: 220px;
  transform: scale(1);
  transition: all .4s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 671px) {
    display: none;
  }
`

const DesktopPageImage = styled.img`
  width: 100%;
  max-width: 420px;
  transform: scale(1);
  transition: all .4s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 670px) {
    display: none;
  }
`

const LeftCell = styled(Cell)`
  text-align: right;
`

const LaunchpadTitle = styled.p`
  margin-top: 12px;
  font-size: 18px;
  font-family: 'Jost Bold';
  color: #fff;

  @media screen and (max-width: 670px) {
    text-align: center;
  }
`

const DaoTitle = styled.p`
  font-size: 18px;
  margin-top: 12px;
  font-family: 'Jost Bold';
  color: #fff;
  text-align: center;
`

const Nav = styled(Link)`
  text-decoration: none;
  max-width: 420px;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 670px) {
    max-width: 220px;
  }
  &:hover {
    text-decoration: none;
  }
`

const Icon = styled.img`
  width: 30px;
  margin: 20px;
`

const InstaIcon = styled(Icon)`
  width: 28px;
`

const TitleWrapper = styled.div`
  text-align: center;

  @media screen and (max-width: 670px) {
    text-align: right;
  }
`
const DaoTitleWrapper = styled.div`

`

export default UnderConstructionPage