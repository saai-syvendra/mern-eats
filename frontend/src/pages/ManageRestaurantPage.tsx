import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
  useUpdateMyRestaurantOrder,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Order, OrderStatus } from "@/types";
import { useEffect, useState } from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { currentRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders: initialOrders } = useGetMyRestaurantOrders();
  const { updateRestaurantStatus } = useUpdateMyRestaurantOrder();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  useEffect(() => {
    setActiveOrders(orders.filter((order) => order.status !== "delivered"));
    setPastOrders(
      orders
        .filter((order) => order.status === "delivered")
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        })
    );
  }, [orders]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    await updateRestaurantStatus({ orderId, status: newStatus });
    setOrders((prevOrders) =>
      prevOrders?.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const isEditing = !!currentRestaurant;

  return (
    <Tabs defaultValue="activeOrders">
      <TabsList>
        <TabsTrigger value="activeOrders">Active Orders</TabsTrigger>
        <TabsTrigger value="pastOrders">Past Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent
        value="activeOrders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {" "}
          {activeOrders.length} active orders
        </h2>
        {activeOrders.map((order) => (
          <OrderItemCard
            key={order._id}
            order={order}
            onStatusChange={handleStatusChange}
          />
        ))}
      </TabsContent>

      <TabsContent
        value="pastOrders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold"> {pastOrders.length} past orders</h2>
        {pastOrders.map((order) => (
          <OrderItemCard
            key={order._id}
            order={order}
            onStatusChange={handleStatusChange}
          />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={currentRestaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
