const MAPBOX_TOKEN = "pk.eyJ1Ijoia29yczA1IiwiYSI6ImNtdXg3amc4aTA2aXYyd3FzcHR5MnRzYzAifQ.jX4bid1RLvxgD_E5sXYBPg";

let map;

export function displayMap(coordinates, countryName) {
  const [latitude, longitude] = coordinates;

  mapboxgl.accessToken = MAPBOX_TOKEN;

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/outdoors-v12",
    center: [longitude, latitude],
    zoom: 5,
  });

  new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .setPopup(new mapboxgl.Popup().setText(countryName))
    .addTo(map);
}