import { IonButton, IonList, IonText, IonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import Field from "../../components/Field/Field";
import { useForm } from "../../hooks/UseForm/FormProvider";
import { Validator as v } from "../../hooks/UseForm/Validator/Validator";
import { iniciarSesion } from "../../App/Auth/Cuenta";
import { alertCircleOutline } from "ionicons/icons";

export default function LoginForm() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [ToastMessage, setToastMessage] = useState<string>("");
  const form = useForm();

  useEffect(() => {
    if (!form) return;
  }, [form]);

  const handleCrearCuenta = () => {
    if (!form) return;
    // Acá se tiene ejecutar la validación del schema
    iniciarSesion({
      mail: form.schema.email,
      contraseña: form.schema.password,
    })
      .then((response: any) => {
        console.log("response login: ", response.data);
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
        <h1>¡Hola, Viajero!</h1>
      </IonText>
      <IonList
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginTop: "0",
          marginLeft: "34pt",
          marginRight: "34pt",
          paddingRight: "12pt",
        }}
      >
        <Field
          name="email"
          label="Correo Electrónico"
          required
          value={form?.schema?.email}
          form={form}
          valid={v()
            .required("El campo es obligatorio")
            .isEmail("Ingrese un correo electrónico válido")}
        ></Field>
        <Field
          password
          name="password"
          label="Contraseña"
          required
          value={form?.schema?.password}
          form={form}
          valid={v().required("El campo es obligatorio")}
        ></Field>
      </IonList>
      <IonButton
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
        onClick={() => handleCrearCuenta()}
      >
        Ingresar
      </IonButton>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ¿No tenés cuenta?
        <IonButton fill="clear" size="small">
          Registrarse
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
      </div>
    </>
  );
}
