import { useState } from "react";
import {
  TBodyActualizarTarifa,
  TBodyCrearTarifa,
} from "../../../../../App/Publicaciones/PublicacionesAlojamientos";
import { MoneyInput } from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import {
  Select,
  SelectOption,
} from "../../../../../components/ui/Select/Select";
import CalendarPicker from "../../CalendarPicker";
import { usePublicarActividad } from "../PublicarActividadProvider";

type TDialogEntrada = {
  tarifaSelected?: any;
};
export default function DialogEntradaNueva({
  tarifaSelected,
  tipologias,
  actualizar,
  crearTarifa,
  guardarTarifa,
  eliminarTarifa,
  ...props
}: TDialogEntrada & ReturnType<typeof usePublicarActividad>) {
  const [fechas, setFechas] = useState<{
    fecha_desde: string | null;
    fecha_hasta: string | null;
  }>({
    fecha_desde: tarifaSelected ? tarifaSelected.fecha_desde : null,
    fecha_hasta: tarifaSelected ? tarifaSelected.fecha_hasta : null,
  });
  const [tarifa, setTarifa] = useState<number | null>(
    tarifaSelected ? tarifaSelected.monto_tarifa : null
  );
  const [selectedTipologia, setSelectedTipologia] = useState<string | null>(
    tarifaSelected ? tarifaSelected.id_tipo_detalle : null
  );
  const [disable, setDisable] = useState<boolean>(false);

  const { modal, setOpen } = useModal();

  const handleGuardar = () => {
    if (!fechas.fecha_desde || !fechas.fecha_hasta) return;
    if (!selectedTipologia) return;
    if (!tarifa) return;
    if (!tarifaSelected) return;
    if (!guardarTarifa) return;

    guardarTarifa({
      id_tarifa: tarifaSelected.id_tarifa,
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      id_oferta: props.idOferta,
      id_tipo_entrada: selectedTipologia,
      monto_tarifa: tarifa,
    })
      .then(() => {
        modal({
          variant: "success",
          title: "Tarifa actualizada",
          description: <></>,
          actions: (
            <>
              <button
                onClick={() => {
                  actualizar();
                  setOpen(false);
                }}
                className="viajero-button px-4 py-2 bg-green-400 hover:bg-green-400/90"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "No se pudo actualizar la tarifa. Intente nuevamente.\n" +
            error.message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  const handlePublicar = () => {
    if (!fechas.fecha_desde || !fechas.fecha_hasta) return;
    if (!selectedTipologia) return;
    if (!tarifa) return;

    crearTarifa({
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      id_oferta: props.idOferta,
      id_tipo_entrada: selectedTipologia,
      monto_tarifa: tarifa,
    })
      .then(() => {
        modal({
          variant: "success",
          title: "Tarifa creada",
          description: <></>,
          actions: (
            <>
              <button
                onClick={() => {
                  actualizar();
                  setOpen(false);
                }}
                className="viajero-button px-4 py-2 bg-green-400 hover:bg-green-400/90"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "No se pudo crear la tarifa. Intente nuevamente.\n" + error.message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  const handleEliminar = () => {
    if (!eliminarTarifa) return;
    if (!tarifaSelected) return;
    eliminarTarifa(tarifaSelected.id_tarifa)
      .then(() => {
        modal({
          variant: "default",
          title: "Tarifa eliminada",
          description: "La tarifa fue eliminada con éxito.",
          actions: (
            <>
              <button
                onClick={() => {
                  actualizar();
                  setOpen(false);
                }}
                className="viajero-button px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "No se pudo eliminar la tarifa. Intente nuevamente. " +
            error.message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  const handleConfirmarEliminar = () => {
    modal({
      variant: "danger",
      title: "Eliminar tarifa",
      description: "Estás por eliminar la tarifa, esta acción es irreversible.",
      actions: (
        <>
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleEliminar()}
            className="viajero-button bg-red-400! hover:bg-red-400/90! px-4 py-2"
          >
            Eliminar
          </button>
        </>
      ),
    });
  };

  return (
    <div>
      <div className="">
        <div className="text-gray-600 font-bold text-center">
          Vigencia de la entrada
        </div>
        <CalendarPicker
          initial={
            tarifaSelected
              ? {
                  fecha_desde: tarifaSelected.fecha_desde,
                  fecha_hasta: tarifaSelected.fecha_hasta,
                }
              : undefined
          }
          setFechas={setFechas}
        />
        <Select
          value={tarifaSelected ? tarifaSelected.id_tipo_detalle : undefined}
          label="Tipología"
          onChange={(e: any) => setSelectedTipologia(e.target.value)}
        >
          {tipologias &&
            tipologias.map((tipologia: any) => (
              <SelectOption
                key={tipologia.id_tipo_entrada}
                value={tipologia.id_tipo_entrada}
              >
                {tipologia.nombre_tipo_entrada}
              </SelectOption>
            ))}
        </Select>
        <div className="mt-2">
          <MoneyInput
            label="Costo:"
            value={tarifaSelected ? tarifaSelected.monto_tarifa : undefined}
            onChange={(value: string) => {
              console.log("Money: ", value);
              setTarifa(Number(value.replaceAll(",", "").replaceAll("$", "")));
            }}
          />
        </div>
      </div>
      <div className="border-t border-gray-100 p-4 flex flex-row justify-between gap-2 mt-4 -mb-4">
        {tarifaSelected && (
          <button
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
            onClick={() => handleConfirmarEliminar()}
          >
            Eliminar
          </button>
        )}
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            className="viajero-button px-4 py-2"
            onClick={() =>
              tarifaSelected ? handleGuardar() : handlePublicar()
            }
          >
            {tarifaSelected ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
