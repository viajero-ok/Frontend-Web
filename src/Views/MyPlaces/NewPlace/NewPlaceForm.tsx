import {
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonList,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { registrarEstablecimiento } from "../../../App/Establecimientos/Establecimientos";
import Field from "../../../components/Field/Field";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import NewPlaceMap from "./NewPlaceMap";
import { LatLng, LeafletMouseEvent, marker } from "leaflet";
import MapView from "../../../components/MapView/MapView";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";

export default function NewPlaceForm() {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const [provincias, setProvincias] = useState<any[]>();
  const [ubicaciones, setUbicaciones] = useState<any[]>();

  const form = useForm();

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
        setProvincias(
          ubicaciones.provincias
            .filter((provincia: any) => provincia.id_provincia == 6)
            .map((provincia: any) => {
              return { id: provincia.id_provincia, text: provincia.provincia };
            })
        );
      })
      .catch((error: any) => {});
  }, []);

  const handleOnClick = (e: LeafletMouseEvent) => {
    setMarkerPos(e.latlng);
  };

  const handleRegistrar = () => {
    if (!form) return;
    if (!form.schema) return;
    const schema = form?.schema;
    registrarEstablecimiento({
      nombre: schema.nombreDelEstablecimiento,
      numero_habilitacion: schema.numeroDeHabilitacionMunicipal,
      descripcion: schema.descripcion,
      telefono: schema.telefono,
      mail: schema.mail,
      calle: schema.calle,
      sin_numero: false,
      numero: schema.numero,
      id_localidad: parseInt(schema.localidad),
      id_departamento: parseInt(schema.departamento),
      id_provincia: 6,
      latitud: markerPos ? markerPos.lat.toString() : "0.0",
      longitud: markerPos ? markerPos.lng.toString() : "0.0",
    })
      .then((response: any) => {
        console.log(response);
      })
      .then((error: any) => {});
  };

  return (
    form && (
      <IonGrid>
        <IonRow
          class="ion-justify-content-center"
          style={{ padding: "21pt", paddingBottom: "3pt" }}
        >
          <IonCol>
            <IonTitle style={{ fontSize: "24pt", fontWeight: "bolder" }}>
              Completá los datos de tu establecimiento
            </IonTitle>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{ padding: "21pt", paddingRight: "13pt" }}>
            <IonTitle>Datos generales</IonTitle>
            <br />
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
                options={provincias ?? []}
                name="provincia"
                label="Provincia"
                form={form}
              />
              <Field
                select
                options={
                  ubicaciones && form.schema.provincia != ""
                    ? ubicaciones
                        .filter(
                          (provincia: any) =>
                            provincia.id == form.schema.provincia
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
              />
              <Field
                select
                options={
                  ubicaciones &&
                  form.schema.departamento &&
                  form.schema.provincia != ""
                    ? ubicaciones
                        .filter(
                          (provincia: any) =>
                            provincia.id == form.schema.provincia
                        )[0]
                        .departamentos.filter(
                          (departamento: any) =>
                            departamento.id == form.schema.departamento
                        )[0]
                        .localidades.map((localidad: any) => {
                          return { id: localidad.id, text: localidad.text };
                        })
                    : []
                }
                name="localidad"
                label="Localidad"
                form={form}
              />
            </IonList>
          </IonCol>
          <IonCol style={{ padding: "21pt", paddingLeft: "13pt" }}>
            <IonTitle>Ubicá en el mapa tu establecimiento turístico</IonTitle>
            <br />
            <MapView
              search
              markerOnClick
              onClick={handleOnClick}
              style={{
                height: "400pt",
                width: "600pt",
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton color="medium">Volver</IonButton>
            <IonButton color="success" onClick={() => handleRegistrar()}>
              Registrar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  );
}
