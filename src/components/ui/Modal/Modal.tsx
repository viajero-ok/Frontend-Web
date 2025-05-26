import { IonIcon, IonModal } from "@ionic/react";
import {
  alertCircle,
  checkmarkCircle,
  close,
  informationCircle,
} from "ionicons/icons";
import React from "react";
import { cn } from "../Form/Field";

type ModalContextValue = {
  isInit: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVariant: React.Dispatch<React.SetStateAction<TModalVariants>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<
    React.SetStateAction<string | React.ReactElement>
  >;
  setActions: React.Dispatch<React.SetStateAction<React.ReactElement>>;
  setCanDismiss: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalContext = React.createContext<ModalContextValue>(
  {} as ModalContextValue
);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<
    string | React.ReactElement
  >("");
  const [canDismiss, setCanDismiss] = React.useState<boolean>(true);
  const [variant, setVariant] = React.useState<TModalVariants>("default");
  const [actions, setActions] = React.useState<React.ReactElement>(<></>);

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
    <ModalContext.Provider value={contextValue}>
      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
        actions={actions}
        variant={variant}
        canDismiss={canDismiss}
      />
      {children}
    </ModalContext.Provider>
  );
};

type TModalVariants = "default" | "danger" | "success";
type TModalParams = {
  variant?: TModalVariants;
  title?: string;
  description?: string | React.ReactElement;
  canDismiss?: boolean;
  actions?: React.ReactElement;
};
export const useModal = () => {
  const modalContext = React.useContext(ModalContext);

  if (!modalContext.isInit) {
    throw new Error(
      "useModal must be use within <ModalProvider></ModalProvider>"
    );
  }

  //const { id } = itemContext;

  const modal = (params: TModalParams) => {
    if (params.title) modalContext.setTitle(params.title);
    if (params.description) modalContext.setDescription(params.description);
    if (params.actions) modalContext.setActions(params.actions);
    if (params.variant) modalContext.setVariant(params.variant);
    if (params.canDismiss != undefined)
      modalContext.setCanDismiss(params.canDismiss);
    else modalContext.setCanDismiss(true);
    modalContext.setOpen(true);
  };

  return {
    modal,
    setOpen: modalContext.setOpen,
  };
};

type TModalProps = {
  title?: string;
  description?: string | React.ReactElement;
  actions?: React.ReactElement;
  variant?: TModalVariants;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canDismiss: boolean;
};
export const Modal = ({
  open,
  setOpen,
  title,
  description,
  actions,
  variant,
  canDismiss,
}: TModalProps) => {
  return (
    <IonModal
      isOpen={open}
      backdropDismiss={canDismiss}
      onDidDismiss={() => setOpen(false)}
      style={{
        "--height": "fit-content",
        "--width": "fit-content",
      }}
      className=""
    >
      <div className="relative">
        <div>
          <div className="p-4">
            <div className="text-lg font-bold text-gray-600 mr-12 flex flex-row items-center gap-2">
              {(!variant || variant == "default") && (
                <IonIcon
                  icon={informationCircle}
                  className="text-gray-600 text-2xl mt-1"
                />
              )}
              {variant == "danger" && (
                <IonIcon
                  icon={alertCircle}
                  className="text-red-400 text-2xl mt-1"
                />
              )}
              {variant == "success" && (
                <IonIcon
                  icon={checkmarkCircle}
                  className="text-green-400 text-2xl mt-1"
                />
              )}
              {title}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              <IonIcon
                icon={close}
                className={cn(
                  variant == "danger" ? "text-red-300" : "",
                  variant == "success" ? "text-green-300" : "",
                  !variant || variant == "default"
                    ? "text-[var(--color-viajero)]"
                    : "",
                  canDismiss ? "visible" : "hidden"
                )}
              />
            </button>
            <div className="font-light text-md text-gray-600">
              {description}
            </div>
          </div>
          <div
            className={cn(
              "border-t border-gray-100 p-4 flex flex-row justify-end gap-2",
              variant == "danger" ? "bg-red-500/10" : "",
              variant == "success" ? "bg-green-500/10" : "",
              !variant || variant == "default"
                ? "bg-[var(--color-viajero)]/3"
                : ""
            )}
          >
            {actions}
          </div>
        </div>
      </div>
    </IonModal>
  );
};
