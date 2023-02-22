import { useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import { routeNames } from 'routes';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { serverURL } from "config";
import fonts from "styles/fonts";
import {useMediaQuery} from '@mui/material';

const fixNumber = (num: number) => {
  if (num < 10) {
    return `0${num}`
  }
  return num
}

const calculateWidth = (perc: number): number => {
  if (perc === 0) {
    return 0
  }
  if (perc >= 1 && perc <= 40) {
    return 40
  }
  if (perc >= 60 && perc < 100) {
    return 60
  }
  if (perc === 100) {
    return 100
  }
  return perc
}

const DaoHeadline = ({ headline, address, isVoted, activeTab, setVotes }: { headline: any, address?: string, isVoted?: any, activeTab: number, setVotes: (votes: any) => void }) => {
  const [hline, setHeadline] = useState(headline)
  const [open, setOpen] = useState(false)
  const [yesLoading, setYesLoading] = useState(false)
  const [noLoading, setNoLoading] = useState(false)
  const [voted, setVoted] = useState(isVoted?.vote)
  const [timer, setTimer] = useState<string | null>(null)
  const countDownDate = new Date(hline.endDate).getTime() - new Date(hline.endDate).getTimezoneOffset() * 60000;
  const navigate = useNavigate();
  const [showExpired, setShowExpired] = useState(activeTab !== 1)
  const isMobile = useMediaQuery('(max-width: 600px)');
  const handleYes = async (e: any) => {
    e.preventDefault()
    if (voted || showExpired || yesLoading) {
      return
    }
    setYesLoading(true)
    axios({
      url: `${serverURL}/vote`,
      method: 'POST',
      data: {
        address,
        proposal: hline._id,
        vote: 'yes',
      }
    }).then(res => {
      setYesLoading(false)
      if (!res?.data?.error) {
        setHeadline(res.data)
        setVoted('yes')

        axios.get(`${serverURL}/votes/${address}`).then(r => {
          setVotes(r.data)
        })
      }
    }).catch(() => {
      setYesLoading(false)
    })
  }
  const handleNo = async (e: any) => {
    e.preventDefault()
    if (voted || showExpired || noLoading) {
      return
    }

    setNoLoading(true)
    axios({
      url: `${serverURL}/vote`,
      method: 'POST',
      data: {
        address,
        proposal: hline._id,
        vote: 'no',
      }
    }).then((res) => {
      setNoLoading(false)
      if (!res?.data?.error) {
        setHeadline(res.data)
        setVoted('no')

        axios.get(`${serverURL}/votes/${address}`).then(r => {
          setVotes(r.data)
        })
      }
    }).catch(() => {
      setNoLoading(false)
    })
  }

  useEffect(() => {
    setShowExpired(activeTab !== 1)
  }, [activeTab])

  useEffect(() => {
    setVoted(isVoted?.vote)
  }, [isVoted])

  const percentages = useMemo(() => {
    const allVotes = hline.yesVotes + hline.noVotes
    if (allVotes === 0) {
      return {
        yes: 0,
        no: 0,
        yesCount: 50,
        noCount: 50,
      }
    }
    const yesPercentage = Math.round((hline.yesVotes * 100) / allVotes)
    const noPercentage = Math.round((hline.noVotes * 100) / allVotes)

    return {
      yes: hline.yesVotes,
      no: hline.noVotes,
      yesCount: calculateWidth(yesPercentage),
      noCount: calculateWidth(noPercentage),
    }
  }, [hline])

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      setTimer(fixNumber(days) + ":" + fixNumber(hours) + ":"
        + fixNumber(minutes) + ":" + fixNumber(seconds))

      if (distance < 0) {
        // setShowExpired(true)
        clearInterval(countDownInterval)
      }
    }, 1000);
  }, [])

  const now = new Date().getTime();
  const distance = countDownDate - now

  if (showExpired && distance > 0) {
    return null
  }

  if (!showExpired && distance <= 0) {
    return null
  }

  return (
    <Wrapper>
      <Container open={open}>
        <TextWrapper>
          <Title>{hline.headline}</Title>
          <Text open={open} onClick={() => setOpen(!open)}>
            {hline.text}
          </Text>
          <Arrow onClick={() => setOpen(!open)} open={open} src="/images/arrow.png" />
          <Answer open={open}>
            {address ? (
              <>
                {!showExpired && (
                  <Yes open={open} voted={voted === 'yes'} oppositeVote={voted === 'no'} onClick={handleYes}>YES <ClipLoader color={'#fff'} loading={yesLoading} size={20} /></Yes>
                )}
                {showExpired ? (
                  <No open={open} voted={showExpired}>{`closed`}</No>
                ): (
                  <No open={open} voted={voted === 'no' || showExpired} oppositeVote={voted === 'yes'} onClick={handleNo}>{showExpired ? `closed` : `NO`} <ClipLoader color={'#fff'} loading={noLoading} size={20} /></No>
                )}
              </>
            ) : (
              <Wallet onClick={() => navigate(routeNames.daoUnlock)}>Connect wallet to vote</Wallet>
            )}

          </Answer>
        </TextWrapper>
      </Container>
      <MobileAnswer>
        {address ? (
          <>
            {!showExpired && (
              <>
                <MobileCell voted={voted === 'yes'} oppositeVote={voted === 'no'}>
                  <MobileYes onClick={handleYes} open={open}>YES <ClipLoader color={'#fff'} loading={yesLoading} size={20} /></MobileYes>
                </MobileCell>
              </>
            )}
            {showExpired ? (
              <MobileCell voted={showExpired}>
                <MobileNo open={open}>{`closed`}</MobileNo>
              </MobileCell>
            ) : (
              <MobileCell voted={voted === 'no' || showExpired} oppositeVote={voted === 'yes'}>
                <MobileNo open={open} onClick={handleNo}>{showExpired ? `closed` : `NO`} <ClipLoader color={'#fff'} loading={noLoading} size={20} /></MobileNo>
              </MobileCell>
            )}
          </>
        ) : (
          <MobileWallet onClick={() => navigate(routeNames.daoUnlock)}>Connect wallet to vote</MobileWallet>
        )}
      </MobileAnswer>
      <Time>
        <Icon src="/images/timer.png" /> Time remaining: <strong>{showExpired ? `00:00:00` : timer}</strong>

        {address ? (
          <div>
            <VotesWrapper  style = {{ width: isMobile?'80vw':'' , left: isMobile?'10px':'' }}>
              <Test>
                <div>VOTED YES: {percentages.yes || 0}</div>
                <div>VOTED NO: {percentages.no || 0}</div>
              </Test>
              <YesVoted customWidth={percentages.yesCount} />
              <NoVoted customWidth={percentages.noCount} />
            </VotesWrapper>
          </div>
        ) : null}
      </Time>
    </Wrapper>
  )
}

