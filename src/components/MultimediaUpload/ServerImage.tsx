import { Dispatch, SetStateAction } from "react";

type TServerImage = {
  setSelected: Dispatch<SetStateAction<number|null>>;
  src: string;
  id: number;
};
export default function ServerImage(props: TServerImage) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        margin: "13pt",
        cursor: "pointer",
      }}
      onClick={() => props.setSelected(props.id)}
    >
      <img src={props.src} style={{ width: "100pt" }} />
    </div>
  );
}
