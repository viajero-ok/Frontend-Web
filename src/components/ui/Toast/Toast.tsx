import { IonIcon } from "@ionic/react";
import {
  alertCircle,
  checkmarkCircle,
  close,
  informationCircleOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { cn } from "../Form/Field";

type ToastContextValue = {
  isInit: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVariant: React.Dispatch<React.SetStateAction<TToastVariants>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};
const ToastContext = React.createContext<ToastContextValue>(
  {} as ToastContextValue
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [variant, setVariant] = React.useState<TToastVariants>("default");

  const contextValue = {
    isInit: true,
    open,
    setOpen,
    setVariant,
    setTitle,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast open={open} setOpen={setOpen} title={title} variant={variant} />
      {children}
    </ToastContext.Provider>
  );
};

type TToastVariants = "default" | "danger" | "success";
type TToastParams = {
  variant?: TToastVariants;
  title?: string;
};
export const useToast = () => {
  const toastContext = React.useContext(ToastContext);

  if (!toastContext.isInit) {
    throw new Error(
      "useToast must be use within <ToastProvider></ToastProvider>"
    );
  }

  //const { id } = itemContext;

  const toast = (params: TToastParams) => {
    if (params.title) toastContext.setTitle(params.title);
    if (params.variant) toastContext.setVariant(params.variant);
    toastContext.setOpen(true);
  };

  return {
    toast,
    setOpen: toastContext.setOpen,
  };
};

type TToastProps = {
  title?: string;
  variant?: TToastVariants;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dismissIn?: number;
};
export const Toast = ({
  open,
  setOpen,
  title,
  variant,
  dismissIn,
}: TToastProps) => {
  useEffect(() => {
    if (!open) return;

    setTimeout(
      () => setOpen(false),
      dismissIn ? dismissIn * 1000 - 400 : 4000 - 400
    );
  }, [open]);

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        "flex flex-row gap-2 p-2 w-1/2 fixed bottom-0 left-1/2 -translate-x-1/2 border border-[#bbb] rounded-xl shadow-lg",
        "hover:shadow-md cursor-pointer group transition-all duration-400",
        "bg-white",
        variant == "success" ? "hover:border-green-400 bg-white" : "",
        variant == "danger" ? "hover:border-red-400 bg-white" : "",
        variant == "default" ? "hover:border-black bg-white" : "",
        open
          ? "opacity-100 -translate-y-[12pt] z-50"
          : "opacity-0 -translate-y-[0pt] -z-50"
      )}
    >
      <div
        className={cn(
          variant == "success"
            ? "bg-green-400 rounded-2xl flex items-center justify-center px-2 aspect-square"
            : "",
          variant == "danger"
            ? "bg-red-400 rounded-2xl flex items-center justify-center px-2 aspect-square"
            : "",
          variant == "default"
            ? "bg-[var(--color-viajero)] rounded-2xl flex items-center justify-center px-2 aspect-square"
            : ""
        )}
      >
        {variant == "success" && (
          <IonIcon className="text-white text-3xl" icon={checkmarkCircle} />
        )}
        {variant == "danger" && (
          <IonIcon className="text-white text-3xl" icon={alertCircle} />
        )}
        {variant == "default" && (
          <IonIcon
            className="text-white text-3xl"
            icon={informationCircleOutline}
          />
        )}
      </div>
      <div className="flex flex-row gap-2 w-full p-2">
        <div className="w-full text-lg text-gray-600">{title}</div>
        <div className="w-fit aspect-square flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100">
          <IonIcon className="text-2xl text-gray-600" icon={close} />
        </div>
      </div>
    </div>
  );
};
