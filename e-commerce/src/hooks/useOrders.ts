import { useEffect, useState } from "react";
;
import { TProduct } from "@types";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { resetOrderStatus } from "@redux/orders/orderSlice";
import actGetOrders from "@redux/orders/act/actGetOrders";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {loading, error, orderList, showModal,selectedProduct, viewDetailsHandler,closeModalHandler,};
};

export default useOrders;