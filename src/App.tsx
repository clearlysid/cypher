// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container" data-tauri-drag-region>
      <h1>Helmer v0.0.3</h1>

    </div>
  );
}

export default App;
