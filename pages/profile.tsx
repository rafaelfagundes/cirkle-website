import { Avatar, Container, useMediaQuery } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import SizedBox from "../src/components/SizedBox";
import { useAuth } from "../src/hooks/auth/useAuth";
import { LoginType } from "../src/modules/user/User";
import theme from "../src/theme/theme";

const StyledAvatar = styled(Avatar)`
  width: 128px;
  height: 128px;
`;

const ButtonsHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

function Profile(): JSX.Element {
  const authContext = useAuth();
  const router = useRouter();

  const email = useRef(null);
  const phoneNumber = useRef(null);
  const displayName = useRef(null);

  const [loading, setLoading] = useState(false);

  const errors = {
    email: "",
    phoneNumber: "",
    displayName: "",
  };

  if (!authContext.user) {
    router.push("/login");
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const update = async () => {
    const _user = _.cloneDeep(authContext.user);

    _user.email = email.current.children[0].value;
    _user.phone_number = phoneNumber.current.children[0].value;
    _user.name = displayName.current.children[0].value;

    setLoading(true);
    await authContext.updateUser(_user);
    setLoading(false);
  };

  return (
    <>
      {authContext.user && (
        <Container maxWidth="xs">
          <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
          <Center>
            <StyledAvatar alt="" src={authContext.user.picture}></StyledAvatar>
          </Center>
          <SizedBox height={16}></SizedBox>
          <ButtonsHolder>
            <CustomButton
              onClick={null}
              type="primary"
              variant="outlined"
              width={150}
            >
              Alterar Foto
            </CustomButton>
            {authContext.user.login_type === LoginType.EMAIL_PASSWORD && (
              <>
                <SizedBox width={16}></SizedBox>
                <CustomButton
                  onClick={null}
                  type="primary"
                  variant="outlined"
                  width={150}
                >
                  Alterar Senha
                </CustomButton>
              </>
            )}
          </ButtonsHolder>

          <Container maxWidth="xs">
            <SizedBox height={36}></SizedBox>
            <CustomTextField
              type="user"
              ref={displayName}
              error={errors.displayName}
              initialValue={authContext.user.name}
            >
              Nome e Sobrenome
            </CustomTextField>
            <SizedBox height={16}></SizedBox>
            <CustomTextField
              type="email"
              ref={email}
              error={errors.email}
              initialValue={authContext.user.email}
            >
              Email
            </CustomTextField>
            <SizedBox height={16}></SizedBox>
            <CustomTextField
              type="phone"
              ref={phoneNumber}
              error={errors.phoneNumber}
              initialValue={authContext.user.phone_number}
            >
              Celular (DDD + Número)
            </CustomTextField>
            <SizedBox height={36}></SizedBox>
            <Center>
              <CustomButton
                width={300}
                type="primary"
                variant="contained"
                onClick={() => update()}
                loading={loading}
              >
                Salvar
              </CustomButton>
            </Center>
          </Container>
          <SizedBox height={72}></SizedBox>
        </Container>
      )}
    </>
  );
}

export default Profile;
