"use client";

import { useState } from "react";
import { X, CreditCard, Wallet, ShieldCheck, Copy, Check } from "lucide-react";

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  packageName?: string;
  price?: string;
  quantity?: string;
}

export default function CheckoutModal({
  isOpen = true,
  onClose = () => {},
  packageName = "Instagram Followers",
  price = "$19",
  quantity = "1,000 Followers · 1–2 days",
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("crypto");
  const [email, setEmail] = useState("");
  const [targetLink, setTargetLink] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const walletAddress =
    process.env.NEXT_PUBLIC_CRYPTO_WALLET_ADDRESS || "TRC20_WALLET_ADDRESS_HERE";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 p-6 text-white border border-zinc-800 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-red-500">📸</span>
            <h3 className="text-lg font-semibold">{packageName}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Email for receipt & updates
            </label>
            <input
              type="email"
              placeholder="you@brand.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Payment method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                  paymentMethod === "card"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("crypto")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                  paymentMethod === "crypto"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                <Wallet className="w-4 h-4" />
                Crypto
              </button>
            </div>
          </div>

          {/* Crypto Details Box */}
          {paymentMethod === "crypto" && (
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
              <span className="text-xs font-semibold text-zinc-300 block">
                Pay with USDT (TRC20)
              </span>
              <div className="p-3 bg-black rounded-lg border border-zinc-800 flex items-center justify-between gap-2">
                <code className="text-xs text-emerald-400 font-mono break-all select-all">
                  {walletAddress}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-md bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Package Summary */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-xs text-zinc-400">{quantity}</span>
            <span className="text-lg font-bold text-white">{price}</span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 font-semibold text-black rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
          >
            <ShieldCheck className="w-4 h-4" />
            Pay {price} securely
          </button>
        </div>
      </div>
    </div>
  );
    }
          
