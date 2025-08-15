import {
  IonIcon,
  useIonRouter
} from "@ionic/react";
import {
  businessOutline,
  locationOutline
} from "ionicons/icons";
import { useState } from "react";
import { eliminarEstablecimiento } from "../../App/Establecimientos/Establecimientos";
import { cn } from "../ui/Form/Field";

type TEstablecimientoCard = {
  nombre: string;
  descripcion: string;
  id: number;
};

export default function EstablecimientoCard({
  establecimiento,
}: {
  establecimiento: any;
}) {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const router = useIonRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleEditar = () => {
    if (!establecimiento.id_establecimiento) return;
    router.push(`/my-places/edit/${establecimiento.id_establecimiento}`);
  };

  const handleDelete = () => {
    if (!establecimiento.id) return;
    eliminarEstablecimiento(establecimiento.id)
      .then(() => {
        setOpenConfirmDelete(false);
        setEstablecimientos((prev: any[]) => {
          [...prev].filter(
            (e: any) => e.id_establecimiento != establecimiento.id
          );
          return establecimientos;
        });
      })
      .catch((error) => {
        setOpenConfirmDelete(false);
        setErrorMessage(error.response.data.message);
        setShowToast(true);
      });
  };

  return (
    <div
      className={cn(
        "border border-[#bbb] p-4 rounded-md hover:border-black",
        "cursor-pointer w-[275pt] aspect-3/1 break-inside-avoid-column",
        "flex flex-row gap-2 items-center"
      )}
      onClick={() => handleEditar()}
    >
      <div>
        <IonIcon className="text-[70pt] text-gray-600" icon={businessOutline} />
      </div>
      <div className="flex-col gap-2 pl-2 w-full items-center">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row items-center text-xs text-gray-500 italic font-light">
            <IonIcon icon={locationOutline} /> Córdoba {">"} Villa María
          </div>
        </div>
        <div className="text-lg text-gray-600 font-bold">
          {establecimiento.nombre ?? "Sin nombre"}
        </div>
        <div className="text-sm text-gray-600">
          {establecimiento.descripcion ?? "Sin descripción"}
        </div>
        <div className="text-xs text-gray-600">
          Nro. de habilitación:{" " + establecimiento.numero_habilitacion}
        </div>
      </div>
    </div>
  );
}
