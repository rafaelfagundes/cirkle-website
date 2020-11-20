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

const Status = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 3px 6px;
  border-radius: 2px;
`;

const StatusText = styled.div`
  color: ${Colors.WHITE};
  font-weight: 700;
  text-align: center;
`;

const MobileText = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 700;
  text-align: center;
  font-family: Commissioner, sans-serif;
  font-size: 10px;
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
        <Link>
          <LinkText>Pagar Agora</LinkText>
        </Link>
      );

    default:
      return "Erro";
  }
}

export function getStatus(status: OrderStatus, mobile: boolean): JSX.Element {
  if (mobile) {
    switch (status) {
      case OrderStatus.CANCELED:
        return <MobileText color={Colors.ERROR}>Cancelado</MobileText>;

      case OrderStatus.DELIVERED:
        return <MobileText color={Colors.PRIMARY}>Entregue</MobileText>;

      case OrderStatus.SHIPPED:
        return (
          <MobileText color={Colors.BLUE_JEANS}>Em Rota de Entrega</MobileText>
        );

      case OrderStatus.PAYMENT_CONFIRMED:
        return (
          <MobileText color={Colors.MONEY}>Pagamento Confirmado</MobileText>
        );

      case OrderStatus.PAYMENT_ERROR:
        return <MobileText color={Colors.ERROR}>Erro no Pagamento</MobileText>;

      case OrderStatus.PAYMENT_PENDING:
        return (
          <MobileText color={Colors.ORANGE_KIDS}>
            Aguardando Pagamento
          </MobileText>
        );

      case OrderStatus.PRE_SHIPPING:
        return (
          <MobileText color={Colors.PURPUREUS}>Preparando Pedido</MobileText>
        );

      case OrderStatus.RECEIVED:
        return <MobileText color={Colors.GRAY}>Pedido Criado</MobileText>;

      default:
        return <MobileText color={Colors.ERROR}>Erro</MobileText>;
    }
  } else {
    switch (status) {
      case OrderStatus.CANCELED:
        return (
          <Status color={Colors.ERROR}>
            <StatusText>Cancelado</StatusText>
          </Status>
        );

      case OrderStatus.DELIVERED:
        return (
          <Status color={Colors.PRIMARY}>
            <StatusText>Entregue</StatusText>
          </Status>
        );

      case OrderStatus.SHIPPED:
        return (
          <Status color={Colors.BLUE_JEANS}>
            <StatusText>Em Rota de Entrega</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_CONFIRMED:
        return (
          <Status color={Colors.MONEY}>
            <StatusText>Pagamento Confirmado</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_ERROR:
        return (
          <Status color={Colors.ERROR}>
            <StatusText>Erro no Pagamento</StatusText>
          </Status>
        );

      case OrderStatus.PAYMENT_PENDING:
        return (
          <Status color={Colors.ORANGE_KIDS}>
            <StatusText>Aguardando Pagamento</StatusText>
          </Status>
        );

      case OrderStatus.PRE_SHIPPING:
        return (
          <Status color={Colors.PURPUREUS}>
            <StatusText>Preparando Pedido</StatusText>
          </Status>
        );

      case OrderStatus.RECEIVED:
        return (
          <Status color={Colors.GRAY}>
            <StatusText>Pedido Criado</StatusText>
          </Status>
        );

      default:
        return (
          <Status color={Colors.ERROR}>
            <StatusText>Erro</StatusText>
          </Status>
        );
    }
  }
}
