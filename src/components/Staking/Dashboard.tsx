import { BackgroundTitle, Container } from "components/Home"
import { useEffect, useState } from "react"
import styled from "styled-components"
import colors from "styles/colors"
import Information from "./Information"
import NFT from "./NFT"

import {contractAddress, NFT_COLLECTION_ID, NFT_STAKING_CONTRACT_NAME} from 'config';
import {ArrowBackIos , ArrowForwardIos} from '@material-ui/icons'

import {
  useGetNetworkConfig,
  useGetAccountInfo,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core/hooks';

import {
  getEgldLabel,
  refreshAccount,
} from '@elrondnetwork/dapp-core/utils';

import {
  sendTransactions
} from '@elrondnetwork/dapp-core/services';

import {
} from '@elrondnetwork/dapp-core/constants';

import {
  AddressValue,
  Address,
  ArgSerializer,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  ResultsParser,
  SmartContract,
  Transaction,
  TransactionPayload,
  TransactionWatcher,
  TypedValue,
  U32Value,
  TokenPayment,
  MultiESDTNFTTransferPayloadBuilder,
  AbiRegistry,
  SmartContractAbi,
  Account,
} from '@elrondnetwork/erdjs';


import {
  ProxyNetworkProvider ,
  ApiNetworkProvider
} from '@elrondnetwork/erdjs-network-providers/out';
import axios from "axios";

import nftStakingAbi from 'abi/geckon-staking-sc.abi.json';
import {chainID , apiURL} from 'config';

type InftInfo = {
  collection: string,
  nonce: number,
  royalties: number,
  url: string,
  selected: boolean
}





const Dashboard = () => {

  const {
    address
  } = useGetAccountInfo();

  const isLoggedIn = Boolean(address);

  const {
    network: {
      apiAddress
    }
  } = useGetNetworkConfig();

  const {hasPendingTransactions} = useGetPendingTransactions();

  const networkProvider = new ApiNetworkProvider(apiAddress);

  const [nftInfo , setnftInfo] = useState<InftInfo[]>([]);
  const [contractInteractor , setContractInteractor] = useState<any>(undefined);


  useEffect(() => {
    // staking();
    // queryFunction();

    const ABI = nftStakingAbi as any;

    (async () => {

      const abiRegistry = AbiRegistry.create(ABI);
      const abi = new SmartContractAbi(abiRegistry , [
        NFT_STAKING_CONTRACT_NAME
      ]);
      const contract = new SmartContract({
        address: new Address(contractAddress),
        abi
      });

      setContractInteractor(contract);

    })();

  } ,[]);
  const [accountStatus, setAccountStatus] = useState<any>();
  const [currentReward, setCurrentReward] = useState(0);
  const [precision, setPrecision] = useState(2);
  const [decimal, setDecimal] = useState(18);

  useEffect(() => {
    if(isLoggedIn) {
      axios.get(`${apiURL}/accounts/${address}/nfts?collection=${NFT_COLLECTION_ID}`)
        .then(result => {
          if (result.status === 200 ){
              setnftInfo(result.data.map((item: InftInfo) => ({
                collection: item.collection,
                nonce: item.nonce,
                royalties: item.royalties,
                url: item.url,
                selected: false
              })));
              console.log(result.data);
          }
        });
    }

    (async () => {

      if(!contractInteractor) return;
      const query = contractInteractor.createQuery({
        func: new ContractFunction('getStakingStatus')
      });
      const resultsParser = new ResultsParser();
      const response = await networkProvider.queryContract(query);
      const endpointDefinition =
        contractInteractor.getEndpoint('getStakingStatus');
      const res = resultsParser.parseQueryResponse(
        response,
        endpointDefinition
      );
      const value = res.firstValue?.valueOf();
      console.log(value);

    })();

    (async () => {

      if(!contractInteractor) return;

      if (isLoggedIn) {
        const query = contractInteractor.createQuery({
          func: new ContractFunction('getAccountState'),
          args: [new AddressValue(new Address(address))]
        });
        const resultsParser = new ResultsParser();
        const response = await networkProvider.queryContract(query);
        const endpointDefinition =
          contractInteractor.getEndpoint('getAccountState');
        const res = resultsParser.parseQueryResponse(
          response,
          endpointDefinition
        );
        const value = res.firstValue?.valueOf();
        const items: any = [];
        value.map((item: any) => {
          items.push({
            nft_nonce: item.nft_nonce.toNumber()
          });
        });
        // setAccountStatus(items);
        axios.get(`${apiURL}/accounts/${contractAddress}/nfts?collection=${NFT_COLLECTION_ID}`)
        .then(result => {
          if (result.status === 200 ){
            console.log(result.data);
            const stakedItems = [];
              for(let i = 0;i <result.data.length; i++)
                for(let j = 0; j< items.length; j++)
                  if(items[j].nft_nonce == result.data[i].nonce){
                    stakedItems.push({url: result.data[i].url , nonce: result.data[i].nonce , selected: false});
                    continue;
                  }
              setAccountStatus(stakedItems);
          }
        });
      }

    })();

    (async () => {
      if(!contractInteractor) return;

      if(isLoggedIn) {
        const query = contractInteractor.createQuery({
          func: new ContractFunction('getCurrentReward'),
          args: [new AddressValue(new Address(address))]
        });
        const resultParser = new ResultsParser();
        const response = await networkProvider.queryContract(query);
        const endpointDefinition =
          contractInteractor.getEndpoint('getCurrentReward');
        const res = resultParser.parseQueryResponse(
          response,
          endpointDefinition
        );
        let value = res.firstValue?.valueOf();
        console.log(value.toNumber());
        value = value.div(Math.pow(10 , decimal)).toNumber();
        const factor = Math.pow(10 , precision);
        value = Math.floor(value * factor) / factor;
        setCurrentReward(value);
        console.log(value);
      }
    })();


  } , [contractInteractor , hasPendingTransactions]);

  const staking = async (
    collection: string , nonce: number
  ) => {
    const payment = TokenPayment.nonFungible(collection , nonce);
    const userAccount = new Account(new Address(address));
    const gas = 100000000;
    console.log(gas);

    console.log(collection , nonce , gas , payment , userAccount);
    const tx = contractInteractor.methods
      .stake()
      .withNonce(userAccount.nonce)
      .withGasLimit(gas)
      .withChainID(chainID)
      .withSingleESDTNFTTransfer(payment  ,new Address(address))
      .buildTransaction();


    await refreshAccount();
    let x = await sendTransactions({
      transactions: [tx],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Staking transaction',
        errorMessage: 'An error has occured during Stake',
        successMessage: 'Staking transaction successful'
      },
      redirectAfterSign: false
    })
    console.log(x);

    // ESDTTRansferBuil

  }


  const stakingSelected = async () => {

    let payments = [];
    for (let i = 0 ;i < nftInfo.length; i++){
      if(nftInfo[i].selected)
        payments.push(TokenPayment.nonFungible(nftInfo[i].collection, nftInfo[i].nonce));
    }

    if(payments.length == 0)
      return;

    let gas = 10000000 + 4000000 * payments.length;
    if(gas > 600000000) gas = 600000000;

    const userAccount = new Account(new Address(address));
    const tx = contractInteractor.methods
      .stake()
      .withNonce(userAccount.nonce)
      .withGasLimit(gas)
      .withChainID(chainID)
      .withMultiESDTNFTTransfer(payments,new Address(address))
      .buildTransaction();

    await refreshAccount();
    let x = await sendTransactions({
      transactions: [tx],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unstaking transaction',
        errorMessage: 'An error has occured during Unstake',
        successMessage: 'Unstaking transaction successful'
      },
      redirectAfterSign: false
    });
    console.log(x);
  }

  const getStakingStatus = async () => {
    const contract = new SmartContract({address: new Address(contractAddress)});
    let query = contract.createQuery({
      func: new ContractFunction("getStakingStatus"),
      args: [ /* new AddressValue(new Address(address)) */],
      caller: new Address(address)
    });

    const queryResponse = await networkProvider.queryContract(query);
    const resultsParser = new ResultsParser();

    const endpointDefinition : any =
          contractInteractor.getEndpoint('getStakingStatus');
    let bundle = resultsParser.parseQueryResponse(
      queryResponse,
      endpointDefinition
    );

    const value = bundle.firstValue?.valueOf();
    console.log(value);
  }

  const unstaking = async (
    nonce: number
  ) => {
    const args: TypedValue[] = [];

    args.push(BytesValue.fromUTF8(NFT_COLLECTION_ID));
    args.push(new BigUIntValue(nonce.valueOf()));

    const {argumentsString} = new ArgSerializer().valuesToString(args);
    const data = new TransactionPayload(`unstake@${argumentsString}`);
    let gas = 20000000;

    const tx = {
      receiver: contractAddress,
      gasLimit: gas,
      value: 0,
      data: data.toString()
    };

    await refreshAccount();

    await sendTransactions({
      transactions: tx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unstaking transaction',
        errorMessage: 'An error has occured during Unstake',
        successMessage: 'Unstaking transaction successful'
      },
      redirectAfterSign: false
    });
  }

  const unstakingSelected = async () => {
    const args: TypedValue[] = [];

    for(let i = 0; i< accountStatus.length; i++)
      if(accountStatus[i].selected) {
          args.push(BytesValue.fromUTF8(NFT_COLLECTION_ID));
          args.push(new BigUIntValue(accountStatus[i].nonce.valueOf()));
      }

    if(args.length == 0)
      return;

    const {argumentsString} = new ArgSerializer().valuesToString(args);
    const data = new TransactionPayload(`unstake@${argumentsString}`);
    let gas = 20000000;

    const tx = {
      receiver: contractAddress,
      gasLimit: gas,
      value: 0,
      data: data.toString()
    };

    await refreshAccount();

    await sendTransactions({
      transactions: tx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unstaking transaction',
        errorMessage: 'An error has occured during Unstake',
        successMessage: 'Unstaking transaction successful'
      },
      redirectAfterSign: false
    });
  }

  const claim = async () => {
    const data = new TransactionPayload(`claim`);
    let gas = 10000000;

    const tx = {
      receiver: contractAddress,
      gasLimit: gas,
      value: 0,
      data: data.toString()
    };

    await refreshAccount();
    await sendTransactions({
      transactions: tx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unstaking transaction',
        errorMessage: 'An error has occured during Unstake',
        successMessage: 'Unstaking transaction successful'
      },
      redirectAfterSign: false
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const data = {
    rewards: [10.24, 5.12, 2.56, 1.28, 0.64, 0.32, 0.16],
    halvingPeriod: [1, 2, 3, 4, 5, 6, 7]
  }

  const setChecked = async (purpose: string , nonce: number , selected: boolean) => {
    if(purpose == 'staking'){
      console.log(nftInfo);
      setnftInfo(await nftInfo.map(item => item.nonce == nonce ? {...item , selected}: item));
      console.log(await nftInfo.map(item => item.nonce == nonce ? {...item , selected}: item));
    }
    else {
      console.log(accountStatus);
      setAccountStatus(await accountStatus.map((item: any) => item.nonce == nonce ? {...item , selected}: item));
      console.log(await accountStatus.map((item: any) => item.nonce == nonce ? {...item , selected}: item));
    }
  }

  return (
    <Container dark style = {{ minHeight: '110vh', bottom: '80px' }}>
      <BackgroundTitle $order={8} src="/images/staking/staking-background-title.svg" alt="Staking" />
      <InformationButton onClick={() => {
        getStakingStatus();
        setIsOpen(true);
        }}>Information</InformationButton>
      <ContentWrapper>
        <TitleContainer >
          <Title>AVAILABLE<SubTitle>All the Pyramids you have in wallet</SubTitle></Title>
          <Button onClick = {stakingSelected}>STAKE SELECTED</Button>
        </TitleContainer>
        <StakingContainer>
          <Wrapper>
            <InnerWrapper>
              {/* <ArrowBackIos style={{ position: 'fixed' , top: 60 , left: -30 , fontSize: 35 }} /> */}
              {nftInfo?.map((nft: any, index) => {
                return <NFT src={nft.url} nonce = {nft.nonce} setChecked = {setChecked} collection = {nft.collection} key={index} staking = {staking} unstaking = {unstaking} selected = {nft.selected} purpose = 'staking' />
              })}
              {/* <ArrowForwardIos onClick = {() => console.log('x')} style={{ position: 'fixed' , top: 60 , right: -30 , fontSize: 35 }} /> */}
            </InnerWrapper>
          </Wrapper>
        </StakingContainer>
          <MarginTop15>
        <TitleContainer>
            <Title>STAKED<SubTitle>All the Pyramids you have staked</SubTitle></Title>
            <Button onClick = {unstakingSelected}>UNSTAKE SELECTED</Button>
        </TitleContainer>
          </MarginTop15>
        <StakingContainer>
          {accountStatus?.length ? (
            <Wrapper>
              <InnerWrapper>
                {accountStatus.map((nft: any, index: any) => {
                  return <NFT src={nft.url} key={index}   nonce = {nft.nonce} setChecked = {setChecked} collection = {NFT_COLLECTION_ID}  staking = {staking} unstaking = {unstaking} selected = {nft.selected} purpose = 'unstaking' />
                })}
              </InnerWrapper>
            </Wrapper>
          ) : (

                <MedaiFont25>
                  You have no STAKED Pyramids yet.
                  <div>Once you Stake a Pyramid it will appear here.</div>
              </MedaiFont25>

          )}
        </StakingContainer>
        <TitleContainer $right >
          <Button style = {{ marginTop: '40px' }} onClick = {claim}><span>CLAIM</span></Button>
        </TitleContainer>
      </ContentWrapper>
      <Information currentReward={currentReward} data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  )
}

export default Dashboard

const MedaiFont25 = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 25px !important;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  color: ${colors.white};
  text-align: left;
  margin: 0;

  @media screen and (max-width: 500px) {
    font-size: 18px;
    margin-left: 12px;
  }

  div {
    @media screen and (max-width: 500px) {
      font-size: 15px;
      margin-top: 10px;
    }
  }
`
const MarginTop15 = styled.div`
  @media screen and (max-width: 500px) {
    margin-top: 25px;
  }
`

const SubTitle = styled.div`
  max-width: 200px;
  font-size: 20px;
  display: inline-block;
  padding-left: 10px;

  @media screen and (max-width: 500px) {
    padding-left: 0;
    max-width: 150px;
  }
`

const Wrapper = styled.div`
  position: absolute;
  left: -5px;
  right: -5px;
  top: -15px;
  overflow: hidden;
`

const InnerWrapper = styled.div`
  display: flex;
  overflow-x: visible;
  gap: 18px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1050px;
  margin: 0 auto;
  width: 100%;
`

const Button = styled.button`
  background: transparent;
  box-shadow: 0px 3px 6px #00000029;
  border: 3px solid ${colors.purple};
  border-radius: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${colors.white};
  max-width: 210px;
  padding: 10px 24px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.purple};
  }

  span {
    // color: #363D48;
    margin-right: 10px;
  }

  @media screen and (max-width: 500px) {
    width: 250px;
    margin-right: 12px;
  }
