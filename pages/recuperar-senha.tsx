import { Container } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import validator from "validator";
import Center from "../src/components/Atoms/Center";
import CustomButton from "../src/components/Atoms/CustomButton";
import CustomTextField, {
  getCustomTextFieldValue,
} from "../src/components/Atoms/CustomTextField";
import SizedBox from "../src/components/Atoms/SizedBox";
import Subtitle from "../src/components/Atoms/Subtitle";
import Title from "../src/components/Atoms/Title";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import { useAuth } from "../src/hooks/auth/useAuth";
import Menu from "../src/modules/menu/Menu";

interface PageProps {
  menu: Menu;
  search: any;
}

function RecoverPassword(props: PageProps): JSX.Element {
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
    } else if (!validator.isEmail(_email)) {
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
    await auth.sendPasswordResetEmail(getCustomTextFieldValue(email));
    setLoading(false);
    setDone(true);
    return false;
  };

  const _goHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  return (
    <Layout menu={props.menu} search={props.search}>
      <Container maxWidth="sm" disableGutters>
        <SizedBox height={72}></SizedBox>
        <Center>
          <Title>Esqueci Minha Senha</Title>
        </Center>
        {!done && (
          <>
            <SizedBox height={16}></SizedBox>
            <Container maxWidth="xs">
              <Subtitle>
                Por favor informe o seu email para enviarmos as instruções de
                recuperação de senha.
              </Subtitle>

              <SizedBox height={8}></SizedBox>

              <Subtitle color={Colors.MONEY}>
                Não se preocupe, é muito simples!
              </Subtitle>

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
export default RecoverPassword;
