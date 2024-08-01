import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import { useCustomer } from "../Context/CustomerContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCustomer from "./EditCustomer";

const typoStyle = {
  height: "3rem",
  lineHeight: "1.5rem",
};

const CustomerList = () => {
   // Calling customer to storage using context-api
  const { customers, deleteCustomer } = useCustomer();

  // State for editing the details of the customer
  const [editCustomer, setEditCustomer] = useState(null);
  return (
    <>
      {customers.length === 0 ? (
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ textAlign: "center", margin: "12vh auto" }}
        >
          Customer list is empty
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {customers.map((items, key) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={6} key={items.id}>
                <Paper
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    maxWidth: 550,
                    margin: "1rem",
                    p: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Customer: {items.fullName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Email: {items.email}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Mobile no.: {items.mobile}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Pan no.: {items.pan}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      City: {items.city} , State:{items.state}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Post code:{items.postCode}
                    </Typography>
                    <Typography variant="h6" component="div" sx={typoStyle}>
                      Address: {items.addressLine1} {items.addressLine2}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "15vh",
                      justifyContent: "flex-end",
                      display: "flex",
                      flexGrow: 2,
                      mt: -3,
                    }}
                  >
                    <Tooltip title="Delete">
                      <IconButton onClick={() => deleteCustomer(items.id)}>
                        <DeleteIcon style={{color:"red"}}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setEditCustomer(items.id)}>
                        <EditIcon style={{color:"slategrey"}} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      <EditCustomer
        customerId={editCustomer}
        onClose={() => setEditCustomer(null)}
      />
    </>
  );
};

export default CustomerList;
