import { notFound } from "next/navigation";
import { SenderDetail } from "@/components/SenderDetail";
import { getSender, senders } from "@/lib/data";

export function generateStaticParams() {
  return senders.map((sender) => ({ id: sender.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sender = getSender(id);
  return {
    title: sender ? `${sender.domain} · Inbox Triage` : "Sender · Inbox Triage",
  };
}

export default async function SenderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sender = getSender(id);
  if (!sender) notFound();
  return <SenderDetail sender={sender} />;
}
