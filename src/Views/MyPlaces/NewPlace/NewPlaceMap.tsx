import MapView from "../../../components/MapView/MapView";

export default function NewPlaceMap() {
  return (
    <MapView
     
      search
      markerOnClick
      style={{
        height: "400pt",
        width: "600pt",
      }}
    />
  );
}
