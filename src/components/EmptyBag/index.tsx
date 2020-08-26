import { useRouter } from "next/router";
import React from "react";
import Center from "../Center";
import Column from "../Column";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";
import Title from "../Title";

function EmptyBag(): JSX.Element {
  const router = useRouter();

  const _goToProducts = () => {
    router.push("/products");
  };

  return (
    <Column>
      <Center>
        <Icon type="bag" size={128}></Icon>
      </Center>
      <SizedBox height={32}></SizedBox>
      <Center>
        <Title>A sacola está vazia</Title>
      </Center>
      <SizedBox height={8}></SizedBox>
      <Center>
        <SimpleText>Não perca tempo, adicione os melhores produtos.</SimpleText>
      </Center>
      <SizedBox height={32}></SizedBox>
      <Center>
        <CustomButton
          type="primary"
          variant="contained"
          onClick={_goToProducts}
          width={150}
        >
          Explorar
        </CustomButton>
      </Center>
    </Column>
  );
}

export default EmptyBag;
