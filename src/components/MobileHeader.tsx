import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { breakpoints } from "styles/breakpoints";
import colors from "styles/colors";
import fonts from "styles/fonts";
import { Image, ImageContainer } from "./Header";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const GlobalStyles = createGlobalStyle`
    body {
      overflow: hidden;
    }
  `

  return (
    <Header>
      {isOpen ? <GlobalStyles /> : null}
      <Wrapper>
        <ImageContainer>
          <Image src={'/images/header-symbol.png'} />
        </ImageContainer>
        <Burger onClick={() => setIsOpen(!isOpen)}>
          <BurgerIcon src='/images/burger-menu.svg' alt='burger-icon' />
        </Burger>
      </Wrapper>
      {isOpen ? (
        <Navigation>
          <StyledLink to="/" onClick={() => setIsOpen(false)}>About</StyledLink>
          <StyledLink to="/dao" onClick={() => setIsOpen(false)}>DAO</StyledLink>
          <StyledLink to = '/staking' onClick={() => setIsOpen(false)}>
            Staking
          </StyledLink>
          <StyledLink $disabled to="/#" onClick={() => setIsOpen(false)}>
            Raffles
            <span>Coming soon</span>
          </StyledLink>
          <StyledLink $disabled to="/# onClick={() => setIsOpen(false)}">
            DeRug
            <span>Coming soon</span>
          </StyledLink>
          <StyledLink to="/flip-coin" onClick={() => setIsOpen(false)}>Coin Flip</StyledLink>
          <StyledLink to="/flappy-degen" onClick={() => setIsOpen(false)}>Flappy Degen</StyledLink>
          <CloseButton onClick={() => setIsOpen(false)}>CLOSE</CloseButton>
        </Navigation>
      ) : null}
  </Header>
  )
}

export default MobileHeader

const Header = styled.header`
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 99999;

  @media screen and (min-width: ${breakpoints.minDesktop}px) {
    display: none;
  }
`

const BurgerIcon = styled.img`
  width: 100%;
`

const Burger = styled.div`
  width: 30px;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  @media screen and (max-width: 700px) {
    left: 0;
    width: 100%;
    border-radius: 0;
  }
`

const StyledLink = (styled(Link))<{$disabled?:boolean}>`
  color: ${colors.white};
  font-size: 17px;
  padding: 30px 0;
  position: relative;

  ${({$disabled}) => $disabled && `
    color: ${colors.grey02} !important;
    cursor: not-allowed;

    & > span {
      font-size: 12px;
      color: ${colors.red};
      position: absolute;
      bottom: 20px;
      right: -30px;
      transform: rotate(-25deg);
    }
  `}
`

const CloseButton = styled.button`
  border: none;
  font-size: 17px;
  padding: 10px 20px;
  background-color: #0C1422;
  color: ${colors.white};
  border-radius: 20px;
  font-family: ${fonts.HelveticaBold};
  padding: 15px 20px;
  width: 50%;
`
