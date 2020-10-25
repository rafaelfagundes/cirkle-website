import { Container, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FormTabs from "../src/components/FormTabs";
import Layout from "../src/components/Layout";
import AddressTab from "../src/components/Profile/AddressTab";
import ProfileTab from "../src/components/Profile/ProfileTab";
import SizedBox from "../src/components/SizedBox";
import { useAuth } from "../src/hooks/auth/useAuth";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

function Profile({ menu }: { menu: Menu }): JSX.Element {
  const authContext = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.asPath);

  if (!authContext.user) {
    typeof window !== "undefined" && router.push("/entrar");
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout menu={menu}>
      {authContext.user && (
        <Container maxWidth="xs">
          <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
          <FormTabs
            tabs={[
              { id: "/perfil", title: "Dados Pessoais" },
              { id: "/enderecos", title: "Endereços" },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></FormTabs>
          <SizedBox height={32}></SizedBox>
          {activeTab === "/perfil" && <ProfileTab></ProfileTab>}
          {activeTab === "/enderecos" && <AddressTab></AddressTab>}
          <SizedBox height={72}></SizedBox>
        </Container>
      )}
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

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

export default Profile;
