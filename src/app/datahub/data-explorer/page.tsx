import { redirect } from "next/navigation";

export default function DataExplorerRedirect({
  searchParams,
}: {
  searchParams: { dataset?: string };
}) {
  const query = searchParams.dataset
    ? `?dataset=${encodeURIComponent(searchParams.dataset)}`
    : "";
  redirect(`/lab/explorer${query}`);
}
