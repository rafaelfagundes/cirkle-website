import { Container, Slider, useMediaQuery } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import CheckboxWithLabel from "../src/components/Atoms/CheckboxWithLabel";
import Column from "../src/components/Atoms/Column";
import CustomButton from "../src/components/Atoms/CustomButton";
import Icon from "../src/components/Atoms/Icon";
import ListOrderSwitch, {
  OPTIONS,
} from "../src/components/Atoms/ListOrderSwitch";
import Padding from "../src/components/Atoms/Padding";
import RadioButtonWithLabel from "../src/components/Atoms/RadioButtonWithLabel";
import Row from "../src/components/Atoms/Row";
import SizedBox from "../src/components/Atoms/SizedBox";
import MobileProductItem from "../src/components/Molecules/MobileProductItem";
import ProductItem from "../src/components/Molecules/ProductItem";
import StaticBreadcrumbs from "../src/components/Molecules/StaticBreadcrumbs";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const Filters = styled.div<{ isSmartphone: boolean }>`
  width: ${(props) => (props.isSmartphone ? 400 : 264)}px;
  margin-right: ${(props) => (props.isSmartphone ? 20 : 32)}px;
  margin-left: ${(props) => (props.isSmartphone ? 20 : 0)}px;
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
  width: 1000px;
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

const ProductPlaceholder = styled.div<{
  margin: number;
  isSmartphone: boolean;
}>`
  width: ${(props) =>
    props.isSmartphone
      ? process.browser
        ? window.innerWidth - 28
        : 228
      : 228}px;
  height: ${(props) => (props.isSmartphone ? 170 : 388)}px;
  margin-right: ${(props) => props.margin}px;
  margin-bottom: ${(props) => (props.isSmartphone ? 16 : 32)}px;
  margin-left: ${(props) => (props.isSmartphone ? 14.5 : 0)}px;
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

function ProductsPlaceholder(props: {
  qty: number;
  isSmartphone: boolean;
}): JSX.Element {
  const result: Array<JSX.Element> = [];

  for (let index = 0; index < props.qty; index++) {
    result.push(
      <ProductPlaceholder
        margin={props.isSmartphone ? 0 : (index + 1) % 4 !== 0 ? 16 : 0}
        isSmartphone={props.isSmartphone}
        key={index}
      ></ProductPlaceholder>
    );
  }

  return <>{result}</>;
}

