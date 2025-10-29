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
export const contacts = async () => {
  try {
    const res = await fetch(`/api/contacts`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Contacts fetch error:", err);
    return [];
  }
};

export const fetchGroup = async () => {
  try {
    const res = await fetch(`/api/contacts/groups`, {
      method: "GET",
      credentials: "include",
    });
    return res;
  } catch (err) {
    console.error("Contacts fetch error:", err);
    return { ok: false };
  }
};

export const fetchUser = async () => {
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const { user } = await res.json();
    return user || null;
  } catch (error) {
    console.error("Fetch User Error:", error);
    return null;
  }
};

export async function getTransactions(limit = 10, offset = 0) {
  try {
    const res = await fetch(
      `/api/wallet/transactions?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    // if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
    return { transactions: [], total: 0 };
  }
}
