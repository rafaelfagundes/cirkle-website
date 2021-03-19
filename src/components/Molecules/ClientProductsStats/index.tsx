import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";
import Row from "../../Atoms/Row";

const Container = styled.div`
  border-radius: 4px;
  background-color: #eee;
  display: flex;
  align-items: center;
`;

const Item = styled.div<{ total?: boolean }>`
  padding: 10px 16px;
  background-color: ${(props) => (props.total ? Colors.MONEY : "#eee")};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: ${(props) => (props.total ? 0 : 4)}px;
  border-bottom-left-radius: ${(props) => (props.total ? 0 : 4)}px;
`;

const Title = styled.div<{ total?: boolean }>`
  font-family: Commissioner, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => (props.total ? Colors.WHITE : Colors.SECONDARY)};
  opacity: ${(props) => (props.total ? 0.75 : 1)};
  text-transform: uppercase;
  text-align: center;
`;

const Value = styled.div<{ total?: boolean }>`
  text-align: center;
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: ${(props) => (props.total ? Colors.WHITE : Colors.PRIMARY)};
`;

interface Props {
  products: number;
  selling: number;
  sold: number;
  unapproved: number;
  donated: number;
  total: number;
}

function ClientProductsStats(props: Props): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Row spaceBetween>
        <Row>
          {!isSmartPhone && (
            <Item>
              <Title>produtos</Title>
              <Value>{props.products}</Value>
            </Item>
          )}
          <Item>
            <Title>à venda</Title>
            <Value>{props.selling}</Value>
          </Item>
          <Item>
            <Title>vendidos</Title>
            <Value>{props.sold}</Value>
          </Item>
          {!isSmartPhone && (
            <>
              <Item>
                <Title>restritos</Title>
                <Value>{props.unapproved}</Value>
              </Item>
              <Item>
                <Title>doados</Title>
                <Value>{props.donated}</Value>
              </Item>
            </>
          )}
        </Row>
        <Item total>
          <Title total>Saldo</Title>
          <Value total>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(props.total))}
          </Value>
        </Item>
      </Row>
    </Container>
  );
}

export default ClientProductsStats;
