import { Container, Hidden } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import FormTabs, { ITab } from "../src/components/FormTabs";
import Layout from "../src/components/Layout";
import Row from "../src/components/Row";
import SizedBox from "../src/components/SizedBox";
import SocialLoginButton from "../src/components/SocialLoginButton";
import Subtitle from "../src/components/Subtitle";
import TextLink from "../src/components/TextLink";
import TextSeparator from "../src/components/TextSeparator";
import Title from "../src/components/Title";
import Colors from "../src/enums/Colors";
import { IAuthContextProps, useAuth } from "../src/hooks/auth/useAuth";
import Menu from "../src/modules/menu/Menu";
import { capitalizeFirstLetter, validateEmail } from "../src/utils/string";

const LoginContainer = styled.div`
  padding: 32px 16px;
`;

const Text = styled.span`
  display: flex;
  flex-direction: row-reverse;
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.PRIMARY};
  text-align: center;
`;

function SocialLogin({ auth }: { auth: IAuthContextProps }): JSX.Element {
  const router = useRouter();

  const signIn = async (type: string): Promise<void> => {
    switch (type) {
      case "facebook":
        await auth.signinWithFacebook();
        typeof window !== "undefined" && router.push("/");
        break;

      case "google":
      default:
        await auth.signinWithGoogle();
        typeof window !== "undefined" && router.push("/");
        break;
    }
  };

  return (
    <>
      <Center>
        <Title>Entre com...</Title>
      </Center>
      <SizedBox height={16}></SizedBox>
      <Container maxWidth="xs">
        <Row>
          <SocialLoginButton onClick={async () => await signIn("google")}>
            Google
          </SocialLoginButton>
          <SizedBox width={16}></SizedBox>
          <SocialLoginButton onClick={async () => await signIn("facebook")}>
            Facebook
          </SocialLoginButton>
        </Row>
      </Container>
    </>
  );
}

