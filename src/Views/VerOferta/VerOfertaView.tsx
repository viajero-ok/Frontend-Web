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
  IonRow,
  IonTitle,
  useIonRouter,
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

// Import Swiper styles
import "swiper/css";
import MapView from "../../components/MapView/MapView";
import { useMemo, useState } from "react";
import { obtenerOfertaTuristica } from "../../App/Ofertas/Ofertas";
import { useParams } from "react-router";
import styled from "styled-components";

export default function VerOfertaView() {
  const [datos, setDatos] = useState<any>();
  const params: any = useParams();
  const router = useIonRouter();

  useMemo(() => {
    console.log("params: ", params);
    if (!params.id) return;
    if (!params.fecha_desde) return;
    if (!params.fecha_hasta) return;
    if (!params.cantidad_personas) return;
    obtenerOfertaTuristica({
      id_oferta: params.id,
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      cantidad_personas: params.cantidad_personas,
    })
      .then((response: any) => {
        setDatos(response.data);
        console.log("response: ", response.data);
      })
      .catch((error: any) => {
        console.log("error: ", error);
      });
  }, []);

  const StyledDiv = styled.div`
    position: relative;
    border-left: 3pt solid lightgray;
    transition-duration: 0.25s;
    cursor: pointer;
  `;

  const StyledOver = styled.span`
    transition-duration: 0.25s;
    cursor: pointer;
    background-color: transparent;
    color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18pt;

    &:hover {
      background-color: #f08408;
      color: white;
    }
  `;

  return (
    <IonContent>
      <IonGrid>
        <IonRow style={{}}>
          <IonCol size="small" style={{}}>
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
                  {datos && datos.datos_basicos.nombre}
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
                  {datos &&
                    `${datos.domicilio.nombre_calle}, ${datos.domicilio.localidad}`}
                </IonCardSubtitle>
                <IonGrid>
                  <IonRow>
                    {/* <IonChip style={{ paddingRight: "16pt" }}>
                      <IonIcon icon={flash} />
                      &nbsp;Turismo alernativo
                    </IonChip>
                    <IonChip style={{ paddingRight: "16pt" }}>
                      <IonIcon icon={walk} />
                      &nbsp;Caminata
                    </IonChip> */}
                  </IonRow>
                  <IonRow>
                  {/*   <IonCol
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
                    </IonCol> */}
                    {/* <IonCol
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
                    </IonCol> */}
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
                    {/* <IonCol
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
                    </IonCol> */}
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
                  </IonRow>
                </IonGrid>
              </IonCardHeader>
              <IonCardContent>
                <MapView
                  setMarker={{
                    lat: datos ? datos.domicilio.latitud : -30,
                    lgn: datos ? datos.domicilio.longitud : -30,
                  }}
                  style={{
                    width: "100%",
                    minHeight: "250pt",
                    aspectRatio: "3/2",
                  }}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol style={{ paddingTop: "12pt", paddingRight: "6pt" }}>
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
                  marginRight: "3pt",
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
                  marginBottom: "6pt",
                }}
              >
                <span>+16 fotos</span>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F084084D",
            marginBottom: "12pt"
          }}
        >
          <h3>
            <q style={{ fontWeight: "normal", fontSize: "14pt", color: "black" }}>
              {datos && datos.datos_basicos.descripcion}
            </q>
          </h3>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {datos &&
            datos.caracteristicas.map((caracteristica: any) => (
              <IonChip>{caracteristica.caracteristica}</IonChip>
            ))}
        </IonRow>
        <IonRow style={{ marginTop: "12pt" }}>
          <IonCol>
            <IonCard style={{ padding: "20pt" }}>
              <IonCardHeader>
                <IonTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "18pt", color: "#f08408" }}>Información</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardTitle style={{ fontWeight: "bold", fontSize: "12pt", color: "black" }}>Métodos de pago</IonCardTitle>
                <div style={{ marginTop: "6pt" }} />
                {datos &&
                  datos.metodos_pago.map((metodo: any) => (
                    <IonChip>{metodo.metodo_pago}</IonChip>
                  ))}
                <div style={{ marginTop: "12pt" }} />
                <IonCardTitle style={{ fontWeight: "bold", fontSize: "12pt", color: "black" }}>Horarios de check-in y check-out</IonCardTitle>
                <div style={{ marginTop: "6pt" }} />
                <IonGrid>
                  <IonRow style={{ fontWeight: "bold" }}>Check-in</IonRow>
                  <IonRow style={{ fontWeight: "bold" }}>
                    <IonCol>Lun</IonCol>
                    <IonCol>Mar</IonCol>
                    <IonCol>Mie</IonCol>
                    <IonCol>Jue</IonCol>
                    <IonCol>Vie</IonCol>
                    <IonCol>Sab</IonCol>
                    <IonCol>Dom</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_lunes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_martes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_miercoles == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_jueves == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_viernes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_sabado == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_domingo == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                  </IonRow>
                  <IonRow style={{ marginTop: "12pt", fontWeight: "bold" }}>
                    Check-Out
                  </IonRow>
                  <IonRow style={{ fontWeight: "bold" }}>
                    <IonCol>Lun</IonCol>
                    <IonCol>Mar</IonCol>
                    <IonCol>Mie</IonCol>
                    <IonCol>Jue</IonCol>
                    <IonCol>Vie</IonCol>
                    <IonCol>Sab</IonCol>
                    <IonCol>Dom</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_lunes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_martes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_miercoles == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_jueves == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_viernes == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_sabado == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                    <IonCol>
                      {datos &&
                        datos.horarios_check_in_out
                          .filter((h: any) => h.aplica_domingo == 1)
                          .map(
                            (h: any, i: number) =>
                              `${i > 0 ? " - " : ""}${h.check_in_hora}:${
                                h.check_in_minuto
                              }`
                          )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <div style={{ marginTop: "12pt" }} />
                <IonCardTitle style={{ fontWeight: "bold", fontSize: "12pt", color: "black" }}>Observaciones</IonCardTitle>
                <div style={{ marginTop: "6pt" }} />
                <ul>
                  {datos &&
                    datos.observaciones.map((observacion: any) => (
                      <li>{observacion.observacion}</li>
                    ))}
                </ul>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard style={{ padding: "12pt" }}>
              <IonCardHeader style={{ paddingBottom: "12pt" }}>
                <IonTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "18pt", color: "#f08408" }}>Reservá</IonTitle>
              </IonCardHeader>
              <IonGrid
                title="ver disponibilidad"
                style={{ position: "relative" }}
              >
                {datos &&
                  datos.tipos_detalles.map((detalle: any, index: number) => (
                    <StyledDiv>
                      <StyledOver
                        onClick={() =>
                          router.push(
                            `/oferta/reservar/${params.id}/${detalle.id_tipo_detalle}/${params.fecha_desde}/${params.fecha_hasta}/${params.cantidad_personas}`
                          )
                        }
                      >
                        RESERVAR
                      </StyledOver>
                      <IonRow style={{ marginTop: index > 0 ? "12pt" : "0pt" }}>
                        <IonCol>
                          <IonRow>{detalle.tipo_detalle}</IonRow>
                          <IonRow>
                            {detalle.cantidad_baños} <span>&nbsp;baño</span>
                            {detalle.cantidad_baños > 1 && <span>s</span>}
                            {detalle.bl_baño_compartido ? (
                              <span>&nbsp;&bull;baño compartido</span>
                            ) : null}
                            {detalle.bl_baño_adaptado ? (
                              <span>&nbsp;&bull; baño adaptado</span>
                            ) : null}
                          </IonRow>
                          <IonRow>
                            {detalle.camas_cantidad.reduce(
                              (acumulador: number, valorActual: any) =>
                                acumulador + valorActual.cantidad,
                              0
                            )}
                            &nbsp; cama
                            {detalle.camas_cantidad.reduce(
                              (acumulador: number, valorActual: any) =>
                                acumulador + valorActual.cantidad,
                              0
                            ) > 1 && "s"}
                            &nbsp; (
                            {detalle.camas_cantidad.map(
                              (cama: any, index: number) =>
                                `${index != 0 ? ", " : ""}` +
                                cama.cantidad +
                                " " +
                                cama.nombre_cama
                            )}
                            )
                          </IonRow>
                          <IonRow>
                            {detalle.caracteristicas.map(
                              (caracteristica: any, index: number) => (
                                <span>
                                  {index > 0 && <span>&nbsp;&bull; </span>}
                                  {caracteristica.caracteristica}
                                </span>
                              )
                            )}
                          </IonRow>
                        </IonCol>
                        <IonCol
                          style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          <div>
                            {params.cantidad_personas && datos && (
                              <IonRow>
                                {datos.datos_basicos.noches_estadia} noche
                                {datos.datos_basicos.noches_estadia > 1
                                  ? "s"
                                  : ""}
                                ,{params.cantidad_personas} persona
                                {params.cantidad_personas > 1 ? "s" : ""}
                              </IonRow>
                            )}
                            <IonRow
                              style={{ fontSize: "16pt", fontWeight: "bold" }}
                            >
                              AR$ {`${detalle.precio_total}`.replace(".", ",")}
                            </IonRow>
                            <IonRow>+ impuestos y tazas</IonRow>
                          </div>
                        </IonCol>
                      </IonRow>
                    </StyledDiv>
                  ))}
              </IonGrid>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
