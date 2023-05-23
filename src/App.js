import { Suspense } from "react";
import RouteConfig from "./config/RouteConfig";
import "boxicons/css/boxicons.min.css";

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <RouteConfig></RouteConfig>
      </Suspense>
    </>
  );
}

export default App;
