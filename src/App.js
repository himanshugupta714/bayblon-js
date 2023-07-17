import React from "react";
import SearchLocation from "./components/SearchLocation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box height="100vh">
          <SearchLocation />
        </Box>
      </Container>
    </>
  );
}

export default App;
