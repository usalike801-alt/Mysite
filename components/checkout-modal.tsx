
"use client";

import { useState } from "react";

export default function CheckoutModal({
  isOpen = true,
  onClose = () => {},
  packageName = "Instagram Followers",
  price = "$19",
  quantity = "1,000 Followers",
}) {
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  // TVxAQJiNb9pBZRUQTdVYLWYowZfhpqaE3G
  const walletAddress = "TVxAQJiNb9pBZRUQTdVYLWYowZfhpqaE3G";

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', backgroundColor: '#111', padding: '24px', color: 'white', border: '1px solid #333' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{packageName}</h3>
          <button onClick={onClose} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#fff' }}>✕</button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="you@brand.com" 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: 'white' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button onClick={() => setPaymentMethod("card")} style={{ padding: '10px', borderRadius: '8px', background: paymentMethod === "card" ? '#059669' : '#222', border: 'none', color: 'white', cursor: 'pointer' }}>Credit Card</button>
            <button onClick={() => setPaymentMethod("crypto")} style={{ padding: '10px', borderRadius: '8px', background: paymentMethod === "crypto" ? '#059669' : '#222', border: 'none', color: 'white', cursor: 'pointer' }}>Crypto</button>
          </div>

          {paymentMethod === "crypto" && (
            <div style={{ padding: '16px', borderRadius: '8px', background: '#222', border: '1px solid #444' }}>
              <p style={{ fontSize: '12px', marginBottom: '8px', color: '#aaa' }}>Send USDT (TRC20) to:</p>
              <code style={{ fontSize: '12px', color: '#4ade80', wordBreak: 'break-all' }}>{walletAddress}</code>
            </div>
          )}

          <button style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#059669', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Pay {price} securely
          </button>
        </div>
      </div>
    </div>
  );
}
