import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import Row from "../../src/components/Atoms/Row";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import CartFooterButtons from "../../src/components/Molecules/CartFooterButtons";
import PaymentOptions from "../../src/components/Molecules/PaymentOptions";
import Barcode from "../../src/components/Pages/Payment/Barcode";
import CreditCard from "../../src/components/Pages/Payment/CreditCard";
import Pix from "../../src/components/Pages/Payment/Pix";
import LastMilePage from "../../src/components/Templates/LastMilePage";
import Colors from "../../src/enums/Colors";
import { useCart } from "../../src/hooks/cart/useCart";

const Price = styled.p`
  margin: 0;
  color: ${Colors.MONEY};
  font-weight: 700;
  font-size: 14px;
  font-family: Commissioner, sans-serif;
`;

function Pagamento(): JSX.Element {
  const breadcrumbs = [
    {
      active: false,
      position: 1,
      desc: "Endereço",
    },
    {
      active: true,
      position: 2,
      desc: "Pagamento",
    },
    {
      active: false,
      position: 3,
      desc: "Revisão",
    },
  ];

  const cartContext = useCart();

  const [option, setOption] = useState("cc");

  const router = useRouter();

  const goToFinishPage = (): void => {
    router.push("/comprar/concluir");
  };

  const goToAddressPage = (): void => {
    router.push("/comprar/envio");
  };

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <SizedBox height={10}></SizedBox>
      <Row spaceBetween>
        <Title>Forma de Pagamento</Title>
        <Price>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(cartContext.cart.total)}
        </Price>
      </Row>
      <SizedBox height={32}></SizedBox>
      <PaymentOptions option={option} setOption={setOption}></PaymentOptions>
      <SizedBox height={36}></SizedBox>
      <HorizontalLine></HorizontalLine>
      <SizedBox height={20}></SizedBox>
      {option === "cc" && <CreditCard></CreditCard>}
      {option === "barcode" && <Barcode></Barcode>}
      {option === "pix" && <Pix></Pix>}
      <CartFooterButtons
        buttons={[
          {
            text: "Alterar Endereço",
            onClick: goToAddressPage,
            type: "text",
            width: 180,
            isBackButton: true,
          },
          {
            text: "Revisar Pedido",
            onClick: goToFinishPage,
            type: "success",
            width: 200,
          },
        ]}
      ></CartFooterButtons>
    </LastMilePage>
  );
}

export default Pagamento;
