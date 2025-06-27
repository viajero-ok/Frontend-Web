import React from "react";
import MultimediaUpload from "./MultimediaUpload";
import { IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { cn } from "../ui/Form/Field";
import { ClassNameValue } from "tailwind-merge";

type MultimediaUploadContextValue = {
  images: any[];
  upload: (files: File[]) => void;
};

const MultimediaUploadContext =
  React.createContext<MultimediaUploadContextValue>(
    {} as MultimediaUploadContextValue
  );

const MultimediaUploadProvider = ({
  idOferta,
  service,
  children,
  className,
}: {
  idOferta: string;
  service: (body: {
    imagen: File;
    id_oferta: string;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
  }) => Promise<any>;
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  const [images, setImages] = React.useState<TImage[]>([]);

  const upload = (files: File[]) => {
    setImages((prev: TImage[]) => [
      ...prev,
      ...files.map((file: File) => ({ localFile: file })),
    ]);
  };

  const context: MultimediaUploadContextValue = {
    images,
    upload,
  };
  return (
    <MultimediaUploadContext.Provider value={context}>
      <MultimediaUpload className={cn("", className)}>
        {images.map((image: TImage) => (
          <ImageProvider {...image}>
            <Image />
          </ImageProvider>
        ))}
      </MultimediaUpload>
    </MultimediaUploadContext.Provider>
  );
};

const useMultimediaUpload = () => {
  const context = React.useContext(MultimediaUploadContext);
  if (!context)
    throw new Error(
      "useMultimediaUpload must be used within <MultimediaUploadProvider></MultimediaUploadProvider>"
    );

  return context;
};

type TImage = {
  localFile?: File;
};
type TStoredImage = {
  id: number;
  name: string;
  size: number;
};

type TImageContextValue = {
  image: TImage;
};

const ImageContext = React.createContext<TImageContextValue>(
  {} as TImageContextValue
);

const ImageProvider = ({
  children,
  ...image
}: {
  children: React.ReactNode;
} & TImage) => {
  /** TODO: Children should be a single Image component */
  const [stored, setStored] = React.useState<TStoredImage | null>(null);

  const {  } = useMultimediaUpload();

  React.useEffect(() => {
    if (!service)
      throw new Error(
        "ImageProvider must be used within a MultimediaUploadProvider"
      );

   
  }, []);

  const context: TImageContextValue = {
    image,
  };
  return (
    <ImageContext.Provider value={context}>{children}</ImageContext.Provider>
  );
};

const useImage = () => {
  const context = React.useContext(ImageContext);
  if (!context)
    throw new Error(
      "useImage must be used within <ImageProvider></ImageProvider>"
    );

  return context;
};

const Image = ({}: {}) => {
  const { image } = useImage();

  return (
    <div className={cn("group flex flex-row p-2 pb-4 w-full")}>
      <div className="flex h-full w-[30pt] relative">
        <IonIcon
          icon={imageOutline}
          className="text-[25pt] text-gray-600 absolute top-0 left-0"
        />
      </div>
      <div className="grid grid-rows-2 items-start pl-1 w-full">
        {image.localFile && (
          <div className="flex flex-row items-end justify-between w-full gap-2">
            <div className="text-sm text-gray-600">
              {image.localFile.name.length < 24
                ? image.localFile.name
                : image.localFile.name.slice(0, 24) +
                  "~ ." +
                  image.localFile.name.split(".").at(-1)}
            </div>
            <div className="text-sm font-light text-gray-600 h-full italic">
              {`${Math.round(image.localFile.size / 1024)} Kb`}
            </div>
          </div>
        )}
        <div className="flex flex-row items-end w-full h-full">
          <div
            style={{ width: (100).toString() + "%" }}
            className={cn(
              "flex flex-row bg-green-300 w-full h-1/2 rounded-full justify-end transition-all duration-400"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { MultimediaUploadProvider, useMultimediaUpload };
