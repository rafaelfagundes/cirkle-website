import { Container, useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useRecentlyViewed } from "../../../hooks/recentlyViewed/useRecentlyViewed";
import Product from "../../../modules/product/Product";
import theme from "../../../theme/theme";
import CustomButton from "../../Atoms/CustomButton";
import Padding from "../../Atoms/Padding";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";
import Title from "../../Atoms/Title";
import RecentItemsCarousel from "../../Molecules/RecentItemsCarousel";

const StyledRecentlyViewed = styled.div<{ backgroundColor: string }>`
  padding: 16px 0 32px 0;
  background-color: ${(props) => props.backgroundColor};
`;

interface RecentlyViewedProps {
  items: Array<Product>;
  backgroundColor: string;
  width?: false | "xs" | "sm" | "md" | "lg" | "xl";
}

function RecentlyViewed(props: RecentlyViewedProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const recentlyViewedContext = useRecentlyViewed();

  function clearRecent() {
    recentlyViewedContext.removeAll();
  }

  let maxItems = 8;
  if (props.width && props.width === "lg") {
    maxItems = 10;
  }

  return (
    <StyledRecentlyViewed backgroundColor={props.backgroundColor}>
      <Container maxWidth={props.width ? props.width : "md"} disableGutters>
        <Row spaceBetween>
          <Padding horizontal={isSmartPhone ? 16 : 0}>
            <Title>Vistos recentemente</Title>
          </Padding>
          <CustomButton
            onClick={clearRecent}
            variant="text"
            type="delete"
            width={127}
            noPadding
            icon={isSmartPhone ? undefined : "trash-red"}
          >
            Limpar Lista
          </CustomButton>
        </Row>
        <SizedBox height={12}></SizedBox>
        <RecentItemsCarousel
          products={props.items.slice(0, maxItems)}
          large={props.width && props.width === "lg"}
        ></RecentItemsCarousel>
      </Container>
    </StyledRecentlyViewed>
  );
}

export default RecentlyViewed;
