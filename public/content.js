/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pull") {
    fetch(message.endPoint)
      .then((response) => response.json())
      .then((data) => sendResponse(data));
  }

  if (message.action === "push") {
    const { method, body, headers, endPoint } = message;
    fetch(endPoint, { method, body, headers })
      .then((response) => response.json())
      .then((data) => sendResponse(data));
  }

  if (message.action === "get_url") {
    const url = new URL(window.location.href);
    const hostname = `${url.protocol}//${url.hostname}`;
    const subName = url.href.replace(hostname, "").split("/")[1];
    sendResponse(`${hostname}/${subName}`);
  }

  // Nếu cần giữ kết nối mở để gửi phản hồi sau, trả lại true
  return true;
});
