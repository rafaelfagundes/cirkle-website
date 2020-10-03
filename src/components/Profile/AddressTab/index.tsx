import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useDialog } from "../../../hooks/dialog/useDialog";
import Address from "../../../modules/address/Address";
import Center from "../../Center";
import LoadingAnimation from "../../LoadingAnimation";
import SizedBox from "../../SizedBox";
import AddressList from "./AddressList";
import NewAddress from "./NewAddress";

function AddressTab(): JSX.Element {
  const [showNewAddressPanel, setShowNewAddressPanel] = useState(false);
  const [editAddressObj, setEditAddressObj] = useState(null);
  const [addressList, setAddressList] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const authContext = useAuth();
  const dialogContext = useDialog();

  const { data, error } = useSWR("/addresses", {
    initialData: authContext.user.addresses,
  });

  if (error) console.log("Error when retrivieng addresses", error);

  useEffect(() => {
    if (data) {
      const sorted = _.orderBy(data, ["mainAddress"], ["desc"]);
      setAddressList(sorted);
    }
  }, [data]);

  const addAddress = async (address: Address) => {
    try {
      setLoading(true);
      const _id = uuidv4();
      address.id = _id;

      addressList.length === 0
        ? (address.mainAddress = true)
        : (address.mainAddress = false);

      const response = await axios.post("/addresses", {
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        mainAddress: address.mainAddress,
        userId: authContext.user.id,
      });

      setLoading(false);
      setShowNewAddressPanel(false);

      const _addressList = _.cloneDeep(addressList);
      _addressList.push(response.data);
      setAddressList(_addressList);
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao adicionar endereço",
        "Não foi possível adicionar o endereço, tente novamente daqui alguns instantes."
      );
      setLoading(false);
    }
  };

  const cancelAddAddress = () => {
    setShowNewAddressPanel(false);
    setEditAddressObj(null);
  };

  const removeAddress = async (id: string) => {
    try {
      setLoading(true);
      const _addressList = _.cloneDeep(addressList);
      const result = _addressList.filter((o: Address) => o.id !== id);

      await axios.delete("/addresses/" + id);

      setLoading(false);
      setAddressList(result);
    } catch (error) {
      setLoading(false);
      console.log("removeAddress -> error", error);
      dialogContext.newDialog(
        true,
        "Erro ao adicionar endereço",
        "Não foi possível remover o endereço, tente novamente daqui alguns instantes."
      );
    }
  };

  const editAddress = (id: string) => {
    const address: Address = _.find(addressList, (o: Address) => o.id === id);
    setEditAddressObj(address);
    setShowNewAddressPanel(true);
  };

  const setMainAddress = (id: string) => {
    try {
      const _addressList = _.cloneDeep(addressList);

      let mainAddress: Address;
      const others: Array<Address> = [];

      _addressList.forEach((item: Address) => {
        if (item.id === id) {
          axios
            .put("/addresses/" + item.id, { mainAddress: true })
            .catch(() => {
              dialogContext.newDialog(
                true,
                "Erro ao adicionar endereço",
                "Não foi possível definir o endereço como padrão, tente novamente daqui alguns instantes."
              );
            });
          item.mainAddress = true;
          mainAddress = _.cloneDeep(item);
        } else {
          axios
            .put("/addresses/" + item.id, { mainAddress: false })
            .catch(() => {
              dialogContext.newDialog(
                true,
                "Erro ao adicionar endereço",
                "Não foi possível definir o endereço como padrão, tente novamente daqui alguns instantes."
              );
            });
          item.mainAddress = false;
          others.push(item);
        }
      });

      setAddressList([mainAddress, ...others]);
    } catch (error) {
      console.log("setMainAddress -> error", error);
      dialogContext.newDialog(
        true,
        "Erro ao adicionar endereço",
        "Não foi possível definir o endereço como padrão, tente novamente daqui alguns instantes."
      );
    }
  };

  const updateAddress = async (address: Address) => {
    setLoading(true);
    const _addressList = _.cloneDeep(addressList);

    try {
      await axios.put("/addresses/" + address.id, {
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        mainAddress: address.mainAddress,
      });

      setLoading(false);

      _addressList.forEach((item: Address, index: number) => {
        if (item.id === address.id) {
          _addressList[index] = address;
        }
      });

      setAddressList(_addressList);
      setEditAddressObj(null);
      setShowNewAddressPanel(false);
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao adicionar endereço",
        "Não foi possível atualizar o endereço, tente novamente daqui alguns instantes."
      );
      setLoading(false);
    }
  };

  return (
    <>
      {!data && (
        <>
          <SizedBox height={32}></SizedBox>
          <Center>
            <LoadingAnimation color size={32}></LoadingAnimation>
          </Center>
          <SizedBox height={32}></SizedBox>
        </>
      )}
      {!showNewAddressPanel && addressList && (
        <AddressList
          addressList={addressList}
          removeAddress={removeAddress}
          setMainAddress={setMainAddress}
          setShowNewAddressPanel={setShowNewAddressPanel}
          editAddress={editAddress}
          loading={loading}
        ></AddressList>
      )}
      {showNewAddressPanel && (
        <NewAddress
          updateAddress={updateAddress}
          editAddressObj={editAddressObj}
          addAddress={addAddress}
          cancelAddAddress={cancelAddAddress}
          loading={loading}
        ></NewAddress>
      )}
    </>
  );
}

export default AddressTab;
