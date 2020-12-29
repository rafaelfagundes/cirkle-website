import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import validator from "validator";
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
import StatefulTextInput from "../../src/components/Atoms/StatefulTextInput";
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
import MelhorEnvioShipping, {
  getLowestShippingPrice,
} from "../../src/modules/melhorEnvio/MelhorEnvio";
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
  const cartContext = useCart();
  const authContext = useAuth();
  const orderContext = useOrder();

  if (cartContext.cart.items.length === 0) {
    if (process.browser) {
      router.push("/");
      return <></>;
    }
  }

  const userErrosTemplate = {
    email: "",
    name: "",
    phone: "",
  };

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

  const getCompleteName = () => {
    if (
      orderContext?.order?.user?.firstName &&
      orderContext?.order?.user?.lastName
    ) {
      return `${orderContext?.order?.user?.firstName} ${orderContext?.order?.user?.lastName}`;
    }
    return null;
  };

  const [name, setName] = useState(getCompleteName() || "");
  const [email, setEmail] = useState(orderContext?.order?.user?.email || "");
  const [phone, setPhone] = useState(orderContext?.order?.user?.phone || "");

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [postalCodeNotFound, setPostalCodeNotFound] = useState(false);

  const [userErrors, setUserErrors] = useState(userErrosTemplate);

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
    setLoadingShipping(true);

    const getSelected = (index: number, id: number) => {
      if (cartContext.isShippingFree()) {
        return index === 0 ? true : false;
      } else if (orderContext.order.shipping) {
        return id === orderContext.order.shipping.id;
      } else {
        return index === 0 ? true : false;
      }
    };

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

    try {
      const response = await Axios.post("/shippingcalc", shippingData);
      const _shippingList: Array<SelectItem> = [];
      const _sortedResponse = getLowestShippingPrice(response.data);

      _sortedResponse.forEach((item: MelhorEnvioShipping, index: number) => {
        if (!item?.error) {
          _shippingList.push({
            assetType: AssetType.IMAGE,
            selected: getSelected(index, item.id),
            text: `${item?.company?.name} ${item.name}`,
            value: item.id,
            assetValue: item?.company?.picture,
            secondaryText: `${item.currency} ${item.price} (${item.custom_delivery_range.min} à ${item.custom_delivery_range.max} dias úteis)`,
            secondaryValue: Number(item.custom_price),
          });
        }
      });

      setShippingList(_shippingList);
      setCalculatedShippingOptions(_sortedResponse);
      setSelectedShipping(_sortedResponse[0]);
      setLoadingShipping(false);
    } catch (error) {
      setLoadingShipping(false);
      console.error(error);
    }
  };

  const goToPaymentInfo = (): void => {
    function validateUser(orderUser: {
      email: string;
      name: string;
      phone: string;
    }): boolean {
      setUserErrors(userErrosTemplate);

      const errors = _cloneDeep(userErrosTemplate);

      let errorsCount = 0;

      if (validator.isEmpty(orderUser?.email)) {
        errorsCount++;
        errors.email = "Por favor, preencha o email.";
      } else if (!validator.isEmail(orderUser.email)) {
        errorsCount++;
        errors.email = "Por favor, preencha um email válido.";
      }

      if (validator.isEmpty(orderUser?.name || "")) {
        errorsCount++;
        errors.name =
          "Por favor, preencha o nome e sobrenome. Ex.: Maria José.";
      } else {
        const splitedName = orderUser?.name.split(" ");

        if (splitedName.length !== 2) {
          errorsCount++;
          errors.name =
            "Por favor, preencha somente nome e sobrenome. Ex.: Maria José.";
        } else if (splitedName[1] === "") {
          errorsCount++;
          errors.name = "Por favor, preencha o sobrenome. Ex.: Maria José.";
        }
      }

      if (validator.isEmpty(orderUser?.phone || "")) {
        errorsCount++;
        errors.phone = "Por favor, preencha o telefone.";
      } else {
        const phoneRemovedSpaces = orderUser?.phone
          ?.replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(/ /g, "");

        if (phoneRemovedSpaces.length !== 11) {
          errorsCount++;
          errors.phone =
            "Por favor, preencha o telefone com DDD+Número (11 dígitos)";
        }
      }

      if (errorsCount) {
        console.error(errors);
        setUserErrors(errors);
        return false;
      } else {
        return true;
      }
    }

    const _user = {
      email: authContext?.user?.email || email,
      phone: authContext?.user?.phoneNumber || phone,
      name: authContext?.user?.name || name,
    };

    if (!validateUser(_user)) {
      console.error("Usuário não válido!");
      return;
    }

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
    if (authContext.user) {
      const _finalUser = {
        email: authContext?.user?.email,
        firstName: authContext?.user?.name.split(" ")[0],
        lastName: authContext?.user?.name.split(" ")[1],
        phone: authContext?.user?.phoneNumber,
      };
      console.log("_finalUser", _finalUser);
      orderContext.setAddressAndUser(_finalAddress, _finalUser);
    } else {
      const _finalUser = {
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        phone,
      };
      orderContext.setAddressAndUser(_finalAddress, _finalUser);
    }

    router.push("/comprar/pagamento");
  };

  useEffect(() => {
    if (cartContext.cart.items.length > 0) {
      orderContext.setProducts(cartContext.cart.items);
    }

    let _postalCode = "";
    const postalCodeInterval = setInterval(async () => {
      if (getCustomTextFieldValue(postalCode)) {
        if (getCustomTextFieldValue(postalCode).length === "12345-123".length) {
          if (getCustomTextFieldValue(postalCode) !== _postalCode) {
            setPostalCodeNotFound(false);
            try {
              _postalCode = getCustomTextFieldValue(postalCode);

              const url = `https://brasilapi.com.br/api/cep/v1/${_postalCode.replace(
                "-",
                ""
              )}`;
              setLoadingPostalCode(true);
              const result = await Axios.get(url);
              setShowAddressForm(true);
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
              setPostalCodeNotFound(true);
              setShowAddressForm(true);
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
          {!authContext.user && (
            <>
              <Title>Seus Dados para Entrega</Title>
              <SizedBox height={20}></SizedBox>
              <StatefulTextInput
                value={name}
                onChange={setName}
                error={userErrors.name}
              >
                Nome e Sobrenome
              </StatefulTextInput>
              <SizedBox height={20}></SizedBox>
              <StatefulTextInput
                value={phone}
                onChange={setPhone}
                inputType="cellphone"
                error={userErrors.phone}
              >
                Celular/Telefone
              </StatefulTextInput>
              <SizedBox height={20}></SizedBox>
              <StatefulTextInput
                value={email}
                onChange={setEmail}
                error={userErrors.email}
              >
                Email
              </StatefulTextInput>
            </>
          )}
          <SizedBox height={30}></SizedBox>
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
              {postalCodeNotFound && (
                <>
                  <SizedBox height={5}></SizedBox>
                  <SimpleText size={0.9} color={Colors.ERROR}>
                    CEP não encontrado.
                  </SimpleText>
                </>
              )}
              <span style={{ display: showAddressForm ? "block" : "none" }}>
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
                  <CustomTextField ref={complement}>
                    Complemento
                  </CustomTextField>
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
              </span>
            </>
          )}
        </AddressCol>
        <ShippingCol isDesktop={!isSmartPhone}>
          <SizedBox height={10}></SizedBox>
          <Title>Frete</Title>
          {!cartContext.isShippingFree() && (
            <>
              {!authContext.user && (
                <>
                  <SizedBox height={20}></SizedBox>
                  <Subtitle color={Colors.SECONDARY}>
                    Preencha o CEP ao lado para calcular o frente
                  </Subtitle>
                </>
              )}
              <SizedBox height={20}></SizedBox>
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
            </>
          )}
          {cartContext.isShippingFree() && (
            <>
              <SizedBox height={16}></SizedBox>
              <SimpleText bold size={1.1} color={Colors.BLUE_JEANS}>
                Frete Grátis!
              </SimpleText>
              <SizedBox height={10}></SizedBox>
              {orderContext?.order?.shipping && (
                <SimpleText
                  size={0.8}
                >{`Previsão de entrega: ${orderContext.order.shipping.custom_delivery_range.min} à ${orderContext.order.shipping.custom_delivery_range.max} dias úteis.`}</SimpleText>
              )}
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
