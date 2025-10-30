export const getWalletBalance = async () => {
  try {
    const res = await fetch(`/api/wallet/balance`, {
      method: "GET",
      credentials: "include",
    });
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
    return await res.json();
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
    return { transactions: [], total: 0 };
  }
}

export const createContact = async (contact) => {
  try {
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(contact),
    });
    return await res.json();
  } catch (err) {
    console.error("Create contact error:", err);
    throw err;
  }
};

export const updateContact = async (id, contact) => {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(contact),
    });
    return await res.json();
  } catch (err) {
    console.error("Update contact error:", err);
    throw err;
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Delete contact error:", err);
    throw err;
  }
};

export const createGroup = async (group) => {
  try {
    const res = await fetch("/api/contacts/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(group),
    });
    return await res.json();
  } catch (err) {
    console.error("Create group error:", err);
    throw err;
  }
};

export const updateGroup = async (id, group) => {
  try {
    const res = await fetch(`/api/contacts/groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(group),
    });
    return await res.json();
  } catch (err) {
    console.error("Update group error:", err);
    throw err;
  }
};

export const deleteGroup = async (id) => {
  try {
    const res = await fetch(`/api/contacts/groups/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Delete group error:", err);
    throw err;
  }
};

export const addContactsToGroup = async (groupId, contactIds) => {
  try {
    const res = await fetch(`/api/contacts/groups/${groupId}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ contact_ids: contactIds }),
    });
    return await res.json();
  } catch (err) {
    console.error("Add contacts to group error:", err);
    throw err;
  }
};

export const removeContactsFromGroup = async (groupId, contactIds) => {
  try {
    const res = await fetch(`/api/contacts/groups/${groupId}/contacts`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ contact_ids: contactIds }),
    });
    return await res.json();
  } catch (err) {
    console.error("Remove contacts from group error:", err);
    throw err;
  }
};

export const bulkCreateContacts = async (contacts) => {
  try {
    const res = await fetch(`/api/contacts/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ contacts }),
    });
    return await res.json();
  } catch (err) {
    console.error("Bulk create contacts error:", err);
    throw err;
  }
};
// Sender ID APIs

export const createSenderId = async (data) => {
  try {
    const res = await fetch("/api/sender-ids/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Create sender ID error:", err);
    throw err;
  }
};

export const getMySenderIds = async () => {
  try {
    const res = await fetch("/api/sender-ids/my", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch my sender IDs error:", err);
    return [];
  }
};

export const getSenderIdStats = async () => {
  try {
    const res = await fetch("/api/sender-ids/stats", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch sender ID stats error:", err);
    return {};
  }
};

export const getSenderId = async (id) => {
  try {
    const res = await fetch(`/api/sender-ids/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(`Fetch sender ID ${id} error:`, err);
    return null;
  }
};

export const updateSenderId = async (id, data) => {
  try {
    const res = await fetch(`/api/sender-ids/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(`Update sender ID ${id} error:`, err);
    throw err;
  }
};

export const setDefaultSenderId = async (id) => {
  try {
    const res = await fetch(`/api/sender-ids/${id}/set-default`, {
      method: "POST",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(`Set default sender ID ${id} error:`, err);
    throw err;
  }
};

export const deactivateSenderId = async (id) => {
  try {
    const res = await fetch(`/api/sender-ids/${id}/deactivate`, {
      method: "POST",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(`Deactivate sender ID ${id} error:`, err);
    throw err;
  }
};

export const getSenderIdBillingHistory = async (id) => {
  try {
    const res = await fetch(`/api/sender-ids/${id}/billing-history`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(`Fetch billing history for sender ID ${id} error:`, err);
    return [];
  }
};
