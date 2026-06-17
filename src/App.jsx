import { useState } from "react";

const App = () => {
  const [sueldoBruto, setSueldoBruto] = useState("");
  const [cargas, setCargas] = useState("");
  const [afp, setAfp] = useState("");
  const [salud, setSalud] = useState("");
  const [resultado, setResultado] = useState(null);
  const [estado, setEstado] = useState("");

  const calcular = (e) => {
    e.preventDefault();
    if (!sueldoBruto || !cargas || !afp || !salud) {
      alert("Por favor, complete todos los campos.");
    } else if (Number(sueldoBruto) < 0 || Number(cargas) < 0 || Number(afp) < 0 || Number(salud) < 0) {
      alert("Los valores no pueden ser negativos.");
      return;
    }
    const bruto = Number(sueldoBruto);
    const cargasFam = Number(cargas);
    const porafp = Number(afp);
    const vsalud = Number(salud);

    // Fórmula: Bruto - (Bruto × AFP/100) - Salud + (Cargas × 10.000)
    const liquido = bruto - (bruto * (porafp / 100)) - vsalud + (cargasFam * 10000);

    let clasificacion;
    if (liquido > 1500000)      clasificacion = "Sueldo Alto";
    else if (liquido >= 750000) clasificacion = "Sueldo Promedio";
    else                        clasificacion = "Sueldo Base / Bajo";

    setResultado(liquido);
    setEstado(clasificacion);
  };

  const limpiar = () => {
    setSueldoBruto(""); setCargas(""); setAfp(""); setSalud("");
    setResultado(null); setEstado("");
  };

  // >1.500.000 → secondary | 750.000–1.500.000 → warning | <750.000 → danger
  const obtenerColor = () => {
    if (estado === "Sueldo Alto") return "secondary";
    if (estado === "Sueldo Promedio") return "warning";
    else return "danger";
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-danger text-white">
              <h3 className="mb-0">Simulador de Sueldo Líquido</h3>
            </div>
            <div className="card-body">
              <form onSubmit={calcular}>
                <div className="mb-3">
                  <label className="form-label">Sueldo Bruto ($):</label>
                  <input type="number" className="form-control"
                    value={sueldoBruto} onChange={(e) => setSueldoBruto(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cargas Familiares:</label>
                  <input type="number" className="form-control"
                    value={cargas} onChange={(e) => setCargas(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Porcentaje AFP (%):</label>
                  <input type="number" className="form-control" step={0.01}
                    value={afp} onChange={(e) => setAfp(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Salud (Monto en $):</label>
                  <input type="number" className="form-control"
                    value={salud} onChange={(e) => setSalud(e.target.value)} />
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-danger" type="submit">Calcular</button>
                  <button className="btn btn-secondary" type="button" onClick={limpiar}>Limpiar</button>
                </div>
              </form>

              {resultado !== null && (
                <div className={`alert alert-${obtenerColor()} mt-4`}>
                  <h5>Resultado</h5>
                  <p><strong>Sueldo Líquido Estimado:</strong> ${resultado}</p>
                  <p><strong>Estado:</strong> {estado}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;