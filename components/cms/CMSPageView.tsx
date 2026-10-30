import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState, SerializedLexicalNode } from "lexical";
import type { CmsDoc } from "@/lib/cms/queries";

export function CMSPageView({ doc }: { doc: CmsDoc }) {
  const content = doc.content as SerializedEditorState<SerializedLexicalNode> | null | undefined;

  return (
    <article className="bg-white">
      <header className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {doc.title}
          </h1>
          {doc.excerpt ? (
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-brand-100/85">
              {doc.excerpt}
            </p>
          ) : null}
        </div>
      </header>
      {content?.root?.children?.length ? (
        <div className="mx-auto max-w-3xl px-6 py-14 text-[16.5px] leading-[1.75] text-slate-700 [&_a]:font-semibold [&_a]:text-brand-700 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
          <RichText data={content} />
        </div>
      ) : null}
    </article>
  );
}
