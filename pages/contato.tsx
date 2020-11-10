import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import Icon from "../src/components/Icon";
import Layout from "../src/components/Layout";
import SizedBox from "../src/components/SizedBox";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const BackgroundBanner = styled.div`
  background-image: url("images/contact.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerText = styled.div<{ mobile: boolean }>`
  font-size: 36px;
  color: ${Colors.WHITE};
  font-weight: 700;
  text-transform: uppercase;
  font-family: Commissioner, sans-serif;
  z-index: 1;
  text-align: center;
  padding: 20px;
  margin-top: ${(props) => (props.mobile ? 0 : -64)}px;
`;

const BannerTint = styled.div`
  width: 100%;
  height: 35vh;
  position: absolute;
  background-color: ${Colors.PRIMARY};
  opacity: 0.75;
`;

const PanelHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Panel = styled.div<{ mobile: boolean }>`
  width: 100%;
  max-width: 960px;
  background-color: ${Colors.WHITE};
  z-index: 2;
  padding: 0 20px;
  margin-top: ${(props) => (props.mobile ? 0 : -64)}px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const ContactItem = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

  &:active {
    padding: 22px 0 18px 4px;
  }

  transition: padding 200ms;
`;

const ContactIconHolder = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactDescription = styled.div`
  font-size: 16px;
  color: ${Colors.PRIMARY};
  font-weight: 500;
  font-family: Commissioner, sans-serif;
  margin-left: 5px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.PRIMARY};
  opacity: 0.1;
`;

const contactItems = [
  {
    icon: "message",
    title: "Chat",
    description: "Converse com a gente ao vivo",
    action: process.browser
      ? () =>
          window.open("https://tawk.to/chat/5f6b6c8b4704467e89f1a9db/default")
      : null,
  },
  {
    icon: "email",
    title: "Email",
    description: "Envie-nos um email",
    action: process.browser
      ? () => window.open("mailto:contato@cirkle.com.br")
      : null,
  },
  {
    icon: "whatsapp-dark",
    title: "WhatsApp",
    description: "Chama no Zap",
    action: process.browser
      ? () => window.open("https://instagram.com/cirklebr")
      : null,
  },
  {
    icon: "instagram-dark",
    title: "Instagram",
    description: "Manda um direct no Insta",
    action: process.browser
      ? () => window.open("https://instagram.com/cirklebr")
      : null,
  },
  {
    icon: "facebook-dark",
    title: "Facebook",
    description: "Mensagem no Face",
    action: process.browser
      ? () => window.open("https://facebook.com/cirklebr")
      : null,
  },
];

function Contato({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout containerMargin={false} menu={menu}>
        <>
          <BackgroundBanner>
            <BannerTint></BannerTint>
            <BannerText mobile={isSmartPhone}>
              precisa falar com a gente?
            </BannerText>
          </BackgroundBanner>
          <PanelHolder>
            <Panel mobile={isSmartPhone}>
              {contactItems.map((item, index) => (
                <>
                  <ContactItem key={item.title} onClick={item.action}>
                    <ContactIconHolder>
                      <Icon
                        size={32}
                        type={item.icon}
                        onClick={item.action}
                      ></Icon>
                    </ContactIconHolder>
                    <ContactDescription>{item.description}</ContactDescription>
                  </ContactItem>
                  {index + 1 < contactItems.length && (
                    <HorizontalLine></HorizontalLine>
                  )}
                </>
              ))}
            </Panel>
          </PanelHolder>
          <SizedBox height={isSmartPhone ? 16 : 72}></SizedBox>
        </>
      </Layout>
    </>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Contato;
