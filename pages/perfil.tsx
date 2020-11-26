import { Avatar, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import Row from "../src/components/Atoms/Row";
import SimpleText from "../src/components/Atoms/SimpleText";
import SizedBox from "../src/components/Atoms/SizedBox";
import FormTabs from "../src/components/Molecules/FormTabs";
import VerticalSideMenu from "../src/components/Molecules/VerticalSideMenu";
import AddressTab from "../src/components/Pages/Profile/AddressTab";
import OrdersTab from "../src/components/Pages/Profile/OrdersTab";
import ProfileTab from "../src/components/Pages/Profile/ProfileTab";
import WishlistTab from "../src/components/Pages/Profile/WishlistTab";
import Page from "../src/components/Templates/Page";
import Colors from "../src/enums/Colors";
import { useAuth } from "../src/hooks/auth/useAuth";
import theme from "../src/theme/theme";
import { cloudinaryImage } from "../src/utils/image";

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

const SideMenu = styled.div`
  width: 250px;
  height: 100%;
  flex: 1;
  padding: 20px;
  /* background-color: #eee; */
`;

const Content = styled.div`
  flex: 3;
  padding: 48px 48px;
  border-left: 1px solid #eee;

  transition: 1s height;
`;

const UserName = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  letter-spacing: -0.005em;
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  color: ${Colors.SECONDARY};
`;

function Profile(): JSX.Element {
  const authContext = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.asPath);

  if (!authContext.user) {
    typeof window !== "undefined" && router.push("/entrar");
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page
      title="Minha Conta"
      image="images/profile.jpg"
      // tintColor={Colors.SPANISH_VIRIDIAN}
      noPadding={!isSmartPhone}
      doNotAutoScroll
    >
      {isSmartPhone && authContext.user && (
        <>
          {/* <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox> */}
          <SizedBox height={20}></SizedBox>
          <FormTabs
            tabs={[
              { id: "/perfil", title: "Meus Dados" },
              { id: "/enderecos", title: "Endereços" },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></FormTabs>
          <SizedBox height={32}></SizedBox>
          {activeTab === "/perfil" && <ProfileTab></ProfileTab>}
          {activeTab === "/enderecos" && <AddressTab></AddressTab>}
          <SizedBox height={72}></SizedBox>
        </>
      )}
      {!isSmartPhone && authContext.user && (
        <Columns>
          <SideMenu>
            <Row>
              <StyledAvatar
                alt={`${authContext.user.name} Profile Picture`}
                src={cloudinaryImage(authContext.user.picture, 64)}
              ></StyledAvatar>
              <SizedBox width={10}></SizedBox>
              <div>
                <UserName>{authContext.user.name}</UserName>
                <SimpleText size={0.8}>{authContext.user.email}</SimpleText>
              </div>
            </Row>

            <SizedBox height={30}></SizedBox>
            <VerticalSideMenu
              tabs={[
                { id: "/perfil", title: "Meus Dados" },
                { id: "/enderecos", title: "Endereços" },
                { id: "/minha-lista", title: "Lista de Desejos" },
                { id: "/meus-pedidos", title: "Meus Pedidos" },
                { id: "/minhas-vendas", title: "Meus Produtos à Venda" },
              ]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            ></VerticalSideMenu>
          </SideMenu>
          <Content>
            {activeTab === "/perfil" && <ProfileTab></ProfileTab>}
            {activeTab === "/enderecos" && <AddressTab></AddressTab>}
            {activeTab === "/minha-lista" && <WishlistTab></WishlistTab>}
            {activeTab === "/meus-pedidos" && <OrdersTab></OrdersTab>}
          </Content>
        </Columns>
      )}
    </Page>
  );
}

export default Profile;
