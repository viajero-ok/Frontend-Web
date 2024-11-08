import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
} from "@ionic/react";
import {
  chatbox,
  compass,
  flash,
  location,
  logoUsd,
  radioButtonOff,
  star,
  walk,
} from "ionicons/icons";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import MapView from "../../components/MapView/MapView";

export default function VerOfertaView() {
  return (
    <IonContent>
      <IonGrid>
        <IonRow style={{}}>
          <IonCol size="small" style={{  }}>
            <IonCard style={{ display: "inline-block" }}>
              <IonCardHeader
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "12pt",
                  paddingLeft: "24pt",
                  paddingRight: "24pt",
                }}
              >
                <IonCardTitle style={{ fontWeight: "bold", fontSize: "20pt" }}>
                  Reserva natural tero violado
                </IonCardTitle>
                <IonCardSubtitle
                  style={{
                    fontSize: "12pt",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonIcon icon={location} style={{ fontSize: "16pt" }} />
                  Ruta 5, Km 77, Villa Gral. Belgrano
                </IonCardSubtitle>
                <IonGrid>
                  <IonRow>
                    <IonChip style={{ paddingRight: "16pt" }}>
                      <IonIcon icon={flash} />
                      &nbsp;Turismo alernativo
                    </IonChip>
                    <IonChip style={{ paddingRight: "16pt" }}>
                      <IonIcon icon={walk} />
                      &nbsp;Caminata
                    </IonChip>
                  </IonRow>
                  <IonRow>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        marginTop: "12pt",
                        paddingRight: "4pt",
                        paddingLeft: "4pt",
                      }}
                    >
                      <IonIcon style={{ fontSize: "16pt" }} icon={logoUsd} />
                      Gratis
                    </IonCol>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        marginTop: "12pt",
                        paddingRight: "4pt",
                        paddingLeft: "4pt",
                      }}
                    >
                      <IonIcon
                        style={{ fontSize: "16pt" }}
                        icon={radioButtonOff}
                      />
                      Dificultad baja
                    </IonCol>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        marginTop: "12pt",
                        paddingRight: "4pt",
                        paddingLeft: "4pt",
                      }}
                    >
                      <IonIcon style={{ fontSize: "16pt" }} icon={star} />
                      4.8
                    </IonCol>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        marginTop: "12pt",
                        paddingRight: "4pt",
                        paddingLeft: "4pt",
                      }}
                    >
                      <IonIcon style={{ fontSize: "16pt" }} icon={compass} />
                      Con guía
                    </IonCol>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "start",
                        marginTop: "12pt",
                        paddingRight: "4pt",
                        paddingLeft: "4pt",
                      }}
                    >
                      <IonIcon style={{ fontSize: "16pt" }} icon={chatbox} />
                      225
                    </IonCol>
                  </IonRow>
                  <IonRow
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "12pt",
                    }}
                  >
                    <IonButton fill="outline" color="success">
                      Guardar
                    </IonButton>
                    <IonButton>Reservar</IonButton>
                  </IonRow>
                </IonGrid>
              </IonCardHeader>
              <IonCardContent>
                <MapView
                  style={{
                    width: "100%",
                    minHeight: "250pt",
                    aspectRatio: "3/2",
                  }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol style={{paddingTop: "12pt", paddingRight: "6pt"}}>
            <IonRow style={{ height: "calc(100% - 150pt - 6pt)" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/images/cabin1.jpg)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  marginBottom: "3pt",
                  marginLeft: "3pt",
                  marginRight: "3pt"
                }}
              />

              {/* <IonCol size="small">
                <IonRow>
                  <div
                    style={{
                      width: "100%",
                      height: "50%",
                      backgroundImage: "url(/images/cabin2.jpg)",
                      backgroundPosition: "center 25%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                </IonRow>
                <IonRow>
                  <div
                    style={{
                      width: "100%",
                      height: "50%",
                      backgroundImage: "url(/images/cabin3.jpg)",
                      backgroundPosition: "center 25%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                </IonRow>
              </IonCol> */}
            </IonRow>
            <IonRow style={{ height: "150pt", marginTop: "3pt" }}>
              <IonCol style={{ margin: "3pt" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/images/cabin1.jpg)",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </IonCol>
              <IonCol style={{ margin: "3pt", marginLeft: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/images/cabin2.jpg)",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </IonCol>
              <IonCol style={{ margin: "3pt", marginLeft: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/images/cabin3.jpg)",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </IonCol>
              <IonCol style={{ margin: "3pt", marginLeft: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/images/cabin1.jpg)",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </IonCol>
              <IonCol
                style={{
                  backgroundColor: "#F08408",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18pt",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  margin: "3pt",
                  marginTop: "6pt",
                  marginBottom: "6pt"
                }}
              >
                <span>+16 fotos</span>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
