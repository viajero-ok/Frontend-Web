import React from "react";
import { useNewOffer } from "../Provider/NewOfferProvider";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { useToast } from "../../../../components/ui/Toast/Toast";
import {
  SelectChangeEventDetail,
  SelectCustomEvent,
  useIonRouter,
} from "@ionic/react";

export default function ActividadTypeSelection() {
  const [establecimiento, setEstablecimiento] = React.useState<number | null>(
    null
  );

  const router = useIonRouter();
  const offer = useNewOffer();
  const { modal, setOpen } = useModal();
  const { toast } = useToast();

  const handleCrear = () => {
    offer
      .registrarActividad(establecimiento)
      .then((response) => {
        setOpen(false);
        router.push(
          `/my-offers/actividad/edit/${response.data.id_oferta}?id_establecimiento=${establecimiento}`
        );
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "Error al intentar crear la actividad. Intente nuevamente",
        });
      });
  };

  const cerrar = () => {
    offer.setTipoOferta(null);
    setOpen(false);
  };

  React.useEffect(() => {
    if (offer.tipoOferta != "actividad") return;
    modal({
      title: "Crear actividad",
      description: (
        <div className="flex flex-col gap-4 mt-4">
          <div>Seleccioná el establecimiento al que pertenece la actividad</div>
          <Select
            label="Establecimiento"
            placeholder="Seleccioná el establecimiento"
            onChange={(e: SelectCustomEvent<SelectChangeEventDetail>) =>
              setEstablecimiento(e.target.value)
            }
          >
            {offer.establecimientos.map((establecimiento: any) => (
              <SelectOption
                key={establecimiento.id_establecimiento}
                value={establecimiento.id_establecimiento}
              >
                {establecimiento.nombre}
              </SelectOption>
            ))}
          </Select>
        </div>
      ),
      actions: (
        <div className="flex flex-row gap-4">
          <button onClick={() => cerrar()} className="viajero-button-ghost">
            Cancelar
          </button>
          <button onClick={() => handleCrear()} className="viajero-button">
            Crear actividad
          </button>
        </div>
      ),
      canDismiss: false,
    });
  }, [offer.tipoOferta]);

  return null;
}
