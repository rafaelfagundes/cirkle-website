import { Slider, withStyles } from "@material-ui/core";
import { NextRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import Menu from "../../../../modules/menu/Menu";
import CheckboxWithLabel from "../../../Atoms/CheckboxWithLabel";
import Column from "../../../Atoms/Column";
import Icon from "../../../Atoms/Icon";
import Padding from "../../../Atoms/Padding";
import RadioButtonWithLabel from "../../../Atoms/RadioButtonWithLabel";
import SizedBox from "../../../Atoms/SizedBox";

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

interface PageProps {
  menu: Menu;
  search: any;
  sizes: Array<any>;
  colors: Array<any>;
  remoteBrands: Array<any>;
  subCategories: Array<any>;
  prices: Array<number>;
}

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
): JSX.Element {
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
            onClick={() => setDepartment("department", "mulher")}
            value={department === "mulher"}
          ></RadioButtonWithLabel>
          <RadioButtonWithLabel
            label="Kids"
            onClick={() => setDepartment("department", "kids")}
            value={department === "kids"}
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
): JSX.Element {
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
): JSX.Element {
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
): JSX.Element {
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
): JSX.Element {
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
): JSX.Element {
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

export {
  DepartmentFilter,
  SizeFilter,
  ColorFilter,
  PriceFilter,
  SubCategoriesFilter,
  BrandsFilter,
};
