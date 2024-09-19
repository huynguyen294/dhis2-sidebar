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

export { sendMessage };
