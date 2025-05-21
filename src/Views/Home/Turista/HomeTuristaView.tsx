import { IonToast } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";
import { useState } from "react";
import ConsultaOfertasCard from "../../../components/ConsultaOfertas/ConsultaOfertasCard";
import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import HomeTuristaForm from "./HomeTuristaForm";

interface FormSchema {
  destino: string;
  comienzoViaje: string;
  finViaje: string;
  viajeros: string;
}

export default function HomeTuristaView() {
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
    <div className="flex flex-col bg-green-400">
      {/* <div
        style={{
          width: "100%",
          height: "400pt",
          backgroundImage: "url(/images/panoramic_1.jpg)",
          backgroundPosition: "center 25%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      /> */}
      <FormProvider schema={initialSchema}>
        <HomeTuristaForm />
      </FormProvider>
      <ConsultaOfertasCard
        fechas={{ fecha_desde: "", fecha_hasta: "" }}
        personas={0}
        ofertas={[]}
      />
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
    </div>
  );
}
