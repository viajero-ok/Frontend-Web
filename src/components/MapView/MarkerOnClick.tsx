import { LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { useMapView } from "./useMapView";

type TMarkerOnClick = {
  onClick?: (e: LeafletMouseEvent) => any;
};
export default function MarkerOnClick(props: TMarkerOnClick) {
  const { newMarker } = useMapView();

  const map = useMapEvents({
    click(e) {
      newMarker(e.latlng);
      if (props.onClick) props.onClick(e);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}
