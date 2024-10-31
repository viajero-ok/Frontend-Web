import { IonCheckbox, IonCol, IonGrid, IonRow } from "@ionic/react";
import MapView from "../../../../components/MapView/MapView";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { useEffect, useState } from "react";
import { LatLng, LeafletMouseEvent } from "leaflet";

type TUbicacionForm = {
  idOferta: string;
};
export default function UbicacionForm(props: TUbicacionForm) {
  const [markerPos, setMarkerPos] = useState<LatLng>();

  const form = useForm();

  const handleOnClick = (e: LeafletMouseEvent) => {
    setMarkerPos(e.latlng);
  };

  useEffect(() => {
    console.log("ubiID",props.idOferta);
  }, []);

  return (
    <IonGrid>
      <IonRow>
        <IonCol
          size="medium"
          style={{ paddingLeft: "24pt", paddingRight: "24pt" }}
        >
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Field form={form} name="calle" label="Calle" />
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Field form={form} name="numero" label="número" />
            <div style={{ marginLeft: "12pt" }} />
            <IonCheckbox labelPlacement="end">Sin número</IonCheckbox>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Field
              select
              options={[]}
              form={form}
              name="id_localidad"
              label="Localidad"
            />
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Field
              select
              options={[]}
              form={form}
              name="id_departamento"
              label="Departamento"
            />
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Field
              textarea
              form={form}
              name="observaciones"
              label="Observaciones"
            />
          </IonRow>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapView
            search
            markerOnClick
            onClick={handleOnClick}
            style={{
              display: "flex",
              width: "80%",
              aspectRatio: "2/1",
              marginLeft: "24pt",
              marginRight: "24pt",
            }}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
