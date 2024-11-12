import {
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { registrarEstablecimiento, obtenerDatosRegistradosEstablecimiento } from "../../../App/Establecimientos/Establecimientos";
import Field from "../../../components/Field/Field";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import NewPlaceMap from "./NewPlaceMap";
import { LatLng, LeafletMouseEvent, marker } from "leaflet";
import MapView from "../../../components/MapView/MapView";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";
import { close } from "ionicons/icons";
import { Router } from "react-router";

type TNewPlaceForm = {
  idEstablecimiento: number;
};

export default function NewPlaceForm(props: TNewPlaceForm) {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const [provincias, setProvincias] = useState<any[]>();
  const [ubicaciones, setUbicaciones] = useState<any[]>();
  const [datosRegistrados, setDatosRegistrados] = useState<any[]>();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any[]>();;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useIonRouter();
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
      .catch((error) => {

      });
  }, []);

  useEffect(() => {
    obtenerDatosRegistradosEstablecimiento(props.idEstablecimiento)
      .then((response: any) => {
        setDatosRegistrados(response.data.datos);
        console.log(response.data.datos);
      });

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
        setShowSuccessModal(true);
      })
      .catch((error: any) => {
        setErrorMessage(error.response.data.message);
        setShowToast(true);
      });
  };

  useEffect(() => {/* 
    if (!form) return;
    form.setValue("id_establecimiento", props.idEstablecimiento?.toString() ?? "");
    form.setValue("numeroDeHabilitacionMunicipal", datosRegistrados?.numero_habilitacion ?? ""); */
  }, [datosRegistrados]);

  return (
    form && (
      <>
        <IonTitle style={{ fontSize: "18pt", fontWeight: "bolder", marginTop: "21pt", marginLeft: "33%" }}>
          Completá los datos de tu establecimiento
        </IonTitle>

        <IonGrid>

          <IonRow
            class="ion-justify-content-center"
            style={{ padding: "21pt", paddingBottom: "3pt" }}
          >
            <IonCol>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ padding: "21pt", paddingRight: "13pt" }}>
              <IonTitle style={{ borderBottom: "1px solid #F08408" }}>Datos generales</IonTitle>
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
                <Field name="telefono" label="Teléfono" form={form} />
                <Field name="mail" label="E-mail" form={form} />
                <Field name="calle" label="Calle" form={form} />
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
              <IonTitle style={{ borderBottom: "1px solid #F08408" }}>Ubicá en el mapa tu establecimiento turístico</IonTitle>
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
          <IonRow style={{ justifyContent: "space-between", marginLeft: "21pt", marginRight: "21pt" }}>
            <IonButton style={{
              "--background": "white",
              "--color": "#F08408",
            }}
            >Volver</IonButton>
            <IonButton style={{
              "--background": "#F08408",
              "--color": "white",
            }} onClick={() => handleRegistrar()}>
              Registrar
            </IonButton>
          </IonRow>
        </IonGrid>
        <IonModal
          isOpen={showSuccessModal}
          onDidDismiss={() => setShowSuccessModal(false)}
          style={{
            "--height": "fit-content",
            "--width": "50%",
          }}
        >
          <div className="wrapper">
            <IonGrid
              style={{ display: "flex", flexDirection: "column", flexGrow: 0, margin: "15pt" }}
            >
              <IonRow style={{ justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "2px solid #F08408", paddingLeft: "10pt", paddingRight: "10pt", marginBottom: "10pt" }}>
                <IonCol size="auto" style={{ textAlign: "center", marginLeft: "33%", }}>
                  <IonTitle style={{ fontWeight: "bold", marginBottom: "5pt", textAlign: "center" }}>¡Cambios guardados!</IonTitle>
                </IonCol>
                <IonCol style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    <IonIcon icon={close} style={{ color: "#F08408" }} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow style={{ justifyContent: "center", marginBottom: "10pt" }}>
                <IonTitle size="small" style={{ textAlign: "center", fontSize: "12pt" }}>
                  Tus cambios se guardaron correctamente. 
                </IonTitle>
              </IonRow>
              <IonRow
                style={{
                  justifyContent: "right",
                  padding: "8pt",
                  paddingTop: "0",
                }}
              >
                <IonButton
                  style={{ "--background": "#F08408", "--color": "white" }}
                  onClick={() => { setShowSuccessModal(false); router.push("/my-places"); }}
                >
                  Aceptar
                </IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage?.[1]}
          duration={5000}
          color="danger"
          style={{
            fontSize: "12pt"
          }}
        />
      </>
    )
  );
}
