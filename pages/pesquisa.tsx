import { Container, Slider, useMediaQuery } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CheckboxWithLabel from "../src/components/Atoms/CheckboxWithLabel";
import Column from "../src/components/Atoms/Column";
import Padding from "../src/components/Atoms/Padding";
import RadioButtonWithLabel from "../src/components/Atoms/RadioButtonWithLabel";
import SizedBox from "../src/components/Atoms/SizedBox";
import ProductItem from "../src/components/Molecules/ProductItem";
import StaticBreadcrumbs from "../src/components/Molecules/StaticBreadcrumbs";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Filters = styled.div`
  width: 260px;
  margin-right: 20px;
`;

const FilterCard = styled.div`
  background-color: ${Colors.WHITE};
  padding: 16px 16px 8px 16px;
  border-radius: 4px;
`;

const FilterHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FilterTitle = styled.div`
  text-transform: uppercase;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  display: flex;
  align-items: center;
  letter-spacing: -0.005px;

  color: ${Colors.SECONDARY};
`;

const FilterCleanButton = styled.span`
  text-transform: uppercase;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  letter-spacing: -0.005px;

  color: ${Colors.PRIMARY};

  &:hover {
    text-decoration: underline;
  }
`;

const Products = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 960px;
  height: 100%;
`;

const Sizes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Size = styled.div<{ selected: boolean; noMargin?: boolean }>`
  display: flex;
  font-weight: ${(props) => (props.selected ? 700 : 400)};
  width: 51px;
  height: 28px;
  background-color: ${(props) => (props.selected ? Colors.PRIMARY : "#FBEFF7")};
  justify-content: center;
  align-items: center;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#FBEFF7" : Colors.PRIMARY)};
  margin-right: ${(props) => (props.noMargin ? 0 : 8)}px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const Color = styled.div<{
  selected: boolean;
  color: string;
  noMargin?: boolean;
}>`
  display: flex;
  width: 51px;
  height: 28px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#FBEFF7" : Colors.PRIMARY)};
  opacity: ${(props) => (props.selected ? 1 : 0.25)};
  margin-right: ${(props) => (props.noMargin ? 0 : 8)}px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const Prices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Price = styled.div`
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: ${Colors.PRIMARY};
  font-size: 12px;
