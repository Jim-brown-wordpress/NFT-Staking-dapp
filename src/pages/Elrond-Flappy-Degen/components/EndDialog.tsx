import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { logout } from '@elrondnetwork/dapp-core/utils';

const EndDialog = ({
  showDialog,
  score,
  bestScore,
  publicKey,
  setShowModal
}: any) => {
  const navigate = useNavigate();
  const handleLeaderboardClick = async () => {
    const data = await fetch(
      `https://games-api-five.vercel.app/api/flappy-degen/add-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: publicKey,
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
          <ConnectAndPlayButton onClick={handleLeaderboardClick}>
            Add to leaderboard
          </ConnectAndPlayButton>
          <ConnectAndPlayButton
            onClick={() => window.location.reload()}
            color='primary'
          >
            Restart
          </ConnectAndPlayButton>
          <DisconnectWrapper>
            <ConnectAndPlayButton
              onClick={() => {
                setShowModal(false);
                logout(`${window.location.origin}/unlock`);
              }}
            >
              Disconnect
            </ConnectAndPlayButton>
          </DisconnectWrapper>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EndDialog;

const DisconnectWrapper = styled.div`
  & > button {
    transition: all 0.5s;

    background-color: #6337f4;

    &:hover {
      background: purple !important;
      color: white;
    }
  }
`;

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

  @media only screen and (max-width: 900px) {
    min-width: 225px;
  }
`;
export const Button = styled.button<any>`
  background: #6337f4;
  color: $white;
  font-size: 18px;
  padding: 15px 10px;
  line-height: 22px;
  border: 0;
  border-radius: 5px;
  position: relative;
  z-index: 1000;
  transition: all 0.5s;
  font-family: 'Jost Regular';

  ${({ $activate }) =>
    $activate &&
    `
    transform: translateY(100px);
    opacity: 0; 
  `}
`;
