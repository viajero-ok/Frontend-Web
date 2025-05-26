import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  close,
  cloudUploadOutline,
  imageOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ClassNameValue } from "tailwind-merge";
import {
  eliminarImagenDeAlojamiento,
  TGuardarImagenDeAlojamientoResponse,
  TServerImage,
} from "../../App/Alojamientos/NuevoAlojamiento";
import { cn } from "../ui/Form/Field";
import { useModal } from "../ui/Modal/Modal";

export const FileUploading = ({
  file,
  setUploading,
  setUploaded,
  upload,
}: {
  file: File;
  setUploading: Dispatch<SetStateAction<File[]>>;
  setUploaded: Dispatch<SetStateAction<TFilePreview[]>>;
  upload: (data: {
    imagen: File;
    setProgress: Dispatch<SetStateAction<number>>;
  }) => Promise<any>;
}) => {
  const hasRun = useRef(false);
  const [progress, setProgress] = useState<number>(0);
  const sizeWithFormat = `${Math.round(file.size / 1024)} Kb`;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    upload({
      imagen: file,
      setProgress: setProgress,
    })
      .then(
        (
          response: TGuardarImagenDeAlojamientoResponse & { base64: string }
        ) => {
          setTimeout(() => {
            setUploading((prev: File[]) => prev.filter((f: File) => f != file));

            setUploaded((prev: TFilePreview[]) => [
              ...prev,
              {
                id: response.id_imagen.toString(),
                file: { nombre: file.name, size: file.size },
                datos: response.base64,
              },
            ]);
          }, 1000);
        }
      )
      .catch(() => {});
  }, [progress]);

  return (
    <div className={cn("group flex flex-row p-2 pb-4 w-full")}>
      <div className="flex h-full w-[30pt] relative">
        <IonIcon
          icon={imageOutline}
          className="text-[25pt] text-gray-600 absolute top-0 left-0"
        />
      </div>
      <div className="grid grid-rows-2 items-start pl-1 w-full">
        <div className="flex flex-row items-end justify-between w-full gap-2">
          <div className="text-sm text-gray-600">
            {file.name.length < 24
              ? file.name
              : file.name.slice(0, 24) + "~ ." + file.name.split(".").at(-1)}
          </div>
          <div className="text-sm font-light text-gray-600 h-full italic">
            {sizeWithFormat}
          </div>
        </div>
        <div className="flex flex-row items-end w-full h-full">
          <div
            style={{ width: progress.toString() + "%" }}
            className={cn(
              "flex flex-row bg-green-300 w-full h-1/2 rounded-full justify-end transition-all duration-400"
            )}
          />
        </div>
      </div>
    </div>
  );
};

