import { LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { useMapView } from "./useMapView";

type TSingleMarkerOnClick = {
  onClick?: (e: LeafletMouseEvent) => any;
};
export default function SingleMarkerOnClick(props: TSingleMarkerOnClick) {
  const { relocateMarker } = useMapView();

  const map = useMapEvents({
    click(e) {
      relocateMarker(e.latlng);
      if (props.onClick) props.onClick(e);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}
