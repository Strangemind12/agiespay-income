import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [method, setMethod] = useState('');
  const [walletUID, setWalletUID] = useState('');
  const [message, setMessage] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);

  const minWithdraw = 1000;

  // Simulate logged-in user
  const user = {
    id: 'user123',
    name: 'Strangemind',
    email: 'strangemind@agiespay.income',
  };

  // 1️⃣ Fetch wallet balance and withdrawals from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wallet balance
        const balanceRes = await axios.get(`/api/user/${user.id}/balance`);
        setBalance(balanceRes.data.balance);

        // Fetch withdrawal history
        const historyRes = await axios.get(`/api/user/${user.id}/withdrawals`);
        setWithdrawals(historyRes.data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);

  // 2️⃣ Handle withdrawal request
  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!method || !walletUID) {
      return setMessage("❌ All fields are required.");
    }

    if (balance < minWithdraw) {
      return setMessage("⚠️ You need at least 1,000 coins to withdraw.");
    }

    try {
      // Send withdrawal request to backend
      await axios.post('/api/withdraw-request', {
        userId: user.id,
        method,
        walletUID,
        amount: balance,
        status: 'pending',
        requestedAt: new Date(),
      });

      setMessage("✅ Withdrawal request submitted and pending admin approval.");
      setMethod('');
      setWalletUID('');

      // Refresh withdrawal history
      const historyRes = await axios.get(`/api/user/${user.id}/withdrawals`);
      setWithdrawals(historyRes.data);

    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-bold text-green-700 mb-4">💰 Wallet & Withdraw</h1>
      <p className="text-gray-600 mb-4">Logged in as <span className="font-semibold">{user.name}</span></p>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Balance</h3>
        <p className="text-3xl text-green-600 font-bold">{balance} coins</p>
        <p className="text-sm text-gray-500">Minimum withdrawal: 1,000 coins</p>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded text-sm ${
          message.startsWith('✅') ? 'bg-green-100 text-green-800 border border-green-400' :
          message.startsWith('⚠️') ? 'bg-yellow-100 text-yellow-800 border border-yellow-400' :
          'bg-red-100 text-red-800 border border-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* 3️⃣ Withdrawal Form */}
      <form onSubmit={handleWithdraw} className="bg-white rounded-lg shadow p-4 space-y-4 mb-10">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Withdraw Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-green-500"
          >
            <option value="">Select Method</option>
            <option value="FaucetPay">FaucetPay</option>
            <option value="Bybit">Bybit UID</option>
            <option value="Bitget">Bitget UID</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Wallet UID / Username</label>
          <input
            type="text"
            value={walletUID}
            onChange={(e) => setWalletUID(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-green-500"
            placeholder="Enter UID or username"
          />
        </div>

        <button
          type="submit"
          disabled={balance < minWithdraw}
          className={`w-full py-2 rounded-lg font-bold text-white ${
            balance >= minWithdraw
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Request Withdrawal
        </button>
      </form>

      {/* 4️⃣ Withdrawal History */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">🧾 Withdrawal History</h2>
        {withdrawals.length === 0 ? (
          <p className="text-gray-500 text-sm">No withdrawals yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {withdrawals.map((item, idx) => (
              <li key={idx} className="py-2 text-sm text-gray-700 flex justify-between">
                <div>
                  <span className="font-semibold">{item.method}</span> to <code>{item.walletUID}</code>
                </div>
                <div>
                  {item.amount} coins —
                  <span className={`ml-1 font-semibold ${
                    item.status === 'pending' ? 'text-yellow-600' :
                    item.status === 'approved' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-10 text-center text-gray-400 text-sm">
        Withdrawals are processed manually. Admin approval required. ⏳
      </footer>
    </div>
  );
}
