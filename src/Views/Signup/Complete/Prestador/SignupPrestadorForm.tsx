import { IonButton, IonItem, IonList } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { Validator as v } from "../../../../hooks/UseForm/Validator/Validator";
import { useState } from "react";
import { getDatosDeRegistro } from "../../../../App/Auth/Registro";

export default function SignupPrestadorForm(props: any) {
  const [idiomas, setIdiomas] = useState<any[]>();
  const [generos, setGeneros] = useState<any[]>();
  const [tiposDocumento, setTiposDocumento] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>();
  const [localidades, setLocalidades] = useState<any[]>();
  const form = useForm();

  getDatosDeRegistro().then((response: any) => {
    console.log("Response: ", response.data);
  });

  return (
    <IonList
      style={{
        width: "50%",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        marginTop: "13pt",
      }}
    >
      <Field
        name="nombre"
        label="Nombre"
        required
        value={form?.schema?.nombre}
        form={form}
        valid={v().required("El campo es requerido")}
      />
      <Field
        name="apellido"
        label="Apellido"
        required
        value={form?.schema?.apellido}
        form={form}
      />
      <Field
        select
        options={["DNI", "Pasaporte"]}
        name="tipoDeDocumento"
        label="Tipo de documento"
        required
        value={form?.schema?.tipoDeDocumento}
        form={form}
      />
      <Field
        name="numeroDeDocumento"
        label="Número de documento"
        required
        value={form?.schema?.numeroDeDocumento}
        form={form}
      />
      <Field
        name="CUIT"
        label="CUIT"
        required
        value={form?.schema?.CUIT}
        form={form}
      />
      <Field
        select
        name="provincia"
        label="Provincia"
        required
        value={form?.schema?.provincia}
        form={form}
      />
      <Field
        select
        name="departamento"
        label="Departamento"
        required
        value={form?.schema?.departamento}
        form={form}
      />
      <Field
        select
        name="localidad"
        label="Localidad"
        required
        value={form?.schema?.localidad}
        form={form}
      />
      <Field
        name="telefono"
        label="Teléfono"
        required
        value={form?.schema?.telefono}
        form={form}
      />
        <IonButton style={{ marginTop: "13pt"}}>Registrarme</IonButton>
    </IonList>
  );
}
