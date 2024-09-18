import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "http://192.168.1.118:3001/";
// const baseURL = "https://api.returnranger.ikshudigital.com/";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
const headers = {
  "Content-Type": "application/json",
};
const toastId = "session-expired";
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page after a short delay to allow the toast to show
      if (window.location.pathname !== '/login') {
        if (!toast.isActive(toastId)) {
          // Show toast notification for session expiration
          toast.error("Session expired :( Redirecting to login page...", {
            toastId: toastId,
          });
        }
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
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
async function checkAuthAPI() {
  try {
    const response = await axios.post(
      `/auth/check-auth`,
      {
        withCredentials: true // Include cookies in the request
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Check Auth Error:", error.message);
    throw error;
  }
}
// Info: Returns Table API
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
//Info: Return Details API
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
async function declineRequestApi(store, returnId, client_decline_reason_note, decline_reason_option, admin_decline_reason) {
  console.log("object");
  try {
    const response = await axios.post(
      `/admin/decline-request`,
      { returnId: returnId, declineReason: decline_reason_option, adminNote:  admin_decline_reason, customerNote: client_decline_reason_note},
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
async function returnRestockingProduct(store, reverseFulfillmentItemId, returnID) {
  try {
    const response = await axios.post(
      `/admin/return/restock`,
      {
        reverseFulfillmentOrderLineItemId: reverseFulfillmentItemId,
        locationId: 76622725370, // -- for devStore framemytvapp
        // locationId: 90704478516, // -- for Sandbox decoTV
        // locationId: 31827722285, // -- Live DecoTV
        returnId: returnID
      },
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error Restocking Product:", error.message);
    throw error;
  }
}
// Info: Create Return API
const orderDetails = async (ordernumber, email, storename) => {
  const jsonbody = {
    name: ordernumber,
    email: email,
    storename: storename,
  };
  const endPoint = `/customer/order`;
  const response = await axios.post(endPoint, jsonbody);
  return response.data;
};
const submitReturnRequest = async (dataJson, storename) => {
  const endPoint = `/admin/return/create`;
  const formData = { 'orderId': dataJson.orderId, 'typeofReturn': dataJson.typeofReturn, 'returnLineItems': dataJson.returnLineItems };
  const response = await axios.post(endPoint, formData);

  return response.data;
};
// Info: Notifications API
const notificationDetails = async (id) => {
  const response = await axios.get(`/admin/notifications/${id}`);
  return response.data; 
}
const notificationUpdate = async (reqBody) => {
  const response = await axios.put(`/admin/notifications/`,reqBody);
  return response.data;
}
export {
  login,
  logoutApi,
  checkAuthAPI,
  countReturns,
  fetchAllReturns,
  returnDetailsAPI,
  approveRequestApi,
  declineRequestApi,
  closeReturnApi,
  refundRequestApi,
  returnOrderTagsUpdate,
  returnAdditionalInformationUpdate,
  returnRestockingProduct,
  orderDetails,
  submitReturnRequest,
  notificationDetails,
  notificationUpdate,
  baseURL
};
