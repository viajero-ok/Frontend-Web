import { IonIcon, IonModal, IonToast } from "@ionic/react";
import {
  alertCircle,
  checkmark,
  checkmarkCircle,
  checkmarkCircleOutline,
  close,
  closeSharp,
  informationCircle,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { cn } from "../Form/Field";

type ToastContextValue = {
  isInit: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVariant: React.Dispatch<React.SetStateAction<TToastVariants>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<
    React.SetStateAction<string | React.ReactElement>
  >;
  setActions: React.Dispatch<
    React.SetStateAction<React.ReactElement | undefined>
  >;
  setCanDismiss: React.Dispatch<React.SetStateAction<boolean>>;
};
const ToastContext = React.createContext<ToastContextValue>(
  {} as ToastContextValue
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<
    string | React.ReactElement
  >("");
  const [canDismiss, setCanDismiss] = React.useState<boolean>(true);
  const [variant, setVariant] = React.useState<TToastVariants>("default");
  const [actions, setActions] = React.useState<React.ReactElement | undefined>(
    undefined
  );

  const contextValue = {
    isInit: true,
    open,
    setOpen,
    setVariant,
    setTitle,
    setDescription,
    setActions,
    setCanDismiss,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
        actions={actions}
        variant={variant}
        canDismiss={canDismiss}
      />
      {children}
    </ToastContext.Provider>
  );
};

type TToastVariants = "default" | "danger" | "success";
type TToastParams = {
  variant?: TToastVariants;
  title?: string;
  description?: string | React.ReactElement;
  canDismiss?: boolean;
  actions?: React.ReactElement;
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
    if (params.description) toastContext.setDescription(params.description);
    toastContext.setActions(params.actions);
    if (params.variant) toastContext.setVariant(params.variant);
    if (params.canDismiss != undefined)
      toastContext.setCanDismiss(params.canDismiss);
    else toastContext.setCanDismiss(true);
    toastContext.setOpen(true);
  };

  return {
    toast,
    setOpen: toastContext.setOpen,
  };
};

type TToastProps = {
  title?: string;
  description?: string | React.ReactElement;
  actions?: React.ReactElement;
  variant?: TToastVariants;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canDismiss: boolean;
  dismissIn?: number;
};
export const Toast = ({
  open,
  setOpen,
  title,
  description,
  actions,
  variant,
  canDismiss,
  dismissIn,
}: TToastProps) => {
  const [time, setTime] = React.useState<number | null>(null);

  useEffect(() => {
    setTime(dismissIn ?? 4);
    setTimeout(() => setOpen(false), dismissIn ? dismissIn * 1000-400 : 4000-400);
  }, []);

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        "flex flex-col p-4 pb-2 fixed bottom-4 right-8 z-50 border border-[#bbb] rounded-md text-gray-600 shadow-md",
        "hover:shadow-md cursor-pointer group transition-opacity duration-400",
        open ? "opacity-100" : "opacity-0",
        variant == "success" ? "bg-white hover:border-green-400" : ""
      )}
    >
      <div className="text-transparent text-xs group-hover:text-gray-400 absolute top-0.5 right-2">
        x
      </div>
      <div className="flex flex-row items-center gap-2">
        <IonIcon
          className="text-green-400 text-xl"
          icon={checkmarkCircleOutline}
        />
        <span>{title}</span>
      </div>
      <div
        className={cn("flex flex-row h-1.5 bg-green-200 mt-0.5 transition-all")}
        style={{
          width: !time ? "100%" : "0%",
          transitionDuration: `${time}s`,
        }}
      />
    </div>
  );
};
