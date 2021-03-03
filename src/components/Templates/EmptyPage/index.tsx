import React from "react";
import Center from "../../Atoms/Center";
import Column from "../../Atoms/Column";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import Padding from "../../Atoms/Padding";
import SimpleText from "../../Atoms/SimpleText";
import SizedBox from "../../Atoms/SizedBox";
import Title from "../../Atoms/Title";

type EmptyPageProps = {
  title?: string;
  subtitle?: string;
  icon?: string;
  buttonText?: string;
  buttonAction?: () => void;
  noButton?: boolean;
};

function EmptyPage({
  title = "Não Encontrado",
  subtitle = "O recurso não pode ser encontrado",
  icon = "empty",
  buttonText = "Voltar",
  buttonAction = process.browser ? () => window.history.back() : null,
  noButton = false,
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
      {!noButton && (
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
      )}
    </Column>
  );
}

export default EmptyPage;
