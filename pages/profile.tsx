import { Container, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FormTabs from "../src/components/FormTabs";
import AddressTab from "../src/components/Profile/AddressTab";
import ProfileTab from "../src/components/Profile/ProfileTab";
import SizedBox from "../src/components/SizedBox";
import { useAuth } from "../src/hooks/auth/useAuth";
import theme from "../src/theme/theme";

function Profile(): JSX.Element {
  const authContext = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.asPath);

  if (!authContext.user) {
    router.push("/login");
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {authContext.user && (
        <Container maxWidth="xs">
          <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
          <FormTabs
            tabs={[
              { id: "/profile", title: "Dados Pessoais" },
              { id: "/address", title: "Endereços" },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></FormTabs>
          <SizedBox height={32}></SizedBox>
          {activeTab === "/profile" && <ProfileTab></ProfileTab>}
          {activeTab === "/address" && <AddressTab></AddressTab>}
          <SizedBox height={72}></SizedBox>
        </Container>
      )}
    </>
  );
}

export default Profile;
