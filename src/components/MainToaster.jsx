import { Toaster } from "react-hot-toast";

const MainToaster = () => {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerClassName="toast rounded-xl"
      containerStyle={{}}
      toastOptions={{
        className: "bg-base-300 text-base-content",
        duration: 5000,
        success: {
          duration: 3000,
          className: "bg-success text-success-content",
          iconTheme: {
            primary: "hsl(var(--suc))",
            secondary: "#fff",
          },
        },
        error: {
          duration: 3000,
          className: "bg-error text-error-content",
        },
      }}
    />
  );
};

export default MainToaster;
