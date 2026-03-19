import {
  SelectChangeEventDetail,
  SelectCustomEvent,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { registrarNuevoAlojamiento } from "../../../../App/Alojamientos/NuevoAlojamiento";
import { obtenerEstablecimientos } from "../../../../App/Establecimientos/Establecimientos";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { OfferCard } from "../OfferTypeSelection";
import { useNewOffer } from "../Provider/NewOfferProvider";

export default function AlojamientoTypeSelection() {
  const [selection, setSelection] = useState<number | null>(null);
  const [establecimiento, setEstablecimiento] = useState<number>();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);

  const router = useIonRouter();
  const offer = useNewOffer();
  const { modal, setOpen } = useModal();

  const handleCrearAlojamiento = (idTipoSuboferta: number) => {
    if (!establecimiento) return;

    registrarNuevoAlojamiento({
      id_tipo_oferta: 1,
      id_sub_tipo_oferta: idTipoSuboferta,
      id_establecimiento: establecimiento,
    })
      .then((response: any) => {
        modal({
          variant: "success",
          title: "Alojamiento creado",
          description: "El alojamiento fue creado con éxito.",
          canDismiss: false,
          actions: (
            <>
              <button
                className="viajero-button bg-green-400! hover:bg-green-400/90 py-2 px-4"
                onClick={() => {
                  router.push(
                    `/my-offers/alojamiento/en-habitaciones/edit/${response.data.id_oferta}`
                  );
                  setOpen(false);
                }}
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error: any) => {});
  };

  const handleSelect = (idType: number) => {
    setSelection(idType);
    modal({
      title: "Crear alojamiento",
      description: `Estás por crear un alojamiento para el establecimiento: ${
        establecimientos.filter(
          (e: any) => e.id_establecimiento == establecimiento
        )[0]?.nombre
      }`,
      actions: (
        <div className="flex flex-row gap-4">
          <button
            className="viajero-button-ghost "
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            disabled={!selection}
            className="viajero-button disabled:bg-gray-200"
            onClick={() => selection && handleCrearAlojamiento(selection)}
          >
            Crear oferta
          </button>
        </div>
      ),
    });
  };

  useEffect(() => {
    obtenerEstablecimientos().then((response: any) => {
      setEstablecimientos(response.establecimientos);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="text-3xl text-gray-600 font-bold">
            Elegí el tipo de alojamiento que querés registrar
          </div>
          <button
            className="viajero-button-ghost py-2 px-4"
            onClick={() => offer.setTipoOferta(null)}
          >
            Cancelar
          </button>
        </div>

        <div className="">
          <div>
            Seleccioná el establecimiento al cual pertenece la actividad
          </div>
          <div className="w-fit">
            <Select
              placeholder="Seleccioná un establecimiento"
              onChange={(e: SelectCustomEvent<SelectChangeEventDetail>) =>
                setEstablecimiento(e.target.value)
              }
            >
              {establecimientos.map((establecimiento: any) => (
                <SelectOption
                  key={establecimiento.id_establecimiento}
                  value={establecimiento.id_establecimiento}
                >
                  {establecimiento.nombre}
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-4">
          <OfferCard
            onClick={() => handleSelect(1)}
            title="En habitaciones"
            imgSrc="/3.6. Alojamientos/En habitaciones.png"
            disabled={!establecimiento}
          />
          <OfferCard
            onClick={() => {}}
            title="Unidades de vivienda"
            imgSrc="/3.6. Alojamientos/En unidades de vivienda.png"
            disabled
          />
          <OfferCard
            onClick={() => {}}
            title="Casa de alquiler"
            imgSrc="/3.6. Alojamientos/Casa de alquiler.png"
            disabled
          />
          <OfferCard
            onClick={() => {}}
            title="Camping"
            imgSrc="/3.6. Alojamientos/Camping.png"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
