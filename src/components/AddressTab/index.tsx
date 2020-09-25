import { Container } from "@material-ui/core";
import Axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Address from "../../modules/address/Address";
import AddressList from "./AddressList";
import NewAddress from "./NewAddress";

function AddressTab(): JSX.Element {
  const storedAddressList = JSON.parse(localStorage.getItem("addressList"));

  const [showNewAddressPanel, setShowNewAddressPanel] = useState(false);
  const [addressList, setAddressList] = useState(storedAddressList || []);

  const addAddress = (address: Address) => {
    const _id = uuidv4();
    address._id = _id;

    addressList.length === 0
      ? (address.mainAddress = true)
      : (address.mainAddress = false);
    console.log("addAddress -> address", address);

    setShowNewAddressPanel(false);

    const _addressList = _.cloneDeep(addressList);
    _addressList.push(address);
    setAddressList(_addressList);
  };

  const cancelAddAddress = () => {
    setShowNewAddressPanel(false);
  };

  const removeAddress = (id: string) => {
    const _addressList = _.cloneDeep(addressList);
    const result = _addressList.filter((o: Address) => o._id !== id);

    setAddressList(result);
  };

  const setMainAddress = (id: string) => {
    const _addressList = _.cloneDeep(addressList);

    let mainAddress: Address;
    const others: Array<Address> = [];

    _addressList.forEach((item: Address) => {
      if (item._id === id) {
        item.mainAddress = true;
        mainAddress = _.cloneDeep(item);
      } else {
        item.mainAddress = false;
        others.push(item);
      }
    });

    setAddressList([mainAddress, ...others]);
  };

  useEffect(() => {
    if (addressList) {
      localStorage.setItem("addressList", JSON.stringify(addressList));
      Axios.post("/api/address", { addressList });
    }
  }, [addressList]);

  return (
    <>
      <Container maxWidth="xs">
        {!showNewAddressPanel && (
          <AddressList
            addressList={addressList}
            removeAddress={removeAddress}
            setMainAddress={setMainAddress}
            setShowNewAddressPanel={setShowNewAddressPanel}
          ></AddressList>
        )}
        {showNewAddressPanel && (
          <NewAddress
            addAddress={addAddress}
            cancelAddAddress={cancelAddAddress}
          ></NewAddress>
        )}
      </Container>
    </>
  );
}

export default AddressTab;
