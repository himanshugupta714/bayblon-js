import mapboxgl from "mapbox-gl";

export const COORDINATES = {
  lat: 34.152588,
  lng: 77.577057,
};

export const MAP_BOX_TOKEN = (mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
