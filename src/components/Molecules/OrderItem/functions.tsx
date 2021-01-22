import styled from "styled-components";
import Colors from "../../../enums/Colors";
import {
  OrderPayment,
  OrderStatus,
  PaymentStatus,
} from "../../../modules/order/Order";
import Product from "../../../modules/product/Product";

const Link = styled.div``;

const LinkText = styled.a`
  color: ${Colors.BLUE_JEANS};
  text-decoration: underline;
  cursor: pointer;
`;

const Status = styled.div<{ color: string; fontSize: number }>`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.fontSize * 0.3}px
    ${(props) => props.fontSize * 0.8}px;
  border-radius: 2px;
`;

const StatusText = styled.div<{ fontSize: number }>`
  color: ${Colors.WHITE};
  font-weight: 700;
  text-align: center;
  font-size: ${(props) => props.fontSize}px;
`;

const MobileText = styled.div<{ color: string; fontSize: number }>`
  color: ${(props) => props.color};
  font-weight: 700;
  text-align: center;
  font-family: Commissioner, sans-serif;
  font-size: ${(props) => props.fontSize - 2}px;
  line-height: 12px;
  font-weight: 700;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: -0.25px;
`;

export function calcTotal(items: Array<Product>): string {
  let total = 0;

  items.forEach((item) => (total = total + item.price * item.cartQty));

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total);
}

export function getPayment(payment: OrderPayment): string | JSX.Element {
  switch (payment.status) {
    case PaymentStatus.SUCCESS:
      return "Confirmado";
    case PaymentStatus.ERROR:
      return (
        <Link>
          <LinkText>Tentar Novamente</LinkText>
        </Link>
      );
    case PaymentStatus.PENDING:
      return (
        <Link onClick={() => window.open(payment.paymentLink)}>
          <LinkText>Pagar Agora</LinkText>
        </Link>
      );

    default:
      return "Erro";
  }
}

export function getStatus(
  status: OrderStatus,
  mobile: boolean,
  fontSize = 12
): JSX.Element {
  if (mobile) {
    switch (status) {
      case OrderStatus.CANCELED:
        return (
          <MobileText fontSize={fontSize} color={Colors.ERROR}>
            Cancelado
          </MobileText>
        );

      case OrderStatus.DELIVERED:
        return (
          <MobileText fontSize={fontSize} color={Colors.PRIMARY}>
            Entregue
          </MobileText>
        );

      case OrderStatus.SHIPPED:
        return (
          <MobileText fontSize={fontSize} color={Colors.BLUE_JEANS}>
            Em Rota de Entrega
          </MobileText>
        );

      case OrderStatus.PAYMENT_CONFIRMED:
        return (
          <MobileText fontSize={fontSize} color={Colors.MONEY}>
            Pagamento Confirmado
          </MobileText>
        );

      case OrderStatus.PAYMENT_ERROR:
        return (
          <MobileText fontSize={fontSize} color={Colors.ERROR}>
            Erro no Pagamento
          </MobileText>
        );

      case OrderStatus.PAYMENT_PENDING:
        return (
          <MobileText fontSize={fontSize} color={Colors.ORANGE_KIDS}>
            Aguardando Pagamento
          </MobileText>
        );

      case OrderStatus.PRE_SHIPPING:
        return (
          <MobileText fontSize={fontSize} color={Colors.PURPUREUS}>
            Preparando Pedido
          </MobileText>
        );

      case OrderStatus.RECEIVED:
        return (
          <MobileText fontSize={fontSize} color={Colors.GRAY}>
            Pedido Criado
          </MobileText>
        );

      default:
        return (
          <MobileText fontSize={fontSize} color={Colors.ERROR}>
            Erro
          </MobileText>
        );
    }
  } else {
    switch (status) {
      case OrderStatus.CANCELED:
        return (
          <Status fontSize={fontSize} color={Colors.ERROR}>
            <StatusText fontSize={fontSize}>Cancelado</StatusText>
          </Status>
        );

      case OrderStatus.DELIVERED:
        return (
          <Status fontSize={fontSize} color={Colors.PRIMARY}>
            <StatusText fontSize={fontSize}>Entregue</StatusText>
          </Status>
        );

      case OrderStatus.SHIPPED:
        return (
          <Status fontSize={fontSize} color={Colors.BLUE_JEANS}>
            <StatusText fontSize={fontSize}>Em Rota de Entrega</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_CONFIRMED:
        return (
          <Status fontSize={fontSize} color={Colors.MONEY}>
            <StatusText fontSize={fontSize}>Pagamento Confirmado</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_ERROR:
        return (
          <Status fontSize={fontSize} color={Colors.ERROR}>
            <StatusText fontSize={fontSize}>Erro no Pagamento</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_PENDING:
        return (
          <Status fontSize={fontSize} color={Colors.ORANGE_KIDS}>
            <StatusText fontSize={fontSize}>Aguardando Pagamento</StatusText>
          </Status>
        );

      case OrderStatus.PRE_SHIPPING:
        return (
          <Status fontSize={fontSize} color={Colors.PURPUREUS}>
            <StatusText fontSize={fontSize}>Preparando Pedido</StatusText>
          </Status>
        );

      case OrderStatus.RECEIVED:
        return (
          <Status fontSize={fontSize} color={Colors.GRAY}>
            <StatusText fontSize={fontSize}>Pedido Criado</StatusText>
          </Status>
        );

      default:
        return (
          <Status fontSize={fontSize} color={Colors.ERROR}>
            <StatusText fontSize={fontSize}>Erro</StatusText>
          </Status>
        );
    }
  }
}
