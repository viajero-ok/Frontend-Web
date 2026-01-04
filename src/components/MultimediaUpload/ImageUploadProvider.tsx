import { IonIcon } from "@ionic/react";
import {
  checkmarkOutline,
  chevronBackOutline,
  chevronForwardOutline,
  cloudUploadOutline,
  imageOutline,
} from "ionicons/icons";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "../ui/Form/Field";
import { useModal } from "../ui/Modal/Modal";

export type LocalOrRemoteImage = {
  getId(): number;
  getNombre(): string;
  render(): React.ReactNode;
  isRemote(): boolean;
  getDatos(): string | File;
  getSize(): number;
};

type RemoteImage = {
  id_imagen: number;
  nombre: string;
  datos: string;
};

type LocalImage = File;

type TService = (data: {
  imagen: File;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => Promise<any>;
type TDeleteService = (idImagen: number) => any;
type ImageUploadContextValue = {
  imagenes: LocalOrRemoteImage[];
  addImage: (file: File) => void;
  removeImage: (idImagen: number) => void;
  transform2Remote: (index: number, image: LocalOrRemoteImage) => void;
  service: TService;
  deleteService: TDeleteService;
  selectedImage: number | null;
  selectImage: (id: number | null) => void;
};

const ImagenUploadContext = React.createContext<ImageUploadContextValue>(
  {} as ImageUploadContextValue
);

const useImageUpload = ({
  service,
  deleteService,
  imagenes,
  setImagenes,
}: {
  service: TService;
  deleteService: TDeleteService;
  imagenes: LocalOrRemoteImage[];
  setImagenes: React.Dispatch<React.SetStateAction<LocalOrRemoteImage[]>>;
}) => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const addImage = (file: File) => {
    setImagenes((prev: LocalOrRemoteImage[]) => [
      ...prev ?? [],
      {
        getId: () => -1,
        getNombre: () => file.name,
        render: () => null,
        isRemote: () => false,
        getDatos: () => file,
        getSize: () => file.size,
      },
    ]);
  };

  const removeImage = (idImagen: number) => {
    setImagenes((prev: LocalOrRemoteImage[]) => [
      ...prev?.filter((i: LocalOrRemoteImage) => i.getId() != idImagen),
    ]);
  };

  const transform2Remote = (index: number, image: LocalOrRemoteImage) =>
    image.isRemote() &&
    setImagenes((prev: LocalOrRemoteImage[]) => {
      const copy = [...prev];
      copy[index] = !copy[index].isRemote() ? image : copy[index];
      return copy;
    });

  const selectImage = (id: number | null) => setSelectedImage(id);

  const context: ImageUploadContextValue = {
    imagenes,
    addImage,
    removeImage,
    transform2Remote,
    service,
    deleteService,
    selectedImage,
    selectImage,
  };

  return context;
};

const ImageUpload = ({
  className,
  ...context
}: {
  className?: ClassNameValue;
} & ImageUploadContextValue) => {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState<File[]>([]);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);

  /** TODO: Render saved images */

  return (
    <ImagenUploadContext.Provider value={context}>
      <div className={cn("w-fit", className)}>
        <div className="text-2xl text-gray-600 font-bold bg-gray-50 border border-gray-200 rounded-md w-full p-4 content-center pl-4">
          <div>
            Imagenes <span className="">({context.imagenes?.length})</span>
          </div>
        </div>
        <div className="flex mt-2 p-4 gap-4 border border-[#b3b3b3] shadow-sm rounded-md min-h-[200pt] hover:border-black">
          <div className="flex flex-col w-1/2 aspect-video gap-2">
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

                Array.from(files).forEach((file: File) =>
                  context.addImage(file)
                );

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
                //upload(e.target.files);
              }}
            />
          </div>
          <div
            className={cn(
              "w-full aspect-video flex flex-col overflow-y-scroll pr-2 gap-2 [scrollbar-width:thin]"
            )}
          >
            {context.imagenes?.map(
              (image: LocalOrRemoteImage, index: number) => (
                <Image key={index} {...image} index={index} />
              )
            )}
            {/* {uploading.length > 0 && (
              <div className="text-md text-gray-600 font-bold">Subiendo</div>
            )} */}
            {/* {uploading.map((uploadingFile: File, index: number) => (
              <FileUploading
                key={index}
                file={uploadingFile}
                setUploading={setUploading}
                setUploaded={setUploaded}
                upload={onUpload}
              />
            ))} */}
            {/* {images.length > 0 && (
              <div className="text-md text-gray-600 font-bold">Subidas</div>
            )} */}
            {/* {[...uploaded].reverse().map((uploadedFile: TFilePreview) => (
              <FilePreview
                key={uploadedFile.id}
                file={uploadedFile}
                setFiles={setUploaded}
              />
            ))} */}
            {}
          </div>
        </div>
      </div>
      <ImagenDialog />
    </ImagenUploadContext.Provider>
  );
};

