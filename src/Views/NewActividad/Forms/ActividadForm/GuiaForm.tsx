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
    console.log(props.guias);
    setGuias(props.guias);
  }, []);

  const handleChangeEsConGuia = (e: any) => {
    if (guias.length > 0) {
      setOpenToast(true);
      return;
    }
    setEsConGuia(e.target.checked);
    props.setEsConGuia(e.target.checked);
  };

  const handleGuardarGuia = () => {
    if (!numeroResolucion || !nombreCompleto) return;
    if (idGuiaEditar) {
      doModificarGuia(idGuiaEditar);
    }
    else {
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

  const EditarRegistro = (guia: TGuia) => {
    setNumeroResolucion(guia.numero_resolucion);
    setNombreCompleto(guia.nombre_apellido_guia);
    setIdGuiaEditar(guia.id_guia);
    setOpen(true);
  }

  const doGuardarGuia = () => {
    guardarGuia({
      id_oferta: props.idOferta,
      nro_resolucion: numeroResolucion,
      nombre_y_apellido: nombreCompleto,
    }).then((data: any) => {
      console.log(data.data);
      setGuias([...guias, {
        id_guia: data.data.id_guia,
        nro_resolucion: numeroResolucion,
        nombre_y_apellido: nombreCompleto,
      }]);
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
      console.log(data.data);
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
            {guias.map((guia: TGuia) => (
              <IonRow
                key={guia.id_guia}
                onClick={() => EditarRegistro(guia)}
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
                  <IonButton onClick={() => handleEliminarGuia(guia.id_guia)}>
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
                  onClick={() => handleGuardarGuia()}
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
