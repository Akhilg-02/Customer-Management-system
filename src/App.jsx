import "./App.css";
import { Container, Typography, Box, Divider } from "@mui/material";
import MainRoutes from "./Routes/MainRoutes";
import { CustomerProvider } from "./Context/CustomerContext";

function App() {
  return (
    <Container>
      <Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", margin: "8vh auto" }}
        >
          Customer Management
          <Divider style={{width:"45%",margin:'auto',backgroundColor:"gray"}}/>
        </Typography>
      </Box>
     {/* Context-api customer wrapper around main application*/}
      <CustomerProvider>
        <MainRoutes />
      </CustomerProvider>
    </Container>
  );
}

export default App;
