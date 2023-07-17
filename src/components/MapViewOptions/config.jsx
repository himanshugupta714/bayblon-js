import * as React from "react";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import TrafficIcon from "@mui/icons-material/Traffic";

import { VIEW_TITLE } from "./constant";

const config = [
  {
    view: VIEW_TITLE.STREET_VIEW,
    element: <TrafficIcon />,
  },
  {
    view: VIEW_TITLE.SATELLITE_VIEW,
    element: <SatelliteAltIcon />,
  },
];

export default config;
