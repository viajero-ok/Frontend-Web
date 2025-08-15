import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { close, pencil, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { eliminarOferta } from "../../App/Ofertas/Ofertas";
import { cn } from "../ui/Form/Field";

interface OfertaCardProps {
  oferta: any;
  id: number;
  setOfertas: React.Dispatch<React.SetStateAction<any[]>>;
  tipoOferta: number;
}

const OfertaCard: React.FC<OfertaCardProps> = ({
  oferta,
  id,
  setOfertas,
  tipoOferta,
}) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const router = useIonRouter();

  const handlePublicar = () => {
    if (!id) return;
    router.push(`/my-offers/publicar/${id}`);
  };
  const handleEditar = () => {
    if (!id) return;
    if (tipoOferta === 1) {
      router.push(`/my-offers/alojamiento/en-habitaciones/edit/${id}`);
    } else if (tipoOferta === 2) {
      router.push(`/my-offers/actividad/edit/${id}`); // Redirige a la URL para tipo 2
    }
  };
  const handleDelete = () => {
    if (!id) return;
    eliminarOferta({ id_oferta: id.toString(), id_tipo_oferta: tipoOferta })
      .then(() => {
        setOpenConfirmDelete(false);
        setOfertas((prev: any[]) =>
          [...prev].filter((oferta: any) => oferta.id_oferta_turistica != id)
        );
      })
      .catch(() => {});
  };

  return (
    <div
      className={cn(
        "border border-[#bbb] p-4 rounded-md hover:border-black",
        "cursor-pointer w-[250pt] aspect-5/2 break-inside-avoid-column mb-4"
      )}
      onClick={() => handleEditar()}
    >
      <div className="flex-col gap-2 pl-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row text-xs text-gray-500 italic font-light">
            {oferta.tipo_oferta}
            {oferta.sub_tipo_oferta && " > "}
            {oferta.sub_tipo_oferta}
          </div>
          <div
            className={cn(
              "text-xs border px-2 py-1 lowercase rounded-full items-center content-center justify-center",
              oferta.id_estado == 1
                ? "border-gray-200 bg-gray-50 text-gray-500"
                : "",
              oferta.id_estado == 2
                ? "border-purple-200 bg-purple-50 text-purple-500"
                : "",
              oferta.id_estado == 4
                ? "border-green-200 bg-green-50 text-green-500"
                : ""
            )}
          >
            {oferta.estado}
          </div>
        </div>
        <div className="text-lg text-gray-600 font-bold">
          {oferta.nombre ?? "Sin nombre"}
        </div>
        <div className="text-sm text-gray-600">
          {oferta.descripcion ?? "Sin descripción"}
        </div>
      </div>
    </div>
  );
};

export default OfertaCard;
