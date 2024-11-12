import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
} from "@ionic/react";
import Calendar from "../../components/Calendar/Calendar";
import FilterList from "./FilterList";
import TipologiaList from "./TipologiaList";
import { getMargin } from "ol/extent";
import { useMemo, useState } from "react";
import { obtenerReservasPorPrestador } from "../../App/Reservas/Reservas";

export default function MisReservasView(props: any) {
  const [reservas, setReservas] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);
  const [detalles, setDetalles] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedEstados, setSelectedEstados] = useState<string[]>([]);

  useMemo(() => {
    obtenerReservasPorPrestador()
      .then((response: any) => {
        setReservas(
          response.data.reservas.map((reserva: any) => ({
            ...reserva,
            fecha_desde: reserva.fecha_inicio.split("T")[0],
            fecha_hasta: reserva.fecha_fin.split("T")[0],
            state: reserva.estado_reserva,
          }))
        );
        setEstados(response.data.estados_reserva);
        setDetalles(response.data.detalles_reserva[0].detalles);
        setClientes(response.data.turistas);
      })
      .catch(() => {});
  }, []);

  const handleFilter = (reservas: any[]) => {
    // filtrar por tipologia
    let filtradas = reservas.filter((reserva: any) =>
      reserva.detalles_reserva
        .map((detalle: any) => detalle.id_tipo_detalle)
        .includes(selected)
    );

    if (selectedEstados.length > 0)
      filtradas = filtradas.filter((reserva: any) => {
        console.log("f: ", selectedEstados, reserva.estado_reserva);
        return selectedEstados.includes(reserva.estado_reserva);
      });

    console.log("filtradas: ", filtradas)

    if (typeof filtradas[0] == "undefined") return [];
    return [filtradas[0]];
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <IonGrid style={{ display: "inline-block" }}>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Mis reservas</h1>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "start",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <IonCol size="auto" style={{}}>
            <IonCard style={{ width: "200pt" }}>
              <IonCardHeader>
                <IonCardTitle style={{ fontWeight: "bold" }}>
                  Ofertas
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {[].map((detalle: any, index: number) => (
                    <IonItem
                      key={index}
                      button
                      // style={{
                      //   fontWeight:
                      //     index == selectedTipologia ? "bold" : "normal",
                      //   color: index == selectedTipologia ? "#F08408" : "black",
                      // }}
                      // onClick={() => handleSelect(detalle.id_tipo_detalle)}
                    >
                      {detalle.nombre_tipo_detalle}
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>

            <TipologiaList detalles={detalles} setSelected={setSelected} />
            <FilterList
              estados={estados}
              clientes={clientes}
              setSelectedEstados={setSelectedEstados}
            />
          </IonCol>
          <IonCol
            size="auto"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Calendar
              reservas={selected != null ? handleFilter(reservas) : []}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
