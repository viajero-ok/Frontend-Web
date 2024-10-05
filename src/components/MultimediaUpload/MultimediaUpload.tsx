import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import DoneImage from "./DoneImage";
import FailedImage from "./FailedImage";
import LoadingImage from "./LoadingImage";
import ServerImage from "./ServerImage";
import { eliminarImagenDeAlojamiento } from "../../App/Alojamientos/NuevoAlojamiento";

type TMedia = {
  id?: number;
  file: any;
  state: "loading" | "done" | "failed" | "server";
};

type TMultimediaUpload = {
  service: (file: File) => Promise<any>;
  uploaded: string[];
};
export default function MultimediaUpload(props: TMultimediaUpload) {
  const fileInput = useRef(null);
  const [mediaList, setMediaList] = useState<TMedia[]>([]);
  const [selectedFromServer, setSelectedFromServer] = useState<number | null>(
    null
  );

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

  const handleEliminar = (id: number) => {
    eliminarImagenDeAlojamiento(id).then((_) => {
      setSelectedFromServer(null);
      setMediaList((prev: TMedia[]) => [
        ...prev.filter((media: TMedia) => media.id != id),
      ]);
    });
  };

  useEffect(() => {
    setMediaList((prev: TMedia[]) => [
      ...prev.filter((media: TMedia) => media.state != "server"),
    ]);
    props.uploaded.forEach((file: any) => {
      setMediaList((prev: any[]) => [
        ...prev,
        {
          id: file.id_imagen,
          file: `data:image/png;base64, ${file.datos}`,
          state: "server",
        },
      ]);
    });
  }, [props.uploaded]);

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
        {mediaList.map(
          (media: TMedia) =>
            media.state == "server" &&
            media.id && (
              <ServerImage
                setSelected={setSelectedFromServer}
                id={media.id}
                src={media.file}
              />
            )
        )}
      </div>
      <IonModal
        isOpen={selectedFromServer != null}
        onDidDismiss={() => setSelectedFromServer(null)}
        style={{ "--height": "fit-content" }}
      >
        <div className="wrapper">
          <IonGrid
            style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
          >
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                {/* <h4 style={{ fontWeight: "bold" }}>Confirmar creación</h4> */}
              </IonCol>
              <IonCol style={{ display: "flex", justifyContent: "right" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setSelectedFromServer(null)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
              {selectedFromServer && (
                <img
                  src={
                    mediaList.filter(
                      (media: TMedia) => media.id == selectedFromServer
                    )[0].file
                  }
                  style={{ width: "250pt" }}
                />
              )}
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                color="light"
                onClick={() => setSelectedFromServer(null)}
                style={{ marginRight: "8pt" }}
              >
                Cancelar
              </IonButton>
              <IonButton
                color="danger"
                onClick={() =>
                  selectedFromServer && handleEliminar(selectedFromServer)
                }
              >
                Eliminar imagen
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
    </>
  );
}
