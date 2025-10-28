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
