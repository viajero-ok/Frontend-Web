import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { close, pencil, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { eliminarOferta } from "../../App/Ofertas/Ofertas";

interface OfertaCardProps {
  nombre: string;
  descripcion: string;
  id: number;
  setOfertas: React.Dispatch<React.SetStateAction<any[]>>;
  tipoOferta: number;
}

const OfertaCard: React.FC<OfertaCardProps> = ({ nombre, descripcion, id, setOfertas, tipoOferta }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const router = useIonRouter();

  const handlePublicar = () => {
    if (!id) return;
    router.push(`/my-offers/publicar/${id}`);
  }
  const handleEditar = () => {
    if (!id) return;
    if (tipoOferta === 1) {
      router.push(`/my-offers/alojamiento/en-habitaciones/edit/${id}`);
    } else if (tipoOferta === 2) {
      router.push(`/my-offers/actividad/edit/${id}`); // Redirige a la URL para tipo 2
    }
  };
  const handleDelete = () => {
    if (!id) return;
    eliminarOferta({ id_oferta: id.toString(), id_tipo_oferta: tipoOferta })
      .then(() => {
        setOpenConfirmDelete(false);
        setOfertas((prev: any[]) =>
          [...prev].filter(
            (oferta: any) => oferta.id_oferta_turistica != id
          )
        );
      })
      .catch(() => { });
  };

  return (
    <IonCard style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <IonGrid style={{ padding: 0, top: 0, position: "relative" }}>
        <IonRow>
          <IonCol size="auto">
            <IonRow>
              <img
                alt="Silhouette of mountains"
                src="public\images\habitacion.jpg"
                width={"175pt"}
                height={"150pt"}
                style={{}}
              />
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCardHeader style={{}}>
                <IonCardTitle>{nombre}</IonCardTitle>
                <IonCardSubtitle>{descripcion}</IonCardSubtitle>
              </IonCardHeader>
            </IonRow>
            <IonRow>
              <IonCardContent style={{}}>
                <IonButton
                  fill="outline"
                  style={{
                    "--border": "1pt solid #F08408",
                    "--border-color": "#F08408",
                    "--background": "transparent",
                    "--color": "#F08408",
                  }}
                  onClick={() => handlePublicar()}
                >
                  PUBLICAR
                </IonButton>
                <IonButton
                  fill="solid"
                  style={{
                    "--background": "#F08408",
                    "--color": "#FFFFFF",
                  }}
                  onClick={() => handleEditar()}
                >
                  <IonIcon icon={pencil}></IonIcon>
                </IonButton>
                <IonButton
                  color="danger"
                  onClick={() => setOpenConfirmDelete(true)}
                >
                  <IonIcon icon={trash}></IonIcon>
                </IonButton>

              </IonCardContent>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonModal
        isOpen={openConfirmDelete}
        onDidDismiss={() => setOpenConfirmDelete(false)}
        style={{ "--height": "fit-content" }}
      >
        <div className="wrapper">
          <IonGrid
            style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
          >
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <h4 style={{ fontWeight: "bold" }}>Eliminar oferta</h4>
              </IonCol>
              <IonCol style={{ display: "flex", justifyContent: "right" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setOpenConfirmDelete(false)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
              <h3>Esta acción no se puede deshacer</h3>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                color="light"
                onClick={() => setOpenConfirmDelete(false)}
                style={{ marginRight: "8pt" }}
              >
                Cancelar
              </IonButton>
              <IonButton color="danger" onClick={() => handleDelete()}>
                Eliminar
              </IonButton>

            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
    </IonCard>
  );
};

export default OfertaCard;
