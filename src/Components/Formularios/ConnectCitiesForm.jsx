
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conectarCiudades } from "../../Redux/slices/graphSlice";
import { seleccionarNombresCiudades } from "../../Redux/selectors/graphSelectors";
import styles from "../../Styles/connectCitiesForm.module.scss"; 

const ConnectCitiesForm = () => {
  const dispatch = useDispatch();
  const ciudades = useSelector(seleccionarNombresCiudades);

  const [ciudad1, setCiudad1] = useState("");
  const [ciudad2, setCiudad2] = useState("");

  const conectar = () => {
    if (ciudad1 && ciudad2 && ciudad1 !== ciudad2) {
      dispatch(conectarCiudades({ ciudad1, ciudad2 }));
      setCiudad1("");
      setCiudad2("");
    } else {
      alert("Selecciona dos ciudades diferentes");
    }
  };

  return (
    <div className={styles.contenedor}>
      <h3>Conectar Ciudades</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select value={ciudad1} onChange={(e) => setCiudad1(e.target.value)}>
          <option value="">Ciudad 1</option>
          {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={ciudad2} onChange={(e) => setCiudad2(e.target.value)}>
          <option value="">Ciudad 2</option>
          {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={conectar}>Conectar</button>
      </div>
      <p>Ciudades disponibles: {ciudades.length}</p>
    </div>
  );
};

export default ConnectCitiesForm;