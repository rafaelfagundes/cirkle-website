import Axios from "axios";
import React from "react";
import styled from "styled-components";
import Icon from "../src/components/Atoms/Icon";
import Page from "../src/components/Templates/Page";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";

const ContactItem = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

  &:active {
    padding: 22px 0 18px 4px;
  }
  &:hover {
    text-decoration: underline;
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

  &:hover {
    text-decoration: underline;
  }
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
      ? () => window.open("https://web.whatsapp.com")
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

interface PageProps {
  menu: Menu;
  search: any;
}

function Contato(props: PageProps): JSX.Element {
  return (
    <Page
      title="precisa falar com a gente?"
      image="/images/contact.jpg"
      maxWidth={640}
      menu={props.menu}
      search={props.search}
    >
      {contactItems.map((item, index) => (
        <>
          <ContactItem key={item.title} onClick={item.action}>
            <ContactIconHolder>
              <Icon size={32} type={item.icon} onClick={item.action}></Icon>
            </ContactIconHolder>
            <ContactDescription>{item.description}</ContactDescription>
          </ContactItem>
          {index + 1 < contactItems.length && <HorizontalLine></HorizontalLine>}
        </>
      ))}
    </Page>
  );
}

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getContent(menuUrl),
    getContent(searchUrl),
  ]);

  const menu = results[0].data;
  const search = results[1].data;

  return {
    props: {
      menu,
      search,
    },
    revalidate: 1440,
  };
}

export default Contato;
