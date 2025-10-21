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

type TAlojamientoTypeSelection = {
  setOfferType: any;
};
export default function AlojamientoTypeSelection(
  props: TAlojamientoTypeSelection
) {
  const [selection, setSelection] = useState<number | null>(null);
  const [establecimiento, setEstablecimiento] = useState<number>();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);

  const router = useIonRouter();
  const { modal, setOpen } = useModal();

  const handleCrearAlojamiento = (idTipoSuboferta: number) => {
    if (!establecimiento) return;

    const getSubtipoURL = (id_oferta: string) => {
      if (idTipoSuboferta == 1)
        return `/my-offers/alojamiento/en-habitaciones/edit/${id_oferta}`;
      if (idTipoSuboferta == 2)
        return `/my-offers/alojamiento/individual/edit/${id_oferta}`;
      //if (idTipoSuboferta == 1) return `/my-offers/alojamiento/en-habitaciones/edit/${id_oferta}`
      return "/not-found";
    };

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
                  router.push(getSubtipoURL(response.data.id_oferta));
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
      title: "Confirmar",
      description: `Estás por crear un alojamiento para el establecimiento: ${
        establecimientos.filter(
          (e: any) => e.id_establecimiento == establecimiento
        )[0]?.nombre
      }`,
      actions: (
        <>
          <button
            className="viajero-button-ghost px-4 py-2"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            disabled={!selection}
            className="viajero-button px-4 py-2 disabled:bg-gray-200"
            onClick={() => selection && handleCrearAlojamiento(selection)}
          >
            Crear
          </button>
        </>
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
            onClick={() => props.setOfferType(null)}
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
            className="w-1/3"
            onClick={() => handleSelect(1)}
            title="Alojamiento con tipologías (Habitaciones/Viviendas)"
            imgSrc="public\3.6. Alojamientos\En habitaciones.png"
            disabled={!establecimiento}
          />
          <OfferCard
            className="w-1/3"
            onClick={() => handleSelect(2)}
            title="Alojamiento individual (Casa/Departamento)"
            imgSrc="public\3.6. Alojamientos\En unidades de vivienda.png"
            disabled={!establecimiento}
          />
          <OfferCard
            className="w-1/3"
            onClick={() => {}}
            title="Alojamiento de tipo camping"
            imgSrc="public\3.6. Alojamientos\Camping.png"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
