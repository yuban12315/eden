import "./reset.css";
import "./global.css";
import "@arco-design/theme-high-contrast/css/arco.css";

import { ApolloProvider } from "@apollo/client";
import { Message } from "@arco-design/web-react";
import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import client from "./apollo";
import LoadingView from "./components/LoadingView";
import { useLocalStorage } from "./hooks";
import { AppState, LocalConfigKey, useStore } from "./store";

Message.config({ maxCount: 3 });

// lazy loading pages
const Editor = lazy(() => import("./pages/Editor"));
const Collection = lazy(() => import("./pages/CollectionDetail"));
const CollectionList = lazy(() => import("./pages/CollectionList"));
const Note = lazy(() => import("./pages/Note"));

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
          <Route path="/editor" element={<Editor />} />{" "}
          <Route path="/collection" element={<CollectionList />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/note/:id" element={<Note />} />
          {/* <Route path="/new" element={<NewApp />} /> */}
          {/* redirect to editor */}
          <Route path="*" element={<Navigate to="/Collection" />} />
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
