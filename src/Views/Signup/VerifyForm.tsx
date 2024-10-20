import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonText,
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
    <IonCard
      style={{
        position: "fixed",
        width: "50%",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      <IonCardHeader style={{ padding: "31pt", paddingTop: "40pt" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <IonImg src="icon.png" style={{ width: "100pt" }} />
          <IonText
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h1>Validar Cuenta</h1>
          </IonText>
          <div style={{ marginTop: "13pt" }}>
            <IonText color="medium">
              Enviamos un mail a viajeroapp2024@gmail.com <br />
              con el código de validación
            </IonText>
          </div>
        </div>
      </IonCardHeader>
      <IonCardContent>
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
          <IonButton
            disabled={code.length != 8}
            style={{
              margin: "13pt",
              "--background": "#F08408",
              "--color": "white",
            }}
            onClick={() => handleVerificar()}
          >
            VALIDAR
          </IonButton>
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
      </IonCardContent>
    </IonCard>
  );
}
