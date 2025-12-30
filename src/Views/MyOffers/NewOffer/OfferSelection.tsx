import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { obtenerEstablecimientos } from "../../../App/Establecimientos/Establecimientos";
import { registrarNuevoEvento } from "../../../App/Eventos/Eventos";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import AlojamientoTypeSelection from "./NewAlojamiento/AlojamientoTypeSelection";
import OfferTypeSelection from "./OfferTypeSelection";
import { useNewOffer } from "./Provider/NewOfferProvider";
import ActividadTypeSelection from "./NewActividad/ActividadTypeSelection";
import EventoTypeSelection from "./NewEvento/EventoTypeSelection";

export default function OfferSelection(props: any) {
  const router = useIonRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);

  const form = useForm();
  const oferta = useNewOffer();

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

  return (
    <>
      {oferta.tipoOferta != "alojamiento" && <OfferTypeSelection />}
      {oferta.tipoOferta == "alojamiento" && <AlojamientoTypeSelection />}
      {oferta.tipoOferta == "actividad" && <ActividadTypeSelection />}
      {oferta.tipoOferta == "evento" && <EventoTypeSelection />}
      
      {/* <IonModal
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
      </IonModal> */}
    </>
  );
}
