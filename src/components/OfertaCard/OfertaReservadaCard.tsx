import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    IonButton
  } from "@ionic/react";
  import { useState } from "react";
  
  interface OfertaReservadaCardProps {
    nombre: string;
    descripcion: string;
  }
  
  const OfertaReservadaCard: React.FC<OfertaReservadaCardProps> = ({ nombre, descripcion }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <IonCard
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          transition: "box-shadow 0.3s ease, border 0.3s ease",
          boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          border: isHovered ? "1px solid #ccc" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IonGrid style={{ padding: 0, top: 0, position: "relative" }}>
          <IonRow>
            <IonCol size="auto">
              <IonRow>
                <img
                  alt="Silhouette of mountains"
                  src="public/images/habitacion.jpg"
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
                    marginRight: "8px",
                    "--border": "1pt solid #F08408",
                    "--border-color": "#F08408",
                    "--background": "transparent",
                    "--color": "#F08408",
                  }}
                >
                  Ver Reserva
                </IonButton>
                <IonButton
                  color="danger"
                >
                  Cancelar Reserva
                </IonButton>
                </IonCardContent>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    );
  };
  
  export default OfertaReservadaCard;