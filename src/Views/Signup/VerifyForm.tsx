import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { useMaskito } from "@maskito/react";
import { useState } from "react";
import { verificarCuenta } from "../../App/Auth/Cuenta";
import { alertCircleOutline } from "ionicons/icons";

export default function VerifyForm(props: any) {
  const [code, setCode] = useState<string>("");
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [ToastMessage, setToastMessage] = useState<string>("");

  const router = useIonRouter();

  const codeMask = useMaskito({
    options: {
      mask: [...Array(8).fill(/\d/)],
    },
  });

  const handleVerificar = () => {
    if (code.length != 8) return;
    verificarCuenta({ id_usuario: props.id, codigo_verificacion: code })
      .then((response: any) => {
        router.push("/login");
      })
      .catch((error: any) => {
        setToastMessage(error.response.data.message);
        setOpenToast(true);
      });
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-start ">
        <div className="flex flex-row gap-2 mb-4">
          <IonImg src="/icon.png" style={{ width: "16pt" }} />
          <div className="text-[var(--color-viajero)] font-bold text-md">
            VIAJERO
          </div>
        </div>
        <div className="text-gray-600 text-3xl font-bold mb-4">
          El viaje empieza acá
        </div>
      </div>
      <div className="flex flex-col w-full content-center items-center justify-center">
        <span className="text-gray-600 text-xl font-bold w-fit">
          Validá tu correo electrónico
        </span>
        <span className="text-gray-400 text-sm w-fit">
          Te enviamos un código de validación a tu correo electrónico
        </span>
      </div>
      <IonInput
        ref={async (cardRef) => {
          if (cardRef) {
            const input = await cardRef.getInputElement();
            codeMask(input);
          }
        }}
        onInput={(e: any) => setCode(e.target.value)}
        maxlength={8}
        placeholder="00000000"
        style={{
          letterSpacing: "21pt",
          fontSize: "21pt",
          textAlign: "center",
          marginLeft: "11pt",
          width: "auto",
        }}
      ></IonInput>
      <IonRow
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <button
          disabled={code.length != 8}
          className="viajero-button w-full py-3 mt-4"
          onClick={() => handleVerificar()}
        >
          VALIDAR
        </button>
      </IonRow>
      <IonToast
        isOpen={openToast}
        message={ToastMessage}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
          setToastMessage("");
        }}
      ></IonToast>
    </div>
  );
}
