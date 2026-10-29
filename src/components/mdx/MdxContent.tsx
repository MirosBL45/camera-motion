import { evaluate } from "next-mdx-remote-client/rsc";

import type { MDXComponents } from "mdx/types";

import { MdxFigure } from "./MdxFigure";
import { MdxLink } from "./MdxLink";
import { MdxYouTube } from "./MdxYouTube";

// Komponente dostupne u MDX člancima; `a` pokriva i obične markdown linkove.
const MDX_COMPONENTS: MDXComponents = {
  a: MdxLink,
  YouTube: MdxYouTube,
  Figure: MdxFigure,
};

interface IMdxContentProps {
  /** MDX tekst članka bez frontmattera. */
  source: string;
}

// Tekst članka se pretvara u React na serveru, pri build-u (članci su SSG).
// `import`/`export` u MDX-u nisu dozvoljeni — članci koriste samo komponente iznad.
export async function MdxContent({ source }: IMdxContentProps) {
  const { content, error } = await evaluate({
    source,
    components: MDX_COMPONENTS,
    options: { disableImports: true, disableExports: true },
  });

  // Greška u MDX sintaksi ruši build, umesto da se na sajtu prikaže pokvaren članak.
  if (error) throw error;

  return content;
}
