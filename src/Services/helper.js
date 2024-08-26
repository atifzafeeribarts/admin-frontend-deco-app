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
export {debounce, sliceURL, onSuccessToast, onErrorToast};