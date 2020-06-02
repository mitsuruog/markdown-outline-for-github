export function parse($markdown: Element) {
  const $ul = document.createElement("ul");
  const $outline = $markdown.querySelectorAll("h1, h2, h3, h4, h5, h6");
  Array.from($outline).forEach(($element) => {
    const title = $element.textContent;
    const tagName = $element.tagName.toLowerCase();
    const href = $element.querySelector("a").href;
    const $anchor = document.createElement("a");
    $anchor.href = href;
    $anchor.textContent = title;
    const $li = document.createElement("li");
    $li.classList.add(
      `mitsuruog-markdown-outline__${tagName}`,
      "mitsuruog-markdown-outline__item"
    );
    $li.appendChild($anchor);
    $ul.appendChild($li);
  });
  $ul.classList.add("mitsuruog-markdown-outline__item-wrapper");
  return $ul;
}

export function getMarkdown(pathname: string, $body: HTMLElement) {
  const contents = $body.querySelectorAll(
    "article.markdown-body, #wiki-body .markdown-body"
  );
  return contents.length > 0 ? contents[0] : null;
}