function Login({ menu }: { menu: Menu }): JSX.Element {
  const auth: IAuthContextProps = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(router.asPath);
  const [loading, setLoading] = useState(false);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  const errorsTemplate = {
    displayName: null,
    email: null,
    password: null,
  };
  const [errors, setErrors] = useState(_cloneDeep(errorsTemplate));

  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);

  const tabs: Array<ITab> = [
    {
      title: "Cadastre-se",
      id: "/cadastrar",
    },
    {
      title: "Já Tenho Cadastro",
      id: "/entrar",
    },
  ];

  const _setActiveTab = (tab: string) => {
    setPage(tab);
    setErrors(_cloneDeep(errorsTemplate));
  };

  const _login = async () => {
    if (!_validate("login")) {
      return;
    }

    setLoading(true);
    const _email = email.current.children[0].value;
    const _password = password.current.children[0].value;
    const result = await auth.signin(_email, _password);
    setLoading(false);
    if (result) {
      typeof window !== "undefined" && router.push("/");
    }
  };

  const signUp = async () => {
    if (!_validate("signup")) {
      return;
    }

    setLoading(true);
    const _email = email.current.children[0].value;
    const _password = password.current.children[0].value;
    const _displayName = displayName.current.children[0].value;
    const result = await auth.signup(_displayName, _email, _password);
    setLoading(false);
    if (result) {
      typeof window !== "undefined" && router.push("/");
    }
  };

  const signOut = async () => {
    setLoading(true);
    await auth.signout();
    setLoading(false);
  };

  const _validate = (action: string) => {
    const _email = email.current?.children[0].value;
    const _password = password.current?.children[0].value;
    const _displayName = displayName.current?.children[0].value;

    const _errors = _cloneDeep(errorsTemplate);
    let _errorsCount = 0;

    // Email
    if (_email === "" || _email === null || _email === undefined) {
      _errorsCount++;
      _errors.email = "Por favor, preencha o email";
    } else if (!validateEmail(_email)) {
      _errorsCount++;
      _errors.email =
        "Por favor, preencha um email válido. Ex.: maria@gmail.com";
    }

    // Password
    if (
      _password !== "" &&
      _password !== null &&
      _password !== undefined &&
      _password.length < 6
    ) {
      _errorsCount++;
      _errors.password = "A senha deve possuir no mínimo 6 caracteres";
    } else if (
      _password === "" ||
      _password === null ||
      _password === undefined
    ) {
      _errorsCount++;
      _errors.password = "Por favor, preencha a senha";
    }
    if (action === "signup") {
      // First and Lastname
      const splitedFullName: Array<string> = _displayName.split(" ");
      if (
        _displayName === "" ||
        _displayName === null ||
        _displayName === undefined
      ) {
        _errorsCount++;
        _errors.displayName = "Por favor, preencha o seu nome e sobrenome";
      } else if (splitedFullName.length < 2) {
        _errorsCount++;
        _errors.displayName =
          "Nome e sobrenome são obrigatórios. Ex.: Maria Silva";
      } else if (splitedFullName.length > 2) {
        _errorsCount++;
        _errors.displayName =
          "Por favor, preencha seu nome e somente 1 (um) sobrenome. Ex.: Maria Silva";
      } else {
        const _fullName =
          capitalizeFirstLetter(splitedFullName[0]) +
          " " +
          capitalizeFirstLetter(splitedFullName[1]);
        displayName.current.children[0].value = _fullName;
      }
    }
    if (_errorsCount) {
      setErrors(_errors);
      return false;
    } else {
      return true;
    }
  };

  return (
    <Layout menu={menu}>
      <Container maxWidth="sm" disableGutters>
        {auth.user && (
          <LoginContainer>
            <Hidden only={["xs", "sm"]}>
              <SizedBox height={72}></SizedBox>
            </Hidden>
            <Center>
              <Title>{`Olá ${auth?.user?.name || auth?.user?.email}!`}</Title>
            </Center>
            <SizedBox height={8}></SizedBox>
            <Center>
              <Subtitle>Você está conectada(o)!</Subtitle>
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
            <Hidden only={["xs", "sm"]}>
              <SizedBox height={72}></SizedBox>
            </Hidden>
          </LoginContainer>
        )}
        {!auth.user && (
          <LoginContainer>
            <Hidden only={["xs", "sm"]}>
              <SizedBox height={72}></SizedBox>
            </Hidden>
            <FormTabs
              tabs={tabs}
              activeTab={page}
              setActiveTab={_setActiveTab}
            ></FormTabs>
            <SizedBox height={16}></SizedBox>
            {page === "/entrar" && (
              <>
                <SizedBox height={32}></SizedBox>
                <Center>
                  <Title>Entrar com Email</Title>
                </Center>
                <Container maxWidth="xs">
                  <SizedBox height={24}></SizedBox>
                  <CustomTextField
                    showIcon
                    type="email"
                    ref={email}
                    error={errors.email}
                    id="login-email-field"
                    onEnterKeyPressed={_login}
                  >
                    Email
                  </CustomTextField>
                  <SizedBox height={16}></SizedBox>
                  <CustomTextField
                    showIcon
                    type="password"
                    ref={password}
                    error={errors.password}
                    id="login-password-field"
                    onEnterKeyPressed={_login}
                  >
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
                    id="login-button-send"
                  >
                    Entrar
                  </CustomButton>
                </Center>
                <SizedBox height={16}></SizedBox>
                <Center>
                  <TextLink href="/recuperar-senha">
                    Esqueci Minha Senha
                  </TextLink>
                </Center>
                <SizedBox height={16}></SizedBox>
                <TextSeparator>OU</TextSeparator>
                <SizedBox height={24}></SizedBox>
                <SocialLogin auth={auth}></SocialLogin>
              </>
            )}
            {page === "/cadastrar" && (
              <>
                <SizedBox height={32}></SizedBox>
                <SocialLogin auth={auth}></SocialLogin>
                <SizedBox height={16}></SizedBox>
                <TextSeparator>OU</TextSeparator>
                <SizedBox height={24}></SizedBox>
                <Center>
                  <Title>Cadastre-se com seu Email</Title>
                </Center>
                <Container maxWidth="xs">
                  <SizedBox height={24}></SizedBox>
                  <CustomTextField
                    showIcon
                    type="user"
                    ref={displayName}
                    error={errors.displayName}
                  >
                    Nome e Sobrenome
                  </CustomTextField>
                  <SizedBox height={16}></SizedBox>
                  <CustomTextField
                    showIcon
                    type="email"
                    ref={email}
                    error={errors.email}
                  >
                    Email
                  </CustomTextField>
                  <SizedBox height={16}></SizedBox>
                  <CustomTextField
                    showIcon
                    type="password"
                    ref={password}
                    error={errors.password}
                  >
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
                    onClick={signUp}
                    loading={loading}
                    id="signup-button-send"
                  >
                    Cadastrar
                  </CustomButton>
                </Center>
              </>
            )}

            <Hidden only={["xs", "sm"]}>
              <SizedBox height={72}></SizedBox>
            </Hidden>
            <Hidden only={["md", "lg", "xl"]}>
              <SizedBox height={24}></SizedBox>
            </Hidden>
          </LoginContainer>
        )}
      </Container>
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

export default Login;
