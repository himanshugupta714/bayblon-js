import React, { useState, useRef, useCallback } from "react";

import Map, { Marker } from "react-map-gl";

import markerLogo from "../../assets/marker.png";
import RenderMap from "../Map";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import MapViewOptions from "../MapViewOptions";
import { TITLE_VS_STYLES, VIEW_TITLE } from "../MapViewOptions/constant";
import { COORDINATES, MAP_BOX_TOKEN } from "../../constant";

function SearchLocation() {
  const mapRef = useRef(null);

  const [screenshotUrl, setScreenshotUrl] = useState(null);

  const [mapStyle, setMapStyle] = useState(
    TITLE_VS_STYLES[VIEW_TITLE.SATELLITE_VIEW]
  );

  const [viewport, setViewport] = useState({
    latitude: COORDINATES.lat,
    longitude: COORDINATES.lng,
    zoom: 8,
    preserveDrawingBuffer: true,
  });

  const handleScreenshotClick = () => {
    // get the canvas from mapRef
    const canvas = mapRef.current.getMap().getCanvas();

    // get the image from canvas
    const dataUrl = canvas.toDataURL();

    // set the image to state
    setScreenshotUrl(dataUrl);
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const onMapStyleHandler = useCallback((view) => {
    setMapStyle(view);

    // updated the map
    mapRef.current.getMap().setStyle(view);
  }, []);

  return (
    <div>
      <Box height="50vh">
        <Map
          ref={mapRef}
          width="100%"
          height="100%"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAP_BOX_TOKEN}
          mapStyle={mapStyle}
          reuseMaps={true}
          preserveDrawingBuffer
          {...viewport}
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            anchor="bottom"
          >
            <img src={markerLogo} alt="marker" height="40" />
          </Marker>
        </Map>
      </Box>

      <Box mt="2rem">
        <MapViewOptions setMapStyle={onMapStyleHandler} />
      </Box>

      <Box
        width="100%"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <Button onClick={handleScreenshotClick} variant="outlined">
          Take Screenshot
        </Button>
      </Box>

      {screenshotUrl && (
        <Box mt="2rem">
          <RenderMap screenshotUrl={screenshotUrl} />
        </Box>
      )}
    </div>
  );
}
export default SearchLocation;
