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
  IonTitle,
} from "@ionic/react";
import { FormProvider, useForm } from "../../hooks/UseForm/FormProvider";
import { SetStateAction, useEffect, useState } from "react";
import Field from "../../components/Field/Field";
import { Validator as v } from "../../hooks/UseForm/Validator/Validator";
import { registrarCuenta } from "../../App/Auth/Cuenta";

type TProps = {
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
};
export default function SignupForm(props: TProps) {
  const form = useForm();

  useEffect(() => {
    if (!form) return;
  }, [form]);

  const handleCrearCuenta = () => {
    if (!form) return;
    // [!] Acá se debe llamar a la validación de los campos
    registrarCuenta({
      mail: form.schema.email,
      contraseña: form.schema.password,
    })
      .then((response: any) => {
        props.setIdUsuario(response.data.id_usuario);
      })
      .catch((error) => {});
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
          <IonTitle
            style={{
              fontSize: "24pt",
              fontWeight: "bolder",
              color: "#F08408",
              marginTop: "13pt",
              marginBottom: "13pt",
            }}
          >
            ¡Hola, viajero!
            <br /> Creá tu cuenta
          </IonTitle>
        </div>
      </IonCardHeader>
      <IonCardContent>
        {/* <IonText
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Crear Cuenta</h1>
      </IonText> */}
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
        <IonRow
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonButton
            size="default"
            style={{
              margin: "13pt",
              marginLeft: "89pt",
              marginRight: "89pt",
            }}
            onClick={() => handleCrearCuenta()}
          >
            CREAR CUENTA
          </IonButton>
        </IonRow>
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
      </IonCardContent>
    </IonCard>
  );
}
