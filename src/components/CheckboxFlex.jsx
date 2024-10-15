import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Checkbox } from "@mui/material";

const CheckboxFlex = ({ socket }) => {
  const [checkboxes, setCheckboxes] = useState(Array(24).fill(false));

  useEffect(() => {
    // Escuchar el estado inicial de las checkboxes desde el servidor
    socket.on("initialState", (initialCheckboxesState) => {
      setCheckboxes(initialCheckboxesState); // Actualizar el estado local con el estado del servidor
    });

    // Escuchar actualizaciones de otras checkboxes
    socket.on("updateCheckbox", ({ index, isChecked }) => {
      setCheckboxes((prevCheckboxes) => {
        const updatedCheckboxes = [...prevCheckboxes];
        updatedCheckboxes[index] = isChecked; // Actualizar solo la checkbox que cambió
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
      return updatedCheckboxes;
    });

    // Emitir el cambio al servidor
    socket.emit("toggleCheckbox", { index, isChecked });
  };

  return (
    <Box
      marginX={"auto"}
      maxWidth={"80%"}
      sx={{ backgroundColor: "#d2d2d4" }}
      borderRadius={"5px"}
    >
      <Grid container paddingX={3} paddingY={2}>
        {checkboxes.map((isChecked, index) => (
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
  );
};

export default CheckboxFlex;