`;

const useStyles = makeStyles({
  root: {
    colorPrimary: Colors.PRIMARY,
  },
});

const CustomSlider = withStyles({
  active: {},
  root: {
    color: Colors.SECONDARY,
    height: 3,
    padding: "13px 0",
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: Colors.PRIMARY,
    border: "1px solid currentColor",
    marginTop: -9,
    marginLeft: -11,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    color: Colors.PRIMARY,
  },
})(Slider);

function Search({ menu }: { menu: Menu }): JSX.Element {
  const classes = useStyles();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const { q, size, color, category, brand, department } = router.query;

  const { data: sizes, error: sizesError } = useSWR("/sizes");
  if (sizesError) console.error(sizesError);

  const { data: colors, error: colorsError } = useSWR("/colors");
  if (colorsError) console.error(colorsError);

  const { data: brands, error: brandsError } = useSWR("/brands");
  if (brandsError) console.error(brandsError);

  const { data: subCategories, error: subCategoriesError } = useSWR(
    "/sub-categories"
  );
  if (subCategoriesError) console.error(subCategoriesError);

  const [section, setSection] = useState("Mulher");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [price, setPrice] = useState([0, 2880]);

  const [categories, setCategories] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  function priceText(value: number) {
    return `R$ ${value}`;
  }

  const priceChange = (event: any, newValue: any) => {
    setPrice(newValue);
  };

  const addOrRemoveCategory = (category: string) => {
    const _categories = _cloneDeep(categories);
    const index = _findIndex(_categories, (o) => o === category);

    if (index < 0) {
      setCategories([..._categories, category]);
    } else {
      _categories.splice(index, 1);
      setCategories(_categories);
    }
  };

  const addOrRemoveBrands = (brand: string) => {
    const _brands = _cloneDeep(selectedBrands);
    const index = _findIndex(_brands, (o) => o === brand);

    if (index < 0) {
      setSelectedBrands([..._brands, brand]);
    } else {
      _brands.splice(index, 1);
      setSelectedBrands(_brands);
    }
  };

  useEffect(() => {
    if (color) setSelectedColor(color);
    if (size) setSelectedSize(size);
  }, [color, size]);

  useEffect(() => {
    router.push({
      pathname: "/pesquisa",
      query: {
        department: section || undefined,
        color: selectedColor || undefined,
        size: selectedSize || undefined,
        minPrice: price[0] || undefined,
        maxPrice: price[1] || undefined,
        q,
        brands: selectedBrands,
        categories,
      },
    });
  }, [
    section,
    selectedSize,
    selectedColor,
    price,
    q,
    categories,
    selectedBrands,
  ]);

  const getSearchUrl = () => {
    if (process.browser) {
      const url = window.location.href;
      const params = url.split("?")[1];
      return `/search?${params}`;
    }
    return "/search";
  };

  const { data: products, error: productsError } = useSWR(getSearchUrl());
  if (productsError) console.error(productsError);

  return (
    <Layout menu={menu} containerMargin={false}>
      <Container maxWidth="lg" disableGutters>
        <SizedBox height={16}></SizedBox>
        <Padding horizontal={20}>
          <StaticBreadcrumbs
            showHome
            root={{ link: "pesquisa", title: q ? "Pesquisa" : "Produtos" }}
            category={q ? { link: `?q=${q}`, title: `"${q}"` } : null}
          ></StaticBreadcrumbs>
        </Padding>

        <SizedBox height={16}></SizedBox>
        <Row>
          <Filters>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Seção</FilterTitle>
              </FilterHead>
              <SizedBox height={5}></SizedBox>
              <Column>
                <RadioButtonWithLabel
                  label="Mulher"
                  onClick={() => setSection("Mulher")}
                  value={section === "Mulher"}
                ></RadioButtonWithLabel>
                <RadioButtonWithLabel
                  label="Kids"
                  onClick={() => setSection("Kids")}
                  value={section === "Kids"}
                ></RadioButtonWithLabel>
              </Column>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Tamanho</FilterTitle>
                <FilterCleanButton onClick={() => setSelectedSize(null)}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={16}></SizedBox>
              <Sizes>
                {sizes?.map((s: any, index: number) => (
                  <Size
                    key={s.value}
                    selected={selectedSize === s.value}
                    onClick={() => setSelectedSize(s.value)}
                    noMargin={(index + 1) % 4 === 0}
                  >
                    {s.value}
                  </Size>
                ))}
              </Sizes>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Cor</FilterTitle>
                <FilterCleanButton onClick={() => setSelectedColor(null)}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={16}></SizedBox>
              <Sizes>
                {colors &&
                  colors.map((s: any, index: number) => (
                    <Color
                      key={s.name}
                      selected={selectedColor === s.name || !selectedColor}
                      onClick={() => setSelectedColor(s.name)}
                      noMargin={(index + 1) % 4 === 0}
                      color={s.hexColor}
                    ></Color>
                  ))}
              </Sizes>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Preço</FilterTitle>
                <FilterCleanButton onClick={() => setPrice([0, 2880])}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={12}></SizedBox>
              <Padding horizontal={12}>
                <div className={classes.root}>
                  <CustomSlider
                    value={price}
                    onChange={priceChange}
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={priceText}
                    min={0}
                    max={2880}
                    step={100}
                    color="primary"
                  />
                </div>
              </Padding>
              <Prices>
                <Price>{`${new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(price[0])}`}</Price>
                <Price>{`${new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(price[1])}`}</Price>
              </Prices>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Categorias</FilterTitle>
                <FilterCleanButton onClick={() => setCategories([])}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={12}></SizedBox>
              <div>
                {subCategories?.map((sub: any) => (
                  <CheckboxWithLabel
                    key={sub.slug}
                    label={sub.title}
                    onClick={() => addOrRemoveCategory(sub.slug)}
                    value={categories.includes(sub.slug)}
                  ></CheckboxWithLabel>
                ))}
              </div>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Marcas</FilterTitle>
                <FilterCleanButton onClick={() => setSelectedBrands([])}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={12}></SizedBox>
              <div>
                {brands?.map((sub: any) => (
                  <CheckboxWithLabel
                    key={sub.id}
                    label={sub.name}
                    onClick={() => addOrRemoveBrands(sub.id)}
                    value={selectedBrands.includes(sub.id)}
                  ></CheckboxWithLabel>
                ))}
              </div>
            </FilterCard>
          </Filters>
          <Products>
            {products?.map((item: any, index: number) => (
              <span
                style={{
                  width: !isSmartphone && (index + 1) % 4 !== 0 ? 244 : 228,
                }}
                key={item.id}
              >
                <ProductItem data={item}></ProductItem>
                {!isSmartphone && (index + 1) % 4 !== 0 && (
                  <SizedBox width={16}></SizedBox>
                )}
                {isSmartphone && <SizedBox width={16}></SizedBox>}
              </span>
            ))}
          </Products>
        </Row>
        <SizedBox height={96}></SizedBox>
      </Container>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Search;
