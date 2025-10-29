export const getWalletBalance = async () => {
  try {
    const res = await fetch(`/api/wallet/balance`, {
      method: "GET",
      credentials: "include",
    });
    // if (!res.ok) throw new Error("Failed to fetch wallet balance");
    return await res.json();
  } catch (err) {
    console.error("Wallet fetch error:", err);
    return { balance: null }; 
  }
};



export async function getTransactions(limit = 10, offset = 0) {
  try {
    const res = await fetch(`/api/wallet/transactions?limit=${limit}&offset=${offset}`, {
      method: "GET",
      credentials: "include",
    });

    // if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
    return { transactions: [], total: 0 };
  }
}
