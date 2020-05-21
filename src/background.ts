let prevURL = "";
let prevTitle = "";

chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.status == "complete") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const url = new URL(tabs[0].url);
        const { origin, pathname } = url;
        const currentURL = origin + pathname;
        const currentTitle = tabs[0].title;
        if (prevURL !== currentURL && prevTitle !== currentTitle) {
          prevURL = currentURL;
          prevTitle = currentTitle;
          chrome.tabs.sendMessage(tabs[0].id, { type: "update" });
        }
      }
    });
  }
});
