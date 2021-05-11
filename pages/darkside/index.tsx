import { AppBar, Container } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ProductIcon from "@material-ui/icons/CategoryRounded";
import HomeIcon from "@material-ui/icons/DashboardRounded";
import CategoriesIcon from "@material-ui/icons/ListAltRounded";
import MenuIcon from "@material-ui/icons/Menu";
import ClientIcon from "@material-ui/icons/PeopleRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import StoreIcon from "@material-ui/icons/StoreRounded";
import BrandsIcon from "@material-ui/icons/StyleRounded";
import SellersIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import OrdersIcon from "@material-ui/icons/SystemUpdateAltRounded";
import CollapseMenuIcon from "@material-ui/icons/UnfoldLessRounded";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import Row from "../../src/components/Atoms/Row";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import Orders from "./pages/orders";

const menuItems = [
  {
    title: "Dashboard",
    icon: <HomeIcon style={{ color: "#fff" }}></HomeIcon>,
  },
  { separator: 20 },
  {
    title: "Pedidos",
    icon: <OrdersIcon style={{ color: "#fff" }}></OrdersIcon>,
  },
  {
    title: "Clientes",
    icon: <ClientIcon style={{ color: "#fff" }}></ClientIcon>,
  },
  {
    title: "Marcas",
    icon: <BrandsIcon style={{ color: "#fff" }}></BrandsIcon>,
  },
  {
    title: "Produtos",
    icon: <ProductIcon style={{ color: "#fff" }}></ProductIcon>,
  },
  {
    title: "Categorias",
    icon: <CategoriesIcon style={{ color: "#fff" }}></CategoriesIcon>,
  },
  { separator: 20 },
  {
    title: "Vendedores",
    icon: <SellersIcon style={{ color: "#fff" }}></SellersIcon>,
  },
  { separator: 20 },
  {
    title: "Ajustes da Loja",
    icon: <StoreIcon style={{ color: "#fff" }}></StoreIcon>,
  },
  {
    title: "Ajustes do Sistema",
    icon: <SettingsIcon style={{ color: "#fff" }}></SettingsIcon>,
  },
];

const Wrapper = styled.span`
  display: flex;
  flex: 1;
  font-family: Commissioner;
  width: 100%;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const Drawer = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? 200 : 65)}px;
  background-color: ${Colors.DARK_PURPLE};
  height: calc(100vh - 64px);
  padding-top: 20px;
  padding-bottom: 20px;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
  height: 44px;
  align-items: center;
  color: ${Colors.WHITE};
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.0)"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuItemText = styled.p`
  margin-left: 5px;
  font-family: "Commissioner";
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 20px;
  height: calc(100vh - 64px);
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Commissioner",
    fontWeight: 500,
    color: Colors.PRIMARY,
    marginLeft: 54,
  },
  appBar: {
    backgroundColor: Colors.WHITE,
  },
}));

function Admin(): JSX.Element {
  const authContext = useAuth();
  const router = useRouter();

  if (!authContext.user) {
    typeof window !== "undefined" && router.push("/darkside/pages/login");
    return null;
  }

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [currentPage, setCurrentPage] = useState("Dashboard");

  function getMenuItems() {
    const _items = [];

    menuItems.forEach((item, index) => {
      if (item?.separator) {
        _items.push(
          <SizedBox
            height={item.separator}
            key={"separator-" + index}
          ></SizedBox>
        );
      } else {
        _items.push(
          <MenuItem
            key={item.title}
            active={item.title === currentPage}
            onClick={() => setCurrentPage(item.title)}
          >
            {item.icon}
            {open ? <MenuItemText>{item.title}</MenuItemText> : null}
          </MenuItem>
        );
      }
    });

    return _items;
  }

  function getPageContent() {
    switch (currentPage) {
      case "Pedidos":
        return <Orders></Orders>;
      default:
        return null;
    }
  }

  return (
    <Wrapper>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <CollapseMenuIcon
                style={{ color: Colors.PRIMARY, transform: "rotate(-90deg)" }}
              ></CollapseMenuIcon>
            ) : (
              <MenuIcon style={{ color: Colors.PRIMARY }} />
            )}
          </IconButton>
          <img src="images/logo.svg" alt="Cirkle" height="32" />
          <Typography variant="h6" className={classes.title}>
            {currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} disableGutters>
        <Row alignTop>
          <Drawer open={open}>{getMenuItems()}</Drawer>
          <Content>{getPageContent()}</Content>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default Admin;