export const Image = ({
  index,
  ...image
}: LocalOrRemoteImage & { index: number }) => {
  const hasRun = React.useRef(false);
  const [progress, setProgress] = React.useState<number>(0);

  const { service, transform2Remote, selectImage } =
    React.useContext(ImagenUploadContext);

  React.useEffect(() => {
    if (image.isRemote()) return; /** La imagen proviene del backend */
    if (hasRun.current) return;
    hasRun.current = true;
    service({
      imagen: image.getDatos() as File,
      setProgress: setProgress,
    })
      .then((response: any) => {
        console.log("RESPONSE: ", response.base64); /** ???? */
        transform2Remote(index, {
          getId: () => response.id_imagen,
          getNombre: () => image.getNombre(),
          render: () => renderRemoteImage(response.base64),
          getDatos: () => response.base64,
          isRemote: () => true,
          getSize: () => response.base64.length,
        });
      })
      .catch(() => {});
  }, [hasRun]);

  return (
    <div
      className={cn(
        "group flex flex-row items-center w-full p-2 hover:bg-[var(--color-viajero)]/5",
        "border border-transparent hover:border hover:border-[var(--color-viajero)] rounded-md",
        image.isRemote() ? "cursor-pointer" : ""
      )}
      onClick={() => image.isRemote() && selectImage(index)}
    >
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <div className="flex flex-row items-center gap-2 text-sm text-gray-600">
            <IonIcon icon={imageOutline} className="text-sm text-gray-600" />
            {image.getNombre().length < 24
              ? image.getNombre()
              : image.getNombre().slice(0, 24) +
                "~ ." +
                image.getNombre().split(".").at(-1)}
            {image.isRemote() && (
              <IonIcon
                className="text-green-400 text-sm"
                icon={checkmarkOutline}
              />
            )}
          </div>
          <div className="flex flex-row gap-2 items-center text-sm font-light text-gray-500 h-full italic">
            {`~${Math.round(image.getSize() / 1024)} Kb`}
          </div>
        </div>
        <div className="flex flex-row items-end w-full h-full">
          <div
            style={{ width: progress.toString() + "%" }}
            className={cn(
              "flex flex-row bg-green-300 w-full h-[5pt] rounded-full justify-end transition-all duration-400 mt-1",
              image.isRemote() ? "hidden" : "visible"
            )}
          />
        </div>
      </div>
    </div>
  );
};

const ImagenDialog = () => {
  const { selectImage, selectedImage, imagenes, deleteService, removeImage } =
    React.useContext(ImagenUploadContext);
  const { modal, setOpen } = useModal();

  const getImage = (): LocalOrRemoteImage | undefined =>
    selectedImage != null ? imagenes[selectedImage] : undefined;

  const goNext = () =>
    selectedImage != null &&
    selectImage(
      selectedImage + 1 <= imagenes.length - 1 ? selectedImage + 1 : 0
    );
  const goPrev = () =>
    selectedImage != null &&
    selectImage(
      selectedImage - 1 >= 0 ? selectedImage - 1 : imagenes.length - 1
    );

  const handleDelete = () => {
    const img = getImage();
    if (!img) return;
    deleteService(img.getId())
      .then(() => {
        removeImage(img.getId());
        setOpen(false);
      })
      .catch(() => {});
    selectImage(null);
  };

  React.useEffect(() => {
    if (selectedImage == null) return;
    const i = getImage();
    if (!i) return;

    modal({
      variant: "default",
      title:
        i.getNombre().length < 24
          ? i.getNombre()
          : i.getNombre().slice(0, 24) +
            "~ ." +
            i.getNombre().split(".").at(-1),
      description: (
        <div className="flex flex-col gap-1 w-full h-full mt-4">
          <div className="flex flex-row w-full justify-between items-center">
            <button
              onClick={() => goPrev()}
              className="flex flex-col items-center cursor-pointer px-2 py-4 rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <IonIcon
                icon={chevronBackOutline}
                className="text-gray-600 text-3xl"
              />
            </button>
            {i.render()}
            <button
              onClick={() => goNext()}
              className="flex flex-col items-center cursor-pointer px-2 py-4 rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <IonIcon
                icon={chevronForwardOutline}
                className="text-gray-600 text-3xl"
              />
            </button>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 w-full mt-2">
            {imagenes.map((_, index: number) => (
              <div
                key={index}
                className={cn(
                  "rounded-full",
                  index == selectedImage
                    ? "w-[8pt] h-[8pt] bg-gray-600"
                    : "w-[5pt] h-[5pt] bg-gray-400"
                )}
              />
            ))}
          </div>
          <div className="flex flex-row justify-center text-gray-600">
            {selectedImage != null ? selectedImage + 1 : 0}/{imagenes.length}
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-row w-full justify-between">
          <button
            className="viajero-button-ghost px-4 py-2"
            onClick={() => {
              selectImage(null);
              setOpen(false);
            }}
          >
            Cerrar
          </button>
          <button
            onClick={() => handleDelete()}
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90"
          >
            Eliminar
          </button>
        </div>
      ),
      onDidDismiss: () => {
        selectImage(null);
      },
    });
  }, [selectedImage]);

  return null;
};

export const renderRemoteImage = (datos: string) => (
  <img className="w-auto h-auto max-w-1/2 aspect-auto" src={`${datos}`} />
);

export { ImageUpload, useImageUpload };
