import { IonButton, IonInput, IonItem, IonList, IonText } from "@ionic/react";
import { FormProvider, useForm } from "../../hooks/UseForm/FormProvider";
import { useEffect } from "react";
import Field from "../../components/Field/Field";
import { Validator as v } from "../../hooks/UseForm/Validator/Validator";

export default function SignupForm(props: any) {
  const form = useForm();

  useEffect(() => {
    if (!form) return;
    console.log("form: ", form);
  }, [form]);

  return (
    <>
      <IonText
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Crear Cuenta</h1>
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
        <Field
          password
          name="passwordRepeated"
          label="Repetir Contraseña"
          required
          value={form?.schema?.passwordRepeated}
          form={form}
          valid={v().required("Ingrese una contraseña válida")}
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
      >
        CREAR CUENTA
      </IonButton>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Ya posee una cuenta?
        <IonButton fill="clear" size="small">
          Iniciar sesión
        </IonButton>
      </div>
    </>
  );
}
