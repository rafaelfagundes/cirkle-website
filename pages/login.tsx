import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import FormTabs, { ITab } from "../src/components/FormTabs";
import Row from "../src/components/Row";
import SizedBox from "../src/components/SizedBox";
import SocialLoginButton from "../src/components/SocialLoginButton";
import Subtitle from "../src/components/Subtitle";
import TextLink from "../src/components/TextLink";
import TextSeparator from "../src/components/TextSeparator";
import Title from "../src/components/Title";
import { useAuth } from "../src/hooks/use-auth";
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
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);

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

  const _login = async () => {
    setLoading(true);
    const _email = email.current.children[0].value;
    const _password = password.current.children[0].value;
    const result = await auth.signin(_email, _password);
    setLoading(false);
    if (result) {
      router.push("/");
    }
  };

  const _signUp = async () => {
    setLoading(true);
    const _email = email.current.children[0].value;
    console.log("_signUp -> _email", _email);
    const _password = password.current.children[0].value;
    console.log("_signUp -> _password", _password);
    const _displayName = displayName.current.children[0].value;
    console.log("_signUp -> _displayName", _displayName);
    const result = await auth.signup(_displayName, _email, _password);
    setLoading(false);
    if (result) {
      router.push("/");
    }
  };

  const signOut = async () => {
    setLoading(true);
    await auth.signout();
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      {auth.user && (
        <LoginContainer>
          <SizedBox height={72}></SizedBox>

          <Center>
            <Title>{`Olá ${
              auth?.user?.displayName || auth?.user?.email
            }!`}</Title>
          </Center>
          <SizedBox height={8}></SizedBox>
          <Center>
            <Subtitle>Você já está conectada(o)!</Subtitle>
          </Center>
          <SizedBox height={24}></SizedBox>
          <Center>
            <CustomButton
              onClick={signOut}
              type="primary"
              variant="contained"
              loading={loading}
              width={300}
            >
              Desconectar
            </CustomButton>
          </Center>
          <SizedBox height={72}></SizedBox>
        </LoginContainer>
      )}
      {!auth.user && (
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
                <CustomTextField type="email" ref={email}>
                  Email
                </CustomTextField>
                <SizedBox height={16}></SizedBox>
                <CustomTextField type="password" ref={password}>
                  Senha
                </CustomTextField>
                <SizedBox height={24}></SizedBox>
              </Container>
              <Center>
                <CustomButton
                  width={300}
                  type="primary"
                  variant="contained"
                  onClick={_login}
                  loading={loading}
                >
                  Entrar
                </CustomButton>
              </Center>
              <SizedBox height={16}></SizedBox>
              <Center>
                <TextLink href="/recover-password">
                  Esqueci Minha Senha
                </TextLink>
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
                <CustomTextField type="user" ref={displayName}>
                  Nome e Sobrenome
                </CustomTextField>
                <SizedBox height={16}></SizedBox>
                <CustomTextField type="email" ref={email}>
                  Email
                </CustomTextField>
                <SizedBox height={16}></SizedBox>
                <CustomTextField type="password" ref={password}>
                  Senha
                </CustomTextField>
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
                <CustomButton
                  width={300}
                  type="primary"
                  variant="contained"
                  onClick={_signUp}
                  loading={loading}
                >
                  Cadastrar
                </CustomButton>
              </Center>
            </>
          )}
        </LoginContainer>
      )}
    </Container>
  );
}

export default Login;
