import toast, { Toaster } from "react-hot-toast";

const useToast = () => {
  const fire = (icon, message) => {
    toast(message,
      {
        icon: icon,
        style: {
          borderRadius: "8px",
          background: "#2F3136",
          color: "#fff",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)"
        },
      }
    );
  }

  const ToastContainer = () => {
    return <Toaster position="top-center" />
  }  

  return { fire, ToastContainer};
}

export default useToast;