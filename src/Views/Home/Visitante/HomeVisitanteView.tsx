import { IonToast } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";
import { useState } from "react";
import ConsultaOfertasCard from "../../../components/ConsultaOfertas/ConsultaOfertasCard";
import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import HomeVisitanteForm from "./HomeVisitanteForm";

interface FormSchema {
  destino: string;
  comienzoViaje: string;
  finViaje: string;
  viajeros: string;
}

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  fecha: string;
  tipo: "alojamiento" | "actividad" | "evento";
  imagen: string;
}

export default function HomeVisitanteView() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [fechas, setFechas] = useState<{
    fecha_desde: string | null;
    fecha_hasta: string | null;
  }>({ fecha_desde: null, fecha_hasta: null });
  const [personas, setPersonas] = useState<number | null>(null);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

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
    <div className="flex flex-col">
      <div
        style={{
          width: "100%",
          height: "400pt",
          backgroundImage: "url(/images/panoramic_1.jpg)",
          backgroundPosition: "center 25%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="flex flex-col px-8 w-full justify-center">
        <FormProvider schema={initialSchema}>
          <HomeVisitanteForm
            setFechas={setFechas}
            setPersonas={setPersonas}
            setOfertas={setOfertas}
          />
        </FormProvider>
        <ConsultaOfertasCard
          fechas={fechas}
          personas={personas}
          ofertas={ofertas}
        />
        {/* <IonToast
          isOpen={openToast}
          message={toastMessage}
          duration={5000}
          icon={alertCircleOutline}
          onDidDismiss={() => {
            setOpenToast(false);
            setToastMessage("");
          }}
        /> */}
      </div>
    </div>
  );
}
