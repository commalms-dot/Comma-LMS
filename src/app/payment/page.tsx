"use client";
import React, { useState } from "react";
import OrderSummary from "@/features/Payment/components/OrderSummary/OrderSummary";
import clsx from "clsx";
import Button from "@/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import PaymentOptionList from "@/features/Payment/components/PaymentOptionList/PaymentOptionList";
import SuccessModal from "@/features/Payment/components/SuccessModal/SuccessModal";
import { useGetUserCartQuery } from "@/services/cart.service";
import { useCreatePaymentTokenMutation } from "@/services/payment.service";
import { useAuthUser } from "@/hooks/useAuthUser";
import styles from "./page.module.css";

interface PurchaseCourseFormData {
  courseName: string;
  coursePrice: number;
  courseDiscount: number;
  coursePromoCode: string;
  courseFriendEmail: string;
  courseFriendEmails: string[];
}

function PaymentPage() {
  const { handleSubmit } = useForm<PurchaseCourseFormData>();
  const [isSuccesModalOpen, setIsSuccesModalOpen] = useState(false);
  const { data } = useGetUserCartQuery();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const { authUser } = useAuthUser();

  const [createPaymentToken] = useCreatePaymentTokenMutation();

  const onSelectPaymentMethod = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const onSubmit = (data: PurchaseCourseFormData) => {
    console.log("Payment method: ", selectedPaymentMethod);
    console.log("New password form data: ", data);
  };

  const handleBuy = async () => {
    try {
      const response = await createPaymentToken({
        userId: authUser?.id as number,
        email: authUser?.email as string,
        paymentMethod: selectedPaymentMethod,
        // phoneNumber: authUser?.mobile as string,
        // firstName: authUser?.firstName as string,
        // lastName: authUser?.lastName as string,
        phoneNumber: "01030402256",
        firstName: "Mhmd",
        lastName: "Fathi",
      }).unwrap();
      const { paymentToken } = response;
      const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/863364?payment_token=${paymentToken}`;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <main className="container">
      <h1 className={styles["heading"]}>
        Checkout <span>({data?.items.length} courses)</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles["steps-list"]}>
          <li className={styles["step-item"]}>
            <h2 className={styles["step-heading"]}>Choose Payment Options</h2>
            <div
              className={clsx(
                styles["step-container"],
                styles["payment-options"],
              )}
            >
              <PaymentOptionList onSelect={onSelectPaymentMethod} />
              <OrderSummary
                className={styles["order-summary"]}
                price={data?.totalPrice!}
                discount={200}
              />
            </div>
          </li>
        </ul>
        <Button
          onClick={handleBuy}
          variant="danger"
          className={styles["payment-btn"]}
        >
          Use this Payment Method
        </Button>
      </form>
      <SuccessModal
        open={isSuccesModalOpen}
        onOpenChange={setIsSuccesModalOpen}
      />
    </main>
  );
}

export default PaymentPage;
