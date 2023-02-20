import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper style = {{ position: 'fixed' , bottom: 0  , maxWidth: '100%' , justifyContent: 'center' , gap: '100px'}} >
      <Link href='https://twitter.com/newdegenorder' target='_blank'>
        <Icon src="/images/socials/twitter.svg" alt="twitter-icon" />
      </Link>
      <Link href='https://www.instagram.com/newdegenorder/' target='_blank'>
        <Icon src="/images/socials/instagram.svg" alt="instagram-icon" />
      </Link>
      <Link href='https://discord.com/invite/newdegenorder' target='_blank'>
        <Icon src="/images/socials/discord.svg" alt="discord-icon" />
      </Link>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 0;
  position: relative;
  z-index: 10;
`

const Icon = styled.img`
  width: 25px;
`

const Link = styled.a`
  text-decoration: none;
`
