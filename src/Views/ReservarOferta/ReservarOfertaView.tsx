import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
} from "@ionic/react";
import { calendar, location, person } from "ionicons/icons";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { obtenerResumenOferta } from "../../App/Ofertas/Ofertas";
import { reservarOferta } from "../../App/Reservas/Reservas";

export default function ReservarOfertaView() {
  const [oferta, setOferta] = useState<any | null>(null);
  const params: any = useParams();

  useMemo(() => {
    if (!params.id) return;
    if (!params.id_detalle) return;
    if (!params.fecha_desde) return;
    if (!params.fecha_hasta) return;
    if (!params.cantidad_personas) return;
    obtenerResumenOferta({
      id_oferta: params.id,
      id_detalle: params.id_detalle,
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      cantidad_personas: params.cantidad_personas,
    })
      .then((response: any) => {
        setOferta(response.data);
      })
      .catch(() => {});
  }, []);

  const handleReservar = () => {
    reservarOferta({
      id_oferta: params.id,
      mail_contacto: "romerocarranzaemiliano@gmail.com",
      telefono_contacto: "3534286821",
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      detalles: [
        {
          id_tipo_detalle: params.id_detalle,
          cantidad: 1,
        },
      ],
    })
      .then((response: any) => {})
      .catch(() => {});
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16pt",
            marginTop: "12pt",
          }}
        >
          Reservar Oferta
        </IonRow>
        <IonRow style={{ marginTop: "12pt" }}>
          <IonCol>
            <IonCard style={{ padding: "12pt" }}>
              <IonCardHeader>
                <IonCardTitle>Datos de quien reserva</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonInput label="Nombre y apellido:" />
                  </IonRow>
                  <IonRow style={{ marginTop: "3pt" }}>
                    <IonInput label="Tipo de documento:" />
                  </IonRow>
                  <IonRow style={{ marginTop: "3pt" }}>
                    <IonInput label="Número de documento:" />
                  </IonRow>
                  <IonRow style={{ marginTop: "3pt" }}>
                    <IonInput label="Teléfono:" />
                  </IonRow>
                  <IonRow style={{ marginTop: "3pt" }}>
                    <IonInput label="E-mail:" />
                  </IonRow>
                  <IonRow style={{ marginTop: "3pt" }}>
                    <IonInput label="País:" />
                  </IonRow>
                </IonGrid>
                <IonRow
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonButton
                    style={{
                      "--background": "#F08408",
                      "--color": "white",
                    }}
                    onClick={() => handleReservar()}
                  >
                    Confirmar y pagar
                  </IonButton>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard style={{ padding: "12pt" }}>
              <IonCardHeader>
                <IonCardTitle>Datos de la reserva</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonCardTitle
                        style={{ fontWeight: "bold", fontSize: "20pt" }}
                      >
                        {oferta && oferta.datos_basicos_oferta.nombre}
                      </IonCardTitle>
                      <IonCardSubtitle
                        style={{
                          fontSize: "12pt",
                          display: "flex",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "left",
                          marginTop: "3pt",
                        }}
                      >
                        <IonIcon icon={location} style={{ fontSize: "16pt" }} />
                        {oferta && oferta.domicilio.nombre_calle},&nbsp;
                        {oferta && oferta.domicilio.numero},&nbsp;
                        {oferta && oferta.domicilio.localidad}
                      </IonCardSubtitle>
                      <IonCardSubtitle style={{ marginTop: "6pt" }}>
                        {oferta && oferta.datos_basicos_oferta.descripcion}
                      </IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                  <IonRow style={{ marginTop: "12pt" }}>
                    <IonCol>
                      <IonCardTitle
                        style={{ fontWeight: "bold", fontSize: "20pt" }}
                      >
                        {oferta && oferta.datos_basicos_detalle.tipo_detalle}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ marginTop: "6pt" }}>
                        Descripción: Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ips
                      </IonCardSubtitle>
                    </IonCol>
                  </IonRow>
                  <IonRow
                    style={{
                      marginTop: "12pt",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonCardTitle>Detalles</IonCardTitle>
                  </IonRow>
                  <IonRow
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12pt",
                      marginTop: "3pt",
                    }}
                  >
                    <IonIcon icon={calendar} />
                    &nbsp; Del {params.fecha_desde.split("T")[0]} al{" "}
                    {params.fecha_hasta.split("T")[0]}
                  </IonRow>
                  <IonRow
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12pt",
                    }}
                  >
                    <IonIcon icon={person} />
                    &nbsp; {params.cantidad_personas} persona
                    {params.cantidad_personas > 1 ? "s" : ""}
                  </IonRow>
                  <IonRow>
                    <IonCol
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          fontSize: "12pt",
                        }}
                      >
                        <IonRow>
                          Precio por noche: $
                          {oferta &&
                            `${oferta.tarifas[0].monto_tarifa}`.replace(
                              ".",
                              ","
                            )}
                        </IonRow>
                        <IonRow>
                          Precio total: $
                          {oferta &&
                            `${oferta.resumen_pago.precio_total}`.replace(
                              ".",
                              ","
                            )}
                        </IonRow>
                        <IonRow>
                          Pago anticipado: $
                          {oferta &&
                            `${oferta.resumen_pago.pago_anticipado}`.replace(
                              ".",
                              ","
                            )}
                        </IonRow>
                        <IonRow>
                          Saldo restante: $
                          {oferta &&
                            `${
                              oferta.resumen_pago.precio_total -
                              oferta.resumen_pago.pago_anticipado
                            }`.replace(".", ",")}
                        </IonRow>
                        <IonRow
                          style={{
                            borderTop: "2pt solid #F08408",
                            marginTop: "3pt",
                          }}
                        >
                          A pagar: $
                          {oferta &&
                            `${oferta.resumen_pago.pago_anticipado}`.replace(
                              ".",
                              ","
                            )}
                        </IonRow>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
