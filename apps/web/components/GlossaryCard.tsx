import { Card, CardContent,CardHeader, CardTitle } from "@repo/ui/card";
import { ReactNode } from "react";

import { Badge } from "./Badge";

interface GlossaryCardProps {
  name: string;
  desc: string;
  badge?: string;
  extra?: string;
  children?: ReactNode;
}

export function GlossaryCard({ name, desc, badge, extra, children }: GlossaryCardProps) {
  return (
    <Card className="w-full max-w-full bg-card border border-border">
      <CardHeader className="w-full max-w-full px-4 py-4">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <span className="truncate">{name}</span>
          {badge && <Badge category={badge} className="text-sm ml-2">{badge}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full max-w-full px-4 pb-4 pt-0">
        <div className="text-sm text-foreground whitespace-pre-line">{desc}</div>
        {extra && (
          <div className="mt-2 text-xs text-muted-foreground whitespace-pre-line">{extra}</div>
        )}
        {children}
      </CardContent>
    </Card>
  );
} 