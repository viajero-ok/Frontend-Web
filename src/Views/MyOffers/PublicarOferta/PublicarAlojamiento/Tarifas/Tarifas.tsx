import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";
import { cn } from "../../../../../components/ui/Form/Field";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { usePublicarOferta } from "../PublicarAlojamientoProvider";
import DialogTarifaNueva from "./DialogTarifaNueva";
import { actualizarTarifa } from "../../../../../App/Publicaciones/PublicacionesAlojamientos";
import { formatMoneyValue } from "../../../../../components/ui/Input/Input";

type TTarifas = {
  tarifas: any[];
  setSelectedTarifa: Dispatch<SetStateAction<any>>;
};
export default function Tarifas(props: TTarifas) {
  const {
    idOferta,
    tipologias,
    tarifas,
    crearTarifa,
    guardarTarifa,
    eliminarTarifa,
    actualizar,
  } = usePublicarOferta();
  const { modal } = useModal();

  const handleAgregar = () => {
    modal({
      title: "Agregar una tarifa nueva",
      description: (
        <DialogTarifaNueva
          idOferta={idOferta}
          tipologias={tipologias}
          crearTarifa={crearTarifa}
          actualizar={actualizar}
        />
      ),
    });
  };

  const handleEditar = (selectedTarifa: any) => {
    modal({
      title: "Editar tarifa",
      description: (
        <DialogTarifaNueva
          tarifaSelected={selectedTarifa}
          idOferta={idOferta}
          tipologias={tipologias}
          crearTarifa={crearTarifa}
          actualizarTarifa={guardarTarifa}
          eliminarTarifa={eliminarTarifa}
          actualizar={actualizar}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="border border-gray-200 bg-gray-50 p-4 rounded-md flex flex-row justify-between items-center">
        <div className="text-xl text-gray-600 font-bold">Tarifas</div>
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
          Nombre habitación
        </div>

        <div className="text-center text-gray-600 font-bold">
          Tarifa por noche
        </div>
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
              <div className="text-center">{formatMoneyValue(tarifa.monto_tarifa)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
