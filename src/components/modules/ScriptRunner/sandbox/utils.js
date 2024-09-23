const sendMessage = (event, action, resultAction, payload) =>
  resultAction
    ? new Promise((resolve) => {
        const onMessage = ({ data }) => {
          if (data.action === resultAction) {
            window.removeEventListener("message", onMessage);
            resolve(data.result);
          }
        };

        window.addEventListener("message", onMessage);
        event.source.postMessage({ action, ...payload }, "*");
      })
    : event.source.postMessage({ action, ...payload }, "*");

const loadScript = (cdn) =>
  new Promise((resolve, reject) => {
    const loadedScript = document.createElement("script");
    loadedScript.src = cdn;
    loadedScript.onload = () => {
      resolve(loadedScript);
    };
    loadedScript.onerror = () => {
      reject(`Failed to load the library: ${cdn}`);
    };

    document.head.appendChild(loadedScript);
  });

export { sendMessage, loadScript };
