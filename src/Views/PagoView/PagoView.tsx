import { IonContent, IonGrid, IonImg, IonRow } from "@ionic/react";
import Checkout from "../../pages/PagarTest/Checkout";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import { generarOrden } from "../../App/Pagos/Pagos";

export default function PagoView() {
  const [data, setData] = useState<{
    preferenceId: string;
    publicKey: string;
  }>();
  const params: any = useParams();

  useMemo(() => {
    if (!params.id) return;
    generarOrden(params.id).then((response: any) => {
      console.log("response: ", response);
      setData({
        preferenceId: response.data.preference_id,
        publicKey: response.data.pk_mp,
      });
    });
  }, []);

  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonImg
            src="icon.png"
            style={{ width: "250pt", aspectRatio: "1/1" }}
          />
          <h1>viajero</h1>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data && (
            <Checkout
              preferenceId={data.preferenceId}
              publicKey={data.publicKey}
              style={{
                width: "250pt",
              }}
            />
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
