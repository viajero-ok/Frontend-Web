import { IonIcon } from "@ionic/react";
import { close, pencil, pencilOutline, trash } from "ionicons/icons";
import { Input } from "../../../../components/ui/Input/Input";
import { useState } from "react";

/** Red social a registrar */
const NewRedSocial = ({ onCancelar }: { onCancelar: () => void }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <div className="w-full">
        <Input placeholder="Red social" />
      </div>
      <button className="viajero-button">Registrar</button>
      <button className="viajero-button-ghost p-4" onClick={onCancelar}>
        Cancelar
      </button>
    </div>
  );
};

/** Red social registrada */
const RedSocial = () => {
  const [editar, setEditar] = useState<boolean>(false);

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <div className="w-full">
        <Input placeholder="Red social" readonly={!editar} />
      </div>
      {!editar && (
        <button className="viajero-button" onClick={() => setEditar(true)}>
          Editar
        </button>
      )}
      {editar && (
        <>
          <button className="viajero-button">Guardar</button>
          <button className="viajero-button-ghost p-4">
            <IonIcon icon={trash} className="text-xl text-red-400" />
          </button>
          <button
            className="viajero-button-ghost p-4"
            onClick={() => setEditar(false)}
          >
            <IonIcon icon={close} className="text-xl text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
};

export default function RedesSocialesForm() {
  const [agregar, setAgregar] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 w-full">
        <div className="border border-gray-200 rounded-md bg-gray-50 text-xl font-bold text-gray-600 p-4 w-full">
          Redes sociales del evento
        </div>
        <button
          className="viajero-button"
          disabled={agregar}
          onClick={() => setAgregar(true)}
        >
          Agregar
        </button>
      </div>
      {agregar && <NewRedSocial onCancelar={() => setAgregar(false)} />}
      <RedSocial />
    </div>
  );
}