`

const InformationButton = styled.div`
  background-color: ${colors.purple};
  border-radius: 10px;
  padding: 10px 6px;
  border: none;
  width: 170px;
  color: ${colors.white};
  transform: rotate(90deg);
  position: absolute;
  right: 0;
  cursor: pointer;

  @media screen and (max-width: 1275px) {
    margin-top: -20px;
    transform: rotate(0deg);
  }
  @media screen and (max-width: 500px) {
    left: 10px;
    margin-bottom: 10px;
  }
`

const StakingContainer = styled.div`
  background: #18284410 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #000000FD;
  border: 3px solid #9D72FF;
  border-radius: 20px;
  opacity: 1;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 20px 40px;
  height: 250px;
  display: flex;
  align-items: center;
  position: relative;

  p {
    font-size: 50px;
    text-align: left;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Helvetica Neue Condensed Bold';

    div {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 500px) {
    height: 160px;
    margin-left: 15px;
    margin-right: 15px;
    P {
      div {


        font-size: 15px !important;
      }
    }
  }
`

const TitleContainer = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0 30px;

  ${({ $right }) => $right && `
    justify-content: flex-end;
    padding-top: 30px;

    @media screen and (max-width: 500px) {
      padding-top: 0px !important;
    }
  `}

  @media screen and (max-width: 500px) {
    padding: 70px 0 30px;
  }

`
