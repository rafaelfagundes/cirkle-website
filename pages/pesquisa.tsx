import { Container, makeStyles, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import CustomButton from "../src/components/Atoms/CustomButton";
import HorizontalLine from "../src/components/Atoms/HorizontalLine";
import ListOrderSwitch, {
  OPTIONS,
} from "../src/components/Atoms/ListOrderSwitch";
import Row from "../src/components/Atoms/Row";
import SizedBox from "../src/components/Atoms/SizedBox";
import Chips from "../src/components/MainPagesComponents/Search/Chips";
import {
  BrandsFilter,
  ColorFilter,
  DepartmentFilter,
  PriceFilter,
  SizeFilter,
  SubCategoriesFilter,
} from "../src/components/MainPagesComponents/Search/Filters";
import {
  DesktopHeader,
  MobileHeader,
} from "../src/components/MainPagesComponents/Search/Headers";
import ProductsPlaceholder from "../src/components/MainPagesComponents/Search/ProductsPlaceholder";
import MobileProductItem from "../src/components/Molecules/MobileProductItem";
import ProductItem from "../src/components/Molecules/ProductItem";
import RecentlyViewed from "../src/components/Organisms/RecentlyViewed";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import { useRecentlyViewed } from "../src/hooks/recentlyViewed/useRecentlyViewed";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

// === STYLED COMPONENTS ====================================

const Filters = styled.div<{ isSmartphone: boolean }>`
  width: ${(props) =>
    props.isSmartphone
      ? process.browser
        ? window.innerWidth - 40
        : 335
      : 264}px;
  margin-right: ${(props) => (props.isSmartphone ? 20 : 32)}px;
  margin-left: ${(props) => (props.isSmartphone ? 20 : 0)}px;
`;

const MobileOrderSwitch = styled.div`
  width: 375px;
`;

const Products = styled.div<{ isSmartphone: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: ${(props) =>
    props.isSmartphone
      ? process.browser
        ? window.innerWidth - 14
        : 375
      : 1000}px;
  height: 100%;
`;

// =========================================================

// === CUSTOM COMPONENTS STYLES ===========================
const useStyles = makeStyles({
  root: {
    colorPrimary: Colors.PRIMARY,
  },
});
// =========================================================
//

interface PageProps {
  menu: Menu;
  search: any;
  sizes: Array<any>;
  colors: Array<any>;
  remoteBrands: Array<any>;
  subCategories: Array<any>;
  categories: Array<any>;
  prices: Array<number>;
}

function Search(props: PageProps): JSX.Element {
  //
  // Context
  const recentlyViewedContext = useRecentlyViewed();

  // Constants
  const router = useRouter();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  // State
  const [products, setProducts] = useState(null);
  const [chips, setChips] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: true,
    size: true,
    color: true,
    price: isSmartphone ? false : true,
    categories: false,
    brands: false,
  });
  const [price, setPrice] = useState(null);

  const getParamCanonicalValue = (key: string, value: string) => {
    switch (key) {
      case "department":
        return value === "1" ? "Mulher" : "Kids";
      case "size":
        return `Tam. ${value}`;
      case "minPrice":
        return `Mín. ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(value))}`;
      case "maxPrice":
        return `Máx. ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(value))}`;
      case "color":
        return props.colors.find((c) => c.id === Number(value)).name;
      case "subCategories":
        return props.subCategories.find((c) => c.slug === value).title;
      case "categories":
        return props.categories.find((c) => c.slug === value).title;

      default:
        return value;
    }
  };

  const setChipsData = (params: any) => {
    const _chips = [];

    Object.keys(params).forEach((key) => {
      if (key === "brands") {
        if (typeof router.query.brands === "string") {
          _chips.push({
            param: key,
            value: params[key],
          });
        } else {
          router.query.brands.forEach((b) => {
            _chips.push({
              param: key,
              value: b,
            });
          });
        }
      } else if (key === "subCategories") {
        if (typeof router.query.subCategories === "string") {
          _chips.push({
            param: key,
            value: getParamCanonicalValue(key, params[key]),
          });
        } else {
          router.query.subCategories.forEach((s) => {
            _chips.push({
              param: key,
              value: getParamCanonicalValue(key, s),
            });
          });
        }
      } else if (key !== "department" && key !== "sortOrder") {
        _chips.push({
          param: key,
          value: getParamCanonicalValue(key, params[key]),
        });
      }
    });
    setChips(_chips);
  };

  const removeParam = (param: string) => {
    const _params = _cloneDeep(router.query);
    delete _params[param];

    router.push({
      pathname: "/pesquisa",
      query: {
        ..._params,
        department: router.query.department || "mulher",
        sortOrder: router.query.sortOrder || "default",
      },
    });
  };

  const removePrices = () => {
    const newQuery = _cloneDeep(router.query);

    delete newQuery.minPrice;
    delete newQuery.maxPrice;

    router.push({
      pathname: "/pesquisa",
      query: newQuery,
    });

    setPrice(props.prices);
  };

  const removeAllParams = () => {
    setChips([]);
    setPrice(props.prices);

    router.push({
      pathname: "/pesquisa",
      query: {
        department: router.query.department || "mulher",
        sortOrder: router.query.sortOrder || "default",
      },
    });
  };

  const showHideFilter = (filterName: string) => {
    const _filters = _cloneDeep(filters);
    _filters[filterName] = !_filters[filterName];
    setFilters(_filters);
  };

  const setParam = (param: string, value: string) => {
    router.push({
      pathname: "/pesquisa",
      query: { ...router.query, [param]: value },
    });
  };

  const priceChange = (event: any, newValue: any) => {
    router.push({
      pathname: "/pesquisa",
      query: { ...router.query, minPrice: newValue[0], maxPrice: newValue[1] },
    });
    setPrice(newValue);
  };

  function priceText(value: number) {
    return `R$ ${value}`;
  }

  const addOrRemoveSubCategory = (category: string) => {
    if (!router.query.subCategories) {
      router.push({
        pathname: "/pesquisa",
        query: { ...router.query, subCategories: [String(category)] },
      });
    } else if (typeof router.query.subCategories === "string") {
      if (router.query.subCategories === category) {
        removeParam("subCategories");
      } else {
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            subCategories: [router.query.subCategories, category],
          },
        });
      }
    } else {
      if (router.query.subCategories.includes(category)) {
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            subCategories: router.query.subCategories.filter(
              (c) => c !== String(category)
            ),
          },
        });
      } else {
        const newSubCategories = _cloneDeep(router.query.subCategories);
        newSubCategories.push(category);
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            subCategories: newSubCategories,
          },
        });
      }
    }
  };

  const addOrRemoveBrands = (brand: string) => {
    if (!router.query.brands) {
      router.push({
        pathname: "/pesquisa",
        query: { ...router.query, brands: [brand] },
      });
    } else if (typeof router.query.brands === "string") {
      if (router.query.brands === brand) {
        removeParam("brands");
      } else {
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            brands: [router.query.brands, brand],
          },
        });
      }
    } else {
      if (router.query.brands.includes(brand)) {
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            brands: router.query.brands.filter((c) => c !== String(brand)),
          },
        });
      } else {
        const newBrands = _cloneDeep(router.query.brands);
        newBrands.push(brand);
        router.push({
          pathname: "/pesquisa",
          query: {
            ...router.query,
            brands: newBrands,
          },
        });
      }
    }
  };

  const setSortOrder = (value: OPTIONS) => {
    router.push({
      pathname: "/pesquisa",
      query: { ...router.query, sortOrder: value },
    });
  };

  const areFiltersActive = () => {
    let hasFilters = false;

    Object.keys(router.query).forEach((key) => {
      if (key !== "department" && key !== "sortOrder") {
        hasFilters = true;
      }
    });

    return hasFilters;
  };

  const getSearchUrl = () => {
    if (process.browser) {
      const url = window.location.href;
      const params = url.split("?")[1];
      if (params) {
        return `/search?${params}`;
      } else {
        return "/search";
      }
    }
    return null;
  };

  // Search API call
  const { data, error: productsError } = useSWR(getSearchUrl());
  if (productsError) console.error(productsError);
  // if (!data) console.log("Loading products...");

  useEffect(() => {
    if (data) {
      const _products = [];
      data.forEach((element: any) => {
        const _product = {
          id: element.pid,
          uid: element.puid,
          brand: { name: element.brandname },
          image: element.image,
          title: element.title,
          priceWhenNew: element.priceWhenNew,
          price: element.price,
          sizes: element.sizes.split(",").map((s: string) => ({ value: s })),
        };
        _products.push(_product);
      });

      setProducts(_products);
    }
  }, [data]);

  useEffect(() => {
    setChipsData(router.query);

    if (router.query.minPrice && router.query.maxPrice) {
      setPrice([Number(router.query.minPrice), Number(router.query.maxPrice)]);
    } else {
      setPrice([props.prices[0], props.prices[1]]);
    }
  }, [router.query]);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menu={props.menu} containerMargin={false} search={props.search}>
      <Container maxWidth="lg" disableGutters>
        <SizedBox height={16}></SizedBox>
        {!isSmartphone &&
          DesktopHeader(
            router,
            router.query.sortOrder || OPTIONS.DEFAULT,
            setSortOrder
          )}
        {isSmartphone &&
          MobileHeader(
            showMobileFilters,
            areFiltersActive(),
            setShowMobileFilters
          )}
        <SizedBox height={8}></SizedBox>
        {(!isSmartphone || (isSmartphone && showMobileFilters)) &&
          Chips(
            chips,
            removeParam,
            removeAllParams,
            removePrices,
            isSmartphone
          )}
        <SizedBox height={16}></SizedBox>
        <Row alignTop>
          <div>
            {(!isSmartphone || (isSmartphone && showMobileFilters)) && (
              <Filters isSmartphone={isSmartphone}>
                {DepartmentFilter(
                  showHideFilter,
                  filters,
                  setParam,
                  router.query.department
                )}
                <SizedBox height={20}></SizedBox>
                {SizeFilter(
                  showHideFilter,
                  filters,
                  props,
                  router,
                  setParam,
                  isSmartphone,
                  removeParam
                )}
                <SizedBox height={20}></SizedBox>
                {ColorFilter(
                  showHideFilter,
                  filters,
                  removeParam,
                  props,
                  router,
                  setParam,
                  isSmartphone
                )}
                <SizedBox height={20}></SizedBox>
                {PriceFilter(
                  showHideFilter,
                  filters,
                  removePrices,
                  setPrice,
                  props,
                  classes,
                  price,
                  priceChange,
                  priceText,
                  router
                )}
                <SizedBox height={20}></SizedBox>
                {SubCategoriesFilter(
                  showHideFilter,
                  filters,
                  router,
                  removeParam,
                  props,
                  addOrRemoveSubCategory
                )}
                <SizedBox height={20}></SizedBox>
                {BrandsFilter(
                  showHideFilter,
                  filters,
                  router,
                  removeParam,
                  props,
                  addOrRemoveBrands
                )}
                {!isSmartphone && <SizedBox height={72}></SizedBox>}
              </Filters>
            )}

            {isSmartphone && showMobileFilters && (
              <>
                <SizedBox height={16}></SizedBox>
                <Center>
                  <CustomButton
                    variant="text"
                    // type="delete"
                    icon="minus"
                    iconSize={16}
                    width={200}
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Esconder Filtros
                  </CustomButton>
                </Center>
                <SizedBox height={16}></SizedBox>
              </>
            )}
          </div>
          <div>
            {isSmartphone && (
              <MobileOrderSwitch>
                <ListOrderSwitch
                  value={router.query.sortOrder || OPTIONS.DEFAULT}
                  setValue={setSortOrder}
                ></ListOrderSwitch>
                <SizedBox height={16}></SizedBox>
              </MobileOrderSwitch>
            )}
            <Products isSmartphone={isSmartphone}>
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
              {products && products.length === 0 && (
                <div
                  style={{
                    marginLeft: isSmartphone ? 40 : 0,
                    width: "100%",
                    marginBottom: 36,
                  }}
                >
                  <SizedBox height={72}></SizedBox>
                  <EmptyPage
                    buttonAction={removeAllParams}
                    buttonText="Limpar Filtros"
                    icon="search"
                    title="Nenhum produto encontrado"
                    subtitle="Por favor, remova alguns filtros"
                  ></EmptyPage>
                </div>
              )}
            </Products>
          </div>
        </Row>
        <SizedBox height={64}></SizedBox>
        <HorizontalLine color="#DDD"></HorizontalLine>
        {recentlyViewedContext?.recentlyViewed?.items?.length > 0 && (
          <RecentlyViewed
            items={recentlyViewedContext.recentlyViewed.items}
            backgroundColor="rgba(0, 0, 0, 0.0)"
            width="lg"
          ></RecentlyViewed>
        )}
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
  const categoriesUrl = `${process.env.API_ENDPOINT}/categories`;

  const results = await Promise.all([
    getData(menuUrl),
    getData(sizesUrl),
    getData(colorsUrl),
    getData(brandsUrl),
    getData(subCategoriesUrl),
    getData(pricesUrl),
    getData(searchUrl),
    getData(categoriesUrl),
  ]);

  const menu = results[0].data;
  const sizes = results[1].data;
  const colors = results[2].data;
  const brands = results[3].data;
  const subCategories = results[4].data;
  const search = results[6].data;
  const categories = results[7].data;

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
      categories,
      prices,
      search,
    },
    revalidate: 1,
  };
}

export default Search;
