import { useEffect, useState } from "react";
import OfferTypeSelection from "./OfferTypeSelection";
import Actividad from "./NewActividad/NewActividad";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { registrarNuevaActividad } from "../../../App/Actividades/Actividad";
import Alojamiento from "./NewAlojamiento/NewAlojamiento";
import { obtenerEstablecimientos } from "../../../App/Establecimientos/Establecimientos";
import Field from "../../../components/Field/Field";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import { registrarNuevoEvento } from "../../../App/Eventos/Eventos";

export default function OfferSelection(props: any) {
  const [offerType, setOfferType] = useState<
    null | "alojamiento" | "actividad" | "evento"
  >(null);
  const router = useIonRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const form = useForm();

  const handleCrearActividad = () => {
    console.log("id_establecimiento", form?.schema?.id_establecimiento);
    const id_establecimiento = form?.schema?.id_establecimiento;

    registrarNuevaActividad({
      id_tipo_oferta: 2,
      id_establecimiento:
        id_establecimiento !== null ? id_establecimiento : undefined,
    }).then((response: any) => {
      router.push(
        `/my-offers/actividad/edit/${response.data.id_oferta}?id_establecimiento=${id_establecimiento}`
      );
      setOfferType(null);
    });
  };

  const handleCrearEvento = () => {
    // router.push(
    //   `/my-offers/actividad/edit/${response.data.id_oferta}?id_establecimiento=${id_establecimiento}`
    // );
    const id_establecimiento = form?.schema?.id_establecimiento;
    registrarNuevoEvento({
      id_tipo_oferta: 3,
      id_establecimiento:
        id_establecimiento !== null ? id_establecimiento : undefined,
    }).then((response) => {
      router.push(
        `/my-offers/evento/edit/${response.data.id_oferta}?id_establecimiento=${id_establecimiento}`
      );
    });
  };

  useEffect(() => {
    obtenerEstablecimientos().then((response: any) => {
      const establecimientos = response.establecimientos;
      establecimientos.unshift({
        id_establecimiento: null,
        nombre: "Sin establecimiento",
      });
      setEstablecimientos(establecimientos);
    });
  }, []);

  return (
    <>
      {offerType == null && (
        <OfferTypeSelection
          setOfferType={(type: "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      {offerType == "alojamiento" && (
        <Alojamiento
          setOfferType={(type: null | "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      <IonModal
        isOpen={offerType == "actividad"}
        onDidDismiss={() => setOfferType(null)}
        style={{ "--height": "fit-content" }}
      >
        <div className="wrapper">
          <IonGrid
            style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
          >
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <h4 style={{ fontWeight: "bold" }}>Confirmar creación</h4>
              </IonCol>
              <IonCol style={{ display: "flex", justifyContent: "right" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setOfferType(null)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
              <h3 style={{ color: "black", fontSize: "14pt" }}>
                Seleccioná el establecimiento al que pertenece la actividad
              </h3>
            </IonRow>
            <IonRow
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <IonSelect
                label="Establecimiento"
                placeholder="Seleccioná el establecimiento"
                value={form?.schema?.id_establecimiento}
                onIonChange={(e: any) => {
                  form?.setValue("id_establecimiento", e.target.value);
                }}
              >
                {establecimientos.map((establecimiento: any) => (
                  <IonSelectOption
                    key={establecimiento.id_establecimiento}
                    value={establecimiento.id_establecimiento}
                  >
                    {establecimiento.nombre}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                onClick={() => setOfferType(null)}
                style={{
                  marginRight: "8pt",
                  "--background": "white",
                  "--color": "#F08408",
                }}
              >
                Cancelar
              </IonButton>
              <IonButton
                style={{ "--background": "#F08408", "--color": "white" }}
                onClick={() => handleCrearActividad()}
              >
                Crear
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
      <IonModal
        isOpen={offerType == "evento"}
        onDidDismiss={() => setOfferType(null)}
        style={{ "--height": "fit-content" }}
      >
        <div className="wrapper">
          <IonGrid
            style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
          >
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <h4 style={{ fontWeight: "bold" }}>Confirmar creación</h4>
              </IonCol>
              <IonCol style={{ display: "flex", justifyContent: "right" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setOfferType(null)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
              <h3 style={{ color: "black", fontSize: "14pt" }}>
                Seleccioná el establecimiento al que pertenece el evento
              </h3>
            </IonRow>
            <IonRow
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <IonSelect
                label="Establecimiento"
                placeholder="Seleccioná el establecimiento"
                value={form?.schema?.id_establecimiento}
                onIonChange={(e: any) => {
                  form?.setValue("id_establecimiento", e.target.value);
                }}
              >
                {establecimientos.map((establecimiento: any) => (
                  <IonSelectOption
                    key={establecimiento.id_establecimiento}
                    value={establecimiento.id_establecimiento}
                  >
                    {establecimiento.nombre}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                onClick={() => setOfferType(null)}
                style={{
                  marginRight: "8pt",
                  "--background": "white",
                  "--color": "#F08408",
                }}
              >
                Cancelar
              </IonButton>
              <IonButton
                style={{ "--background": "#F08408", "--color": "white" }}
                onClick={() => handleCrearEvento()}
              >
                Crear
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
    </>
  );
}
