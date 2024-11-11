import { IonButton, IonCheckbox, IonCol, IonGrid, IonRow, IonToggle, useIonRouter } from "@ionic/react";
import MapView from "../../../../components/MapView/MapView";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { useEffect, useState } from "react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { TUbicacion, guardarUbicacion } from "../../../../App/Actividades/Ubicacion";
import { getUbicaciones } from "../../../../App/Ubicaciones/Ubicaciones";

type TUbicacionForm = {
  idOferta: string;
  id_establecimiento: number;
};
export default function UbicacionForm(props: TUbicacionForm) {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const router = useIonRouter();
  const form = useForm();
  const [ubicaciones, setUbicaciones] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>();
  const [sinNumero, setSinNumero] = useState<boolean>(false);
  const [ubiEstablecimiento, setUbiEstablecimiento] = useState<boolean>(false);

  useEffect(() => {
    getUbicaciones()
      .then((response: any) => {
        const ubicaciones = response.data.ubicaciones;
        setUbicaciones(
          ubicaciones.provincias
            .filter((provincia: any) => provincia.id_provincia == 6)
            .map((provincia: any) => {
              return {
                id: provincia.id_provincia,
                text: provincia.provincia,
                departamentos: ubicaciones.departamentos
                  .filter(
                    (departamento: any) =>
                      departamento.id_provincia == provincia.id_provincia
                  )
                  .map((departamento: any) => {
                    return {
                      id: departamento.id_departamento,
                      text: departamento.departamento,
                      localidades: ubicaciones.localidades
                        .filter(
                          (localidad: any) =>
                            localidad.id_departamento ==
                            departamento.id_departamento
                        )
                        .map((localidad: any) => {
                          return {
                            id: localidad.id_localidad,
                            text: localidad.localidad,
                          };
                        }),
                    };
                  }),
              };
            })
        );
        console.log(ubicaciones.departamentos[0]);
        setProvincias(
          ubicaciones.provincias
            .filter((provincia: any) => provincia.id_provincia == 6)
            .map((provincia: any) => {
              return { id: provincia.id_provincia, text: provincia.provincia };
            })
        );
      })
      .catch((error: any) => { });
  }, []);

  const handleOnClick = (e: LeafletMouseEvent) => {
    setMarkerPos(e.latlng);
  };

  const handleRegistrarUbicacion = () => {
    if (!form) return;
    if (!form.schema) return;
    const schema = form?.schema;
    if (ubiEstablecimiento) {
      guardarUbicacion({
        id_oferta: props.idOferta,
        id_establecimiento: props.id_establecimiento,
        misma_ubicacion_establecimiento: ubiEstablecimiento,
        observaciones: schema.observaciones
      })
    }
    else {
      guardarUbicacion({
        id_oferta: props.idOferta,
        calle: schema.calle,
        sin_numero: sinNumero,
        numero: schema.numero,
        id_localidad: parseInt(schema.localidad),
        id_departamento: parseInt(schema.departamento),
        id_provincia: 6,
        latitud: markerPos ? markerPos.lat.toString() : "0.0",
        longitud: markerPos ? markerPos.lng.toString() : "0.0",
        observaciones: schema.observaciones,
      })
        .then((response: any) => {
          console.log(response);
        })
        .then((error: any) => { });
    }
  };

  const handleCheckboxChange = (event: any) => {
    const isChecked = event.detail.checked;
    setSinNumero(isChecked);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonToggle
          name="ubiEstablecimiento"
          checked={ubiEstablecimiento}
          onIonChange={(e) => setUbiEstablecimiento(e.target.checked)}
          style={{ margin: "10pt", paddingLeft: "40%" }}
        >
          Usar ubicación del establecimiento
        </IonToggle>
      </IonRow>
      <IonRow>
        <IonCol
          size="medium"
          style={{ paddingLeft: "20pt", paddingRight: "24pt" }}
        >
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              name="calle"
              label="Calle"
              form={form}
            />
          </IonRow>
          <IonRow style={{ alignItems: "center" }}>
            <IonCol size="auto">
              <Field
                name="numero"
                label="Número"
                form={form}
                disabled={ubiEstablecimiento}
              />
            </IonCol>
            <IonCol size="auto" style={{ paddingLeft: "10pt" }}>
              <IonCheckbox
                name="sin_numero"
                labelPlacement="end"
                onIonChange={handleCheckboxChange}
                disabled={ubiEstablecimiento}
              >
                Sin número
              </IonCheckbox>
            </IonCol>
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={provincias ?? []}
              name="provincia"
              label="Provincia"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={
                ubicaciones && form?.schema.provincia != ""
                  ? ubicaciones
                    .filter(
                      (provincia: any) =>
                        provincia.id == form?.schema.provincia
                    )[0]
                    .departamentos.map((departamento: any) => {
                      return {
                        id: departamento.id,
                        text: departamento.text,
                      };
                    })
                  : []
              }
              name="departamento"
              label="Departamento"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={
                ubicaciones &&
                  form?.schema.departamento &&
                  form?.schema.provincia != ""
                  ? ubicaciones
                    .filter(
                      (provincia: any) =>
                        provincia.id == form?.schema.provincia
                    )[0]
                    .departamentos.filter(
                      (departamento: any) =>
                        departamento.id == form?.schema.departamento
                    )[0]
                    .localidades.map((localidad: any) => {
                      return { id: localidad.id, text: localidad.text };
                    })
                  : []
              }
              name="localidad"
              label="Localidad"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
              marginBottom: "10pt", marginTop: "10pt"
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
      <IonRow
        style={{
          justifyContent: "space-around",
          marginTop: "10pt",
          marginBottom: "10pt",
        }}
      >
        <IonButton
          color="light"
          onClick={() => router && router.push("/my-offers")}
        >
          Volver
        </IonButton>
        <IonButton
          style={{
            "--background": "#F08408",
          }}
          onClick={() => handleRegistrarUbicacion()}
        >
          Guardar
        </IonButton>

      </IonRow>
    </IonGrid>
  );
}
