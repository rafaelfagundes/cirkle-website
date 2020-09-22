import { Container } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import SizedBox from "../src/components/SizedBox";
import Subtitle from "../src/components/Subtitle";
import Title from "../src/components/Title";
import { useAuth } from "../src/hooks/use-auth";
import { validateEmail } from "../src/utils/string";

function RecoverPassword(): JSX.Element {
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
  const [errors, setErrors] = useState(_.cloneDeep(errorsTemplate));

  const email = useRef(null);

  const _validate = () => {
    const _email = email.current?.children[0].value;

    const _errors = _.cloneDeep(errorsTemplate);
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
    router.push("/");
  };

  return (
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
                OK, Voltar para o início
              </CustomButton>
            </Center>
          </Container>
        </>
      )}
      <SizedBox height={72}></SizedBox>
    </Container>
  );
}

export default RecoverPassword;
