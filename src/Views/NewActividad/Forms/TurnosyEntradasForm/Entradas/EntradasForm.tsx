import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import EntradaNueva from "./EntradaNueva";
import { EntradaProvider } from "./EntradaProvider";
import { useActividad } from "../../../Provider/ActividadProvider";
import EntradaRow from "./EntradaRow";

type TEntradas = {};
export default function EntradasForm(props: TEntradas) {
  const [agregarEntrada, setAgregarEntrada] = useState<boolean>(false);

  const { entradas } = useActividad();

  return (
    <div className="mt-4">
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-md flex flex-row justify-between items-center">
        <div className="text-gray-600 text-xl font-bold">Entradas</div>
        <button
          className="viajero-button px-4 py-2 flex flex-row items-center text-sm disabled:bg-gray-200!"
          onClick={() => setAgregarEntrada(true)}
          disabled={agregarEntrada}
        >
          <IonIcon icon={add} />
          &nbsp;Agregar nueva
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-2">
        <div className="border border-gray-200 bg-gray-50 text-md text-gray-600 font-bold p-4 col-span-5 rounded-md">
          Nombre
        </div>
        <div className="border border-gray-200 bg-gray-50 text-md text-gray-600 font-bold p-4 col-span-5 rounded-md">
          Descripción
        </div>
        <div className="border border-gray-200 bg-gray-50 text-md text-gray-600 font-bold p-4 col-span-2 rounded-md">
          Acciones
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {agregarEntrada && (
          <EntradaProvider>
            <EntradaNueva setAgregarEntrada={setAgregarEntrada} />
          </EntradaProvider>
        )}
        {entradas.map((entrada: any) => (
          <EntradaProvider>
            <EntradaRow key={entrada.id_tipo_entrada} entrada={entrada} />
          </EntradaProvider>
        ))}
      </div>
    </div>
  );
}
