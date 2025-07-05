import { IonIcon } from "@ionic/react";
import { checkmarkCircle, close } from "ionicons/icons";
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
        "flex flex-row gap-2 p-2 w-1/2 fixed bottom-0 left-1/2 -translate-x-1/2 z-50 border border-[#bbb] rounded-xl shadow-lg",
        "hover:shadow-md cursor-pointer group transition-all duration-400",
        "bg-white",
        variant == "success" ? "hover:border-green-400 bg-white" : "",
        open
          ? "opacity-100 -translate-y-[12pt]"
          : "opacity-0 -translate-y-[0pt]"
      )}
    >
      <div
        className={cn(
          variant == "success"
            ? "bg-green-400 rounded-2xl flex items-center justify-center px-2 aspect-square"
            : ""
        )}
      >
        {variant == "success" && (
          <IonIcon className="text-white text-3xl" icon={checkmarkCircle} />
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
