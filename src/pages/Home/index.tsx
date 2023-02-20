import styled from 'styled-components';
import Footer from 'components/Footer';
import Home from 'components/Home';

const HomePage = () => {

  return (
    <>
      <Container>
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
