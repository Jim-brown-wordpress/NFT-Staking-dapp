import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import './App.css';
import { createGlobalStyle } from 'styled-components';

const hideWalletAddress = (address: string) =>
  `${address.slice(0, 5)}....${address.slice(
    address.length - 7,
    address.length + 1
  )}`;
const GlobalStyles = createGlobalStyle<{ theme: any }>`
  body {
    overflow-y: scroll;
  }

`;

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
});

const Leaderboard = () => {
  const [results, setResults] = useState<any>(null);
  const [pages, setPages] = useState<any>(null);
  const navigate = useNavigate();
  const fetchData = async (page = 1) => {
    const data = await fetch(
      `https://games-api-five.vercel.app/api/flappy-degen/leaderboard`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ limit: 20, page })
      }
    );

    const { flappyUsers, totalPages } = await data.json();

    setResults(flappyUsers);
    setPages(totalPages);
  };

  const handlePageClick = async (_: any, value: any) => {
    await fetchData(value);
  };
  const handleClick = () => {
    navigate('/flappy-degen');
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <GlobalStyles />
      <Grid container justifyContent='center'>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true
                }
              }
            },
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 246)' },
              background: { paper: 'rgb(5, 30, 52)' }
            }
          })}
        >
          <Grid item xs={10} md={6}>
            <Stack
              direction='row'
              spacing={2}
              justifyContent='center'
              alignItems='center'
            >
              <h3>Leaderboard</h3>
            </Stack>
            <Button variant='text' onClick={handleClick}>
              Back to Flappy degen
            </Button>
            <Paper elevation={0}>
              <FireNav>
                {results?.map((result: any) => (
                  <ListItem
                    disablePadding
                    key={result._id}
                    secondaryAction={result.score + ''}
                  >
                    <ListItemButton component='a' href='#simple-list'>
                      <ListItemText
                        primary={
                          result.username.length > 43
                            ? hideWalletAddress(result.username)
                            : result.username
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </FireNav>
            </Paper>

            <Box sx={{ mt: 2 }}>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <Pagination
                  count={pages || 0}
                  color='primary'
                  onChange={handlePageClick}
                  shape='rounded'
                  style={{ backgroundColor: 'rgba(5, 30, 52, 0.2)' }}
                />
              </Stack>
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
    </>
  );
};

export default Leaderboard;
