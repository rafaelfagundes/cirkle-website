import { Button } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeftRounded";
import React, { useState } from "react";
import styled from "styled-components";
import HorizontalLine from "../../../src/components/Atoms/HorizontalLine";
import Row from "../../../src/components/Atoms/Row";
import SizedBox from "../../../src/components/Atoms/SizedBox";
import Colors from "../../../src/enums/Colors";
import ProductsList from "./subpages/products-list";
import NewProduct from "./subpages/products-new";

const Page = styled.div`
  width: 100%;
`;

const ButtonText = styled.span`
  font-family: Commissioner;
  text-transform: none;
`;

const Content = styled.div``;

function Products(): JSX.Element {
  const [currentPage, setCurrentPage] = useState("List");

  return (
    <Page>
      {currentPage === "List" && (
        <Row>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={() => setCurrentPage("NewProduct")}
          >
            <ButtonText>Novo Produto</ButtonText>
          </Button>
        </Row>
      )}
      {currentPage === "NewProduct" && (
        <Row>
          <Button
            disableElevation
            variant="contained"
            onClick={() => setCurrentPage("List")}
            startIcon={<ChevronLeft />}
          >
            <ButtonText>Voltar</ButtonText>
          </Button>
        </Row>
      )}
      <SizedBox height={20}></SizedBox>
      <HorizontalLine color={Colors.LIGHT_GRAY}></HorizontalLine>
      <SizedBox height={20}></SizedBox>
      <Content>
        {currentPage === "NewProduct" && (
          <NewProduct setCurrentPage={setCurrentPage}></NewProduct>
        )}
        {currentPage === "List" && <ProductsList></ProductsList>}
      </Content>
    </Page>
  );
}

export default Products;
