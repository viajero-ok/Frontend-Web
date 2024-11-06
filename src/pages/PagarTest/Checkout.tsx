import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

export default function PaymentBrick(props: any) {
  useEffect(() => {
    initMercadoPago("APP_USR-df748500-705e-4007-a307-a2072f78d3f0");

    return () => {
      //   window?.cardPaymentBrickController?.unmount();
    };
  }, []);

  return (
    <Wallet
      initialization={{ preferenceId: "2041014566-6fa52c4c-c7dd-4f60-aaa4-f10c6bf044a4" }}
      customization={{ texts: { valueProp: "smart_option" } }}
      locale="es-AR"
    />
  );
}
