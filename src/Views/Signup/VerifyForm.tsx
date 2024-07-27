import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonText,
  IonToast,
} from "@ionic/react";
import { useMaskito } from "@maskito/react";
import { useState } from "react";
import { verificarCuenta } from "../../App/Auth/Cuenta";
import { alertCircleOutline } from "ionicons/icons";

export default function VerifyForm(props: any) {
  const [code, setCode] = useState<string>("");
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [ToastMessage, setToastMessage] = useState<string>("");

  const codeMask = useMaskito({
    options: {
      mask: [...Array(8).fill(/\d/)],
    },
  });

  const handleVerificar = () => {
    if (code.length != 8) return;
    verificarCuenta({ id_usuario: props.id, codigo_verificacion: code })
      .then((response: any) => {
        window.location.replace("/");
      })
      .catch((error: any) => {
        setToastMessage(error.response.data.message);
        setOpenToast(true);
      });
  };

  return (
    <>
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
          Enviamos un mail a johndoe@fake.com <br />
          con el código de validación
        </IonText>
      </div>
      <IonList
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginTop: "13pt",
          marginLeft: "34pt",
          marginRight: "34pt",
          paddingRight: "12pt",
        }}
      >
        <IonItem>
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
              textAlign: "left",
              left: "60%",
              transform: "translateX(-50%)",
            }}
          ></IonInput>
        </IonItem>
      </IonList>
      <IonButton
        disabled={code.length != 8}
        expand="block"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginLeft: "89pt",
          marginRight: "89pt",
          paddingLeft: "12pt",
          paddingRight: "12pt",
        }}
        onClick={() => handleVerificar()}
      >
        VALIDAR
      </IonButton>
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
    </>
  );
}
