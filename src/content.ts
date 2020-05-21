import { getMarkdown, parse } from "./shared/markdown";

import "./content.scss";

function main() {
  const $app = document.querySelector("[mitsuruog-markdown-outline]");
  if ($app) {
    document.body.removeChild($app);
  }

  const $markdown = getMarkdown(window.location.pathname, document.body);
  if (!$markdown) {
    return;
  }

  const $button = document.createElement("div");
  $button.textContent = "Outline";
  $button.classList.add("mitsuruog-markdown-outline__button");
  $button.setAttributeNode(
    document.createAttribute("mitsuruog-markdown-outline__button")
  );

  const $contents = document.createElement("div");
  const $closeButton = document.createElement("button");
  $closeButton.setAttributeNode(
    document.createAttribute("mitsuruog-markdown-outline__close-button")
  );
  $closeButton.textContent = "close";

  const $contentsHeader = document.createElement("div");
  $contentsHeader.classList.add("mitsuruog-markdown-outline__header");
  $contentsHeader.appendChild($closeButton);

  $contents.setAttributeNode(
    document.createAttribute("mitsuruog-markdown-outline__contents")
  );
  $contents.classList.add("mitsuruog-markdown-outline__contents");
  $contents.appendChild($contentsHeader);
  $contents.appendChild(parse($markdown));

  const $wrapper = document.createElement("div");
  $wrapper.setAttributeNode(
    document.createAttribute("mitsuruog-markdown-outline")
  );
  $wrapper.classList.add("mitsuruog-markdown-outline");

  $wrapper.appendChild($button);
  $wrapper.appendChild($contents);

  $button.addEventListener("click", () => {
    $wrapper.classList.toggle("is-open");
    $contents.scrollTo(0, 0);
  });

  $closeButton.addEventListener("click", () => {
    $wrapper.classList.toggle("is-open");
  });

  document.body.appendChild($wrapper);
}

main();

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "update") {
    main();
  }
});
