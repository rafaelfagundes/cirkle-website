import { Avatar, Container, useMediaQuery } from "@material-ui/core";
import Axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import FileUploadButton from "../src/components/FileUploadButton";
import SizedBox from "../src/components/SizedBox";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useDialog } from "../src/hooks/dialog/useDialog";
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
  const dialogContext = useDialog();

  const email = useRef(null);
  const phoneNumber = useRef(null);
  const displayName = useRef(null);
  const [picture, setPicture] = useState(null);
  const [uploadedPicture, setUploadedPicture] = useState(null);

  const [loading, setLoading] = useState(false);
  const [userAvatarLoading, setUserAvatarLoading] = useState(false);

  const errors = {
    email: "",
    phoneNumber: "",
    displayName: "",
  };

  if (!authContext.user) {
    router.push("/login");
  }

  const uploadImage = async (file: any) => {
    setUserAvatarLoading(true);
    const formData = new FormData();
    const cloudName = "cirklebr";
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    formData.append("file", file);
    formData.append("upload_preset", "avatarUpload");

    try {
      const response: AxiosResponse<any> = await Axios.post(endpoint, formData);
      if (!response) {
        dialogContext.newDialog(
          true,
          "Erro Ao Alterar Foto",
          "Não foi possível atualizar a foto neste momento. Tente novamente mais tarde."
        );
      } else {
        setUploadedPicture(response.data.secure_url);
        dialogContext.newDialog(
          true,
          "Clique Em Salvar",
          "Lembre-se de clicar no botão salvar para que a foto seja atualizada. Caso contrário, ela será descartada.",
          "OK",
          false
        );
      }
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro Ao Alterar Foto",
        "Não foi possível atualizar a foto neste momento. Tente novamente mais tarde."
      );
    }
    setUserAvatarLoading(false);
  };

  React.useEffect(() => {
    if (picture) {
      uploadImage(picture);
    }
  }, [picture]);

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const update = async () => {
    const _user = _.cloneDeep(authContext.user);

    _user.email = email.current.children[0].value;
    _user.phoneNumber = phoneNumber.current.children[0].value;
    _user.name = displayName.current.children[0].value;
    if (uploadedPicture) _user.picture = uploadedPicture;

    setLoading(true);
    const result = await authContext.updateUser(_user);

    if (!result) {
      dialogContext.newDialog(
        true,
        "Erro Ao Atualizar",
        "Não foi possível atualizar os dados neste momento. Tente novamente mais tarde."
      );
    } else {
      dialogContext.newDialog(
        true,
        "Dados Atualizados",
        "Seus dados foram atualizados com sucesso.",
        "OK",
        false
      );
    }
    setLoading(false);
  };

  return (
    <>
      {authContext.user && (
        <Container maxWidth="xs">
          <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
          <Center>
            <StyledAvatar
              alt=""
              src={uploadedPicture || authContext.user.picture}
            ></StyledAvatar>
          </Center>
          <SizedBox height={16}></SizedBox>
          <ButtonsHolder>
            <FileUploadButton
              type="primary"
              variant="outlined"
              width={150}
              onChange={setPicture}
              loading={userAvatarLoading}
            >
              Alterar Foto
            </FileUploadButton>
            {authContext.user.loginType === LoginType.EMAIL_PASSWORD && (
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
              initialValue={authContext.user.phoneNumber}
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
