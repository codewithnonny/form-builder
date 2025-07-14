"use client";

import { Header } from "@/components/header";
import { useFormStore } from "@/lib/store";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableFormField } from "./sortable-form-field";
import { EmptyCanvas } from "./empty-canvas";
import { cn } from "@/lib/utils";

const FormBuilderCanvas = () => {
  const { fields } = useFormStore();

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  return (
    <div className="space-y-4 h-full">
      <Header />

      <div
        ref={setNodeRef}
        className={cn(
          "min-h-full p-4 md:p-8 transition-all duration-300 ease-out relative",
          isOver &&
            "bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm"
        )}
      >
        {isOver && (
          <div className="absolute inset-4 md:inset-8 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center pointer-events-none animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm font-medium text-primary">
                Drop component here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Release to add to your form
              </p>
            </div>
          </div>
        )}

        {fields.length === 0 ? (
          <EmptyCanvas isOver={isOver} />
        ) : (
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 space-y-6 shadow-lg">
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SortableFormField field={field} index={index} />
                </div>
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    </div>
  );
};

export { FormBuilderCanvas };
