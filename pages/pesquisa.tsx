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
import CustomButton from "../src/components/Atoms/CustomButton";
import Icon from "../src/components/Atoms/Icon";
import Padding from "../src/components/Atoms/Padding";
import RadioButtonWithLabel from "../src/components/Atoms/RadioButtonWithLabel";
import SizedBox from "../src/components/Atoms/SizedBox";
import ProductItem from "../src/components/Molecules/ProductItem";
import StaticBreadcrumbs from "../src/components/Molecules/StaticBreadcrumbs";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import Product from "../src/modules/product/Product";
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

const FilterToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

const ProductPlaceholder = styled.div<{ margin: number }>`
  width: 228px;
  height: 388px;
  margin-right: ${(props) => props.margin}px;
  margin-bottom: 32px;
  border-radius: 4px;

  animation-name: fadeInFadeOut;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes fadeInFadeOut {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #eaeaea;
    }
    100% {
      background-color: #eee;
    }
  }
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

function ProductsPlaceholder(props: { qty: number }): JSX.Element {
  const result: Array<JSX.Element> = [];

  for (let index = 0; index < props.qty; index++) {
    result.push(
      <ProductPlaceholder
        margin={(index + 1) % 4 !== 0 ? 16 : 0}
        key={index}
      ></ProductPlaceholder>
    );
  }

  return <>{result}</>;
}

function Search({
  menu,
  products: productsFallback,
  sizes,
  colors,
  remoteBrands,
  subCategories,
  prices,
}: {
  menu: Menu;
  products: Array<Product>;
  sizes: Array<any>;
  colors: Array<any>;
  remoteBrands: Array<any>;
  subCategories: Array<any>;
  prices: Array<number>;
}): JSX.Element {
  const classes = useStyles();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    department: true,
    size: true,
    color: true,
    price: true,
    categories: false,
    brands: false,
  });

  const [showRemoveAllFiltersButton, setShowRemoveAllFiltersButton] = useState(
    false
  );

  const router = useRouter();

  const {
    q,
    size,
    color,
    categories,
    brands,
    minPrice,
    maxPrice,
  } = router.query;

  const [section, setSection] = useState("Mulher");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [price, setPrice] = useState(prices);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  function priceText(value: number) {
    return `R$ ${value}`;
  }

  const priceChange = (event: any, newValue: any) => {
    setPrice(newValue);
  };

  const addOrRemoveCategory = (category: string) => {
    const _categories = _cloneDeep(selectedCategories);
    const index = _findIndex(_categories, (o) => o === category);

    if (!_categories) {
      setSelectedCategories([category]);
    } else if (index < 0) {
      setSelectedCategories([..._categories, category]);
    } else {
      _categories.splice(index, 1);
      setSelectedCategories(_categories);
    }
  };

  const addOrRemoveBrands = (brandId: number) => {
    const _brands = _cloneDeep(selectedBrands);
    const index = _findIndex(_brands, (o) => o === brandId);

    if (index < 0) {
      setSelectedBrands([..._brands, brandId]);
    } else {
      _brands.splice(index, 1);
      setSelectedBrands(_brands);
    }
  };

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      color ||
      size ||
      categories ||
      brands ||
      q ||
      Number(minPrice) !== prices[0] ||
      Number(maxPrice) !== prices[1]
    ) {
      setShowRemoveAllFiltersButton(true);
    } else {
      setShowRemoveAllFiltersButton(false);
    }

    if (color && !selectedColor) setSelectedColor(Number(color));
    if (size && !selectedSize) setSelectedSize(size);
    if (categories && selectedCategories.length === 0) {
      console.log("tem categorias");
      if (Array.isArray(categories)) {
        const urlCategories = categories?.map((c) => Number(c));

        if (selectedCategories.length === 0) {
          setSelectedCategories(urlCategories);
        }
      } else {
        setSelectedCategories([Number(categories)]);
      }
    }
    if (brands && selectedBrands.length === 0) {
      console.log("tem marcas");
      if (Array.isArray(brands)) {
        const urlBrands = brands?.map((c) => Number(c));

        if (selectedBrands.length === 0) {
          setSelectedBrands(urlBrands);
        }
      } else {
        setSelectedBrands([Number(brands)]);
      }
    }
  }, [color, size, categories, brands, q, minPrice, maxPrice]);

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
        categories: selectedCategories,
      },
    });
  }, [
    section,
    selectedSize,
    selectedColor,
    price,
    q,
    selectedCategories,
    selectedBrands,
  ]);

  const getSearchUrl = () => {
    if (process.browser) {
      const url = window.location.href;
      const params = url.split("?")[1];
      if (params) {
        return `/search?${params}`;
      } else {
        return null;
      }
    }
    return null;
  };

  // Search API call
  const { data: products, error: productsError } = useSWR(getSearchUrl(), {
    // initialData: productsFallback,
  });
  if (productsError) console.error(productsError);
  if (!products) console.log("Loading products...");

  const showHideFilter = (filterName: string) => {
    const _filters = _cloneDeep(filters);
    _filters[filterName] = !_filters[filterName];
    setFilters(_filters);
  };

  const removeAllFilters = () => {
    router.push({
      pathname: "/pesquisa",
      query: {
        department: "Mulher",
        color: undefined,
        size: undefined,
        minPrice: prices[0],
        maxPrice: prices[1],
        q: undefined,
        brands: undefined,
        categories: undefined,
      },
    });
    setSection("Mulher");
    setSelectedSize(null);
    setSelectedColor(null);
    setPrice(prices);
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

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
            {showRemoveAllFiltersButton && (
              <>
                <CustomButton
                  onClick={removeAllFilters}
                  width={260}
                  variant="outlined"
                  type="delete"
                >
                  Limpar Todos Filtros
                </CustomButton>
                <SizedBox height={20}></SizedBox>
              </>
            )}
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("department")}>
                  <Icon
                    type={filters.department ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("department")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Departamento</FilterTitle>
                </FilterToggle>
                <SizedBox height={5}></SizedBox>
              </FilterHead>
              <SizedBox height={5}></SizedBox>
              {filters.department && (
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
              )}
              {!filters.department && <SizedBox height={2}></SizedBox>}
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("size")}>
                  <Icon
                    type={filters.size ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("size")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Tamanho</FilterTitle>
                </FilterToggle>
                {filters.size && (
                  <FilterCleanButton onClick={() => setSelectedSize(null)}>
                    Limpar
                  </FilterCleanButton>
                )}
              </FilterHead>
              {filters.size && (
                <>
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
                </>
              )}
              {!filters.size && <SizedBox height={8}></SizedBox>}
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("color")}>
                  <Icon
                    type={filters.color ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("color")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Cor</FilterTitle>
                </FilterToggle>
                {filters.color && (
                  <FilterCleanButton onClick={() => setSelectedColor(null)}>
                    Limpar
                  </FilterCleanButton>
                )}
              </FilterHead>
              {filters.color && (
                <>
                  <SizedBox height={16}></SizedBox>
                  <Sizes>
                    {colors &&
                      colors.map((c: any, index: number) => (
                        <Color
                          key={c.id}
                          selected={
                            selectedColor === Number(c.id) || !selectedColor
                          }
                          onClick={() => setSelectedColor(Number(c.id))}
                          noMargin={(index + 1) % 4 === 0}
                          color={c.hexColor}
                        ></Color>
                      ))}
                  </Sizes>
                </>
              )}
              {!filters.color && <SizedBox height={8}></SizedBox>}
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("price")}>
                  <Icon
                    type={filters.price ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("price")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Preço</FilterTitle>
                </FilterToggle>
                {filters.price && (
                  <FilterCleanButton onClick={() => setPrice(prices)}>
                    Limpar
                  </FilterCleanButton>
                )}
              </FilterHead>
              {filters.price && (
                <>
                  <SizedBox height={12}></SizedBox>
                  <Padding horizontal={12}>
                    <div className={classes.root}>
                      <CustomSlider
                        value={price}
                        onChange={priceChange}
                        valueLabelDisplay="off"
                        aria-labelledby="range-slider"
                        getAriaValueText={priceText}
                        min={prices[0]}
                        max={prices[1]}
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
                </>
              )}
              {!filters.price && <SizedBox height={8}></SizedBox>}
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("categories")}>
                  <Icon
                    type={filters.categories ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("categories")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Categorias</FilterTitle>
                </FilterToggle>
                {filters.categories && (
                  <FilterCleanButton onClick={() => setSelectedCategories([])}>
                    Limpar
                  </FilterCleanButton>
                )}
              </FilterHead>
              {filters.categories && (
                <>
                  <SizedBox height={12}></SizedBox>
                  <div>
                    {subCategories?.map((sub: any) => (
                      <CheckboxWithLabel
                        key={sub.slug}
                        label={sub.title}
                        onClick={() => addOrRemoveCategory(sub.id)}
                        value={selectedCategories?.includes(sub.id)}
                      ></CheckboxWithLabel>
                    ))}
                  </div>
                </>
              )}
              {!filters.categories && <SizedBox height={8}></SizedBox>}
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterToggle onClick={() => showHideFilter("brands")}>
                  <Icon
                    type={filters.brands ? "minus" : "plus"}
                    size={16}
                    onClick={() => showHideFilter("brands")}
                  ></Icon>
                  <SizedBox width={6}></SizedBox>
                  <FilterTitle>Marcas</FilterTitle>
                </FilterToggle>
                {filters.brands && (
                  <FilterCleanButton onClick={() => setSelectedBrands([])}>
                    Limpar
                  </FilterCleanButton>
                )}
              </FilterHead>
              {filters.brands && (
                <>
                  <SizedBox height={12}></SizedBox>
                  <div>
                    {remoteBrands?.map((brand: any) => (
                      <CheckboxWithLabel
                        key={brand.id}
                        label={brand.name}
                        onClick={() => addOrRemoveBrands(brand.id)}
                        value={selectedBrands.includes(brand.id)}
                      ></CheckboxWithLabel>
                    ))}
                  </div>
                </>
              )}
              {!filters.brands && <SizedBox height={8}></SizedBox>}
            </FilterCard>
          </Filters>
          <Products>
            {!products && <ProductsPlaceholder qty={12}></ProductsPlaceholder>}
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
  function getData(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const productsUrl = `${process.env.API_ENDPOINT}/search?department=Mulher&color=&size=&minPrice=1&maxPrice=1000000&q=`;
  const sizesUrl = `${process.env.API_ENDPOINT}/sizes`;
  const colorsUrl = `${process.env.API_ENDPOINT}/colors`;
  const brandsUrl = `${process.env.API_ENDPOINT}/brands`;
  const subCategoriesUrl = `${process.env.API_ENDPOINT}/sub-categories`;
  const pricesUrl = `${process.env.API_ENDPOINT}/prices-min-max`;

  const results = await Promise.all([
    getData(menuUrl),
    getData(productsUrl),
    getData(sizesUrl),
    getData(colorsUrl),
    getData(brandsUrl),
    getData(subCategoriesUrl),
    getData(pricesUrl),
  ]);

  const menu = results[0].data;
  const products = results[1].data;
  const sizes = results[2].data;
  const colors = results[3].data;
  const brands = results[4].data;
  const subCategories = results[5].data;

  const prices = [
    Number(results[6].data.min) - 1,
    Number(results[6].data.max) + 1,
  ];

  return {
    props: {
      menu,
      products,
      sizes,
      colors,
      remoteBrands: brands,
      subCategories,
      prices,
    },
    revalidate: 1,
  };
}

export default Search;