function Search({
  menu,
  search,
  sizes,
  colors,
  remoteBrands,
  subCategories,
  prices,
}: {
  menu: Menu;
  search: any;
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

  const [sortOrder, setSortOrder] = useState(OPTIONS.DEFAULT);

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

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileOrders, setShowMobileOrders] = useState(false);

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
  }, [color, size, categories, brands, q, minPrice, maxPrice, sortOrder]);

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
        sortOrder,
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
    sortOrder,
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
    setSection("Mulher");
    setSelectedSize(null);
    setSelectedColor(null);
    setPrice(prices);
    setSelectedCategories([]);
    setSelectedBrands([]);

    setTimeout(() => {
      router.push({
        pathname: "/pesquisa",
        query: {
          department: "Mulher",
          color: "",
          size: "",
          minPrice: prices[0],
          maxPrice: prices[1],
          q: "",
          brands: "",
          categories: "",
        },
      });
    }, 100);
  };

  return (
    <Layout menu={menu} containerMargin={false} search={search}>
      <Container maxWidth="lg" disableGutters>
        <SizedBox height={16}></SizedBox>
        {!isSmartphone && (
          <Padding horizontal={20}>
            <Row spaceBetween>
              <StaticBreadcrumbs
                showHome
                root={{ link: "pesquisa", title: q ? "Pesquisa" : "Produtos" }}
                category={
                  q
                    ? {
                        link: process.browser
                          ? `?${String(window.location).split("?")[1]}`
                          : null,
                        title: `"${q}"`,
                      }
                    : null
                }
              ></StaticBreadcrumbs>
              <ListOrderSwitch
                value={sortOrder}
                setValue={setSortOrder}
              ></ListOrderSwitch>
            </Row>
          </Padding>
        )}
        {isSmartphone && (
          <Padding horizontal={20}>
            <Row>
              <CustomButton
                icon={
                  showMobileFilters
                    ? "filter-white"
                    : showRemoveAllFiltersButton
                    ? "filter-blue"
                    : "filter"
                }
                variant={showMobileFilters ? "contained" : "outlined"}
                type={showRemoveAllFiltersButton ? "edit" : "default"}
                width={180}
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                Filtrar
              </CustomButton>
              <SizedBox width={20}></SizedBox>
              <CustomButton
                icon={showMobileOrders ? "sort-white" : "sort"}
                variant={showMobileOrders ? "contained" : "outlined"}
                width={180}
                onClick={() => setShowMobileOrders(!showMobileOrders)}
              >
                Ordenar
              </CustomButton>
            </Row>
            {showMobileOrders && (
              <>
                <SizedBox height={20}></SizedBox>
                <ListOrderSwitch
                  value={sortOrder}
                  setValue={setSortOrder}
                ></ListOrderSwitch>
                <SizedBox height={5}></SizedBox>
              </>
            )}
          </Padding>
        )}

        <SizedBox height={16}></SizedBox>
        <Row alignTop>
          {(!isSmartphone || showMobileFilters) && (
            <Filters isSmartphone={isSmartphone}>
              {showRemoveAllFiltersButton && (
                <>
                  <Center>
                    <CustomButton
                      onClick={removeAllFilters}
                      width={260}
                      variant="text"
                      type="delete"
                      icon="trash-red"
                    >
                      Limpar Todos Filtros
                    </CustomButton>
                  </Center>
                  <SizedBox height={10}></SizedBox>
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
                          noMargin={
                            isSmartphone
                              ? (index + 1) % 5 === 0
                              : (index + 1) % 4 === 0
                          }
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
                            noMargin={
                              isSmartphone
                                ? (index + 1) % 5 === 0
                                : (index + 1) % 4 === 0
                            }
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
                    <FilterCleanButton
                      onClick={() => setSelectedCategories([])}
                    >
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
          )}
          {!showMobileFilters && (
            <>
              {(!products || products.length > 0) && (
                <Products>
                  {!products && (
                    <ProductsPlaceholder
                      qty={isSmartphone ? 4 : 12}
                      isSmartphone={isSmartphone}
                    ></ProductsPlaceholder>
                  )}
                  {products?.map((item: any, index: number) => (
                    <span
                      style={{
                        width: isSmartphone
                          ? process.browser
                            ? window.innerWidth - 28
                            : "100%"
                          : (index + 1) % 4 !== 0
                          ? 252
                          : 228,
                      }}
                      key={item.id}
                    >
                      {isSmartphone && (
                        <MobileProductItem data={item}></MobileProductItem>
                      )}
                      {!isSmartphone && <ProductItem data={item}></ProductItem>}
                      {!isSmartphone && (index + 1) % 4 !== 0 && (
                        <SizedBox width={16}></SizedBox>
                      )}
                    </span>
                  ))}
                </Products>
              )}
            </>
          )}
          <>
            {products && products.length === 0 && (
              <div style={{ width: 1000 }}>
                <SizedBox height={72}></SizedBox>
                <EmptyPage
                  buttonAction={removeAllFilters}
                  buttonText="Limpar Filtros"
                  icon="search"
                  title="Nenhum produto encontrado"
                  subtitle="Por favor, remova alguns filtros"
                ></EmptyPage>
              </div>
            )}
          </>
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
  const sizesUrl = `${process.env.API_ENDPOINT}/sizes`;
  const colorsUrl = `${process.env.API_ENDPOINT}/colors`;
  const brandsUrl = `${process.env.API_ENDPOINT}/brands`;
  const subCategoriesUrl = `${process.env.API_ENDPOINT}/sub-categories`;
  const pricesUrl = `${process.env.API_ENDPOINT}/prices-min-max`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getData(menuUrl),
    getData(sizesUrl),
    getData(colorsUrl),
    getData(brandsUrl),
    getData(subCategoriesUrl),
    getData(pricesUrl),
    getData(searchUrl),
  ]);

  const menu = results[0].data;
  const sizes = results[1].data;
  const colors = results[2].data;
  const brands = results[3].data;
  const subCategories = results[4].data;
  const search = results[6].data;

  const prices = [
    Number(results[5].data.min) - 1,
    Number(results[5].data.max) + 1,
  ];

  return {
    props: {
      menu,
      sizes,
      colors,
      remoteBrands: brands,
      subCategories,
      prices,
      search,
    },
    revalidate: 1,
  };
}

export default Search;
