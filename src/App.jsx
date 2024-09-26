/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import useMetadataStore from "./states/metadata";
import Content from "./components/Content";
import { pull } from "./utils/fetch";
import { INSTANCES } from "./constants";
import { Spinner } from "@nextui-org/react";
import "./App.css";

const appMode = import.meta.env.VITE_APP_MODE;

function App() {
  const { setSystemSettings, setMe /* setOrgUnits */ } = useMetadataStore(
    useShallow((state) => ({
      setSystemSettings: state.setSystemSettings,
      setMe: state.setMe,
      setOrgUnits: state.setOrgUnits,
    }))
  );

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [ssResult, infoResult, meResult /* orgUnitsResult */] = await Promise.all([
          pull("/api/systemSettings"),
          pull("/api/system/info"),
          pull("/api/me"),
          // pull("/api/organisationUnits.json?paging=false&fields=id,name,displayName,parent"),
        ]);

        setSystemSettings({ ...ssResult, ...infoResult });
        setMe({ ...meResult });
        // setOrgUnits([...orgUnitsResult.organisationUnits]);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (appMode === "production") {
      try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "get_url" }, (response) => {
              if (response) {
                const found = INSTANCES.find((instance) => response.includes(instance));
                if (found) setReady(true);
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setReady(true);
    }
  }, [appMode]);

  if (!ready)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-center text-lg">
        This extension only works on :
        <ul>
          {INSTANCES.map((url) => (
            <li key={url}>{url}</li>
          ))}
        </ul>
        Please try again.
      </div>
    );

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-center text-lg">
        <Spinner />
        <p>Initializing...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-center text-lg">
        <p>Please login and reopen.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 grow-1">
        <Content />
      </div>
    </div>
  );
}

export default App;