type TFilePreview = {
  id: string;
  file: { nombre: string; size: number };
  datos: string;
};
export const FilePreview = ({
  file,
  setFiles,
}: {
  file: TFilePreview;
  setFiles: Dispatch<SetStateAction<TFilePreview[]>>;
}) => {
  const sizeWithFormat = `${Math.round(file.datos.length / 1024)} Kb`;
  const { modal, setOpen } = useModal();

  const handleEditar = () => {
    modal({
      variant: "default",
      title: file.file.nombre,
      description: (
        <div className="relative m-4 flex justify-center content-center items-center w-fit">
          <img
            className="w-auto h-auto max-w-1/2 aspect-auto"
            src={`data:image/png;base64,${file.datos}`}
          />
        </div>
      ),
      actions: (
        <div className="flex flex-row w-full justify-between">
          <button
            className="viajero-button-ghost px-4 py-2"
            onClick={() => setOpen(false)}
          >
            Cerrar
          </button>
          <button
            onClick={() => handleAskConfirm()}
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  const handleAskConfirm = () => {
    modal({
      variant: "danger",
      title: "Eliminar archivo",
      description: "¿Estás seguro? Esta acción es irreversible.",
      actions: (
        <div className="flex flex-row w-full justify-between">
          <button
            className="viajero-button-ghost px-4 py-2"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            onClick={() => onEliminar()}
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  const onEliminar = () => {
    if (!file.id) return;
    eliminarImagenDeAlojamiento(Number(file.id))
      .then(() => {
        setFiles((prev: TFilePreview[]) =>
          prev.filter((prev: TFilePreview) => prev.id != file.id)
        );
        modal({
          variant: "success",
          title: "Imagen eliminada",
          description: "Imagen eliminada exitosamente.",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button px-4 py-2 bg-green-400! hover:bg-green-400/90!"
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
          title: "No se pudo eliminar la imagen",
          description: (error as Error).message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Cerrar
              </button>
            </>
          ),
        });
      });
  };

  return (
    <div
      className={cn(
        "group flex flex-row p-2 pb-4 w-full",
        file.id ? "hover:bg-[var(--color-viajero)]/5 cursor-pointer" : ""
      )}
      onClick={() => handleEditar()}
    >
      <div className="flex h-full w-[30pt] relative">
        <IonIcon
          icon={imageOutline}
          className="text-[25pt] text-gray-600 absolute top-0 left-0"
        />
      </div>
      <div className="grid grid-rows-2 items-start pl-2 w-full">
        <div className="flex flex-row items-end justify-between w-full gap-2">
          <div className="text-sm text-gray-600">
            {file.file.nombre.length < 24
              ? file.file.nombre
              : file.file.nombre.slice(0, 24) +
                "~ ." +
                file.file.nombre.split(".").at(-1)}
          </div>
          <div className="text-sm font-light text-gray-600 h-full italic">
            {sizeWithFormat}
          </div>
        </div>
        <div className="flex flex-row items-end justify-end w-full h-full">
          <span className="text-transparent text-xs italic group-hover:text-[var(--color-viajero)]/60">
            (editar)
          </span>
        </div>
      </div>
    </div>
  );
};

type TMedia = {
  id?: number;
  file: File;
  state: "loading" | "done" | "failed" | "server";
};

type TMultimediaUpload = {
  service: (body: {
    imagen: File;
    id_oferta: string;
    setProgress: Dispatch<SetStateAction<number>>;
  }) => Promise<any>;
  uploaded: TServerImage[];
  idOferta: string;
  className?: ClassNameValue;
};
export default function MultimediaUpload(props: TMultimediaUpload) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<TFilePreview[]>([]);
  const [uploading, setUploading] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  useEffect(() => {
    setUploaded(() => [
      ...props.uploaded.map((serverImage: TServerImage) => ({
        id: serverImage.id_imagen.toString(),
        file: { nombre: serverImage.nombre, size: 0 },
        datos: serverImage.datos,
      })),
    ]);
  }, [props.uploaded]);

  const onUpload = async ({
    imagen,
    setProgress,
  }: {
    imagen: File;
    setProgress: Dispatch<SetStateAction<number>>;
  }) => {
    return await props.service({
      imagen,
      id_oferta: props.idOferta,
      setProgress,
    });
  };

  return (
    <div className={cn("w-fit", props.className)}>
      <div className="text-2xl text-gray-600 font-bold bg-gray-50 border border-gray-200 rounded-md w-full h-[42pt] content-center pl-4">
        <div>
          Imagenes <span className="">({uploaded.length})</span>
        </div>
      </div>
      <div className="flex mt-2 p-4 gap-4 border border-[#b3b3b3] shadow-sm rounded-md min-h-[200pt] hover:border-black">
        <div className="flex flex-col aspect-square gap-2">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();

              e.stopPropagation();
              const files = e.dataTransfer.files;

              const fileArray = Array.from(files);
              setUploading(fileArray);

              setIsDragOver(false);
            }}
            className={cn(
              "flex flex-col items-center justify-center content-center px-12",
              "gap-2 border-2 border-dashed border-gray-300 bg-gray-50 h-full",
              isDragOver ? "border-gray-600 bg-[var(--color-viajero)]/5" : ""
            )}
          >
            <IonIcon
              icon={cloudUploadOutline}
              className={cn(
                "text-[var(--color-viajero)]/80 text-3xl",
                isDragOver ? "ext-[var(--color-viajero)]" : ""
              )}
            />
            <div className="text-xs text-gray-600 text-nowrap">
              Arrastrá archivos
            </div>
          </div>
          <button
            disabled={uploading.length > 0}
            onClick={() => fileInput.current?.click()}
            className="viajero-button py-2 px-4 disabled:bg-gray-200!"
          >
            Elegir archivo
          </button>
          <input
            ref={fileInput}
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={(e: any) => {
              setUploading((prev: File[]) => [...e.target.files]);
            }}
          />
        </div>
        <div
          className={cn(
            "w-full aspect-video flex flex-col gap-2 overflow-y-scroll pr-2 [scrollbar-width:thin]"
          )}
        >
          {uploading.length > 0 && (
            <div className="text-md text-gray-600 font-bold">Subiendo</div>
          )}
          {uploading.map((uploadingFile: File, index: number) => (
            <FileUploading
              key={index}
              file={uploadingFile}
              setUploading={setUploading}
              setUploaded={setUploaded}
              upload={onUpload}
            />
          ))}
          {uploaded.length > 0 && (
            <div className="text-md text-gray-600 font-bold">Subidas</div>
          )}
          {[...uploaded].reverse().map((uploadedFile: TFilePreview) => (
            <FilePreview
              key={uploadedFile.id}
              file={uploadedFile}
              setFiles={setUploaded}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
