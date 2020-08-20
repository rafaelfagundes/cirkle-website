import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import FormTabs, { ITab } from "../src/components/FormTabs";
import Row from "../src/components/Row";
import SizedBox from "../src/components/SizedBox";
import SocialLoginButton from "../src/components/SocialLoginButton";
import TextLink from "../src/components/TextLink";
import TextSeparator from "../src/components/TextSeparator";
import Title from "../src/components/Title";
import { Colors } from "../src/theme/theme";

const LoginContainer = styled.div`
  padding: 32px 16px;
`;

const Text = styled.span`
  display: flex;
  flex-direction: row-reverse;
  font-family: FuturaPT;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${Colors.PRIMARY};
  text-align: center;
`;

function SocialLogin(): JSX.Element {
  return (
    <>
      <Center>
        <Title>Entre com...</Title>
      </Center>
      <SizedBox height={16}></SizedBox>
      <Container maxWidth="xs">
        <Row>
          <SocialLoginButton>Google</SocialLoginButton>
          <SizedBox width={16}></SizedBox>
          <SocialLoginButton>Facebook</SocialLoginButton>
        </Row>
      </Container>
    </>
  );
}

function Login(): JSX.Element {
  const router = useRouter();
  const [page, setPage] = useState(router.asPath);

  const tabs: Array<ITab> = [
    {
      title: "Cadastre-se",
      id: "/signup",
    },
    {
      title: "Já Tenho Cadastro",
      id: "/login",
    },
  ];

  return (
    <Container maxWidth="sm" disableGutters>
      <LoginContainer>
        <FormTabs
          tabs={tabs}
          activeTab={page}
          setActiveTab={setPage}
        ></FormTabs>
        {page === "/login" && (
          <>
            <SizedBox height={32}></SizedBox>
            <Center>
              <Title>Entrar com Email</Title>
            </Center>
            <Container maxWidth="xs">
              <SizedBox height={24}></SizedBox>
              <CustomTextField iconType="email">Email</CustomTextField>
              <SizedBox height={16}></SizedBox>
              <CustomTextField iconType="key">Senha</CustomTextField>
              <SizedBox height={24}></SizedBox>
            </Container>
            <Center>
              <CustomButton width={300} type="primary" variant="contained">
                Entrar
              </CustomButton>
            </Center>
            <SizedBox height={16}></SizedBox>
            <Center>
              <TextLink href="/recover-password">Esqueci Minha Senha</TextLink>
            </Center>
            <SizedBox height={16}></SizedBox>
            <TextSeparator>OU</TextSeparator>
            <SizedBox height={24}></SizedBox>
            <SocialLogin></SocialLogin>
          </>
        )}
        {page === "/signup" && (
          <>
            <SizedBox height={32}></SizedBox>
            <SocialLogin></SocialLogin>
            <SizedBox height={16}></SizedBox>
            <TextSeparator>OU</TextSeparator>
            <SizedBox height={24}></SizedBox>
            <Center>
              <Title>Cadastre-se com seu Email</Title>
            </Center>
            <Container maxWidth="xs">
              <SizedBox height={24}></SizedBox>
              <CustomTextField iconType="person">
                Nome e Sobrenome
              </CustomTextField>
              <SizedBox height={16}></SizedBox>
              <CustomTextField iconType="email">Email</CustomTextField>
              <SizedBox height={16}></SizedBox>
              <CustomTextField iconType="key">Senha</CustomTextField>
              <SizedBox height={24}></SizedBox>
            </Container>

            <Container maxWidth="xs">
              <Text>
                Ao criar um conta, você concorda com os termos de uso e a
                política de privacidade
              </Text>
            </Container>

            <SizedBox height={16}></SizedBox>
            <Center>
              <CustomButton width={300} type="primary" variant="contained">
                Cadastrar
              </CustomButton>
            </Center>
          </>
        )}
      </LoginContainer>
    </Container>
  );
}

export default Login;
