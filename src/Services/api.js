import axios from "axios";
import { toast } from 'react-toastify';
// const baseUrl = "http://192.168.1.118:3001/";
// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "http://192.168.1.118:3001/";
// axios.defaults.baseURL = "https://framemytv.ikshudigital.com";
// Ensure credentials (cookies) are included in requests
axios.defaults.withCredentials = true;
const headers = {
  "Content-Type": "application/json",
};
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Show toast notification for session expiration
//       toast.error("Session expired :( Redirecting to login page...");
//       // Redirect to login page after a short delay to allow the toast to show
//       setTimeout(() => {
//         window.location.href = '/login'; // Or use useHistory hook in React Router
//       }, 2000);
//     }
//     return Promise.reject(error);
//   }
// );


// store = frame-my-tv // deco-tv-frame
async function fetchAllReturns(status, store) {
  try {
    const response = await axios.get(
      `/admin/returns`,
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching returns:", error);
    throw error;
  }
}
async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      { email, password },
      {
        headers: headers,
      }
    );
    return response.data.message;
  } catch (error) {
    console.error("failed to login:", error.response?.data?.message);
    throw error.response?.response?.data?.message;
  } 
}

async function orderDeatilsApi(store, orderId) {
  try {
    const response = await axios.get(
      `/admin/return-details/${orderId}`,
      { orderId: orderId },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching returns:", error);
    throw error;
  }
}

async function logoutApi() {
  try {
    const response = await axios.post(`/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("failed to logout:", error);
    throw error;
  }
}

async function approveRequestApi(store, returnId) {
  try {
    const response = await axios.post(
      `/admin/approve-return`,
      { returnId: returnId },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching returns:", error);
    throw error;
  }
}
async function declineRequestApi(store, returnId, reason) {
  try {
    const response = await axios.post(
      `/admin/decline-request`,
      { "returnId": returnId, "declineReason": reason },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching returns:", error);
    throw error;
  }
}
async function refundRequestApi(store, order_id, note, line_Item_Id, amount) {
  try {
    const response = await axios.post(
      `/admin/refund`,
      { "orderId": order_id, "note": note, "lineItemId": line_Item_Id,"amount": amount},
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching returns:", error.message);
    throw error;
  }
}

export {
  fetchAllReturns,
  login,
  orderDeatilsApi,
  logoutApi,
  approveRequestApi,
  declineRequestApi,
  refundRequestApi,
};
