import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const StartDialog = ({ showDialog, setStartDialog }: any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setStartDialog(false);
  };
  return (
    <Dialog
      open={showDialog}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Label>blockchain</Label>
        </DialogContentText>

        <BiggerButton
          onClick={() => {
            // setBlockchain(blockchain === BLOCKCHAINS.SOL ? BLOCKCHAINS.EGLD : BLOCKCHAINS.SOL)
            navigate('/elrond-flappy-degen');
          }}
        >
          Solana
        </BiggerButton>
      </DialogContent>

      <DialogActions>
        <ConnectAndPlayButton onClick={handleClick}>
          Connect wallet & Play
        </ConnectAndPlayButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartDialog;

const ConnectAndPlayButton = styled(WalletMultiButton)`
  background: #6337f4;
  color: white;
  font-size: 22px;
  font-family: 'Jost Regular';
  padding: 15px 20px;
  line-height: 22px;
  border: 0;
  border-radius: 5px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  margin: 0 auto 10px;

  &:hover {
    background: purple !important;
    color: white;
  }
`;

const Label = styled.span<any>`

`;

export const Button = styled.button<any>`
  background: #6337f4;
  color: white;
  font-size: 18px;
  padding: 15px 10px;
  line-height: 22px;
  border: 0;
  border-radius: 5px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  font-family: 'Jost Regular';

  & > span {
    font-size: 10px;
  }

  ${({ $activate }) =>
    $activate &&
    `
    transform: translateY(100px);
    opacity: 0; 
  `}

  ${({ $selected }) =>
    $selected &&
    `
    background: purple;
    color: white;
  `}

  ${({ $amount }) =>
    !$amount &&
    `
    min-width: 90px;
  `}

  ${({ $amount }) =>
    $amount &&
    `
    width: 32%;
  `}

  @media screen and (max-width: 1000px) {
    z-index: 700;
  }
`;
const BiggerButton = styled(Button)`
  min-width: 240px;
  margin-bottom: 15px;

  font-size: 22px;
  font-family: 'Jost Regular';
  &:hover {
    background: purple !important;
    color: white;
  }
`;
