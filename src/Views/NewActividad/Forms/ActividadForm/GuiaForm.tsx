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
  IonTitle,
} from "@ionic/react";
import { add, alertCircleOutline, close, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { guardarGuia, eliminarGuia, modificarGuia } from "../../../../App/Actividades/Actividad";

type TGuia = {
  id_guia: number;
  numero_resolucion: string;
  nombre_apellido_guia: string;
}
type TGuiaForm = {
  idOferta: string;
  guias: TGuia[];
  setEsConGuia: Dispatch<SetStateAction<boolean>>;
}

export default function GuiaForm(props: TGuiaForm) {
  const [esConGuia, setEsConGuia] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [guias, setGuias] = useState<any[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [numeroResolucion, setNumeroResolucion] = useState<string>("");
  const [nombreCompleto, setNombreCompleto] = useState<string>("");
  const [idGuiaEditar, setIdGuiaEditar] = useState<number>(0);

  useEffect(() => {
    setGuias(props.guias);
    setEsConGuia(props.guias.length > 0);
  }, [props.guias]);

  const handleChangeEsConGuia = (e: any) => {
    if (guias.length > 0) {
      setEsConGuia(true);
      return;
    }
    setEsConGuia(e.target.checked);
    props.setEsConGuia(e.target.checked);

    if (e.target.checked) {
      setGuias(guias);
    } else {
      setGuias([]);
    }
  };

  const handleGuardarGuia = () => {
    if (!numeroResolucion || !nombreCompleto) return;
    if (idGuiaEditar) {
      doModificarGuia(idGuiaEditar);
    } else {
      doGuardarGuia();
    }
    setOpen(false);
    setNumeroResolucion("");
    setNombreCompleto("");
  }

  const handleEliminarGuia = (id: number) => {
    eliminarGuia({
      id_guia: id,
      id_oferta: props.idOferta,
    }).then(() => {
      setGuias(guias.filter((guia: TGuia) => guia.id_guia != id));
    });
  }

  /* const EditarRegistro = (guia: TGuia) => {
    setNumeroResolucion(guia.numero_resolucion);
    setNombreCompleto(guia.nombre_apellido_guia);
    setIdGuiaEditar(guia.id_guia);
    setOpen(true);
  } */

  const doGuardarGuia = () => {
    guardarGuia({
      id_oferta: props.idOferta,
      nro_resolucion: numeroResolucion,
      nombre_y_apellido: nombreCompleto,
    }).then((data: any) => {
      const nuevaGuia = {
        id_guia: data.data.id_guia,
        numero_resolucion: numeroResolucion,
        nombre_apellido_guia: nombreCompleto,
      };
      setGuias((prevGuias) => [
        ...prevGuias,
        nuevaGuia,
      ]);
      setEsConGuia(true);
      setOpen(false);
      setNumeroResolucion("");
      setNombreCompleto("");
    }).catch((error) => {
      console.error("Error al guardar la guía:", error);
    });
  }

  const doModificarGuia = (idGuia: number) => {
    if (!numeroResolucion || !nombreCompleto) return;
    modificarGuia({
      id_guia: idGuia,
      id_oferta: props.idOferta,
      nro_resolucion: numeroResolucion,
      nombre_y_apellido: nombreCompleto,
    }).then((data: any) => {
      setGuias(guias.map((guia: TGuia) => {
        if (guia.id_guia == idGuia) {
          return {
            id_guia: data.data.id_guia,
            nro_resolucion: numeroResolucion,
            nombre_apellido_guia: nombreCompleto,
          }
        }
        return guia;
      }));
      setIdGuiaEditar(0);
    });
  }

  return (
    <div style={{
      padding: "10pt",
      paddingBottom: "20pt",
      marginBottom: "30pt",
      marginLeft: "10%",
      border: "2px solid #F08408",
      borderRadius: "10pt",
      width: "80%",
    }}>
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        Guías
      </h3>
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
            style={{
              marginBottom: "10pt",
              marginTop: "10pt",
            }}
            checked={esConGuia}
            onIonChange={(e) => handleChangeEsConGuia(e)}
            color="primary"
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
            style={{
              "--background": "#F08408",
              "--color": "white"
            }}
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
                  fontColor: "black",
                }}
              >
                Nombre y apellido
              </IonCol>
            </IonRow>
            {guias.map((guia: TGuia) => (
              <IonRow
                key={guia.id_guia}
                /* onClick={() => EditarRegistro(guia)} */
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
                  {guia.numero_resolucion}
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
                  {guia.nombre_apellido_guia}
                </IonCol>

                <IonCol
                  size="small"
                  style={{ textAlign: "center", paddingRight: "12pt" }}
                >
                  <IonButton onClick={() => handleEliminarGuia(guia.id_guia)} fill="clear">
                    <IonIcon
                      icon={trash}
                      color="danger"
                      style={{ cursor: "pointer", fontSize: "14pt" }}
                    />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonCol>
        </IonRow>
        <IonModal
          isOpen={open}
          onDidDismiss={() => setOpen(false)}
          style={{
            "--height": "fit-content",
            "--width": "50%",
          }}
        >
          <div className="wrapper">
            <IonGrid
              style={{ display: "flex", flexDirection: "column", flexGrow: 0, margin: "15pt" }}
            >
              <IonRow
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #F08408",
                  paddingLeft: "10pt",
                  paddingRight: "10pt",
                  marginBottom: "10pt"
                }}>
                <IonCol
                  size="auto"
                  style={{
                    textAlign: "center",
                    marginLeft: "40%",
                  }}>
                  <IonTitle
                    style={{
                      fontWeight: "bold",
                      marginBottom: "10pt",
                    }}>
                    Agregar guía
                  </IonTitle>
                </IonCol>
                <IonCol style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => setOpen(false)}
                  >
                    <IonIcon icon={close} style={{ color: "#F08408" }} />
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonInput
                    label="Número de resolución"
                    value={numeroResolucion}
                    onIonChange={(e) => setNumeroResolucion(e.detail.value!)}
                  />
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
                  onClick={() => handleGuardarGuia()}
                >
                  Agregar
                </IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonModal>
      </IonGrid>
      {/* <IonToast
        isOpen={openToast}
        message={"Primero elimine los guías creados"}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
        }}
      /> */}
    </div>
  );
}
