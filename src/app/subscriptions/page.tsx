"use client";

import React, { useEffect, useState } from "react";
import styles from "./subscriptions.module.css";
import PlanComparison from "./PlanComparison";
import { useAuthStore } from "@/store/authStore";

type ApiPlan = {
  id: number;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  durationInMonths: number;
  status: string;
  hasCertificates: boolean;
  hasPrioritySupport: boolean;
  hasAnalytics: boolean;
};

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<ApiPlan | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "visa">("cash");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  /* ================= Fetch Plans ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription-plans`,
        );

        if (!res.ok) throw new Error("Failed to load plans");

        const json = await res.json();
        setPlans(json.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* ================= Handlers ================= */
  const handleBuyClick = (plan: ApiPlan) => {
    setCurrentPlan(plan);
    setShowPaymentModal(true);
  };
  const { token } = useAuthStore();

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!currentPlan) return;

      // Map your plan to the API expected string
      const planMapping: Record<string, "MONTHLY" | "SIX_MONTHS" | "YEARLY"> = {
        Monthly: "MONTHLY",
        "6 Months": "SIX_MONTHS",
        Yearly: "YEARLY",
        // adjust the keys to match your plan.name or billingCycle
      };

      const apiPlan = planMapping[currentPlan.name] || "MONTHLY";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan: apiPlan, // only send "plan"
          }),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to initiate payment");
      }

      const data = await response.json();

      if (data.iframeUrl) {
        window.location.href = data.iframeUrl; // redirect to payment
      } else {
        console.error("Payment iframe URL not returned", data);
      }
    } catch (error: any) {
      console.error("Error initiating payment:", error);
    } finally {
      setIsProcessing(false);
      setShowPaymentModal(false);
    }
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= UI States ================= */
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.plans}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonTextSmall}></div>

              <div className={styles.skeletonPrice}></div>
              <div className={styles.skeletonButton}></div>

              <div className={styles.skeletonFeature}></div>
              <div className={styles.skeletonFeature}></div>
              <div className={styles.skeletonFeature}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  /* ================= Render ================= */
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Choose a plan for success</h1>
        <p>Pick a subscription plan that fits your learning goals.</p>
      </header>

      <div className={styles.plans}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.planCard} ${
              selectedPlan === plan.id ? styles.selected : ""
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className={styles.planHeader}>
              <h2>{plan.name}</h2>
              <p className={styles.description}>{plan.description}</p>
            </div>

            <div className={styles.priceSection}>
              <h3 className={styles.price}>{plan.price} EGP</h3>
              <p className={styles.billing}>
                {plan.billingCycle} • {plan.durationInMonths} months
              </p>
            </div>

            <button
              className={styles.ctaButton}
              onClick={(e) => {
                e.stopPropagation();
                handleBuyClick(plan);
              }}
            >
              Buy Now
            </button>

            <ul className={styles.features}>
              <li>
                {plan.hasCertificates
                  ? "Certificates included"
                  : "No certificates"}
              </li>
              <li>
                {plan.hasPrioritySupport
                  ? "Priority support"
                  : "Standard support"}
              </li>
              <li>
                {plan.hasAnalytics ? "Advanced analytics" : "Basic analytics"}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.compareSection}>
        <button
          className={styles.compareButton}
          onClick={() => setShowComparison(true)}
        >
          Compare plans and features
        </button>
      </div>

      {showComparison && (
        <PlanComparison onClose={() => setShowComparison(false)} />
      )}

      {/* ================= Payment Modal ================= */}
      {showPaymentModal && currentPlan && (
        <div className={styles.modalOverlay}>
          <div className={styles.paymentModal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowPaymentModal(false)}
            >
              &times;
            </button>

            <h2>Complete Your Purchase</h2>
            <div className={styles.planSummary}>
              <h3>{currentPlan.name}</h3>
              <p>{currentPlan.price} EGP</p>
            </div>

            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
              <div className={styles.paymentMethod}>
                <label>
                  <input
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  Cash / Wallets
                </label>

                <label>
                  <input
                    type="radio"
                    checked={paymentMethod === "visa"}
                    onChange={() => setPaymentMethod("visa")}
                  />
                  Visa / MasterCard
                </label>
              </div>

              {paymentMethod === "visa" && (
                <div className={styles.cardForm}>
                  <p>
                    Visa / MasterCard payment selected. No card input required.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : `Buy Now - ${currentPlan.price} EGP`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
