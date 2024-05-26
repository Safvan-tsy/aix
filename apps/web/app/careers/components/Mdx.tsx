import { MDXRemote } from "next-mdx-remote/rsc";

export default function RemoteMdxPage({
  markdown,
}: {
  markdown: string;
}) {
  return <MDXRemote source={markdown} />;
}
