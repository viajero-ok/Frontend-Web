import { IonCol, IonGrid, IonRow, IonToast } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";
import { useState } from "react";
import ConsultaOfertasCard from "../../../components/ConsultaOfertas/ConsultaOfertasCard";
import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import HomeVisitanteForm from "./HomeVisitanteForm";
import MapView from "../../../components/MapView/MapView";

interface FormSchema {
  destino: string;
  comienzoViaje: string;
  finViaje: string;
  viajeros: string;
}

export default function HomeVisitanteView() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const initialSchema: FormSchema = {
    destino: "",
    comienzoViaje: "",
    finViaje: "",
    viajeros: "",
  };

  const handleBuscar = (form: { schema: FormSchema }) => {
    if (!form) return;
    // Aquí iría la lógica para procesar la búsqueda
    console.log("Formulario enviado:", form.schema);
    setToastMessage("Búsqueda realizada con éxito");
    setOpenToast(true);
  };

  return (
    <>
      <FormProvider schema={initialSchema}>
        <HomeVisitanteForm />
      </FormProvider>
      <ConsultaOfertasCard />
      <IonToast
        isOpen={openToast}
        message={toastMessage}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
          setToastMessage("");
        }}
      />
    </>
  );
}
