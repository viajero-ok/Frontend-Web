import { IonIcon } from "@ionic/react";
import { banOutline, reload } from "ionicons/icons";

type TFailedImage = {
  src: string;
};
export default function FailedImage(props: TFailedImage) {
  return (
    <div
      style={{ position: "relative", display: "inline-block", margin: "13pt", cursor: "pointer" }}
    >
      <img src={props.src} style={{ width: "100pt", filter: "blur(8px)" }} />
      <IonIcon
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          fontSize: "31pt"
        }}
        icon={reload}
        color="danger"
      />
    </div>
  );
}