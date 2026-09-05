"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Try to load from localStorage
    const savedSecret = localStorage.getItem("admin_secret");
    if (savedSecret) {
      setSecret(savedSecret);
      fetchOrders(savedSecret);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (token) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok) {
        setOrders(data.orders);
        setIsAuthenticated(true);
        localStorage.setItem("admin_secret", token);
      } else {
        setErrorMsg(data.error || "Failed to load orders");
        setIsAuthenticated(false);
        localStorage.removeItem("admin_secret");
      }
    } catch (err) {
      setErrorMsg("Network error.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchOrders(secret);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${secret}`
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      
      if (res.ok) {
        // Optimistically update
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      } else {
        const data = await res.json();
        alert(`Failed to update status: ${data.error}`);
      }
    } catch (err) {
      alert("Network error while updating status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_secret");
    setIsAuthenticated(false);
    setSecret("");
    setOrders([]);
  };

  if (loading) {
    return <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>Loading admin...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: "4rem 0", maxWidth: "400px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", marginBottom: "2rem" }}>Admin Login</h1>
        {errorMsg && (
          <div style={{ padding: "1rem", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", marginBottom: "1.5rem" }}>
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            placeholder="Admin Secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "8px" }}
            required
          />
          <button type="submit" style={{ padding: "12px", background: "var(--green-500)", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800" }}>Orders ({orders.length})</h1>
        <button onClick={handleLogout} style={{ padding: "8px 16px", background: "var(--gray-200)", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--gray-100)", borderBottom: "2px solid var(--border-color)" }}>
              <th style={{ padding: "1rem" }}>Order ID</th>
              <th style={{ padding: "1rem" }}>Date</th>
              <th style={{ padding: "1rem" }}>Customer</th>
              <th style={{ padding: "1rem" }}>Total</th>
              <th style={{ padding: "1rem" }}>Method</th>
              <th style={{ padding: "1rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", fontFamily: "monospace" }}>{order.id.split("-")[0]}...</span>
                </td>
                <td style={{ padding: "1rem" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "bold" }}>{order.customerName}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{order.customerEmail}</div>
                </td>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>₹{order.totalAmount}</td>
                <td style={{ padding: "1rem" }}>{order.paymentMethod}</td>
                <td style={{ padding: "1rem" }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ padding: "6px", borderRadius: "4px", border: "1px solid var(--border-color)", background: "white", cursor: "pointer" }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PENDING_COD">PENDING_COD</option>
                    <option value="PAID">PAID</option>
                    <option value="FAILED">FAILED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
