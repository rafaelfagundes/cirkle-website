import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledPaymentType = styled.div<{
  size: number;
  border: boolean;
  bgColor: string;
}>`
  width: ${(props) => props.size * 1.4}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.border ? "1px" : 0)};
  border: ${(props) => (props.border ? "1px solid #EEE" : "none")};
  border-radius: ${(props) => props.size * 0.084}px;
  background-color: ${(props) => props.bgColor};
`;

const ImageHolder = styled.div<{
  size: number;
}>`
  width: ${(props) => props.size * 1.4}px;
  height: ${(props) => props.size}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function PaymentType({
  type,
  size = 48,
  border = false,
}: {
  type: string;
  size?: number;
  border?: boolean;
}): JSX.Element {
  function getPaymentType(): { image: string; bgColor: string; title: string } {
    switch (type) {
      case "amex":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/amex.png`,
          bgColor: "#016fd0",
          title: "American Express",
        };
      case "aura":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/aura.png`,
          bgColor: "#fff202",
          title: "Aura",
        };
      case "bank_transfer":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/bank_transfer.png`,
          bgColor: "#FFF",
          title: "Transferência Bancária",
        };
      case "dinersclub":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/dinersclub.png`,
          bgColor: "#FFF",
          title: "Diners",
        };
      case "discover":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/discover.png`,
          bgColor: "#FFF",
          title: "Discover",
        };
      case "elo":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/elo.png`,
          bgColor: "#242020",
          title: "Elo",
        };
      case "hipercard":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/hipercard.png`,
          bgColor: "#FFF",
          title: "Hipercard",
        };
      case "jcb":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/jcb.png`,
          bgColor: "#FFF",
          title: "JCB",
        };
      case "mastercard":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/mastercard.png`,
          bgColor: "#FFF",
          title: "Mastercard",
        };
      case "visa":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/visa.png`,
          bgColor: "#FFF",
          title: "Visa",
        };
      case "loterica":
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/loterica.png`,
          bgColor: "#FFF",
          title: "Pagamento nas Loterias Caixa",
        };
      case "boleto":
      default:
        return {
          image: `https://res.cloudinary.com/cirklebr/image/upload/c_scale,w_${
            size * 2
          }/v1599082122/payment/boleto.png`,
          bgColor: "#FFF",
          title: "Boleto Bancário",
        };
    }
  }

  const paymentType = getPaymentType();

  return (
    <StyledPaymentType
      size={size}
      border={border}
      bgColor={paymentType.bgColor}
    >
      <ImageHolder size={size}>
        <img
          src={paymentType.image}
          alt={paymentType.title}
          title={paymentType.title}
          width={size}
          height={size}
        />
      </ImageHolder>
    </StyledPaymentType>
  );
}

PaymentType.propTypes = {
  type: PropTypes.oneOf([
    "amex",
    "aura",
    "boleto",
    "dinersclub",
    "discover",
    "elo",
    "hipercard",
    "jcb",
    "mastercard",
    "visa",
    "bank_transfer",
  ]),
};

export default PaymentType;
