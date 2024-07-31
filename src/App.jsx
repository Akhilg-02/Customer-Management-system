import './App.css';
import { Container, Typography,Box,Button } from '@mui/material';
import MainRoutes from './Routes/MainRoutes';
import { CustomerProvider } from './Context/CustomerContext';


function App() {

  return (
      <Container>
        <Box>
        <Typography variant="h2">
          Customer Managemnt
        </Typography>
        </Box>
       
        <CustomerProvider>
          <MainRoutes/>
        </CustomerProvider>
      </Container>
  );
}

export default App;
