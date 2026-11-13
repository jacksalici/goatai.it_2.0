import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title={
        <>
          This goat <em>wandered off.</em>
        </>
      }
      intro="The page you're looking for doesn't exist, or it moved to greener pastures."
    >
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </PageHeader>
  );
}
