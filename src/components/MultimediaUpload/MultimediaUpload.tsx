import { IonButton } from "@ionic/react";
import { useRef, useState } from "react";
import LoadingImage from "./LoadingImage";

export default function MultimediaUpload(props: any) {
  const fileInput = useRef(null);
  const [uploading, setUploading] = useState<any[]>([]);
  const [upload, setUpload] = useState<any[]>([]);

  const handleUploading = (fileList: FileList) => {
    setUploading(
      Array.from(fileList).map((file: any) => URL.createObjectURL(file))
    );
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
      <div style={{ border: "2pt solid #F08408", borderRadius: "8pt", minHeight: "200pt" }}>
        {uploading.map((file: any) => (
          // <LoadingImage />
          <LoadingImage src={file} />
        ))}
      </div>
    </>
  );
}
