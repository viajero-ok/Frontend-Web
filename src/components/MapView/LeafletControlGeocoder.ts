import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import icon from "./constants";
import { Geocoder, geocoders } from "leaflet-control-geocoder";

// shape of the props
// {
//  positionInfos: [{address: "some address"}]
// }

type TLeafletControlGeocoder = {
  marker?: boolean;
};
export default function LeafletControlGeocoder(props: TLeafletControlGeocoder) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const control =
      props.marker == false
        ? new Geocoder({
            geocoder: new geocoders.Nominatim(),
            position: "topleft",
            defaultMarkGeocode: false,
          })
            .on("markgeocode", function (e) {
              map.fitBounds(e.geocode.bbox);
            })
            .addTo(map)
        : new Geocoder({
            geocoder: new geocoders.Nominatim(),
            position: "topleft",
          });

    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, []);

  return null;
}
