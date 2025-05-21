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
  IonToast,
} from "@ionic/react";
import { pencil, trash, close, settings, hammer } from "ionicons/icons";
import { useState } from "react";
import { eliminarEstablecimiento } from "../../App/Establecimientos/Establecimientos";
import { cn } from "../ui/Form/Field";

type TEstablecimientoCard = {
  nombre: string;
  descripcion: string;
  id: number;
};

export default function EstablecimientoCard(props: TEstablecimientoCard) {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const router = useIonRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleEditar = () => {
    if (!props.id) return;
    router.push(`/my-places/edit/${props.id}`);
  };

  const handleDelete = () => {
    if (!props.id) return;
    eliminarEstablecimiento(props.id)
      .then(() => {
        setOpenConfirmDelete(false);
        setEstablecimientos((prev: any[]) => {
          [...prev].filter(
            (establecimiento: any) =>
              establecimiento.id_establecimiento != props.id
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
      className="relative border border-gray-100 rounded-md w-[200pt] aspect-square p-4 hover:shadow-md cursor-pointer"
      onClick={() => handleEditar()}
    >
      <div className="absolute left-0 top-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-400">
        <div className="w-full h-full bg-white/40 flex items-center content-center justify-center text-gray-800">
          <IonIcon icon={hammer} className="text-gray-100 text-[56px]" />
        </div>
      </div>
      <div className="flex flex-col">
        <img
          src="public\images\hipocampus.jpg"
          className="w-full aspect-auto rounded-md"
        />

        <div className="text-xl text-gray-600 font-bold mt-2">
          {props.nombre}
        </div>
        <div className="text-sm text-gray-600">{props.descripcion}</div>

        {/* <div
          className={cn(expand ? "visible" : "hidden", "flex flex-row justify-center gap-2 mt-4")}
        >
          <IonButton
            fill="outline"
            style={{
              "--border": "1pt solid #F08408",
              "--border-color": "#F08408",
              "--background": "transparent",
              "--color": "#F08408",
            }}
          >
            VER
          </IonButton>
          <IonButton
            fill="solid"
            style={{
              "--background": "#F08408",
              "--color": "#FFFFFF",
            }}
            onClick={() => handleEditar()}
          >
            <IonIcon icon={pencil}></IonIcon>
          </IonButton>
          <IonButton color="danger" onClick={() => setOpenConfirmDelete(true)}>
            <IonIcon icon={trash}></IonIcon>
          </IonButton>
        </div> */}

        <IonModal
          isOpen={openConfirmDelete}
          onDidDismiss={() => setOpenConfirmDelete(false)}
          style={{ "--height": "fit-content" }}
        >
          <div className="wrapper">
            <IonGrid
              style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
            >
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <h4 style={{ fontWeight: "bold" }}>
                    Eliminar establecimiento
                  </h4>
                </IonCol>
                <IonCol style={{ display: "flex", justifyContent: "right" }}>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => setOpenConfirmDelete(false)}
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
                <h3>Esta acción no se puede deshacer</h3>
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
                  onClick={() => setOpenConfirmDelete(false)}
                  style={{ marginRight: "8pt" }}
                >
                  Cancelar
                </IonButton>
                <IonButton color="danger" onClick={() => handleDelete()}>
                  Eliminar
                </IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonModal>
      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={errorMessage}
        duration={5000}
        color="danger"
        style={{
          fontSize: "12pt",
        }}
      />
    </div>
  );
}
