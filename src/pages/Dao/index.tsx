import styled, { css } from 'styled-components';
import DaoHeader from 'components/DaoHeader';
import DaoHeadline from 'components/DaoHeadline';
import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
} from '@elrondnetwork/dapp-core/hooks';

import { network, serverURL } from 'config';
import axios from 'axios';
import { BackgroundTitle } from 'components/Home';
import colors from 'styles/colors';
import Footer from 'components/Footer';

const DaoPage = () => {
  const [headlines, setHeadlines] = useState<any>([])
  const [activeTab, setActiveTab] = useState(1)
  const [nfts, setNfts] = useState(0)
  const [votes, setVotes] = useState([])

  useEffect(() => {
    document.body.classList.add("dao");
  }, [])
  const { address } = useGetAccountInfo()

  useEffect(() => {
    axios.get(`${serverURL}/proposals`).then(res => {
      setHeadlines(res.data)
    })
  }, [])

  useEffect(() => {
    console.log('DAO!!')
    if (address) {
      const { apiAddress } = network;

      axios.get(`${serverURL}/votes/${address}`).then(res => {
        setVotes(res.data)
      })
      //NDOA-10ba86 - test
      //NDO-950433 - prod
      axios.get(`${apiAddress}/accounts/${address}/nfts/count?collections=NDO-950433`).then((res) => {
        setNfts(res.data || 0);
      })
    }
  }, [address])

  const openProposals = headlines.filter((h: any) => {
    const now = new Date().getTime();
    const countDownDate = new Date(h.endDate).getTime() - new Date(h.endDate).getTimezoneOffset() * 60000;
    const distance = countDownDate - now

    return distance > 0
  })
  const data = [
    {
      text: 'Live',
    },
    {
      text: 'Closed',
    }
  ]

  return (
    <>
      <Wrapper>
        <BackgroundTitle src='/images/dao/dao-background-title.svg' $order={'dao-left'} alt='Dao' />
        <BackgroundTitle src='/images/dao/dao-background-title-r.svg' $order={'dao-right'} alt='Dao' />
        <Container>
          <DaoHeader activeTab={activeTab} setActiveTab={setActiveTab} data={data} />
          <HeadlineContainer>
            <ScrollWrapper>
              {headlines.map((headline: any) => {
                return (
                  <DaoHeadline
                    key={headline._id}
                    headline={headline}
                    address={address}
                    activeTab={activeTab}
                    isVoted={votes.filter((v: any) => v.proposal === headline._id)?.[0]}
                    setVotes={setVotes}
                  />
                )
              })}
            </ScrollWrapper>
          </HeadlineContainer>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default DaoPage;

const HeadlineContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 3px solid ${colors.purple};
`

const ScrollWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 320px);
  padding-right: 20px;

  ::-webkit-scrollbar {
    width: 1em;
    border: 1px solid ${colors.purple};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    margin-left: 20px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.purple};
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
  }
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  overflow: scroll;
  height: 100%;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media screen and (max-width: 1000px) {
    padding: 0 10px;
  }
`;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 50px auto 0;
  position: relative;
  height: calc(100vh - 210px);
`;
