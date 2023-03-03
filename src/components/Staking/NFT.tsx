import { useState } from 'react'
import styled from 'styled-components'
import colors from 'styles/colors'

interface Props {
  src: string,
  staking: (collection: string , nonce: number) => Promise<void>,
  unstaking: (nonce: number) => Promise<void>,
  collection: string,
  nonce: number,
  selected: boolean,
  purpose: string,
  setChecked: (purpose: string , nonce: number , selected: boolean) =>Promise<void>
}

const NFT = ({ src , staking, unstaking , purpose , setChecked , selected , collection , nonce }: Props) => {
  console.log(selected);
  return (
    <Wrapper>
      <Image src={src} />
      <ButtonsWrapper>
        <Checkbox type='checkbox' checked={selected} onChange={() => setChecked(purpose , nonce , !selected)} />
        <Button className = {purpose == 'unstaking'?'mediapadding':''}  disabled={!selected} onClick = {() => {console.log(nonce); purpose == 'staking'? staking(collection , nonce): unstaking(nonce)}}>{purpose}</Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default NFT

const Wrapper = styled.div`
  background: transparent linear-gradient(180deg, #182844 0%, #111C31 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 30px #00000099;
  border: 3px solid #182844;
  border-radius: 20pt;
  text-align: center;
  padding: 15px;

  @media screen and (max-width: 500px) {
    width: 150px;
    height: 190px;
    padding: 10px;
  }
`

const Image = styled.img`
  width: 214px;
  height: 214px;
  border-radius: 10pt;

  @media screen and (max-width: 500px) {
    width: 120px;
    height: 120px;
  }
`

const ButtonsWrapper = styled.div`
  padding-top: 8px;
  gap: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  box-shadow: 0px 3px 6px #00000029;
  /* mix-blend-mode: overlay; */
  border: 3px solid #233A64;
  border-radius: 10px;
  background: #111E35;
  color: ${colors.white};
  padding: 8px 40px;
  width: 75%;

  &:hover {
    background: #253C68;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media screen and (max-width: 500px) {
    padding: 4px 15px;
    font-size: 15px;
  }
`

const Checkbox = styled.input`
  width: 45px;
  height: 45px;
  border: 3px solid #233A64;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
  cursor: pointer;
  background-color: #111E35;
  padding: 8px;

  &:checked {
    content: url('/images/staking/checkbox.svg');
    background-color: #233A64;
    width: 42px;
  }

  @media screen and (max-width: 400px) {
    width: 25px;
    height: 25px;

    &:checked {
      content: url('/images/staking/checkbox.svg');
      background-color: #233A64;
      width: 25px;
    }
  }
`
