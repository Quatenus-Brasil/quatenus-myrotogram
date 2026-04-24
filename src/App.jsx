import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Papa from "papaparse";

function App() {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);
  const selectedFileRef = useRef(null);

  const [equipament, setEquipment] = useState("gv300");
  const [geoid, setGeoid] = useState("0");
  const [mode, setMode] = useState("0");
  const [startPoint, setStartPoint] = useState(1);
  const [endPoint, setEndPoint] = useState(3);
  const [longsAndLats, setLongsAndLats] = useState(",,,,,");
  const [checkInterval, setCheckInterval] = useState(0);
  const [outputId, setOutputId] = useState("0");
  const [outputStatus, setOutputStatus] = useState("0");
  const [duration, setDuration] = useState(0);
  const [toggleTimes, setToggleTimes] = useState(0);

  const copyToClipboard = () => {
    const command = `AT+GTPEO=${equipament},${geoid},${mode},${startPoint},${endPoint},${longsAndLats},${checkInterval},${outputId},${outputStatus},${duration},${toggleTimes},,,,,FFFF$`;
    const textarea = document.createElement("textarea");
    textarea.value = command;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Comando copiado para a área de transferência!");
    } catch (err) {
      console.warn("Erro ao copiar o texto", err);
      alert("Não foi possível copiar o comando. Por favor, copie manualmente:\n\n" + command);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const validateCheckInterval = (value) => {
    if (value < 5) {
      setCheckInterval(0);
    } else {
      setCheckInterval(value);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    selectedFileRef.current = file;
    setFileName(file.name);
  };

  const parseCsv = () => {
    const file = selectedFileRef.current;
    if (!file) {
      alert("Por favor, selecione um arquivo CSV primeiro.");
      return;
    };
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length < 3) {
          alert("O CSV deve conter pelo menos 3 pontos de 'Latitude' e 'Longitude'.");
          return;
        }

        if (results.data.some((row) => !row.Latitude?.trim() || !row.Longitude?.trim())) {
          alert("Todos os pontos devem ter uma 'Latitude' e 'Longitude'.");
          return;
        }

        // console.log("Parsed Result:", results.data);
        getLongsAndLats(results.data);
      },
    });
  };

  const getLongsAndLats = (data) => {
    const normalize = (val) => parseFloat(val.trim().replace(",", ".")).toFixed(6);
    const longsAndLatsArray = data.map((row) => `${normalize(row.Longitude)},${normalize(row.Latitude)}`);
    const longsAndLatsString = longsAndLatsArray.join(",");
    setLongsAndLats(longsAndLatsString);
    setEndPoint(data.length);
    // console.log("Longs and Lats String:", longsAndLatsString);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid px-4" style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div className="page-header">
          <h5>Comando Rotograma</h5>
          <p>Configure o comando para o produto rotograma para o equipamento GV300N ou GV350MG.</p>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-5">
            <div className="card-section">
              <div className="card-section-title">
                <span className="icon">&#9636;</span>
                Upload
              </div>
              <p className="card-section-subtitle">Faça upload do arquivo CSV extraido da plataforma do cliente.</p>

              <div className="dropzone">
                <div className="dropzone-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                </div>
                <label className="btn-file-upload">
                  Procurar...
                  <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} style={{ display: "none" }} />
                </label>
                <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px", wordBreak: "break-all" }}>
                  {fileName ?? "Clique para procurar o arquivo .CSV"}
                </p>
              </div>

              <button type="button" className="btn-secondary-custom" onClick={parseCsv}>
                &#9776; Processar
              </button>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-section">
              <div className="card-section-title">
                <span className="icon">&#9881;</span>
                Configuração do Comando
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-12">
                  <label className="form-label-custom d-block">EQUIPAMENTO</label>
                  <select className="form-select form-select-sm" defaultValue="gv300" onChange={(e) => setEquipment(e.target.value)}>
                    <option value="gv300">GV300N</option>
                    <option value="gv350m">GV350MG</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">GEOID</label>
                  <select className="form-select form-select-sm" defaultValue="0" onChange={(e) => setGeoid(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">MODE</label>
                  <select className="form-select form-select-sm" defaultValue="0" onChange={(e) => setMode(e.target.value)}>
                    <option value="0">Desativar a função de cerca</option>
                    <option value="1">Entrando na cerca</option>
                    <option value="2">Saindo da cerca</option>
                    <option value="3">Entrando e saindo da cerca</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">CHECK INTERVAL (segundos)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    defaultValue={0}
                    min={5}
                    value={checkInterval}
                    onInput={(e) => validateCheckInterval(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">Output ID</label>
                  <select className="form-select form-select-sm" defaultValue="0" onChange={(e) => setOutputId(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="9">9</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">Output Status</label>
                  <select className="form-select form-select-sm" defaultValue="0" onChange={(e) => setOutputStatus(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label-custom d-block">Duration (x100ms)</label>
                  <input type="number" className="form-control form-control-sm" defaultValue={0} min={0} onChange={(e) => setDuration(e.target.value)} />
                </div>

                <div className="col-12">
                  <label className="form-label-custom d-block">Toggle Times</label>
                  <input type="number" className="form-control form-control-sm" defaultValue={0} min={0} onChange={(e) => setToggleTimes(e.target.value)} />
                </div>

                {/* <div className="col-12">
                  <button type="button" className="btn-primary-custom mt-1">
                    &#9654; Gerar String
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="generated-section">
          <div className="generated-header">
            <div className="generated-title">
              <span style={{ color: "var(--primary)" }}>&#9636;</span>
              Comando
            </div>
            <button type="button" className="btn-copy" onClick={copyToClipboard}>
              &#9946; Copiar
            </button>
          </div>

          <div className="terminal-box">
            AT+GTPEO={equipament},{geoid},{mode},{startPoint},{endPoint},{longsAndLats},{checkInterval},{outputId},{outputStatus},{duration},{toggleTimes}
            ,,,,,FFFF$
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
