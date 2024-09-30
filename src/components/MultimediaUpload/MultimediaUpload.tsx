import { IonButton } from "@ionic/react";
import { useRef, useState } from "react";
import FailedImage from "./FailedImage";
import LoadingImage from "./LoadingImage";
import DoneImage from "./DoneImage";

type TMedia = {
  file: any;
  state: "loading" | "done" | "failed";
};

type TMultimediaUpload = {
  service: (file: File) => Promise<any>;
};
export default function MultimediaUpload(props: TMultimediaUpload) {
  const fileInput = useRef(null);
  const [uploading, setUploading] = useState<any[]>([]);
  const [upload, setUpload] = useState<any[]>([]);
  const [failed, setFailed] = useState<any[]>([]);

  const [mediaList, setMediaList] = useState<TMedia[]>([]);

  const handleUploading = (fileList: FileList) => {
    setMediaList((prev: TMedia[]) =>
      Array.from(fileList).map((file: any) => ({
        file: URL.createObjectURL(file),
        state: "loading",
      }))
    );
    Array.from(fileList).forEach((file: File, index: number) => {
      props
        .service(file)
        .then((response: any) => {
          setMediaList((prev: TMedia[]) => {
            const copy = [...prev];
            copy[index].state = "done";
            return copy;
          });
        })
        .catch((error: any) => {
          setMediaList((prev: TMedia[]) => {
            const copy = [...prev];
            copy[index].state = "failed";
            return copy;
          });
        });
    });
  };

  return (
    <>
      <input
        ref={fileInput}
        hidden
        type="file"
        accept="image/*"
        multiple
        onChange={(e: any) => handleUploading(e.target.files)}
        onClick={() => {}}
      />
      <IonButton
        style={{ "--background": "#F08408" }}
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click();
          // setBackgroundOption(BackgroundOptionType.Gradient);
        }}
      >
        Seleccionar imagen
      </IonButton>
      <div
        style={{
          border: "2pt solid #F08408",
          borderRadius: "8pt",
          minHeight: "200pt",
        }}
      >
        {mediaList.map(
          (media: TMedia) =>
            media.state == "loading" && <LoadingImage src={media.file} />
        )}
        {mediaList.map(
          (media: TMedia) =>
            media.state == "failed" && <FailedImage src={media.file} />
        )}
        {mediaList.map(
          (media: TMedia) =>
            media.state == "done" && <DoneImage src={media.file} />
        )}
      </div>
    </>
  );
}
