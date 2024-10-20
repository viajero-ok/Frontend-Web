
type TLoadingImage = {
  src: string;
};
export default function DoneImage(props: TLoadingImage) {
  return (
    <div
      style={{ position: "relative", display: "inline-block", margin: "13pt" }}
    >
      <img src={props.src} style={{ width: "100pt" }} />
    </div>
  );
}
