import React from "react";
import CityForm from "./Formularios/CityForm";
import GreenZonesForm from "./Formularios/GreenZonesForm";
import GraphView from "./GraphView";
import TreeView from "./TreeView";
import ConnectCitiesForm from "./Formularios/ConnectCitiesForm";

const GrafoRed = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Red de Ciudades y Zonas Verdes</h2>

      <CityForm />

      <hr style={{ margin: "30px 0" }} />
      <ConnectCitiesForm /> 

      <hr style={{ margin: "30px 0" }} />
      <GreenZonesForm />

      <hr style={{ margin: "30px 0" }} />
      <GraphView />

      <hr style={{ margin: "30px 0" }} />
      <TreeView />
    </div>
  );
};

export default GrafoRed;
