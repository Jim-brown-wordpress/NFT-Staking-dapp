import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';

const EndDialog = ({
  showDialog,
  score,
  bestScore,
  publicKey,
  setShowModal,
  setStartDialog
}: any) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setShowModal(false);
    setStartDialog(true);
  };

  const handleLeaderboardClick = async () => {
    const username = publicKey;

    const data = await fetch(
      `https://games-api-five.vercel.app/api/flappy-degen/add-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username,
          score
        })
      }
    );

    const result = await data.json();
    if (result) {
      localStorage.removeItem('username');
      navigate('/flappy-degen-leaderboard');
    }
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
          Score: {score} &nbsp; Best: {bestScore}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Stack direction={{ md: 'row', xs: 'column' }} spacing={{ xs: 2 }}>
          <ConnectAndPlayButton
            onClick={handleLeaderboardClick}
            color='primary'
          >
            Add to leaderboard
          </ConnectAndPlayButton>
          <ConnectAndPlayButton onClick={() => window.location.reload()}>
            Restart
          </ConnectAndPlayButton>
          <DisconnectWrapper>
            <DisconnectButton onClick={closeModal} />
          </DisconnectWrapper>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EndDialog;

const ConnectAndPlayButton = styled.button`
  background: #6337f4;
  color: white;
  font-size: 22px;
  padding: 15px 20px;
  line-height: 22px;
  border: 0;
  border-radius: 5px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  margin: 0 auto;
  font-family: 'Jost Regular';

  &:hover {
    background: purple !important;
    color: white;
  }
`;

const DisconnectButton = styled(WalletDisconnectButton)`
  @media only screen and (max-width: 900px) {
    min-width: 225px;
  }
`;
const DisconnectWrapper = styled.div`
  display: inline-block;

  & > button {
    transition: all 0.5s;
    padding: 26px;
    background-color: #6337f4;

    &:hover {
      background: purple !important;
      color: white;
    }
  }
`;
