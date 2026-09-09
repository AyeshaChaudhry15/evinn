"use client";

import React, { useEffect, useState } from "react";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Customer {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}

interface OrderData {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  customer: Customer;
}

function formatPKR(amount: number) {
  const num = Number(amount) || 0;
  return "PKR " + num.toLocaleString("en-PK");
}

function getPaymentName(method: string) {
  if (method === "jazzcash") {
    return "JazzCash / Easypaisa";
  }

  if (method === "bank") {
    return "Bank Transfer";
  }

  if (method === "cod") {
    return "Cash on Delivery";
  }

  return method;
}

export default function OrderSummary() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error("Failed to load order:", error);
      }
    }
  }, []);


  if (!order) {
    return (
      <div style={styles.page}>
        <div style={styles.emptyCard}>
          <h2 style={styles.emptyTitle}>No order found</h2>

          <p style={styles.emptyText}>
            Your order summary could not be found.
          </p>

          <a href="/vehicles" style={styles.shopButton}>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }


  const items = order.items || [];

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;

  return (
    <div style={styles.page}>
      <div style={styles.card}>


        <div style={styles.headerRow}>
          <h2 style={styles.headerTitle}>
            Order summary
          </h2>
        </div>


        <div style={styles.orderMeta}>
          <p style={styles.orderId}>
            Order #{order.orderId}
          </p>

          <p style={styles.orderDate}>
            Placed on: {order.placedAt}
          </p>
        </div>

        <hr style={styles.divider} />


        <div style={styles.itemsRow}>


          <div style={styles.itemsCol}>

            <p style={styles.sectionLabel}>
              Items ({items.length})
            </p>

            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={styles.itemRow}
              >


                <div style={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.itemImage}
                  />
                </div>


                <div style={styles.itemInfo}>

                  <p style={styles.itemName}>
                    {item.name}
                  </p>

                  <p style={styles.itemPrice}>
                    {formatPKR(item.price)}
                  </p>

                  <p style={styles.itemQty}>
                    Qty: {item.quantity || 1}
                  </p>

                </div>
              </div>
            ))}

          </div>


          <div style={styles.colDivider} />


          <div style={styles.totalsCol}>

            <div style={styles.totalsRow}>
              <span style={styles.totalsLabel}>
                Subtotal
              </span>

              <span style={styles.totalsValue}>
                {formatPKR(subtotal)}
              </span>
            </div>

            <div style={styles.totalsRow}>
              <span style={styles.totalsLabel}>
                Shipping
              </span>

              <span style={styles.freeLabel}>
                Free
              </span>
            </div>

            <hr style={styles.dividerSmall} />

            <div style={styles.totalsRow}>
              <span style={styles.grandLabel}>
                Total
              </span>

              <span style={styles.grandValue}>
                {formatPKR(total)}
              </span>
            </div>

          </div>
        </div>

        <hr style={styles.divider} />


        <div style={styles.bottomRow}>


          <div style={styles.bottomCol}>

            <p style={styles.sectionLabel}>
              Shipping address
            </p>

            <p style={styles.addrName}>
              {order.customer?.fullName}
            </p>

            <p style={styles.addrLine}>
              {order.customer?.address}
            </p>

            <p style={styles.addrLine}>
              {order.customer?.city} -{" "}
              {order.customer?.postalCode}
            </p>

            <p style={styles.addrLine}>
              {order.customer?.phoneNumber}
            </p>

          </div>


          <div style={styles.colDivider} />


          <div style={styles.bottomCol}>

            <p style={styles.sectionLabel}>
              Payment method
            </p>

            <div style={styles.paymentRow}>

              <div style={styles.paymentIcon}>
                💳
              </div>

              <span style={styles.paymentText}>
                {getPaymentName(
                  order.customer?.paymentMethod
                )}
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}




const styles: {
  [key: string]: React.CSSProperties;
} = {

  page: {
    minHeight: "100vh",
    background: "#0a0e14",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 16px",
    fontFamily:
      "'Segoe UI', Roboto, Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 850,
    background: "#101722",
    border: "1px solid #1e2836",
    borderRadius: 16,
    padding: "28px 32px",
    boxSizing: "border-box",
  },

  emptyCard: {
    width: "100%",
    maxWidth: 500,
    background: "#101722",
    border: "1px solid #1e2836",
    borderRadius: 16,
    padding: "50px 32px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  emptyTitle: {
    color: "#f2f4f7",
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
  },

  emptyText: {
    color: "#8a94a6",
    fontSize: 14,
    marginTop: 10,
  },

  shopButton: {
    display: "inline-block",
    marginTop: 25,
    padding: "12px 24px",
    borderRadius: 10,
    background: "#A3E635",
    color: "#0a0e14",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#f2f4f7",
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
  },

  orderMeta: {
    marginTop: 18,
  },

  orderId: {
    color: "#f2f4f7",
    fontSize: 15,
    fontWeight: 600,
    margin: "0 0 4px",
  },

  orderDate: {
    color: "#8a94a6",
    fontSize: 13,
    margin: 0,
  },

  divider: {
    border: "none",
    borderTop: "1px solid #1e2836",
    margin: "20px 0",
  },

  dividerSmall: {
    border: "none",
    borderTop: "1px solid #1e2836",
    margin: "10px 0",
  },

  itemsRow: {
    display: "flex",
    gap: 24,
    alignItems: "stretch",
  },

  itemsCol: {
    flex: 1.3,
    minWidth: 0,
  },

  colDivider: {
    width: 1,
    background: "#1e2836",
    flexShrink: 0,
  },

  sectionLabel: {
    color: "#f2f4f7",
    fontSize: 15,
    fontWeight: 600,
    margin: "0 0 14px",
  },

  itemRow: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    alignItems: "center",
  },

  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 8,
    border: "1px solid #263342",
    background: "#0b121c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },

  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  itemInfo: {
    minWidth: 0,
  },

  itemName: {
    color: "#f2f4f7",
    fontSize: 14,
    fontWeight: 500,
    margin: "0 0 2px",
  },

  itemPrice: {
    color: "#c3c9d4",
    fontSize: 13,
    margin: "0 0 2px",
  },

  itemQty: {
    color: "#8a94a6",
    fontSize: 12,
    margin: 0,
  },

  totalsCol: {
    flex: 1,
    minWidth: 0,
    paddingTop: 28,
  },

  totalsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 20,
  },

  totalsLabel: {
    color: "#8a94a6",
    fontSize: 14,
  },

  totalsValue: {
    color: "#f2f4f7",
    fontSize: 14,
    fontWeight: 500,
    textAlign: "right",
  },

  freeLabel: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: 600,
  },

  grandLabel: {
    color: "#f2f4f7",
    fontSize: 16,
    fontWeight: 600,
  },

  grandValue: {
    color: "#A3E635",
    fontSize: 17,
    fontWeight: 700,
  },

  bottomRow: {
    display: "flex",
    gap: 24,
    alignItems: "stretch",
  },

  bottomCol: {
    flex: 1,
    minWidth: 0,
  },

  addrName: {
    color: "#f2f4f7",
    fontSize: 14,
    fontWeight: 500,
    margin: "0 0 4px",
  },

  addrLine: {
    color: "#8a94a6",
    fontSize: 13,
    margin: "0 0 4px",
    lineHeight: 1.5,
  },

  paymentRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "#3a1f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },

  paymentText: {
    color: "#f2f4f7",
    fontSize: 14,
  },
};