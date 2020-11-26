import { Container } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Center from "../src/components/Atoms/Center";
import CustomButton from "../src/components/Atoms/CustomButton";
import CustomTextField from "../src/components/Atoms/CustomTextField";
import SizedBox from "../src/components/Atoms/SizedBox";
import Subtitle from "../src/components/Atoms/Subtitle";
import Title from "../src/components/Atoms/Title";
import Layout from "../src/components/Templates/Layout";
import { useAuth } from "../src/hooks/auth/useAuth";
import Menu from "../src/modules/menu/Menu";
import { validateEmail } from "../src/utils/string";

function RecoverPassword({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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

  const _validate = () => {
    const _email = email.current?.children[0].value;

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

    if (_errorsCount) {
      setErrors(_errors);
      return false;
    } else {
      return true;
    }
  };

  const _recoverPassword = async () => {
    if (!_validate()) {
      return;
    }
    setLoading(true);
    await auth.sendPasswordResetEmail(email.current.children[0].value);
    setLoading(false);
    setDone(true);
    return false;
  };

  const _goHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  return (
    <Layout menu={menu}>
      <Container maxWidth="sm" disableGutters>
        <SizedBox height={72}></SizedBox>
        <Center>
          <Title>Esqueci Minha Senha</Title>
        </Center>
        {!done && (
          <>
            <SizedBox height={16}></SizedBox>
            <Container maxWidth="xs">
              <Center>
                <Subtitle>
                  Por favor informe o seu email para enviarmos as instruções de
                  recuperação de senha.
                </Subtitle>
              </Center>
              <SizedBox height={8}></SizedBox>
              <Center>
                <Subtitle>Não se preocupe, é muito simples!</Subtitle>
              </Center>
              <SizedBox height={32}></SizedBox>
              <CustomTextField type="email" ref={email} error={errors.email}>
                Email
              </CustomTextField>
            </Container>
            <SizedBox height={24}></SizedBox>
            <Center>
              <CustomButton
                width={300}
                type="primary"
                variant="contained"
                onClick={_recoverPassword}
                loading={loading}
              >
                Enviar
              </CustomButton>
            </Center>
          </>
        )}
        {done && (
          <>
            <SizedBox height={16}></SizedBox>
            <Container maxWidth="xs">
              <Center>
                <Subtitle>
                  Confira sua caixa de entrada, um email foi enviado com
                  instruções de como recuperar a senha.
                </Subtitle>
              </Center>
              <SizedBox height={32}></SizedBox>
              <Center>
                <CustomButton
                  width={300}
                  type="primary"
                  variant="contained"
                  onClick={_goHome}
                >
                  OK, Voltar para o Início
                </CustomButton>
              </Center>
            </Container>
          </>
        )}
        <SizedBox height={72}></SizedBox>
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

export default RecoverPassword;
