import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CheckBoxWithLabel from "../../src/components/Atoms/CheckboxWithLabel";
import CustomTextField, {
  customTextFieldFocus,
  getCustomTextFieldValue,
  setCustomTextFieldValue,
} from "../../src/components/Atoms/CustomTextField";
import LoadingAnimation from "../../src/components/Atoms/LoadingAnimation";
import Row from "../../src/components/Atoms/Row";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../../src/components/Atoms/SelectMenu";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Subtitle from "../../src/components/Atoms/Subtitle";
import Title from "../../src/components/Atoms/Title";
import CartFooterButtons from "../../src/components/Molecules/CartFooterButtons";
import LastMilePage from "../../src/components/Templates/LastMilePage";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import Address, {
  addressErrorsTemplate,
  validateAddress,
} from "../../src/modules/address/Address";
import MelhorEnvioShipping from "../../src/modules/melhorEnvio/MelhorEnvio";
import ShippingData from "../../src/modules/shippingData/ShippingData";
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
  const router = useRouter();

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
  const orderContext = useOrder();

  const { data: addressData, error: addressError } = useSWR(
    authContext?.user ? "/addresses" : null
  );
  if (addressError) console.error(addressError);

  const [addressList, setAddressList] = useState(null);

  const [otherAddress, setOtherAddress] = useState(
    authContext?.user
      ? orderContext?.order?.address?.customAddress
        ? true
        : false
      : true
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [loadingPostalCode, setLoadingPostalCode] = useState(false);

  const [shippingList, setShippingList] = useState([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [calculatedShippingOptions, setCalculatedShippingOptions] = useState(
    null
  );
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingError, setShippingError] = useState(false);

  const street = useRef(null);
  const number = useRef(null);
  const complement = useRef(null);
  const neighborhood = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const postalCode = useRef(null);

  const [addressErrors, setAddressErrors] = useState(addressErrorsTemplate);

  const _setAddress = (address: Address) => {
    setCustomTextFieldValue(street, address.street);
    setCustomTextFieldValue(neighborhood, address.neighborhood);
    setCustomTextFieldValue(city, address.city);
    setCustomTextFieldValue(state, address.state);

    customTextFieldFocus(number);
  };

  const _clearAddress = () => {
    setCustomTextFieldValue(street, "");
    setCustomTextFieldValue(neighborhood, "");
    setCustomTextFieldValue(city, "");
    setCustomTextFieldValue(state, "");
  };

  const _setPostalCode = (address: Address) => {
    cartContext.setShipping({
      id: null,
      postalCode: address.postalCode,
      type: null,
      value: null,
    });
  };

  const getShipping = async (postalCode: string) => {
    if (!postalCode) return;

    const getSelected = (index: number, id: number) => {
      if (orderContext.order.shipping) {
        return id === orderContext.order.shipping.id;
      } else {
        return index === 0 ? true : false;
      }
    };

    setLoadingShipping(true);
    const shippingData: ShippingData = {
      to: {
        postal_code: postalCode,
      },
      products: [],
    };

    cartContext.cart.items.forEach((item) => {
      shippingData.products.push({
        height: item.pHeight,
        id: item.uid,
        insurance_value: item.price,
        length: item.pLength,
        quantity: item.cartQty,
        weight: item.pWeight,
        width: item.pWidth,
      });
    });

    const response = await Axios.post("/shippingcalc", shippingData);

    setLoadingShipping(false);
    if (response.status === 200) {
      const _shippingList: Array<SelectItem> = [];
      const _sortedResponse = _orderBy(response.data, ["price"], ["asc"]);

      _sortedResponse.forEach((item: MelhorEnvioShipping, index: number) => {
        if (!item?.error) {
          _shippingList.push({
            assetType: AssetType.IMAGE,
            selected: getSelected(index, item.id),
            text: `${item?.company?.name} ${item.name}`,
            value: item.id,
            assetValue: item?.company?.picture,
            secondaryText: `${item.currency} ${item.price} (${item.delivery_range.min} à ${item.delivery_range.max} dias úteis)`,
            secondaryValue: Number(item.price),
          });
        }
      });

      setShippingList(_shippingList);
      setCalculatedShippingOptions(_sortedResponse);
      setSelectedShipping(_sortedResponse[0]);
    } else {
      console.error(response.data.error);
    }
  };

  const goToPaymentInfo = (): void => {
    setShippingError(false);
    let _finalAddress: Address;

    if (otherAddress) {
      _finalAddress = {
        street: getCustomTextFieldValue(street),
        number: Number(getCustomTextFieldValue(number)),
        complement: getCustomTextFieldValue(complement),
        neighborhood: getCustomTextFieldValue(neighborhood),
        city: getCustomTextFieldValue(city),
        state: getCustomTextFieldValue(state),
        postalCode: getCustomTextFieldValue(postalCode),
        customAddress: true,
      };
    } else {
      _finalAddress = selectedAddress;
    }

    setAddressErrors(addressErrorsTemplate);
    const resultAddressValidation = validateAddress(_finalAddress);

    if (!resultAddressValidation.valid) {
      setAddressErrors(resultAddressValidation.errors);
      return;
    }
    if (!selectedShipping) {
      setShippingError(true);
      return;
    }
    orderContext.setAddress(_finalAddress);
    router.push("/comprar/pagamento");
  };

  useEffect(() => {
    let _postalCode = "";
    const postalCodeInterval = setInterval(async () => {
      if (getCustomTextFieldValue(postalCode)) {
        if (getCustomTextFieldValue(postalCode).length === "12345-123".length) {
          if (getCustomTextFieldValue(postalCode) !== _postalCode) {
            try {
              _postalCode = getCustomTextFieldValue(postalCode);

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
    if (shippingList && shippingList.length > 0) {
      const selectedId = shippingList.filter((o: SelectItem) => o.selected)[0]
        .value;

      if (
        selectedId &&
        calculatedShippingOptions &&
        calculatedShippingOptions.length > 0
      ) {
        const _selectedShipping = calculatedShippingOptions.filter(
          (o: MelhorEnvioShipping) => o.id === selectedId
        );

        setSelectedShipping(_selectedShipping[0]);
      }
    }
  }, [shippingList]);

  useEffect(() => {
    if (selectedShipping) {
      orderContext.setShipping(selectedShipping);
    }
  }, [selectedShipping]);

  useEffect(() => {
    const _postalCode = getCustomTextFieldValue(postalCode);
    if (_postalCode) {
      getShipping(_postalCode);
    }
  }, [getCustomTextFieldValue(postalCode)]);

  useEffect(() => {
    if (selectedAddress) {
      getShipping(selectedAddress.postalCode);
    }
  }, [selectedAddress]);

  useEffect(() => {
    function getSelectedAddress(id: string, mainAddress: boolean) {
      if (orderContext.order.address) {
        return orderContext.order.address.id === id;
      } else {
        return mainAddress;
      }
    }

    if (addressData) {
      const _addresses: Array<SelectItem> = addressData.map(
        (item: Address) => ({
          text: `${item.street}, ${item.number} - ${item.neighborhood}`,
          value: item.id,
          selected: getSelectedAddress(item.id, item.mainAddress),
          assetType: AssetType.NONE,
          secondaryValue: item.postalCode,
          secondaryText: `${item.city} - ${item.state}`,
        })
      );

      setAddressList(_addresses);
    }
  }, [addressData]);

  useEffect(() => {
    if (addressList) {
      const _selectedAddress = addressList.filter(
        (o: SelectItem) => o.selected
      );

      if (_selectedAddress.length) {
        setSelectedAddress(
          addressData?.filter(
            (o: Address) => o.id === _selectedAddress[0].value
          )[0]
        );
      }
    }
  }, [addressList]);

  useEffect(() => {
    if (orderContext.order?.address?.customAddress) {
      if (otherAddress) {
        setCustomTextFieldValue(street, orderContext.order.address.street);
        setCustomTextFieldValue(
          number,
          String(orderContext.order.address.number)
        );
        setCustomTextFieldValue(
          complement,
          orderContext.order.address.complement
        );
        setCustomTextFieldValue(
          neighborhood,
          orderContext.order.address.neighborhood
        );
        setCustomTextFieldValue(city, orderContext.order.address.city);
        setCustomTextFieldValue(state, orderContext.order.address.state);
        setCustomTextFieldValue(
          postalCode,
          orderContext.order.address.postalCode
        );
      }
    }
  }, [orderContext.order.address]);

  return (
    <LastMilePage breadcrumbs={breadcrumbs}>
      <ColumnsOrNot>
        <AddressCol isDesktop={!isSmartPhone}>
          <SizedBox height={10}></SizedBox>
          <Title>Endereço de Entrega</Title>
          {addressList && addressList.length > 0 && (
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
                    items={addressList || []}
                    setSelected={setAddressList}
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
          {(otherAddress || (addressList && addressList.length === 0)) && (
            <>
              <SizedBox height={20}></SizedBox>
              <Subtitle color={Colors.SECONDARY}>
                Informe o CEP e tentaremos preencher o resto dos dados
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
          {!authContext.user && (
            <>
              <SizedBox height={20}></SizedBox>
              <Subtitle color={Colors.SECONDARY}>
                Preencha o CEP ao lado para calcular o frente
              </Subtitle>
              <SizedBox height={20}></SizedBox>
            </>
          )}
          {!loadingShipping && (
            <SelectMenu
              items={shippingList}
              setSelected={setShippingList}
              title="Selecione o frete de sua preferência"
              errorText=""
              radioButtonList
            ></SelectMenu>
          )}
          {loadingShipping && (
            <LoadingAnimation size={32} color></LoadingAnimation>
          )}
          {shippingError && (
            <>
              <SizedBox height={16}></SizedBox>
              <SimpleText color={Colors.ERROR} size={0.9}>
                Por favor selecione um frete
              </SimpleText>
            </>
          )}
        </ShippingCol>
      </ColumnsOrNot>
      <CartFooterButtons
        buttons={[
          {
            text: "Ir Para Pagamento",
            onClick: goToPaymentInfo,
            type: "success",
            width: 200,
          },
        ]}
      ></CartFooterButtons>
    </LastMilePage>
  );
}

export default AddressAndShipping;
