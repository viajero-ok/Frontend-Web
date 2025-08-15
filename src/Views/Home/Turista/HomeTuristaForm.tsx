import {
  IonIcon,
  IonPopover
} from "@ionic/react";
import {
  calendarOutline,
  navigateOutline,
  personOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useConsultaOfertas } from "../../../components/ConsultaOfertas/ConsultaOfertasProvider";
import { cn } from "../../../components/ui/Form/Field";
import CalendarPicker from "../../MyOffers/PublicarOferta/CalendarPicker";

type THomeVisitanteForm = {
  setFechas: Dispatch<
    SetStateAction<{ fecha_desde: string | null; fecha_hasta: string | null }>
  >;
  setPersonas: Dispatch<SetStateAction<number | null>>;
  setOfertas: Dispatch<SetStateAction<any[]>>;
};
export default function HomeTuristaForm() {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const { localidad, setLocalidad, fechas, setFechas, personas, setPersonas, buscar } = useConsultaOfertas()

  useEffect(() => {
    if (!fechas) return;
    setFechas(fechas);
  }, [fechas]);

  useEffect(() => {
    if (!personas) return;
    setPersonas(personas);
  }, [personas]);

  // pagina: number;
  // limite: number;
  // id_tipo_oferta: number;
  // id_sub_tipo_oferta?: number;
  // id_localidad?: number;
  // min_monto?: number;
  // max_monto?: number;
  // latitud?: string;
  // longitud?: string;
  // radio?: number;
  // fecha_desde: Date;
  // fecha_hasta: Date;
  // cantidad_personas: number;

  return (
    <div className="flex flex-row w-full justify-center -mt-6">
      <div className="w-[80%]">
        <div className="">
          <div
            className={cn(
              "grid grid-cols-4 h-[42pt] border border-gray-200 rounded-md bg-white shadow-md"
            )}
          >
            <div className="flex flex-row items-center text-md text-gray-600 justify-center ml-4 m-1 pr-1 border-r border-gray-200">
              <IonIcon icon={navigateOutline} className="text-gray-400" />
              &nbsp;
              <input
                placeholder="¿A dónde vamos?"
                className="focus-visible:outline-none w-full h-full"
              />
            </div>
            <div className="flex flex-row items-center text-md text-gray-600 justify-left ml-4 m-1 pr-1 border-r border-gray-200">
              <IonIcon icon={calendarOutline} className="text-gray-400" />
              &nbsp;
              <input
                id="click-trigger"
                placeholder="Llegada - Salida"
                value={
                  fechas && fechas.fecha_desde != null && fechas.fecha_hasta != null
                    ? `Del ${fechas.fecha_desde.split("T")[0]} al ${
                        fechas.fecha_hasta.split("T")[0]
                      }`
                    : ""
                }
                className="focus-visible:outline-none h-full w-full"
              />
              <IonPopover
                trigger="click-trigger"
                triggerAction="click"
                style={{
                  "--min-width": "fit-content",
                }}
              >
                <div className="flex flex-row items-center justify-center content-center">
                  <CalendarPicker setFechas={setFechas} />
                </div>
              </IonPopover>
            </div>
            <div className="flex flex-row items-center text-md text-gray-600 justify-center ml-4 m-1 pr-1">
              <span
                id="popover"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "left",
                  cursor: "text",
                }}
                onClick={() => setOpenPopover(true)}
              >
                <IonIcon icon={personOutline} className="text-gray-400" />
                &nbsp;
                {personas != null
                  ? personas + ` persona${personas > 1 ? "s" : ""}`
                  : "1 persona"}
              </span>
              <IonPopover
                trigger="popover"
                isOpen={openPopover}
                onDidDismiss={() => setOpenPopover(false)}
              >
                <div className="flex flex-row text-md text-gray-600 h-[42pt] items-center p-2">
                  <IonIcon icon={personOutline} />
                  &nbsp;&nbsp;
                  <input
                    type="number"
                    min={1}
                    placeholder="Personas"
                    onChange={(e) => setPersonas(Number(e.target.value))}
                    className="focus-visible:outline-none w-full h-full"
                  />
                </div>
              </IonPopover>
            </div>
            <button
              className="bg-[var(--color-viajero)] hover:bg-[var(--color-viajero)]/90 text-white font-bold rounded-r-md cursor-pointer"
              onClick={() => buscar()}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
