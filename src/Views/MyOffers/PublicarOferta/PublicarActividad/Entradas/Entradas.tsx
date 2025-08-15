import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";
import { cn } from "../../../../../components/ui/Form/Field";
import { formatMoneyValue } from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { usePublicarActividad } from "../PublicarActividadProvider";
import DialogEntradaNueva from "./DialogEntradaNueva";

type TEntradas = {
  tarifas: any[];
  setSelectedTarifa: Dispatch<SetStateAction<any>>;
};
export default function Entradas(props: TEntradas) {
  const ctx = usePublicarActividad();
  const tarifas = ctx.tarifas;

  const { modal } = useModal();

  const handleAgregar = () => {
    modal({
      title: "Agregar costo de entrada",
      description: <DialogEntradaNueva {...ctx} />,
    });
  };

  const handleEditar = (selectedTarifa: any) => {
    modal({
      title: "Editar costo de entrada",
      description: (
        <DialogEntradaNueva tarifaSelected={selectedTarifa} {...ctx} />
      ),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="border border-gray-200 bg-gray-50 p-4 rounded-md flex flex-row justify-between items-center">
        <div className="text-xl text-gray-600 font-bold">Entradas</div>
        <button
          className="viajero-button px-4 py-2"
          onClick={() => handleAgregar()}
        >
          Agregar nueva
        </button>
      </div>
      {/* <div>
        <IonButton
          style={{ "--background": "#F08408" }}
          onClick={() => props.setOpen(true)}
        >
          <IonIcon icon={add} />
          &nbsp;AGREGAR NUEVA TARIFA
        </IonButton>
      </div> */}
      <div className="grid grid-cols-3 mt-2 border border-gray-200 bg-gray-50 p-4 rounded-md">
        <div className="text-center text-gray-600 font-bold">Periodo</div>

        <div className="text-center text-gray-600 font-bold">
          Nombre entrada
        </div>

        <div className="text-center text-gray-600 font-bold">Costo</div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {tarifas &&
          tarifas.map((tarifa: any, index: any) => (
            <div
              key={index}
              className={cn(
                "grid grid-cols-3 w-full cursor-pointer",
                "text-gray-600 border border-gray-200 py-2 rounded-md even:bg-[var(--color-viajero)]/5",
                "hover:border-black active:bg-[var(--color-viajero)]/25"
              )}
              onClick={() => handleEditar(tarifa)}
            >
              <div className="text-center flex flex-row gap-2 justify-center items-center">
                <span>{tarifa.fecha_desde.split("T")[0]}</span>
                <IonIcon icon={arrowForward} />
                <span>{tarifa.fecha_hasta.split("T")[0]}</span>
              </div>
              <div className="text-center">{tarifa.nombre_tipo_detalle}</div>
              <div className="text-center">
                {formatMoneyValue(tarifa.monto_tarifa)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
