import axios from "axios";
// const baseUrl = "http://192.168.1.118:3001/";
// axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "http://192.168.1.118:3001/";
axios.defaults.baseURL = "https://framemytv.ikshudigital.com";
// Ensure credentials (cookies) are included in requests
axios.defaults.withCredentials = true;
const headers = {
  "Content-Type": "application/json",
};
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Show toast notification for session expiration
      toast.error("Session expired :( Redirecting to login page...");
      // Redirect to login page after a short delay to allow the toast to show
      setTimeout(() => {
        window.location.href = '/login'; // Or use useHistory hook in React Router
      }, 2000);
    }
    return Promise.reject(error);
  }
);

// store = frame-my-tv // deco-tv-frame
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
async function logoutApi() {
  try {
    const response = await axios.post(`/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("failed to logout:", error);
    throw error;
  }
}
async function fetchAllReturns(status, store) {
  try {
    const response = await axios.get(
      `/admin/returns/?status=${status.toLowerCase()}`,
      { status: status },
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
async function returnDetailsAPI(store, orderId) {
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
    console.error("Error fetching return Details:", error);
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
    console.error("Error Approve returns:", error);
    throw error;
  }
}
async function declineRequestApi(store, returnId, decline_reason_note, decline_reason_option, admin_decline_reason) {
  try {
    const response = await axios.post(
      `/admin/decline-request`,
      { returnId: returnId, declineReason: admin_decline_reason },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Decline returns:", error);
    throw error;
  }
}
async function closeReturnApi(store, returnId) {
  try {
    const response = await axios.post(
      `/admin/return-close`,
      { returnId: returnId },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Closing returns:", error);
    throw error;
  }
}
async function refundRequestApi(
  store,
  return_id,
  note,
  return_line_Item_Id,
  amount
) {
  try {
    const response = await axios.post(
      `/admin/refund`,
      {
        returnId: return_id,
        returnedLineItemId: return_line_Item_Id,
        amount: amount,
      },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Refund Request:", error.message);
    throw error;
  }
}
async function returnOrderTagsUpdate(store, return_id, tags) {
  try {
    const response = await axios.put(
      `/admin/return/${return_id}`,
      {
        tags: tags
      },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Updating Tags:", error.message);
    throw error;
  }
}
async function returnAdditionalInformationUpdate(store, return_id, additionalInformation) {
  try {
    const response = await axios.put(
      `/admin/return/${return_id}`,
      {
        additionalInformation: additionalInformation
      },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Updating Additional Information:", error.message);
    throw error;
  }
}
async function countReturns(store) {
  try {
    const response = await axios.get(
      `/admin/count-returns`,
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Fetching Count Data:", error.message);
    throw error;
  }
}
export {
  fetchAllReturns,
  login,
  returnDetailsAPI,
  logoutApi,
  approveRequestApi,
  declineRequestApi,
  closeReturnApi,
  refundRequestApi,
  returnOrderTagsUpdate,
  returnAdditionalInformationUpdate,
  countReturns,
};
