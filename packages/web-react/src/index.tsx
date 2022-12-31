import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "@arco-design/theme-high-contrast/css/arco.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LoadingView from "./components/LoadingView";
import { AppState, LocalConfigKey, useStore } from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import { useLocalStorage } from "./hooks";
import { Message } from "@arco-design/web-react";

Message.config({ maxCount: 3 });

// lazy loading pages
const Editor = lazy(() => import("./pages/Editor"));
const Collection = lazy(() => import("./pages/Collection"));
const Collections = lazy(() => import("./pages/Collections"));

const App = () => {
  const setMode = useStore((state) => state.setMode);
  const setUser = useStore((state) => state.setUser);
  const [getConfig] = useLocalStorage<AppState>(LocalConfigKey);

  const restoreUserConfig = () => {
    const userConfig = getConfig();
    setMode(userConfig.mode ?? { isDarkMode: false });
    setUser({
      id: "misaka12315",
      name: "御坂12315",
      avatar: "https://avatars.githubusercontent.com/u/16523798?s=56&v=4",
    });
  };

  useEffect(() => {
    restoreUserConfig();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingView />}>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/collection" element={<Collections />} />

          {/* <Route path="/new" element={<NewApp />} /> */}

          {/* redirect to editor */}
          <Route path="*" element={<Navigate to="/collection" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById("root")
);
