import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledPaymentType = styled.div<{ size: number }>`
  width: ${(props) => props.size * 1.4}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.size * 0.167}px;
`;

const ImageHolder = styled.div<{ bgColor: string; size: number }>`
  width: ${(props) => props.size * 1.4}px;
  height: ${(props) => props.size}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border-radius: ${(props) => props.size * 0.167}px; */
  background-color: ${(props) => props.bgColor};
`;

const Title = styled.span`
  margin-top: 5px;
  color: ${Colors.WHITE};
  font-family: "FuturaPT";
  font-size: 14px;
  /* font-weight: bold; */
  text-align: center;
  line-height: 100%;
`;

function PaymentType({
  type,
  size = 48,
}: {
  type: string;
  size?: number;
}): JSX.Element {
  function getPaymentType(
    type: string
  ): { image: string; bgColor: string; title: string } {
    switch (type) {
      case "amex":
        return {
          image: "/images/payment_types/amex.png",
          bgColor: "#016fd0",
          title: "American Express",
        };
      case "aura":
        return {
          image: "/images/payment_types/aura.png",
          bgColor: "#fff202",
          title: "Aura",
        };
      case "bank_transfer":
        return {
          image: "/images/payment_types/bank_transfer.png",
          bgColor: "#FFF",
          title: "Transferência Bancária",
        };
      case "boleto":
        return {
          image: "/images/payment_types/boleto.png",
          bgColor: "#FFF",
          title: "Boleto Bancário",
        };
      case "dinersclub":
        return {
          image: "/images/payment_types/dinersclub.png",
          bgColor: "#FFF",
          title: "Diners",
        };
      case "discover":
        return {
          image: "/images/payment_types/discover.png",
          bgColor: "#FFF",
          title: "Discover",
        };
      case "elo":
        return {
          image: "/images/payment_types/elo.png",
          bgColor: "#242020",
          title: "Elo",
        };
      case "hipercard":
        return {
          image: "/images/payment_types/hipercard.png",
          bgColor: "#FFF",
          title: "Hipercard",
        };
      case "jcb":
        return {
          image: "/images/payment_types/jcb.png",
          bgColor: "#FFF",
          title: "JCB",
        };
      case "mastercard":
        return {
          image: "/images/payment_types/mastercard.png",
          bgColor: "#FFF",
          title: "Mastercard",
        };
      case "visa":
        return {
          image: "/images/payment_types/visa.png",
          bgColor: "#FFF",
          title: "Visa",
        };

      default:
        return {
          image: "/images/payment_types/boleto.png",
          bgColor: "#FFF",
          title: "Boleto Bancário",
        };
    }
  }

  const paymentType = getPaymentType(type);

  return (
    <StyledPaymentType size={size}>
      <ImageHolder bgColor={paymentType.bgColor} size={size}>
        <img
          src={paymentType.image}
          alt={type.toUpperCase()}
          width={size}
          height={size}
        />
      </ImageHolder>
      <Title>{paymentType.title}</Title>
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