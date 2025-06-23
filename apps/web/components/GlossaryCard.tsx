import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{name}</span>
          {badge && <Badge category={badge} className="text-sm">{badge}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm whitespace-pre-line">{desc}</div>
        {extra && (
          <div className="mt-2 text-xs text-muted-foreground whitespace-pre-line">{extra}</div>
        )}
        {children}
      </CardContent>
    </Card>
  );
} 