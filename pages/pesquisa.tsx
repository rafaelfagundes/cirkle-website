import {
  Chip,
  Container,
  makeStyles,
  Slider,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import StaticBreadcrumbs from "../src/components/Molecules/StaticBreadcrumbs";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

// === STYLED COMPONENTS ====================================

const ChipsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

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

const FilterToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
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

// =========================================================

// === CUSTOM COMPONENTS STYLES ===========================
const StyledChip = withStyles({
  root: {
    backgroundColor: Colors.LIGHT_GRAY,
    fontFamily: "Commissioner, sans-serif",
    fontWeight: 700,
    color: Colors.DARK_GRAY,
  },
})(Chip);

const StyledRemoveAllChip = withStyles({
  root: {
    backgroundColor: Colors.RED_PINK,
    fontFamily: "Commissioner, sans-serif",
    fontWeight: 700,
    color: Colors.WHITE,
  },
})(Chip);

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
  prices: Array<number>;
}

function Search(props: PageProps): JSX.Element {
  //
  // Constants
  const router = useRouter();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  // State
  const [chips, setChips] = useState([]);
  const [sortOrder, setSortOrder] = useState(OPTIONS.DEFAULT);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileOrders, setShowMobileOrders] = useState(false);
  const [showRemoveAllFiltersButton, setShowRemoveAllFiltersButton] = useState(
    false
  );
  const [filters, setFilters] = useState({
    department: false,
    size: false,
    color: false,
    price: false,
    categories: false,
    brands: true,
  });
  const [price, setPrice] = useState([props.prices[0], props.prices[1]]);

  const getParamCanonicalValue = (key: string, value: string) => {
    switch (key) {
      case "department":
        return value === "1" ? "Mulher" : "Kids";
      case "size":
        return value;
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
      } else if (key !== "department") {
        _chips.push({
          param: key,
          value: getParamCanonicalValue(key, params[key]),
        });
      }
    });
    setChips(_chips);
  };

  const removeParam = (param: string) => {
    const _chips = _cloneDeep(chips);
    const _newChips = _chips.filter((chip) => chip.param !== param);
    const _newChipsObj = {};

    _newChips.forEach((chip) => {
      _newChipsObj[chip.param] = chip.value;
    });

    router.push({
      pathname: "/pesquisa",
      query: { ..._newChipsObj, department: router.query.department || "1" },
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
    router.push({
      pathname: "/pesquisa",
      query: { department: router.query.department || "1" },
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
      console.log("Nao tem nenhum");
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
      console.log("Nao tem nenhum");
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

  useEffect(() => {
    setChipsData(router.query);
  }, [router.query]);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menu={props.menu} containerMargin={false} search={props.search}>
      <Container maxWidth="lg" disableGutters>
        <SizedBox height={16}></SizedBox>
        {!isSmartphone && DesktopHeader(router, sortOrder, setSortOrder)}
        {isSmartphone &&
          MobileHeader(
            showMobileFilters,
            showRemoveAllFiltersButton,
            setShowMobileFilters,
            showMobileOrders,
            setShowMobileOrders,
            sortOrder,
            setSortOrder
          )}
        <SizedBox height={isSmartphone ? 16 : 8}></SizedBox>
        <Row alignTop>
          <div>
            {Chips(chips, removeParam, removeAllParams, removePrices)}
            <SizedBox height={16}></SizedBox>
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
            </Filters>
          </div>
        </Row>
        <SizedBox height={16}></SizedBox>
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

function DepartmentFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  setDepartment: (param: string, value: string) => void,
  department: string | string[]
) {
  return (
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
            onClick={() => setDepartment("department", "1")}
            value={department === "1"}
          ></RadioButtonWithLabel>
          <RadioButtonWithLabel
            label="Kids"
            onClick={() => setDepartment("department", "2")}
            value={department === "2"}
          ></RadioButtonWithLabel>
        </Column>
      )}
      {!filters.department && <SizedBox height={2}></SizedBox>}
    </FilterCard>
  );
}

function SizeFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  props: PageProps,
  router: NextRouter,
  setParam: (param: string, value: string) => void,
  isSmartphone: boolean,
  removeParam: (param: string) => void
) {
  return (
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
        {filters.size && router.query.size && (
          <FilterCleanButton onClick={() => removeParam("size")}>
            Limpar
          </FilterCleanButton>
        )}
      </FilterHead>
      {filters.size && (
        <>
          <SizedBox height={16}></SizedBox>
          <Sizes>
            {props.sizes?.map((s: any, index: number) => (
              <Size
                key={s.value}
                selected={router.query.size === String(s.value)}
                onClick={() => setParam("size", s.value)}
                noMargin={
                  isSmartphone ? (index + 1) % 5 === 0 : (index + 1) % 4 === 0
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
  );
}

function ColorFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  removeParam: (param: string) => void,
  props: PageProps,
  router: NextRouter,
  setParam: (param: string, value: string) => void,
  isSmartphone: boolean
) {
  return (
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
        {filters.color && router.query.color && (
          <FilterCleanButton onClick={() => removeParam("color")}>
            Limpar
          </FilterCleanButton>
        )}
      </FilterHead>
      {filters.color && (
        <>
          <SizedBox height={16}></SizedBox>
          <Sizes>
            {props.colors &&
              props.colors.map((c: any, index: number) => (
                <Color
                  key={c.id}
                  selected={
                    router.query.color
                      ? router.query.color === String(c.id)
                      : true
                  }
                  onClick={() => setParam("color", c.id)}
                  noMargin={
                    isSmartphone ? (index + 1) % 5 === 0 : (index + 1) % 4 === 0
                  }
                  color={c.hexColor}
                ></Color>
              ))}
          </Sizes>
        </>
      )}
      {!filters.color && <SizedBox height={8}></SizedBox>}
    </FilterCard>
  );
}

function PriceFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  removePrices: () => void,
  setPrice: React.Dispatch<React.SetStateAction<number[]>>,
  props: PageProps,
  classes: Record<"root", string>,
  price: number[],
  priceChange: (event: any, newValue: any) => void,
  priceText: (value: number) => string,
  router: NextRouter
) {
  return (
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
          <FilterCleanButton
            onClick={() => {
              removePrices();
              setPrice(props.prices);
            }}
          >
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
                min={props.prices[0]}
                max={props.prices[1]}
                step={100}
                color="primary"
              />
            </div>
          </Padding>
          <Prices>
            <Price>
              {router.query.minPrice
                ? `${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(router.query.minPrice))}`
                : `${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(props.prices[0])}`}
            </Price>
            <Price>
              {router.query.maxPrice
                ? `${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(router.query.maxPrice))}`
                : `${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(props.prices[1])}`}
            </Price>
          </Prices>
        </>
      )}
      {!filters.price && <SizedBox height={8}></SizedBox>}
    </FilterCard>
  );
}

function SubCategoriesFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  router: NextRouter,
  removeParam: (param: string) => void,
  props: PageProps,
  addOrRemoveSubCategory: (category: string) => void
) {
  return (
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
        {filters.categories && router.query.subCategories && (
          <FilterCleanButton
            onClick={() => {
              removeParam("subCategories");
            }}
          >
            Limpar
          </FilterCleanButton>
        )}
      </FilterHead>
      {filters.categories && (
        <>
          <SizedBox height={12}></SizedBox>
          <div>
            {props.subCategories?.map((sub: any) => (
              <CheckboxWithLabel
                key={sub.slug}
                label={sub.title}
                onClick={() => addOrRemoveSubCategory(sub.slug)}
                value={router.query.subCategories?.includes(sub.slug)}
              ></CheckboxWithLabel>
            ))}
          </div>
        </>
      )}
      {!filters.categories && <SizedBox height={8}></SizedBox>}
    </FilterCard>
  );
}

function BrandsFilter(
  showHideFilter: (filterName: string) => void,
  filters: {
    department: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
    categories: boolean;
    brands: boolean;
  },
  router: NextRouter,
  removeParam: (param: string) => void,
  props: PageProps,
  addOrRemoveBrands: (brand: string) => void
) {
  return (
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
        {filters.brands && router.query.brands && (
          <FilterCleanButton onClick={() => removeParam("brands")}>
            Limpar
          </FilterCleanButton>
        )}
      </FilterHead>
      {filters.brands && (
        <>
          <SizedBox height={12}></SizedBox>
          <div>
            {props.remoteBrands?.map((brand: any) => (
              <CheckboxWithLabel
                key={brand.id}
                label={brand.name}
                onClick={() => addOrRemoveBrands(brand.name)}
                value={router.query.brands?.includes(brand.name)}
              ></CheckboxWithLabel>
            ))}
          </div>
        </>
      )}
      {!filters.brands && <SizedBox height={8}></SizedBox>}
    </FilterCard>
  );
}

function Chips(
  chips: any[],
  removeParam: (param: string) => void,
  removeAllParams: () => void,
  removePrices: () => void
) {
  return (
    <Padding horizontal={0}>
      <ChipsRow>
        {chips.map((chip: { param: string; value: string }) => (
          <React.Fragment key={chip.param}>
            <StyledChip
              label={chip.value}
              size="small"
              onDelete={() =>
                chip.param === "minPrice" || chip.param === "maxPrice"
                  ? removePrices()
                  : removeParam(chip.param)
              }
              onClick={() =>
                chip.param === "minPrice" || chip.param === "maxPrice"
                  ? removePrices()
                  : removeParam(chip.param)
              }
            />
            <SizedBox width={5}></SizedBox>
          </React.Fragment>
        ))}
        {chips.length > 0 && (
          <StyledRemoveAllChip
            size="small"
            onClick={removeAllParams}
            onDelete={removeAllParams}
            label="Remover Filtros"
            // icon={<Icon type="trash-light" size={16}></Icon>}
            color="secondary"
          />
        )}
      </ChipsRow>
    </Padding>
  );
}

function MobileHeader(
  showMobileFilters: boolean,
  showRemoveAllFiltersButton: boolean,
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>,
  showMobileOrders: boolean,
  setShowMobileOrders: React.Dispatch<React.SetStateAction<boolean>>,
  sortOrder: OPTIONS,
  setSortOrder: React.Dispatch<React.SetStateAction<OPTIONS>>
) {
  return (
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
  );
}

function DesktopHeader(
  router: NextRouter,
  sortOrder: OPTIONS,
  setSortOrder: React.Dispatch<React.SetStateAction<OPTIONS>>
) {
  return (
    <Padding horizontal={20}>
      <Row spaceBetween>
        <StaticBreadcrumbs
          showHome
          root={{
            link: "pesquisa",
            title: router.query.q ? "Pesquisa" : "Produtos",
          }}
          category={
            router.query.q
              ? {
                  link: process.browser
                    ? `?${String(window.location).split("?")[1]}`
                    : null,
                  title: `"${router.query.q}"`,
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
  );
}
