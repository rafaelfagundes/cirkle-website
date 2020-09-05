import React from "react";
import Center from "../Center";
import Column from "../Column";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Padding from "../Padding";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";
import Title from "../Title";

type EmptyPageProps = {
  title?: string;
  subtitle?: string;
  icon?: string;
  buttonText?: string;
  buttonAction?: () => void;
};

function EmptyPage({
  title = "Não Encontrado",
  subtitle = "O recurso não pode ser encontrado",
  icon = "empty",
  buttonText = "Voltar",
  buttonAction = process.browser ? () => window.history.back() : null,
}: EmptyPageProps): JSX.Element {
  return (
    <Column>
      <Center>
        <Icon type={icon} size={128}></Icon>
      </Center>
      <SizedBox height={32}></SizedBox>
      <Center>
        <Title>{title}</Title>
      </Center>
      <SizedBox height={8}></SizedBox>
      <Center>
        <Padding horizontal={32}>
          <SimpleText centered>{subtitle}</SimpleText>
        </Padding>
      </Center>
      <SizedBox height={32}></SizedBox>
      <Center>
        <CustomButton
          type="primary"
          variant="contained"
          onClick={buttonAction}
          width={150}
        >
          {buttonText}
        </CustomButton>
      </Center>
    </Column>
  );
}

export default EmptyPage;
