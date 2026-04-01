"use client";

import React, { useEffect, useState } from "react";
import styles from "./PlanComparison.module.css";

interface PlanComparisonProps {
  onClose: () => void;
}

type ApiPlan = {
  id: number;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  durationInMonths: number;
  hasCertificates: boolean;
  hasPrioritySupport: boolean;
  hasAnalytics: boolean;
};

const PlanComparison: React.FC<PlanComparisonProps> = ({ onClose }) => {
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription-plans`
      );
      const json = await res.json();
      setPlans(json.data);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className={styles.comparisonOverlay}>
        <div className={styles.comparisonContainer}>Loading comparison...</div>
      </div>
    );
  }

  /* ===== Comparison rows definition ===== */
  const comparisonSections = [
    {
      category: "Course Access",
      rows: [
        {
          label: "Certificates",
          value: (p: ApiPlan) => p.hasCertificates,
        },
        {
          label: "Access duration",
          value: (p: ApiPlan) => `${p.durationInMonths} months`,
        },
      ],
    },
    {
      category: "Features",
      rows: [
        {
          label: "Priority support",
          value: (p: ApiPlan) => p.hasPrioritySupport,
        },
        {
          label: "Analytics & insights",
          value: (p: ApiPlan) => p.hasAnalytics,
        },
      ],
    },
    {
      category: "Billing",
      rows: [
        {
          label: "Billing cycle",
          value: (p: ApiPlan) => p.billingCycle,
        },
        {
          label: "Price",
          value: (p: ApiPlan) => `${p.price} EGP`,
        },
      ],
    },
  ];

  return (
    <div className={styles.comparisonOverlay} onClick={onClose}>
      <div
        className={styles.comparisonContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h1>Compare plans and features</h1>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.comparisonTable}>
          {/* ===== Header ===== */}
          <div className={styles.tableHeader}>
            <div className={styles.featureColumn}></div>

            {plans.map((plan) => (
              <div key={plan.id} className={styles.planColumn}>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>{plan.price} EGP</div>
                <div className={styles.planAudience}>
                  {plan.billingCycle} • {plan.durationInMonths} months
                </div>
                <button className={styles.ctaButton}>Buy Now</button>
              </div>
            ))}
          </div>

          {/* ===== Body ===== */}
          <div className={styles.tableBody}>
            {comparisonSections.map((section, i) => (
              <div key={i} className={styles.categorySection}>
                <div className={styles.categoryRow}>
                  <div className={styles.categoryName}>{section.category}</div>
                  {plans.map((p) => (
                    <div key={p.id} className={styles.planColumn} />
                  ))}
                </div>

                {section.rows.map((row, j) => (
                  <div key={j} className={styles.featureRow}>
                    <div className={styles.featureName}>{row.label}</div>

                    {plans.map((plan) => {
                      const value = row.value(plan);
                      return (
                        <div key={plan.id} className={styles.planColumn}>
                          {typeof value === "boolean" ? (
                            value ? (
                              <span className={styles.included}>✓</span>
                            ) : (
                              <span className={styles.notIncluded}>—</span>
                            )
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
