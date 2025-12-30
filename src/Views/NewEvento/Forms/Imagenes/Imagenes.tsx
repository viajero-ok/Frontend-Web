import { Dispatch, SetStateAction } from "react";
import {
  eliminarImagenOfertaTuristica,
  guardarImagenOfertaTuristica,
} from "../../../../App/Ofertas/Ofertas";
import {
  ImageUpload,
  useImageUpload,
} from "../../../../components/MultimediaUpload/ImageUploadProvider";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { useToast } from "../../../../components/ui/Toast/Toast";
import { useEvento } from "../../Provider/EventoProvider";

export default function Imagenes() {
  const { idOferta, imagenes, setImagenes } = useEvento();

  const { modal, setOpen } = useModal();
  const { toast } = useToast();

  const handleGuardar = () => {};

  const handleDelete = (idImagen: number) => {
    const eliminarImagen = () => {
      eliminarImagenOfertaTuristica(idImagen)
        .then(() => {
          imageUpload.removeImage(idImagen);
          setOpen(false);
          toast({
            variant: "success",
            title: "Imagen eliminada.",
          });
        })
        .catch(() => {
          setOpen(false);
          toast({
            variant: "danger",
            title: "Error al intentar eliminar la imagen, intente nuevamente.",
          });
        });
    };

    modal({
      variant: "danger",
      title: "Eliminar imagen",
      description: "Esta acción es irreversible. ¿Estás seguro?",
      actions: (
        <div className="flex flex-row justify-between w-full">
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => eliminarImagen()}
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  const imageUpload = useImageUpload({
    imagenes,
    setImagenes,
    service: async ({
      imagen,
      setProgress,
    }: {
      imagen: File;
      setProgress: Dispatch<SetStateAction<number>>;
    }) =>
      await guardarImagenOfertaTuristica({
        imagen,
        setProgress,
        id_oferta: idOferta,
      }),
    deleteService: handleDelete,
  });

  return <ImageUpload {...imageUpload} className="w-1/2" />;
}
