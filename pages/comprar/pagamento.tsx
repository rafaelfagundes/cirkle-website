import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import Row from "../../src/components/Atoms/Row";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import PaymentOptions from "../../src/components/Molecules/PaymentOptions";
import Barcode, {
  MercadoPagoPaymentType,
} from "../../src/components/Pages/Payment/Barcode";
import CreditCard from "../../src/components/Pages/Payment/CreditCard";
import LastMilePage from "../../src/components/Templates/LastMilePage";
import Colors from "../../src/enums/Colors";
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import theme from "../../src/theme/theme";

const Price = styled.p`
  margin: 0;
  color: ${Colors.MONEY};
  font-weight: 700;
  font-size: 14px;
  font-family: Commissioner, sans-serif;
`;

function Pagamento(): JSX.Element {
  const cartContext = useCart();
  const orderContext = useOrder();
  const router = useRouter();

  React.useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  if (cartContext.cart.items.length === 0) {
    if (process.browser) {
      router.push("/");
      return <></>;
    }
  }

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

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

  const [option, setOption] = useState("cc");

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <SizedBox height={10}></SizedBox>
      <Row spaceBetween>
        <Title>Forma de Pagamento</Title>
        <Price>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(orderContext.getTotal(cartContext.isShippingFree()))}
        </Price>
      </Row>
      <SizedBox height={isSmartPhone ? 20 : 24}></SizedBox>
      <PaymentOptions option={option} setOption={setOption}></PaymentOptions>
      <SizedBox height={isSmartPhone ? 10 : 24}></SizedBox>
      <HorizontalLine></HorizontalLine>
      <SizedBox height={20}></SizedBox>
      {option === "cc" && <CreditCard></CreditCard>}
      {option === "barcode" && (
        <Barcode
          message="O boleto será gerado ao concluir o pedido"
          title="Boleto Bancário"
          type={MercadoPagoPaymentType.BOLETO}
        ></Barcode>
      )}
      {option === "loterica" && (
        <Barcode
          message="O código para pagamento será gerado ao concluir o pedido"
          title="Pagamento na Lotérica"
          type={MercadoPagoPaymentType.LOTERICA}
        ></Barcode>
      )}
    </LastMilePage>
  );
}

export default Pagamento;
