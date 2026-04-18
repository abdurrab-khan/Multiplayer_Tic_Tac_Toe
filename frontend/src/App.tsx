import { Outlet } from "react-router-dom";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <main className="home_page font-gameFont">
        <Outlet />
      </main>
    </AppProvider>
  );
}

export default App;
