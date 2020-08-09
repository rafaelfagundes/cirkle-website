import { Container, Grid, Hidden, InputBase } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Icon from "../src/components/Icon";
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

const Newsletter = styled.div`
  background-color: ${Colors.RED_PINK};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
`;

const NewsletterDescription = styled.p`
  font-family: "FuturaPT";
  color: ${Colors.WHITE};
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 5px;
  font-family: FuturaPT;
  font-size: 16px;
  margin-top: 3px;
`;

const NewsletterInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  height: 45px;
  padding: 8px 12px;
  margin-bottom: 10px;
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
      <Newsletter>
        <Container maxWidth="xs">
          <NewsletterInput>
            <Icon type="email"></Icon>
            <StyledInputBase
              placeholder="Informe seu email"
              inputProps={{ "aria-label": "search" }}
            />
          </NewsletterInput>
          <NewsletterDescription>
            Assine a newsletter para receber todas as nossas novidades e
            promoções
          </NewsletterDescription>
        </Container>
      </Newsletter>
    </>
  );
}

export default Home;
