import { getMarkdown, parse } from "./markdown";
import "@testing-library/jest-dom";

describe("Test getMarkdown", () => {
  test("should return null if the content is empty", () => {
    const container = document.createElement("div");
    expect(getMarkdown("", container)).toEqual(null);
  });
  test("should return null if the content does not match", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <article>
        <div>Markdown</div>
      </article>
    `;
    expect(getMarkdown("", container)).toEqual(null);
  });
  test("should return child nodes if the content matches", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <article class="markdown-body">
        <div>Markdown</div>
      </article>
    `;
    expect(getMarkdown("", container)).toHaveTextContent("Markdown");
  });
});

describe("Test parse", () => {
  let result: HTMLElement | null = null;
  beforeEach(() => {
    const container = document.createElement("div");
    container.innerHTML = `
      <h1><a href="/h1">H1</a></h1>
      <h2><a href="/h2">H2</a></h2>
      <h3><a href="/h3">H3</a></h3>
      <h4><a href="/h4">H4</a></h4>
      <h5><a href="/h5">H5</a></h5>
      <h6><a href="/h6">H6</a></h6>
    `;
    result = parse(container);
  });

  test("should parse the markdown", () => {
    expect(result).toMatchSnapshot();
  });

  test("should parse h1 tag", () => {
    const h1 = result.querySelector("mitsuruog-markdown-outline__h1");
    expect(h1).toBeDefined();
  });
});
