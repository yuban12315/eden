import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom";
import "@arco-design/theme-high-contrast/css/arco.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LoadingView from "./components/LoadingView";
import { useStore } from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

// lazy loading pages
const Editor = lazy(() => import("./pages/Editor"));

const App = () => {
  const setMode = useStore((state) => state.setMode);
  useEffect(() => {
    setMode({ isDarkMode: false });
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingView />}>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          {/* <Route path="/new" element={<NewApp />} /> */}

          {/* redirect to editor */}
          <Route path="*" element={<Navigate to="/editor" />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
