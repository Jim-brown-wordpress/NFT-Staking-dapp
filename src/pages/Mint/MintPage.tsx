// import { useEffect, useState } from 'react'
// import Header from "components/Header"
// import styled, { createGlobalStyle } from "styled-components"
// import colors from '../../styles/colors'

// const GlobalStyles = createGlobalStyle`
//   body {
//     background: url('/images/mint-background.jpg');
//     background-color: #0D1422;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: 50% 50%;
//     overflow-y: scroll;

//     @media screen and (max-width: 1500px) {
//       background-position: 50% -50%;
//     }

//     @media screen and (max-width: 880px) {
//       background: url('/images/mint-mobile-background.jpg');
//       background-color: #0D1422;
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: 50% 15%;
//     }
//   }
// `

// const MintPage = () => {
//   const countDownDate = new Date("Jun 21, 2022 20:00:00").getTime() - new Date("Jun 21, 2022 20:00:00").getTimezoneOffset() * 60000;

//   const fixNumber = (num: number) => {
//     if (num < 10) {
//       return `0${num}`
//     }
//     return num
//   }

//   const [countDownTimer, setCountDownTimer] = useState<string | null>(null)

//   useEffect(() => {
//     const countDownInterval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = countDownDate - now

//       // Time calculations for days, hours, minutes and seconds
//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // Display the result in the element with id="demo"
//       setCountDownTimer(fixNumber(days) + ":" + fixNumber(hours) + ":"
//         + fixNumber(minutes) + ":" + fixNumber(seconds))

//       // If the count down is finished, write some text
//       if (distance < 0) {
//         setCountDownTimer("MINT NOW");
//       }
//     }, 1000);

//     return () => {
//       clearInterval(countDownInterval)
//     }
//   }, [])

//   const handleMint = () => {
//     console.log('MINT')
//   }

//   return (
//     <>
//       <GlobalStyles />
//       <Wrapper>
//         <Header noEye />
//         <Content>
//           <Mints>0/5717</Mints>
//           <Timer>
//             {countDownTimer}
//           </Timer>
//           <div>
//             <Button onClick={handleMint}>MINT</Button>
//           </div>
//           <Image src={'/images/mint-pyramid.png'} />
//         </Content>
//       </Wrapper>
//     </>
//   )
// }

// export default MintPage

// const Wrapper = styled.div`
//   padding-top: 40px;

//   @media screen and (max-width: 767px) {
//     padding: 0;
//   }
// `
// const Content = styled.div`
//   position: absolute;
//   top: 56%;
//   max-width: 800px;
//   width: 100%;
//   left: calc(50% - 400px);
//   text-align: center;

//   @media screen and (max-width: 1200px) {
//     top: 45%;
//   }

//   @media screen and (max-width: 880px) {
//     top: 60%;
//   }
  
//   @media screen and (max-width: 800px) {
//     max-width: 500px;
//     left: calc(50% - 250px);
//   }


//   @media screen and (max-width: 600px) {
//     width: 100%;
//     max-width: 100%;
//     left: 0;
//     top: 54%;
//     padding-top: 40px;
//   }
//   @media screen and (max-width: 500px) {
//     top: 45%;
//   }

//   @media screen and (max-width: 380px) {
//     top: 43%;
//   }
// `

// const Button = styled.button`
//   background-color: #F5635F;
//   color: ${colors.white};
//   border: none;
//   border-radius: 14px;
//   padding: 0 60px;
//   font-family: 'American Captain';
//   font-size: 50px;
//   padding-top: 10px;
//   position: relative;
//   z-index: 800;
//   margin-bottom: 40px;

//   @media screen and (max-width: 767px) {
//     font-size: 38px;
//   }
// `

// const Timer = styled.div`
//   color: ${colors.white};
//   font-size: 90px;
//   font-family: 'American Captain';
//   width: 100%;
//   margin-bottom: 30px;
//   margin-top: 30px;

//   @media screen and (max-width: 767px) {
//     padding: 0 20px;
//     font-size: 70px;
//   }
// `
// const Image = styled.img`
//   width: 100%;
//   max-width: 400px;
//   position: absolute;
//   right: -200px;
//   bottom: 50px;

//   @media screen and (max-width: 880px) {
//     right: calc(50% - 200px);
//     max-width: 400px;
//     bottom: calc(150% - 40px);
//   }

//   @media screen and (max-width: 767px) {
//     right: calc(50% - 100px);
//     max-width: 200px;
//     bottom: calc(130% - 40px);
//   }


//   @media screen and (max-width: 380px) {
//     right: calc(50% - 100px);
//     max-width: 200px;
//     bottom: calc(120% - 40px);
//   }
// `

// const Mints = styled.div`
//   color: ${colors.white};
//   font-size: 60px;
//   font-family: 'American Captain';

//   @media screen and (max-width: 767px) {
//     font-size: 40px;
//   }
// `
export {}
