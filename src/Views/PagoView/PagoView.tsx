import { IonContent } from "@ionic/react";
import Checkout from "../../pages/PagarTest/Checkout";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import { generarOrden } from "../../App/Pagos/Pagos";

export default function PagoView() {
  const [preferenceId, setPreferenceId] = useState<string>();
  const params: any = useParams();

  useMemo(() => {
    if (!params.id) return;
    generarOrden(params.id).then((response: any) => {
      setPreferenceId(response.data.id);
    });
  }, []);

  return (
    <IonContent>
      {preferenceId && <Checkout preferenceId={preferenceId} />}
    </IonContent>
  );
}
