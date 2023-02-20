import Footer from "components/Footer";
import ModalSteps from "components/Modal/ModalSteps";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100%;
  }
`;

const Launchpad = () => {
  const [buttonName, setButtonName] = useState('SUBMIT')
  const [formStage, setFormStage] = useState(0)

  useEffect(() => {
    document.body.classList.add("dao");
  }, [])

  const handleHover = () => {
    setButtonName('YOUR PROJECT')
  }
  const handleHoverOut = () => {
    setButtonName('SUBMIT')
  }

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        {!(formStage === 11) && (<EarthImage rotation={buttonName === 'YOUR PROJECT'} clicked={formStage > 0} src="/images/green planet.png" />)}
        {formStage > 0 ? (
          <>
            <MobileTitle>DEGEN LAUNCHPAD</MobileTitle>
            <ModalSteps formStage={formStage} setFormStage={setFormStage} />
          </>
        ): (
          <>
            <Title>DEGEN LAUNCHPAD</Title>
            <div>
              <div>
                <Icon src="/images/launchpad-icon.png" />
              </div>
              <div>
                <Label>SUBMIT YOUR PROJECT</Label>
              </div>
              <div>
                <Button
                  onMouseOver={handleHover}
                  onMouseLeave={handleHoverOut}
                  onClick={() => setFormStage(1)}
                >{buttonName}</Button>
              </div>
            </div>
            <Footer />
          </>
        )}

        {formStage === 11 && (
          <>
            <Gorgon src="/images/gorgon.png" />
            <Thanks>
              Thank you!
            </Thanks>
            <ThanksLabel>We will reach out to you shortly.</ThanksLabel>
            <Footer />
          </>
        )}
        <ToastContainer autoClose={10000} position='bottom-left' />
      </Wrapper>
    </>
  )
}

const EarthImage = styled.img`
  width: 350px;
  position: absolute;
  top: -175px;
  left: calc(50% - 175px);
  transform: rotate(100deg);

  ${(props: { rotation: boolean, clicked: boolean }) => props.rotation && css`
    animation: 1s ${greenRotate} forwards;
  `}

  ${(props: { rotation: boolean, clicked: boolean }) => !props.rotation && css`
    animation: 1s ${greenRotateBack} forwards;
  `}

  ${(props: { rotation: boolean, clicked: boolean }) => props.clicked && css`
    animation: 1.5s ${greenClickRotate} forwards;
  `}

  @media screen and (max-width: 768px) {
    top: 60px;
    width: 270px;
    left: calc(50% - 135px);

    ${(props: { rotation: boolean, clicked: boolean }) => props.clicked && css`
      animation: 1.5s ${mobileGreenClickRotate} forwards;
    `}
  }

`
const greenRotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(100deg);
  }
`;
const mobileGreenClickRotate = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(230px) rotate(100deg);
  }
`;
const greenClickRotate = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(330px) rotate(100deg);
  }
`;
const greenRotateBack = keyframes`
  0% {
    transform: rotate(100deg);
  }
  100% {
    transform: rotate(0);
  }
`;

const Icon = styled.img`
  width: 130px;
  margin-top: 30px;
`

const Title = styled.h1`
  color: #fff;
  font-size: 100px;
  margin-top: 90px;
  position: relative;

  @media screen and (max-width: 768px) {
    font-size: 42px;
    margin-top: 250px;
  }
`

const MobileTitle = styled(Title)`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 40px;
  }
`

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding-top: 100px;
  height: 100%;
  position: relative;
`

const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 30px;
  width: 340px;
  border: 0;
  outline: none;
  cursor: pointer;
  font-size: 36px;
  font-family: "Jost Bold";
  `
  
const Label = styled.span`
  color: #fff;
  font-size: 16px;
  font-family: "Jost Semibold";
  margin-bottom: 10px;
  display: inline-block;
`


const Gorgon = styled.img`
  width: 400px;
  margin-top: -50px;
`

const Thanks = styled.h2`
  color: #fff;
  font-family: "Jost Bold";
  font-size: 82px;
  margin-top: -200px;

  @media screen and (max-width: 768px) {
    font-size: 48px;
    margin-top: -170px;
  }
`

const ThanksLabel = styled.p`
  margin-top: 0px;
  color: #fff;
  font-family: "Jost Bold";
  font-size: 32px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`

export default Launchpad