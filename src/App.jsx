import styles from "./Styles/app.module.scss"
import GrafoRed from "./Components/GraphRed";

function App() {
  return (
    <div className={styles.app}>
      <h1>Parcial 3 - Red de Ciudades con Zonas Verdes</h1>
      <GrafoRed />
    </div>
  );
}


export default App;