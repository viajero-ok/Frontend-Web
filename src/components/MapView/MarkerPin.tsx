import { LeafletMouseEvent } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { TMarker } from "./useMapView";

export default function MarkerPin(props: {
  onClick?: (e: LeafletMouseEvent) => any;
  marker: TMarker;
}) {
  return (
    <Marker position={[props.marker.pos.lat, props.marker.pos.lng]}>
      <Popup>
        <div className="flex flex-col gap-2 p-2">
          <h1>Hello, World</h1>
          <p>andsasndklasnldasdas.</p>
        </div>
      </Popup>
    </Marker>
  );
}
