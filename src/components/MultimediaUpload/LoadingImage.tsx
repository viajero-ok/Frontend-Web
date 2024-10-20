import { IonSpinner } from "@ionic/react";
import ImageSource from "ol/source/Image";

type TLoadingImage = {
  src: string;
};
export default function LoadingImage(props: TLoadingImage) {
  return (
    <div
      style={{ position: "relative", display: "inline-block", margin: "13pt" }}
    >
      <img src={props.src} style={{ width: "100pt", filter: "blur(8px)" }} />
      <IonSpinner
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      />
    </div>
  );
}
