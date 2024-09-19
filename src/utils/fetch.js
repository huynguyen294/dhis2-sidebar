/* eslint-disable no-undef */
let username, password, baseUrl, appMode;
baseUrl = import.meta.env.VITE_BASE_URL;
username = import.meta.env.VITE_USERNAME;
password = import.meta.env.VITE_PASSWORD;
appMode = import.meta.env.VITE_APP_MODE;

const pull = async (endPoint) => {
  if (appMode === "development") {
    const result = await fetch(baseUrl + endPoint, {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    });
    const data = await result.json();
    return data;
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "pull", endPoint: baseUrl + endPoint }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      }
    });
  });
};

const push = async (endPoint, payload, method) => {
  if (appMode === "development") {
    const result = await fetch(baseUrl + endPoint, {
      method: method ? method : "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`),
      },
    });
    const data = await result.json();
    return data;
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "push",
            endPoint: baseUrl + endPoint,
            body: JSON.stringify(payload),
            method: method || "POST",
            headers: { "Content-Type": "application/json" },
          },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          }
        );
      }
    });
  });
};

export { pull, push };
