import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { registrarNuevoAlojamiento } from "../../../../App/Alojamientos/NuevoAlojamiento";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { obtenerEstablecimientos } from "../../../../App/Establecimientos/Establecimientos";

type TAlojamientoTypeSelection = {
  setOfferType: any;
};
export default function AlojamientoTypeSelection(
  props: TAlojamientoTypeSelection
) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [selection, setSelection] = useState<number | null>(null);
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const form = useForm();
  const router = useIonRouter();

  const handleCrearAlojamiento = (idTipoSuboferta: number) => {
    registrarNuevoAlojamiento({
      id_tipo_oferta: 1,
      id_sub_tipo_oferta: idTipoSuboferta,
      id_establecimiento: form?.schema.id_establecimiento,
    })
      .then((response: any) => {
        setOpenConfirm(false);
        router &&
          router.push(
            `/my-offers/alojamiento/en-habitaciones/edit/${response.data.id_oferta}`
          );
      })
      .catch((error: any) => {});
  };

  const handleSelect = (idType: number) => {
    setSelection(idType);
    setOpenConfirm(true);
  };
  
  useEffect(() => {
    obtenerEstablecimientos().then((response: any) => {
      setEstablecimientos(response.establecimientos);
    });
  }, []);

  return (
    <>
      <IonGrid
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "13pt",
            }}
          >
            <IonButton
              color="light"
              onClick={() => props.setOfferType(null)}
              style={{ position: "absolute", float: "left", left: "21pt" }}
            >
              Volver
            </IonButton>
            <h1>Elegí el tipo de alojamiento que querés registrar</h1>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "13pt",
            }}
          >
            <IonCard button onClick={() => handleSelect(1)}>
              <IonHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13pt",
                }}
              >
                <img
                  alt="Silhouette of mountains"
                  src="public\3.6. Alojamientos\En habitaciones.png"
                  width={"300pt"}
                  height={"auto"}
                  style={{}}
                />
                <IonCardTitle
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    paddingTop: "13pt",
                  }}
                >
                  En habitaciones
                </IonCardTitle>
              </IonHeader>
            </IonCard>
            <IonCard button disabled>
              <IonHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13pt",
                }}
              >
                <img
                  alt="Silhouette of mountains"
                  src="public\3.6. Alojamientos\En unidades de vivienda.png"
                  width={"300pt"}
                  height={"auto"}
                  style={{}}
                />
                <IonCardTitle
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    paddingTop: "13pt",
                  }}
                >
                  Unidades de vivienda
                </IonCardTitle>
              </IonHeader>
            </IonCard>
            <IonCard button disabled>
              <IonHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13pt",
                }}
              >
                <img
                  alt="Silhouette of mountains"
                  src="public\3.6. Alojamientos\Casa de alquiler.png"
                  width={"300pt"}
                  height={"auto"}
                  style={{}}
                />
                <IonCardTitle
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    paddingTop: "13pt",
                  }}
                >
                  Casa de alquiler
                </IonCardTitle>
              </IonHeader>
            </IonCard>
            <IonCard button disabled>
              <IonHeader
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13pt",
                }}
              >
                <img
                  alt="Silhouette of mountains"
                  src="public\3.6. Alojamientos\Camping.png"
                  width={"300pt"}
                  height={"auto"}
                  style={{}}
                />
                <IonCardTitle
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    paddingTop: "13pt",
                  }}
                >
                  Camping
                </IonCardTitle>
              </IonHeader>
            </IonCard>
          </IonRow>
        </IonCol>
      </IonGrid>
      <IonModal
        isOpen={openConfirm}
        onDidDismiss={() => setOpenConfirm(false)}
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
                  onClick={() => setOpenConfirm(false)}
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
            <IonRow>
              <IonCol>
              <IonSelect
                  placeholder="Seleccioná el establecimiento"
                  value={form?.schema.id_establecimiento}
                  onIonChange={(e: any) => {
                    form?.setValue("id_establecimiento", e.target.value);
                  }}
                >
                  {establecimientos.map((establecimiento: any) => (
                    <IonSelectOption key={establecimiento.id_establecimiento} value={establecimiento.id_establecimiento}>
                      {establecimiento.nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                onClick={() => setOpenConfirm(false)}
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
                onClick={() => selection && handleCrearAlojamiento(selection)}
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
