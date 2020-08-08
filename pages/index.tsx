import { Container, Grid, Hidden } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import MainBanner from "../src/components/MainBanner/index";
import SearchBar from "../src/components/SearchBar/index";

const CategoryItem = styled.div`
  background-color: #13547a;
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
      <MainBanner url="./images/banner.jpg"></MainBanner>
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
