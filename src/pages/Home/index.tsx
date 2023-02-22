import styled from 'styled-components';
import Footer from 'components/Footer';
import Home from 'components/Home';
import {useMediaQuery} from '@mui/material';

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <>
      <Container style = {{ overflowX: isMobile? 'hidden': 'unset' }}>
        <Home />
        <Footer />
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  overflow-x: hidden;
  height: 100vh;
`;
