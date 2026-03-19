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
} from "@ionic/react";
import { close, chevronForward, bookmark } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { eliminarOferta } from "../../App/Ofertas/Ofertas";
import { eliminarOfertaGuardada } from "../../App/Ofertas/Ofertas";

interface OfertaCardProps {
  nombre: string;
  descripcion: string;
  id: number;
  setOfertas: React.Dispatch<React.SetStateAction<any[]>>;
  setOfertasGuardadas?: React.Dispatch<React.SetStateAction<any[]>>;
  isGuardada?: boolean;
  savedOfferId?: number;
}

const OfertaGuardadaCard: React.FC<OfertaCardProps> = ({
  nombre,
  descripcion,
  id,
  setOfertas,
  setOfertasGuardadas,
  isGuardada = true,
}) => {
  const [isFavorite, setIsFavorite] = useState(isGuardada);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  const handleGuardarOferta = () => {
    if (id) {
      console.log("Guardando oferta:", id);
      // Implementa la lógica para guardar la oferta aquí
    } else {
      console.error("ID de oferta no definido");
    }
  };

  const handleEliminarGuardado = () => {
    if (!id) return;
    console.log("Eliminando oferta guardada:", id);
    eliminarOfertaGuardada(id)
      .then(() => {
        setIsFavorite(false);
        if (setOfertasGuardadas) {
          setOfertasGuardadas((prev: any[]) => {
            console.log('Ofertas antes de filtrar:', prev);
            const nuevasOfertas = prev.filter((item: any) => item.id !== id);
            console.log('Ofertas después de filtrar:', nuevasOfertas);
            return nuevasOfertas;
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar oferta:", error);
      });
  };

  return (
    <IonCard style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <IonGrid style={{ padding: 0, top: 0, position: "relative" }}>
        <IonRow>
          <IonCol size="auto">
            <IonRow>
              <img
                alt="Silhouette of mountains"
                src="/images/habitacion.jpg"
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
                >
                  VER
                </IonButton>
                <IonIcon
                  icon={bookmark}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: isFavorite ? "#53992B" : "#999",
                    marginLeft: "10px",
                    verticalAlign: "middle"
                  }}
                  onClick={() => {
                    const nuevoEstado = !isFavorite;
                    setIsFavorite(nuevoEstado);
                    console.log("Nuevo estado de favorito:", nuevoEstado);

                    if (nuevoEstado) {
                      handleGuardarOferta();
                    } else {
                      handleEliminarGuardado();
                    }
                  }}
                />
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
                style={{
                  "--background": "#F08408",
                  "--color": "white",
                  position: "absolute",
                  float: "right",
                  right: "150pt",
                  bottom: "20pt",
                }}
              >
                Ver disponibilidad&nbsp;
                <IonIcon icon={chevronForward} />
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
    </IonCard>
  );
};
export default OfertaGuardadaCard;
