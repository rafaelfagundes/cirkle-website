import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CheckBoxWithLabel from "../../src/components/Atoms/CheckboxWithLabel";
import CustomTextField from "../../src/components/Atoms/CustomTextField";
import LoadingAnimation from "../../src/components/Atoms/LoadingAnimation";
import Row from "../../src/components/Atoms/Row";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../../src/components/Atoms/SelectMenu";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Subtitle from "../../src/components/Atoms/Subtitle";
import Title from "../../src/components/Atoms/Title";
import CartFooterButtons from "../../src/components/Molecules/CartFooterButtons";
import LastMilePage from "../../src/components/Templates/LastMilePage";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import { useCart } from "../../src/hooks/cart/useCart";
import Address from "../../src/modules/address/Address";
import theme from "../../src/theme/theme";

const ColumnsOrNot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AddressCol = styled.div<{ isDesktop: boolean }>`
  margin-right: ${(props) => (props.isDesktop ? 40 : 0)}px;
  padding-right: ${(props) => (props.isDesktop ? 40 : 0)}px;
  border-right: ${(props) => (props.isDesktop ? "1px solid#FBEFF7" : "none")};

  ${(props) => (props.isDesktop ? "flex:1" : "")};
`;

const ShippingCol = styled.div<{ isDesktop: boolean }>`
  margin-top: ${(props) => (props.isDesktop ? 0 : 32)}px;
  ${(props) => (props.isDesktop ? "flex:1" : "")};
`;

