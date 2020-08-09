import { Container, Grid, Hidden } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import MainBanner from "../src/components/MainBanner/index";
import SearchBar from "../src/components/SearchBar/index";
import { Colors } from "../src/theme/theme";

const CategoryItem = styled.div`
  background-color: ${Colors.PRIMARY};
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryItemText = styled.div`
  color: #fff;
  font-family: "Raleway";
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

const CategoriesContainer = styled.div`
  padding-top: 11px;
  padding-bottom: 11px;
  display: flex;
  align-items: center;
`;

function Home(): JSX.Element {
  return (
    <>
      <Hidden smUp={true}>
        <SearchBar placeHolder="Procure por marcas, tipos, modelos"></SearchBar>
      </Hidden>
      <MainBanner
        url="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
        primaryText="até 70% off"
        secondaryText="bolsas e acessórios"
        position="bottom-right"
        // primaryTextColor={Colors.BLACK}
        // primaryBackgroundColor={Colors.AMARANTH_PINK}
        // secondaryTextColor={Colors.BLACK}
        // secondaryBackgroundColor={Colors.MIDDLE_YELLOW}
      ></MainBanner>
      <Hidden smUp={true}>
        <CategoriesContainer>
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CategoryItem>
                  <CategoryItemText>roupas</CategoryItemText>
                </CategoryItem>
              </Grid>
              <Grid item xs={4}>
                <CategoryItem>
                  <CategoryItemText>bolsas</CategoryItemText>
                </CategoryItem>
              </Grid>
              <Grid item xs={4}>
                <CategoryItem>
                  <CategoryItemText>calçados</CategoryItemText>
                </CategoryItem>
              </Grid>
            </Grid>
          </Container>
        </CategoriesContainer>
      </Hidden>
    </>
  );
}

export default Home;
