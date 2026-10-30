type TextNode = {
  type: "text";
  text: string;
  detail: 0;
  format: 0;
  mode: "normal";
  style: "";
  version: 1;
};

type ElementNode = {
  type: string;
  children: Array<TextNode | ElementNode>;
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
  tag?: string;
  listType?: "bullet" | "number";
  start?: number;
  value?: number;
};

export type LexicalRoot = {
  root: {
    type: "root";
    children: ElementNode[];
    direction: "ltr";
    format: "";
    indent: 0;
    version: 1;
  };
};

function text(value: string): TextNode {
  return {
    type: "text",
    text: value,
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    version: 1,
  };
}

function paragraph(value: string): ElementNode {
  return {
    type: "paragraph",
    children: [text(value)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function heading(value: string, level: 2 | 3): ElementNode {
  return {
    type: "heading",
    tag: level === 3 ? "h3" : "h2",
    children: [text(value)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function list(items: string[], ordered: boolean): ElementNode {
  return {
    type: "list",
    listType: ordered ? "number" : "bullet",
    tag: ordered ? "ol" : "ul",
    start: 1,
    children: items.map((item, index) => ({
      type: "listitem",
      value: index + 1,
      children: [text(item)],
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1 as const,
    })),
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

type LooseBlock = {
  type: string;
  text?: string;
  level?: 2 | 3;
  items?: string[];
  style?: string;
  attribution?: string;
  title?: string;
  body?: string;
  heading?: string;
  buttonLabel?: string;
  alt?: string;
  caption?: string;
};

/** Turn the existing blog blocks into a default Payload Lexical document. */
export function blocksToLexical(blocks: LooseBlock[]): LexicalRoot {
  const children: ElementNode[] = [];
  for (const block of blocks) {
    if (block.type === "paragraph" && block.text) children.push(paragraph(block.text));
    else if (block.type === "heading" && block.text) children.push(heading(block.text, block.level === 3 ? 3 : 2));
    else if (block.type === "list" && block.items?.length) {
      children.push(list(block.items, block.style === "number"));
    } else if (block.type === "quote" && block.text) {
      const line = block.attribution ? `${block.text} — ${block.attribution}` : block.text;
      children.push(paragraph(line));
    } else if (block.type === "callout") {
      const line = [block.title, block.body].filter(Boolean).join(" — ");
      if (line) children.push(paragraph(line));
    } else if (block.type === "image") {
      const line = [block.alt, block.caption].filter(Boolean).join(" — ");
      if (line) children.push(paragraph(line));
    } else if (block.type === "cta") {
      const line = [block.heading, block.body, block.buttonLabel].filter(Boolean).join(" — ");
      if (line) children.push(paragraph(line));
    }
  }
  if (children.length === 0) children.push(paragraph(""));
  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}