function AddressAndShipping(): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const breadcrumbs = [
    {
      active: true,
      position: 1,
      desc: "Endereço",
    },
    {
      active: false,
      position: 2,
      desc: "Pagamento",
    },
    {
      active: false,
      position: 3,
      desc: "Revisão",
    },
  ];

  const authContext = useAuth();
  const cartContext = useCart();

  const { data, error } = useSWR(authContext?.user ? "/addresses" : null);

  const [addresses, setAddresses] = useState(null);

  const [otherAddress, setOtherAddress] = useState(
    authContext?.user ? false : true
  );

  const [loadingPostalCode, setLoadingPostalCode] = useState(false);

  const street = useRef(null);
  const number = useRef(null);
  const complement = useRef(null);
  const neighborhood = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const postalCode = useRef(null);

  const addressErrorsTemplate = {
    postalCode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  };

  const [addressErrors, setAddressErrors] = useState(
    _cloneDeep(addressErrorsTemplate)
  );

  useEffect(() => {
    if (data) {
      const _addresses: Array<SelectItem> = data.map((item: Address) => ({
        text: `${item.street}, ${item.number} - ${item.neighborhood}`,
        value: item.id,
        selected: item.mainAddress,
        assetType: AssetType.NONE,
        secondaryValue: item.postalCode,
        secondaryText: `${item.city} - ${item.state}`,
      }));

      setAddresses(_addresses);
    }
  }, [data]);

  const _setAddress = (address: Address) => {
    street.current.children[0].value = address.street;
    neighborhood.current.children[0].value = address.neighborhood;
    city.current.children[0].value = address.city;
    state.current.children[0].value = address.state;
    number.current.children[0].focus();
  };

  const _clearAddress = () => {
    street.current.children[0].value = "";
    neighborhood.current.children[0].value = "";
    city.current.children[0].value = "";
    state.current.children[0].value = "";
  };

  const _setShippingList = (list: Array<SelectItem>) => {
    cartContext.setShippingList(list);
  };

  const _setPostalCode = (address: Address) => {
    cartContext.setShipping({
      id: null,
      postalCode: address.postalCode,
      type: null,
      value: null,
    });
  };

  useEffect(() => {
    let _postalCode = "";
    const postalCodeInterval = setInterval(async () => {
      if (postalCode?.current?.children[0].value) {
        if (
          postalCode?.current?.children[0].value.length === "12345-123".length
        ) {
          if (postalCode.current.children[0].value !== _postalCode) {
            try {
              _postalCode = postalCode.current.children[0].value;

              const url = `https://brasilapi.com.br/api/cep/v1/${_postalCode.replace(
                "-",
                ""
              )}`;
              setLoadingPostalCode(true);
              const result = await Axios.get(url);
              if (result) {
                const { cep, state, city, neighborhood, street } = result.data;

                const address: Address = {
                  id: null,
                  postalCode: cep,
                  number: 0,
                  state,
                  city,
                  neighborhood,
                  street,
                };

                _setAddress(address);
                _setPostalCode(address);
                setLoadingPostalCode(false);
              }
            } catch (error) {
              setLoadingPostalCode(false);
            }
          }
        } else {
          _clearAddress();
        }
      }
    }, 250);

    return () => {
      clearInterval(postalCodeInterval);
    };
  }, []);

  useEffect(() => {
    if (addresses) {
      const selectAddress = addresses.filter((o) => o.selected);

      if (selectAddress.length) {
        console.log("selectAddress[0]", selectAddress[0]);

        const _address: Address = {
          id: null,
          street: null,
          number: 0,
          neighborhood: null,
          city: null,
          state: null,
          postalCode: selectAddress[0].secondaryValue,
        };

        _setPostalCode(_address);
      }
    }
  }, [addresses]);

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <ColumnsOrNot>
        <AddressCol isDesktop={!isSmartPhone}>
          <SizedBox height={10}></SizedBox>
          <Title>Endereço de Entrega</Title>
          {addresses && addresses.length > 0 && (
            <>
              <SizedBox height={20}></SizedBox>
              {!otherAddress && (
                <>
                  <Subtitle color={Colors.SECONDARY}>
                    Utilizar um dos endereços cadastrados
                  </Subtitle>
                  <SizedBox height={20}></SizedBox>
                  <SelectMenu
                    width={isSmartPhone ? 300 : undefined}
                    items={addresses || []}
                    setSelected={setAddresses}
                    placeholder="Escolha um endereços..."
                    errorText=""
                    radioButtonList
                  ></SelectMenu>
                  <SizedBox height={10}></SizedBox>
                </>
              )}
              <CheckBoxWithLabel
                label="Enviar para outro endereço"
                onClick={() => setOtherAddress(!otherAddress)}
                value={otherAddress}
              ></CheckBoxWithLabel>
            </>
          )}
          {(otherAddress || (addresses && addresses.length === 0)) && (
            <>
              <SizedBox height={20}></SizedBox>
              <Subtitle color={Colors.SECONDARY}>
                Preencha abaixo o endereço
              </Subtitle>
              <SizedBox height={20}></SizedBox>
              <Row>
                <span data-test="address-postalCode">
                  <CustomTextField
                    type="postalCode"
                    ref={postalCode}
                    error={addressErrors.postalCode}
                    width={120}
                  >
                    CEP*
                  </CustomTextField>
                </span>
                <SizedBox width={8}></SizedBox>
                {loadingPostalCode && (
                  <LoadingAnimation size={36} color={true}></LoadingAnimation>
                )}
              </Row>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-street">
                <CustomTextField ref={street} error={addressErrors.street}>
                  Logradouro (Rua, Avenida, Alameda, etc)*
                </CustomTextField>
              </span>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-number">
                <CustomTextField
                  ref={number}
                  error={addressErrors.number}
                  width={100}
                >
                  Número*
                </CustomTextField>
              </span>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-complement">
                <CustomTextField ref={complement}>Complemento</CustomTextField>
              </span>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-neighborhood">
                <CustomTextField
                  ref={neighborhood}
                  error={addressErrors.neighborhood}
                >
                  Bairro*
                </CustomTextField>
              </span>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-city">
                <CustomTextField ref={city} error={addressErrors.city}>
                  Cidade*
                </CustomTextField>
              </span>
              <SizedBox height={20}></SizedBox>
              <span data-test="address-state">
                <CustomTextField ref={state} error={addressErrors.state}>
                  Sigla do Estado*
                </CustomTextField>
              </span>
            </>
          )}
        </AddressCol>
        <ShippingCol isDesktop={!isSmartPhone}>
          <SizedBox height={10}></SizedBox>
          <Title>Frete</Title>
          <SizedBox height={20}></SizedBox>

          <Subtitle color={Colors.SECONDARY}>
            Favor informar o CEP para cálculo do frete
          </Subtitle>
          <SizedBox height={16}></SizedBox>
          {!cartContext.cart.loadingShipping && (
            <SelectMenu
              items={cartContext.cart.shippingList}
              setSelected={_setShippingList}
              title="Selecione o frete"
              errorText=""
              radioButtonList
            ></SelectMenu>
          )}
          {cartContext.cart.loadingShipping && (
            <LoadingAnimation size={32} color></LoadingAnimation>
          )}
        </ShippingCol>
      </ColumnsOrNot>
      <CartFooterButtons
        buttons={[
          {
            text: "Ir para pagamento",
            onClick: null,
            type: "success",
            width: 200,
          },
        ]}
      ></CartFooterButtons>
    </LastMilePage>
  );
}

export default AddressAndShipping;
