import { Container, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Center from "../src/components/Atoms/Center";
import CustomButton from "../src/components/Atoms/CustomButton";
import CustomTextField from "../src/components/Atoms/CustomTextField";
import Row from "../src/components/Atoms/Row";
import SimpleText from "../src/components/Atoms/SimpleText";
import SizedBox from "../src/components/Atoms/SizedBox";
import Title from "../src/components/Atoms/Title";
import Layout from "../src/components/Templates/Layout";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useDialog } from "../src/hooks/dialog/useDialog";
import Menu from "../src/modules/menu/Menu";
import { LoginType } from "../src/modules/user/User";
import theme from "../src/theme/theme";

function PasswordChange({
  menu,
  search,
}: {
  menu: Menu;
  search: any;
}): JSX.Element {
  const router = useRouter();
  const authContext = useAuth();
  if (!authContext.user) {
    typeof window !== "undefined" && router.push("/");
    return <></>;
  }
  const dialogContext = useDialog();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isSocialLogin =
    authContext.user.loginType === LoginType.GOOGLE ||
    authContext.user.loginType === LoginType.FACEBOOK;

  const [newPasswordLoading, setNewPasswordLoading] = useState(false);

  const errorsTemplate = {
    currentPassword: null,
    newPassword: null,
    passwordConfirmation: null,
  };
  const [errors, setErrors] = useState(_cloneDeep(errorsTemplate));

  const currentPassword = useRef(null);
  const newPassword = useRef(null);
  const passwordConfirmation = useRef(null);

  const _goBack = () => {
    typeof window !== "undefined" && router.push("/perfil");
  };

  const _validate = () => {
    const _password = currentPassword.current?.children[0].value;
    const _newPassword = newPassword.current?.children[0].value;
    const _passwordConfirmation =
      passwordConfirmation.current?.children[0].value;

    const _errors = _cloneDeep(errorsTemplate);
    let _errorsCount = 0;

    // Password
    if (
      _password !== "" &&
      _password !== null &&
      _password !== undefined &&
      _password.length < 6
    ) {
      _errorsCount++;
      _errors.currentPassword = "A senha deve possuir no mínimo 6 caracteres";
    } else if (
      _password === "" ||
      _password === null ||
      _password === undefined
    ) {
      _errorsCount++;
      _errors.currentPassword = "Por favor, preencha a senha atual";
    }

    // New Password
    if (
      _newPassword !== "" &&
      _newPassword !== null &&
      _newPassword !== undefined &&
      _newPassword.length < 6
    ) {
      _errorsCount++;
      _errors.newPassword = "A nova senha deve possuir no mínimo 6 caracteres";
    } else if (
      _newPassword === "" ||
      _newPassword === null ||
      _newPassword === undefined
    ) {
      _errorsCount++;
      _errors.newPassword = "Por favor, preencha a nova senha";
    } else if (_newPassword === _password) {
      _errorsCount++;
      _errors.newPassword = "A nova senha deve ser diferente da atual";
    }

    // Password Confirmation
    if (
      _passwordConfirmation === "" ||
      _passwordConfirmation === null ||
      _passwordConfirmation === undefined
    ) {
      _errorsCount++;
      _errors.passwordConfirmation =
        "Por favor, preencha a confirmação da nova senha";
    } else if (_passwordConfirmation !== _newPassword) {
      _errorsCount++;
      _errors.passwordConfirmation =
        "A nova senha e a confirmação da senha são diferentes. Confira novamente.";
    }

    if (_errorsCount) {
      setErrors(_errors);
      return false;
    } else {
      setErrors(_errors);
      return true;
    }
  };

  const changePassword = async () => {
    if (!_validate()) return;

    setNewPasswordLoading(true);
    const result = await authContext.changePassword(
      currentPassword.current?.children[0].value,
      newPassword.current?.children[0].value
    );
    if (result) {
      setNewPasswordLoading(false);
      dialogContext.newDialog(
        true,
        "Senha Atualizada",
        "Entre com a nova senha no próximo login",
        "OK",
        false
      );
      typeof window !== "undefined" && router.push("/perfil");
    } else {
      setNewPasswordLoading(false);
      dialogContext.newDialog(
        true,
        "Erro Ao Atualizar",
        "Não foi possível atualizar os dados neste momento. Tente novamente mais tarde."
      );
    }
  };

  return (
    <Layout menu={menu} search={search}>
      <Container maxWidth="xs">
        {isSocialLogin && (
          <>
            <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
            <Title>Alterar Senha</Title>
            <SizedBox height={32}></SizedBox>
            <SimpleText>{`Você entrou usando o ${
              authContext.user.loginType === LoginType.FACEBOOK
                ? "Facebook"
                : "Google"
            }. Portanto, não há como alterar a senha.`}</SimpleText>
            <SizedBox height={10}></SizedBox>
            <SimpleText>{`Use sempre o ${
              authContext.user.loginType === LoginType.FACEBOOK
                ? "Facebook"
                : "Google"
            } para acessar sua conta.`}</SimpleText>
            <SizedBox height={10}></SizedBox>
            <SimpleText>{`Caso seja de seu interesse, você pode alterar a senha nas configurações internas do ${
              authContext.user.loginType === LoginType.FACEBOOK
                ? "Facebook"
                : "Google"
            }.`}</SimpleText>
            <SizedBox height={32}></SizedBox>
            <Center>
              <CustomButton width={160} onClick={_goBack}>
                Voltar
              </CustomButton>
            </Center>
            <SizedBox height={72}></SizedBox>
          </>
        )}
        {!isSocialLogin && (
          <>
            <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
            <Title>Alterar Senha</Title>
            <SizedBox height={32}></SizedBox>
            <span data-test="password-change-old-password">
              <CustomTextField
                ref={currentPassword}
                type="password"
                showIcon
                error={errors.currentPassword}
              >
                Senha Atual
              </CustomTextField>
            </span>
            <SizedBox height={32}></SizedBox>
            <span data-test="password-change-new-password">
              <CustomTextField
                ref={newPassword}
                type="password"
                showIcon
                error={errors.newPassword}
              >
                Nova Senha
              </CustomTextField>
            </span>
            <SizedBox height={16}></SizedBox>
            <span data-test="password-change-confirmation-password">
              <CustomTextField
                ref={passwordConfirmation}
                type="password"
                showIcon
                error={errors.passwordConfirmation}
              >
                Confirme a Nova Senha
              </CustomTextField>
            </span>
            <SizedBox height={32}></SizedBox>
            <Row spaceBetween>
              <CustomButton
                type="delete"
                variant="text"
                width={190}
                onClick={() =>
                  typeof window !== "undefined" && router.push("/perfil")
                }
              >
                Cancelar
              </CustomButton>
              <span data-test="password-change-submit-button">
                <CustomButton
                  width={190}
                  onClick={changePassword}
                  loading={newPasswordLoading}
                >
                  Alterar Senha
                </CustomButton>
              </span>
            </Row>
            <SizedBox height={72}></SizedBox>
          </>
        )}
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
export default PasswordChange;
