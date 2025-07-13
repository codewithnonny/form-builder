"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { FormComponent } from "@/types/form";
import * as LucideIcons from "lucide-react";

interface DraggableComponentProps {
  component: FormComponent;
}

export default function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: component.id,
  });

  const IconComponent = LucideIcons[
    component.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group cursor-grab active:cursor-grabbing transition-all duration-300 select-none
        ${
          isDragging
            ? "opacity-50 scale-95 rotate-3 z-50"
            : "hover:scale-[1.02] hover:-translate-y-0.5"
        }
      `}
    >
      <Card
        className={`
        relative p-4 glass border-border/50 overflow-hidden
        transition-all duration-300 ease-out
        hover:glass-strong hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10
        active:scale-95 active:rotate-1
        ${isDragging ? "rotate-3 scale-95" : ""}
      `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-start gap-3">
          <div
            className={`
            p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
            group-hover:from-primary/20 group-hover:to-primary/10
            transition-all duration-300 shrink-0 ring-1 ring-primary/10
            group-hover:ring-primary/20 group-hover:scale-105
          `}
          >
            {IconComponent && (
              <IconComponent className="w-5 h-5 text-primary group-hover:text-primary transition-colors duration-300" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4
              className={`
              font-semibold text-sm mb-1.5 transition-all duration-300
              group-hover:text-primary group-hover:translate-x-0.5
              ${isDragging ? "text-primary" : ""}
            `}
            >
              {component.label}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
              {component.description}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary/40 rounded-sm" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}