const Test = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
  margin-bottom: 20px;
`

const Title = styled.h2`
  color: #fff;
  font-family: ${fonts.HelveticaBold};
  font-size: 19px;
  margin: 0;
  margin-bottom: 5px;
  margin-top: 10px;
`

const Container = styled.div`
  background: transparent linear-gradient(180deg, #16253E 0%, #0E1726 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 30px #00000029;
  mix-blend-mode: overlay;
  border: 2px solid #2C4A7E;
  border-radius: 20px;
  height: 140px;
  overflow: hidden;
  transition: all .2s linear;
  position: relative;
  margin-bottom: 20px;

  ${(props: { open: boolean }) => props.open && css`
    height: 100%;
    min-height: 400px;
  `}

  @media screen and (max-width: 767px) {
    border-radius: 20px;
    height: 200px;

    ${(props: { open: boolean }) => props.open && css`
      height: 100%;
      min-height: 456px;
    `}
  }
`

const TextWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  padding-left: 40px;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  padding-right: calc(15% + 80px);

  @media screen and (max-width: 767px) {
    width: 100%;
    padding-right: 20px;
  }
`

const Arrow = styled.img`
  width: 40px;
  position: absolute;
  right: calc(15% + 25px);
  top: 60px;
  transition: all .2s linear;
  transform: rotate(0);

  ${(props: { open: boolean }) => props.open && css`
    top: calc(100% - 50px);
    right: calc(50% - 20px);
    transform: rotate(180deg);
  `}

  @media screen and (max-width: 767px) {
    width: 30px;
    top: 170px;
    right: calc(50% - 20px);

    ${(props: { open: boolean }) => props.open && css`
      top: calc(100% - 50px);
      right: calc(50% - 20px);
      transform: rotate(180deg);
    `}
  }
`

const Text = styled.div`
  font-size: 12px;
  height: 94px;
  overflow: hidden;
  transition: all .2s linear;
  white-space: pre-line;
  font-family: ${fonts.HelveticaRegular};

  ${(props: { open: boolean }) => props.open && css`
    min-height: 340px;
    height: 100%;
  `}

  @media screen and (max-width: 767px) {
    height: 144px;
    padding-left: 20px;


    ${(props: { open: boolean }) => props.open && css`
      min-height: 400px;
      height: 100%;
    `}
  }
`

const Answer = styled.div`
  width: 15%;
  border: 2px solid #2C4A7E;
  vertical-align: top;
  border-radius: 20px;
  background: transparent;
  overflow: hidden;
  transition: all .2s ease-in-out;
  position: absolute;
  top: -1px;
  bottom: -1px;
  right: -1px;

  ${(props: { open: boolean }) => props.open && css`

    bottom: 0;
  `}

  @media screen and (max-width: 767px) {
    display: none;
  }
`

const MobileAnswer = styled.div`
  padding: 10px 20px;
  color: #fff;

  @media screen and (min-width: 768px) {
    display: none;
  }

`

const VotesWrapper = styled.div`
  width: 500px;
  position: absolute;
  right: 10px;
  color: #fff;
  top: 0px;
  margin-bottom: 10px;

  @media screen and (max-width: 767px) {
    left: calc(50% - 60px);
    top: 30px;
  }
`

const YesVoted = styled.div`
  display: inline-block;
  width: 50%;
  background: #2AE865;
  height: 15px;
  line-height: 25px;
  font-size: 12px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-top: 3px;

  ${(props: { customWidth: number }) => typeof props.customWidth === 'number' && css`
    width: ${props.customWidth}%;
  `}
  ${(props: { customWidth: number }) => props.customWidth === 0 && css`
    display: none;
  `}
`

const NoVoted = styled.div`
  display: inline-block;
  width: 50%;
  background: #D92424;
  height: 15px;
  line-height: 25px;
  font-size: 12px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: 3px;

  ${(props: { customWidth: number }) => typeof props.customWidth === 'number' && css`
    width: ${props.customWidth}%;
  `}
  ${(props: { customWidth: number }) => props.customWidth === 0 && css`
    display: none;
  `}
`

const Time = styled.div`
  text-align: left;
  color: #fff;
  position: relative;
  padding-top: 10px;
  padding-left: 40px;
  font-size: 14px;

  @media screen and (max-width: 767px) {
    padding-top: 0;
    padding-bottom: 30px;
  }
`

const Yes = styled.div`
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 30px;
  font-family: ${fonts.HelveticaBold};
  border-bottom: 1px solid #2C4A7E;
  cursor: pointer;
  transition: all .2s linear;

  ${(props: { open: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.voted && css`
    height: 100%;
    line-height: 140px;
    background: #2f4e85;
  `}

  ${(props: { open: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.open && css`
    height: 50%;
    line-height: 200px;

    ${(props: { open: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.voted && css`
      height: 100%;
      line-height: 400px;
    `}
  `}
  ${(props: { open: boolean,  loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.loader && css`
    padding-top: 10px;
  `}
  ${(props: { open: boolean,  loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.oppositeVote && css`
    display: none;
    height: 0;
  `}
`

const No = styled.div`
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 30px;
  font-family: ${fonts.HelveticaBold};
  cursor: pointer;

  ${(props: { open?: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.loader && css`
    padding-top: 10px;
  `}

  ${(props: { open?: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.voted && css`
    height: 100%;
    line-height: 140px;
    background: #2f4e85;
  `}

  ${(props: { open?: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.open && css`
    height: 50%;
    line-height: 200px;

    ${(props: { open?: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.voted && css`
      height: 100%;
      line-height: 400px;
    `}
  `}

  ${(props: { open?: boolean, loader?: boolean, voted?: boolean, oppositeVote?: boolean }) => props.oppositeVote && css`
    height: 0;
    display: none;
  `}
`

const Wallet = styled.div`
  height: 70px;
  text-align: center;
  font-size: 18px;
  font-family: ${fonts.HelveticaBold};
  cursor: pointer;
  line-height: 24px;
  padding: 45px 5px 0;
`

const MobileYes = styled.div`
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  font-family: ${fonts.HelveticaBold};
  background: #538495;
  cursor: pointer;
  border-radius: 20px;
  transition: all .2s linear;

  ${(props: { open: boolean, loader?: boolean }) => props.loader && css`
    padding-top: 5px;
  `}

  ${(props: { open: boolean, loader?: boolean }) => props.open && css`
    height: 80px;
    line-height: 80px;

    ${(props: { open: boolean, loader?: boolean }) => props.loader && css`
      padding-top: 10px;
    `}
  `}
`

const MobileNo = styled.div`
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  font-family: ${fonts.HelveticaBold};
  cursor: pointer;
  border-radius: 20px;
  transition: all .2s linear;
  background: #FC635F;

  ${(props: { open: boolean, loader?: boolean }) => props.loader && css`
    padding-top: 5px;
  `}

  ${(props: { open: boolean, loader?: boolean }) => props.open && css`
    height: 80px;
    line-height: 80px;

    ${(props: { open: boolean, loader?: boolean }) => props.loader && css`
      padding-top: 10px;
    `}
  `}
`

const MobileWallet = styled.div`
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: ${fonts.HelveticaBold};
  cursor: pointer;
  line-height: 40px;
  border-radius: 20px;
  background: #FC635F;
`

const MobileCell = styled.div`
  padding: 0 5px;
  width: 50%;
  display: inline-block;
  vertical-align: top;
  transition: width .2s linear;

  ${(props: { voted?: boolean, oppositeVote?: boolean }) => props.voted && css`
    width: 100%;
  `}

  ${(props: { voted?: boolean, oppositeVote?: boolean }) => props.oppositeVote && css`
    width: 0;
    padding: 0;
    overflow: hidden;
  `}
`

const Icon = styled.img`
  width: 15px;
  margin-bottom: -3px;
`

export default DaoHeadline
