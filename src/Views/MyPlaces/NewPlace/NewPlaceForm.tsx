import { IonButton, IonCardSubtitle, IonList, IonTitle } from "@ionic/react";
import { useState } from "react";
import { registrarEstablecimiento } from "../../../App/Alojamientos/Alojamientos";
import Field from "../../../components/Field/Field";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import NewPlaceMap from "./NewPlaceMap";
import { LatLng, LeafletMouseEvent, marker } from "leaflet";
import MapView from "../../../components/MapView/MapView";

export default function NewPlaceForm() {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const form = useForm();

  const handleOnClick = (e: LeafletMouseEvent) => setMarkerPos(e.latlng);

  const handleRegistrar = () => {
    if (!form) return;
    if (!form.schema) return;
    const schema = form?.schema;
    registrarEstablecimiento({
      nombre: schema.nombre,
      numero_habilitacion: schema.numeroDeHabilitacion,
      descripcion: schema.descripcion,
      telefono: schema.telefono,
      mail: schema.mail,
      calle: schema.calle,
      sin_numero: false,
      numero: schema.numero,
      id_localidad: schema.localidad,
      id_departamento: schema.departamento,
      latitud: "0.0",
      longitud: "0.0",
    })
      .then((response: any) => {
        console.log(response);
      })
      .then((error: any) => {});
  };

  return (
    <>
      <IonList>
        <Field
          name="nombreDelEstablecimiento"
          label="Nombre del establecimiento"
          form={form}
        />
        <Field
          name="numeroDeHabilitacionMunicipal"
          label="Número de habilitación municipal"
          form={form}
        />
        <Field name="descripcion" label="Descripción" form={form} />
        <Field name="telefono" label="telefono" form={form} />
        <Field name="mail" label="E-mail" form={form} />
        <Field name="calle" label="calle" form={form} />
        <Field name="numero" label="Número" form={form} />
        <Field
          select
          options={[{ id: 1, text: "Córdoba" }]}
          name="provincia"
          label="Provincia"
          form={form}
        />
        <Field name="departamento" label="Departamento" form={form} />
        <Field name="localidad" label="Localidad" form={form} />
      </IonList>
      <IonTitle>Ubicación</IonTitle>
      <IonCardSubtitle>
        Ubicá en el mapa tu establecimiento turístico
      </IonCardSubtitle>

      <h1>marker: {markerPos?.toString()}</h1>
      <MapView
        search
        markerOnClick
        onClick={handleOnClick}
        style={{
          height: "400pt",
          width: "600pt",
        }}
      />

      <IonButton color="medium">Volver</IonButton>
      <IonButton color="success" onClick={() => handleRegistrar()}>
        Registrar
      </IonButton>
    </>
  );
}
