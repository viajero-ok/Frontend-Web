import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonToast,
  IonToggle,
  IonSelect,
} from "@ionic/react";
import { add, alertCircleOutline, close, trash } from "ionicons/icons";
import { useState } from "react";
import { guardarGuia } from "../../../../App/Actividades/NuevaActividad";
import { eliminarGuia } from "../../../../App/Actividades/NuevaActividad";

type TGuiaForm = {
  idOferta: string;
}

export default function GuiaForm(props: TGuiaForm) {
  const [esConGuia, setEsConGuia] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [guias, setGuias] = useState<any[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [numeroResolucion, setNumeroResolucion] = useState<string>("");
  const [nombreCompleto, setNombreCompleto] = useState<string>("");

  const handleChangeEsConGuia = (e: any) => {
    if (guias.length > 0) {
      setOpenToast(true);
      return;
    }
    setEsConGuia(e.target.checked);
  };

  const handleAgregarDetalle = () => {
    setGuias((prev: any[]) => [
      ...prev,
      { id_oferta: props.idOferta, id_guia: null, nombre_y_apellido: null },
    ]);
  };
  const handleEliminarDetalle = (id: number) => {
    setGuias((prev: any[]) => [
      ...prev.filter((_, index: number) => index != id),
    ]);
  };

  const doGuardar = () => {
    if (!numeroResolucion || !nombreCompleto) return;
    guardarGuia({
      id_oferta: props.idOferta,
      nro_resolucion: numeroResolucion,
      nombre_y_apellido: nombreCompleto,
    }).then(() => {/* 
      props.handleObtenerDatos();
      setOpen(false); */
    });
  };
  const doActualizar = () => {
    if (!numeroResolucion || !nombreCompleto) return;
    guardarGuia({
      id_oferta: props.idOferta,
      nro_resolucion: numeroResolucion,
      nombre_y_apellido: nombreCompleto,
    }).then((_) => {/* 
      props.handleObtenerDatos();
      setOpen(false); */
    });
  };

  const handleGuardar = () => {
    if (!esConGuia) doGuardar();
    else doActualizar();
    setOpen(false);
  };

  const handleEliminar = () => {
    if (!esConGuia) return;
    eliminarGuia(props.idOferta).then((_) => {
    });
  };

  return (
    <IonCard style={{
      padding: "10pt",
      paddingBottom: "20pt",
      marginBottom: "30pt",
      marginLeft: "10%",
      border: "2px solid #F08408",
      borderRadius: "10pt",
      width: "80%",
    }}>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonToggle
            checked={esConGuia}
            onIonChange={(e) => handleChangeEsConGuia(e)}
          >
            Con guía
          </IonToggle>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "6pt",
          }}
        >
          <IonButton
            disabled={!esConGuia}
            onClick={() => setOpen(true)}
            style={{ "--background": "#F08408", "--color": "white" }}
          >
            <IonIcon icon={add} />
            Agregar guía
          </IonButton>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonRow>
            <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Número de resolución
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Nombre y apellido
              </IonCol>
            </IonRow>                
                <IonRow
              style={{
                backgroundColor: "#F084084D",
                margin: "6pt",
                borderRadius: "8pt",
              }}
            >
              <IonCol
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                asdasdas12312425
              </IonCol>
              <IonCol
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                José María Perez Rordriguez
              </IonCol>
              <IonCol
                size="small"
                style={{ textAlign: "center", paddingRight: "12pt" }}
              >
                <IonIcon
                  icon={trash}
                  color="danger"
                  style={{ cursor: "pointer", fontSize: "14pt" }}
                />
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonModal
          isOpen={open}
          onDidDismiss={() => setOpen(false)}
          style={{ "--height": "fit-content" }}
        >
          <div className="wrapper">
            <IonGrid
              style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
            >
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <h4 style={{ fontWeight: "bold" }}>Agregar guía</h4>
                </IonCol>
                <IonCol style={{ display: "flex", justifyContent: "right" }}>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => setOpen(false)}
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
                <h3 style={{ color: "black", fontSize: "14pt" }}>
                  Estás por agregar un nuevo guía
                </h3>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput
                    label="Número de resolución"
                    value={numeroResolucion}
                    onIonChange={(e) => setNumeroResolucion(e.detail.value!)} />
                </IonCol>
                <IonCol>
                  <IonInput
                    label="Nombre y apellido"
                    value={nombreCompleto}
                    onIonChange={(e) => setNombreCompleto(e.detail.value!)} />
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
                  onClick={() => setOpen(false)}
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
                  onClick={() => handleGuardar()}
                >
                  Agregar
                </IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonModal>
      </IonGrid>
      <IonToast
        isOpen={openToast}
        message={"Primero elimine los guías creados"}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
        }}
      />
    </IonCard>
  );
}
