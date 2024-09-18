import { toast, Bounce } from "react-toastify";
function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
}
function sliceURL(url) {
  // Split the URL by the slash '/'
  const parts = url.split("/");

  // Extract the relevant parts
  const [returnRequest, storeName, orderId] = parts.slice(1);

  // Format the extracted parts into an object
  return {
    returnRequest,
    storeName,
    orderId,
  };
}
function onSuccessToast(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
function onErrorToast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
function filterOrderFetchData(orderdata) {
  let lineItemsfilter = [];
  orderdata[0]?.fulfillments?.map((fulfillment) => {
      fulfillment?.fulfillmentLineItems?.nodes?.map((fulfillmentLineItem) => {
          lineItemsfilter.push(fulfillmentLineItem);
      })
  })
  let filterOrderData = {
      "id": orderdata[0].id,
      "billingAddress": orderdata[0].billingAddress,
      "shippingAddress": orderdata[0].shippingAddress,
      "customer": orderdata[0].customer,
      "lineitems": lineItemsfilter,
      "returnedItems": orderdata[0].returnedItems,
      "returnedFulfillmentItemId": orderdata[0].returnedFulfillmentItemId
  };
  return filterOrderData;
}
export {debounce, sliceURL, onSuccessToast, onErrorToast, filterOrderFetchData};