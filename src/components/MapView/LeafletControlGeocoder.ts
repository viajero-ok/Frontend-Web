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

export default function LeafletControlGeocoder(props: any) {
  console.log("hello, world");
  const map = useMap();
  const { positionInfos } = props;

  useEffect(() => {
    // creaet Geocoder nominatim
    // new Geocoder({
    //   geocoder: new geocoders.Nominatim(),
    //   position: 'topleft',
    // }).addTo(map);
    // for every positionInfo
    // get the geocordinates of the address in the positionInfo
    // use the latitude and longitude to create a marker
    // and add it the map
    // positionInfos.map((positionInfo: any) => {
    //   const address = positionInfo.address;
    //   if (address) {
    //     geocoder.geocode(address, (resultArray: any) => {
    //       if (resultArray.length > 0) {
    //         const result = resultArray[0];
    //         const latlng = result.center;
    //         L.marker(latlng, { icon }).addTo(map).bindPopup(result.name);
    //         map.fitBounds(result.bbox);
    //       }
    //     });
    //   }
    // });
    if (!map) return;
    map.addControl(
      new Geocoder({
        geocoder: new geocoders.Nominatim(),
        position: "topleft",
      })
    );
  }, []);

  return null;
}
