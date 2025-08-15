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
import { cn } from "../../components/ui/Form/Field";
import { Check } from "../../components/ui/Check/Check";

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

    console.log("filtradas: ", filtradas);

    if (typeof filtradas[0] == "undefined") return [];
    return [filtradas[0]];
  };

  return (
    <div className="flex flex-col w-full px-8 mt-4 pb-12">
      <div
        className={cn(
          "flex flex-row p-4 w-full rounded-md text-3xl text-gray-600 font-bold border border-gray-200 bg-gray-50 "
        )}
      >
        Mis reservas
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className={cn("flex flex-col gap-2 h-fit w-1/3", "")}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Filtros
            </div>
            {[].map((detalle: any, index: number) => (
              // <IonItem
              //   key={index}
              //   button
              //   // style={{
              //   //   fontWeight:
              //   //     index == selectedTipologia ? "bold" : "normal",
              //   //   color: index == selectedTipologia ? "#F08408" : "black",
              //   // }}
              //   // onClick={() => handleSelect(detalle.id_tipo_detalle)}
              // >
              //   {detalle.nombre_tipo_detalle}
              // </IonItem>
              <Check key={index}>{detalle.nombre_tipo_detalle}</Check>
            ))}
            <div className="flex flex-row p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Ofertas
            </div>
            {[].map((detalle: any, index: number) => (
              <Check
                key={index}
                // style={{
                //   fontWeight:
                //     index == selectedTipologia ? "bold" : "normal",
                //   color: index == selectedTipologia ? "#F08408" : "black",
                // }}
                // onClick={() => handleSelect(detalle.id_tipo_detalle)}
              >
                {detalle.nombre_tipo_detalle}
              </Check>
            ))}
            <div className="flex flex-row p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Tipologías
            </div>

            <div className="flex flex-row p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Otros
            </div>
          </div>
          {/* <TipologiaList detalles={detalles} setSelected={setSelected} />
            <FilterList
              estados={estados}
              clientes={clientes}
              setSelectedEstados={setSelectedEstados}
            /> */}
        </div>

        <Calendar reservas={selected != null ? handleFilter(reservas) : []} />
      </div>
    </div>
  );
}
