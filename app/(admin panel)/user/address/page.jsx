"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "@/app/components/collection/Modal";
import BillingDetail from "@/app/components/user/address/BillingDetail";
import AddNewAddress from "@/app/components/user/address/EditAddressForm/AddNewAddress";
import ShippingDetail from "@/app/components/user/address/ShippingDetail";
import TopNavigation from "@/app/components/user/global/TopNavigation";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import ApiTokenBased from "@/app/util/ApiTokenBased";
import styles from "./page.module.scss";

const PageAddress = () => {
  const { performGet } = ApiTokenBased();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const addModalRef = useRef(null);
  const [modalTitle, setModalTitle] = useState("");
  const [addressType, setAddressType] = useState(0);
  const fetchDataFromApi = async () => {
    try {
      const { response, error } = await performGet("api/v1/user-address");
      if (response.success) {
        setData(response.data);
      } else {
        setError(error || response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleModal = (addressType) => {
    setModalTitle(
      addressType === 1 ? "Add Shipping Address" : "Add Billing Address"
    );
    setAddressType(addressType);
    setShowAddModal(true);
  };

  useOutsideClick(addModalRef, () => {
    setShowAddModal(false);
  });

  return (
    <div>
      <header>
        <TopNavigation title={"Address"} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.btnContainer}>
              {data.length === 2 ? (
                <></>
              ) : data.length === 1 ? (
                data[0].address_type === "Billing Address" ? (
                  <button onClick={() => handleModal(1)}>
                    Add Shipping Address
                  </button>
                ) : (
                  <button onClick={() => handleModal(2)}>
                    Add Billing Address
                  </button>
                )
              ) : (
                <>
                  <button onClick={() => handleModal(1)}>
                    Add Billing Address
                  </button>
                  <button onClick={() => handleModal(2)}>
                    Add Shipping Address
                  </button>
                </>
              )}
            </div>
            <div className={styles.mainContent}>
              {data.length === 2 ? (
                <>
                  <BillingDetail userAddressData={data[0]} />
                  <ShippingDetail userAddressData={data[1]} />
                </>
              ) : data.length === 1 ? (
                <BillingDetail userAddressData={data[0]} />
              ) : (
                <h2>No Address Added</h2>
              )}
            </div>
          </div>
        </div>
      </header>
      {showAddModal &&
        createPortal(
          <Modal
            title={modalTitle}
            handleModal={() => setShowAddModal(false)}
            modalRef={addModalRef}
          >
            <AddNewAddress addressType={addressType} />
          </Modal>,
          document.getElementById("modal-container")
        )}
    </div>
  );
};

export default PageAddress;
