import { useIonRouter } from "@ionic/react";
import EntradasForm from "./Entradas/EntradasForm";
import TurnosForm from "./Turnos/TurnosForm";

type TTurnosyEntradasForm = {
  idOferta: string;
};

export default function TurnosyEntradasForm(props: TTurnosyEntradasForm) {
  const router = useIonRouter();

  return (
    <div className="flex flex-col gap-2">
      <TurnosForm />
      <EntradasForm />
    </div>
  );
}
