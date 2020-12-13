import { Avatar, Container, useMediaQuery } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useDialog } from "../../../../hooks/dialog/useDialog";
import { Gender, LoginType } from "../../../../modules/user/User";
import theme from "../../../../theme/theme";
import { cloudinaryImage } from "../../../../utils/image";
import { capitalizeFirstLetter } from "../../../../utils/string";
import Center from "../../../Atoms/Center";
import CheckBoxWithLabel from "../../../Atoms/CheckboxWithLabel";
import CustomButton from "../../../Atoms/CustomButton";
import CustomDatePicker from "../../../Atoms/CustomDatePicker";
import CustomTextField, {
  getCustomTextFieldValue,
  setCustomTextFieldValue,
} from "../../../Atoms/CustomTextField";
import FileUploadButton from "../../../Atoms/FileUploadButton";
import RadioButtonWithLabel from "../../../Atoms/RadioButtonWithLabel";
import Row from "../../../Atoms/Row";
import SizedBox from "../../../Atoms/SizedBox";
import Subtitle from "../../../Atoms/Subtitle";

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

function ProfileTab(): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const authContext = useAuth();
  const router = useRouter();
  const dialogContext = useDialog();
  const phoneNumber = useRef(null);
  const displayName = useRef(null);

  const [gender, setGender] = useState(
    authContext.user.gender || Gender.NOT_DEFININED
  );

  const [dateOfBirth, setDateOfBirth] = useState(
    authContext.user.dateOfBirth ? authContext.user.dateOfBirth : null
  );

  const [isSubscribed, setIsSubscribed] = useState(
    authContext.user.isSubscribed || false
  );

  const [picture, setPicture] = useState(null);
  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAvatarLoading, setUserAvatarLoading] = useState(false);

  const errorsTemplate = {
    displayName: null,
    phoneNumber: null,
    dateOfBirth: null,
  };
  const [errors, setErrors] = useState(_cloneDeep(errorsTemplate));

  React.useEffect(() => {
    if (picture) {
      uploadImage(picture);
    }
  }, [picture]);

  const _goToPasswordChange = () => {
    typeof window !== "undefined" && router.push("/alterar-senha");
  };

  const _validateProfile = () => {
    const _phoneNumber = phoneNumber.current?.children[0].value;
    const _displayName = displayName.current?.children[0].value;

    const _errors = _cloneDeep(errorsTemplate);
    let _errorsCount = 0;

    // Phone Number
    if (
      _phoneNumber === "" ||
      _phoneNumber === null ||
      _phoneNumber === undefined ||
      _phoneNumber === "(  )      -    "
    ) {
      _errorsCount++;
      _errors.phoneNumber = "Por favor, preencha o número celular";
    } else if (_phoneNumber.length !== "(00) 12345-1234".length) {
      _errorsCount++;
      _errors.phoneNumber =
        "Por favor, preencha o número corretamente. (XX) YYYYY-ZZZZ";
    }

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

      setCustomTextFieldValue(displayName, _fullName);
    }

    setErrors(_errors);
    if (_errorsCount) {
      return false;
    } else {
      return true;
    }
  };

  const uploadImage = async (file: any) => {
    setUserAvatarLoading(true);
    const formData = new FormData();
    const cloudName = "cirklebr";
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    formData.append("file", file);
    formData.append("upload_preset", "avatarUpload");

    const authorization = axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Authorization"];
    try {
      const response: AxiosResponse<any> = await axios.post(endpoint, formData);
      axios.defaults.headers.common["Authorization"] = authorization;
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

  const updateProfile = async () => {
    if (!_validateProfile()) return;
    const _user = _cloneDeep(authContext.user);
    _user.phoneNumber = getCustomTextFieldValue(phoneNumber);
    _user.name = getCustomTextFieldValue(displayName);

    if (uploadedPicture) _user.picture = uploadedPicture;
    _user.gender = gender;
    _user.dateOfBirth = dateOfBirth;
    _user.isSubscribed = isSubscribed;

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
      <Center>
        <>
          {uploadedPicture && (
            <StyledAvatar
              alt={`${authContext.user.name} Profile Picture`}
              src={cloudinaryImage(uploadedPicture, 128)}
            ></StyledAvatar>
          )}
          {!uploadedPicture && (
            <StyledAvatar
              alt={`${authContext.user.name} Profile Picture`}
              src={cloudinaryImage(authContext.user.picture, 128)}
            ></StyledAvatar>
          )}
        </>
      </Center>
      <SizedBox height={24}></SizedBox>
      <ButtonsHolder>
        <FileUploadButton
          type="primary"
          variant="text"
          width={166}
          onChange={setPicture}
          loading={userAvatarLoading}
        >
          Alterar Foto
        </FileUploadButton>
        {authContext.user.loginType === LoginType.EMAIL_PASSWORD && (
          <>
            <SizedBox width={16}></SizedBox>
            <CustomButton
              onClick={_goToPasswordChange}
              type="delete"
              variant="text"
              width={166}
            >
              Alterar Senha
            </CustomButton>
          </>
        )}
      </ButtonsHolder>

      <Container maxWidth="xs">
        <SizedBox height={36}></SizedBox>
        <span data-test="profile-name">
          <CustomTextField
            type="user"
            ref={displayName}
            error={errors.displayName}
            initialValue={authContext.user.name}
            showIcon
            width={450}
          >
            Nome e Sobrenome
          </CustomTextField>
        </span>
        <SizedBox height={20}></SizedBox>
        <Subtitle bold>Sexo</Subtitle>
        <Row>
          <RadioButtonWithLabel
            value={gender === Gender.FEMALE}
            label="Feminino"
            onClick={() => setGender(Gender.FEMALE)}
          ></RadioButtonWithLabel>
          <SizedBox width={16}></SizedBox>
          <RadioButtonWithLabel
            value={gender === Gender.MALE}
            label="Masculino"
            onClick={() => setGender(Gender.MALE)}
          ></RadioButtonWithLabel>
          <SizedBox width={16}></SizedBox>
          <RadioButtonWithLabel
            value={gender === Gender.NON_BINARY}
            label="Não-Binário"
            onClick={() => setGender(Gender.NON_BINARY)}
          ></RadioButtonWithLabel>
        </Row>
        <SizedBox height={20}></SizedBox>
        <span data-test="profile-birth">
          <CustomDatePicker
            placeholder="Data de Nascimento"
            setDate={setDateOfBirth}
            value={dateOfBirth}
            showYearDropdown
            withPortal={isSmartPhone}
          ></CustomDatePicker>
        </span>
        <SizedBox height={20}></SizedBox>
        <span data-test="profile-phone">
          <CustomTextField
            type="phone"
            ref={phoneNumber}
            error={errors.phoneNumber}
            initialValue={authContext.user.phoneNumber}
            showIcon
            width={216}
          >
            Celular
          </CustomTextField>
        </span>
        <SizedBox height={16}></SizedBox>
        <CheckBoxWithLabel
          label="Desejo receber informações e promoções exclusivas"
          onClick={() => setIsSubscribed(!isSubscribed)}
          value={isSubscribed}
        ></CheckBoxWithLabel>
      </Container>

      <SizedBox height={36}></SizedBox>
      <Center>
        <CustomButton
          width={300}
          type="primary"
          variant="contained"
          onClick={updateProfile}
          loading={loading}
        >
          Salvar
        </CustomButton>
      </Center>
    </>
  );
}

export default ProfileTab;
