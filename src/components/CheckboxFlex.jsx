import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Badge,
  Box,
  Checkbox,
  LinearProgress,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CheckboxFlex = ({ socket }) => {
  const [checkboxes, setCheckboxes] = useState(Array(100).fill(false));
  const [progress, setProgress] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [connectionError, setConnectionError] = useState(false); // State to track connection error

  useEffect(() => {
    // Handle connection error
    socket.on("connect_error", (error) => {
      console.error("Connection failed:", error.message);
      setConnectionError(true); // Set the error state to true when connection fails
    });

    // Escuchar el estado inicial de las checkboxes desde el servidor
    socket.on("initialState", (initialCheckboxesState) => {
      setCheckboxes(initialCheckboxesState); // Actualizar el estado local con el estado del servidor
      setProgress(initialCheckboxesState.filter(Boolean).length);
    });

    socket.on("updateClients", (clientsQty) => {
      setActiveUsers(clientsQty);
    });

    // Escuchar actualizaciones de otras checkboxes
    socket.on("updateCheckbox", ({ index, isChecked }) => {
      setCheckboxes((prevCheckboxes) => {
        const updatedCheckboxes = [...prevCheckboxes];
        updatedCheckboxes[index] = isChecked; // Actualizar solo la checkbox que cambió
        setProgress(updatedCheckboxes.filter(Boolean).length);
        return updatedCheckboxes;
      });
    });
  }, [socket]);

  // Función para manejar los cambios en las checkboxes
  const handleCheckboxChange = (index) => {
    const isChecked = !checkboxes[index];
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index] = isChecked;
      setProgress(updatedCheckboxes.filter(Boolean).length);
      return updatedCheckboxes;
    });

    // Emitir el cambio al servidor
    socket.emit("toggleCheckbox", { index, isChecked });
  };

  return (
    <Box
      marginX={"auto"}
      marginBottom={"50px"}
      maxWidth={"80%"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <Box>
        <Badge
          color="success"
          badgeContent={activeUsers}
          sx={{ marginBottom: "5px", marginRight: "50px" }}
        >
          Online <PersonIcon sx={{ marginLeft: "10px" }} />
        </Badge>
        <Box
          display={"flex"}
          gap={3}
          alignItems={"center"}
          marginBottom={connectionError ? "5px" : "0px"}
        >
          Checkbox progress
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flexGrow: 1 }}
          />
          {progress + "%"}
        </Box>
        {connectionError && (
          <Typography
            variant="span"
            bgcolor={"#ff7961"}
            paddingY={0.5}
            paddingX={2}
            borderRadius={"5px"}
            fontWeight={"700"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <ErrorOutlineIcon /> CONNECTION ERROR - An error ocurred while
            connecting to the server, please try again later to play online
          </Typography>
        )}
      </Box>
      <Box sx={{ backgroundColor: "#d2d2d4" }} borderRadius={"5px"}>
        <Grid container paddingX={3} paddingY={2}>
          {checkboxes &&
            checkboxes.map((isChecked, index) => (
              <Grid
                key={index}
                size={{ xs: 2, sm: 1.5, md: 1 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <Checkbox
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckboxFlex;
