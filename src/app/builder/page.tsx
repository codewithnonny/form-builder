"use client";

import { FormBuilderCanvas } from "@/components/canvas";
import ComponentLibrary from "@/components/component-library";
import { FormPreview } from "@/components/form-preview";
import { Header } from "@/components/header";
import { PropertyPanel } from "@/components/property-panel";
import { FORM_COMPONENTS } from "@/lib/form-elements";
import { useFormStore } from "@/lib/store";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  const {
    isPreviewMode,
    draggedComponent,
    setDraggedComponent,
    addField,
    selectedFieldId,
    fields,
    reorderFields,
  } = useFormStore();

  const handleDragStart = (event: DragStartEvent) => {
    const componentId = event.active.id as string;
    const component = FORM_COMPONENTS.find((c) => c.id === componentId);
    if (component) {
      setDraggedComponent(component);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "canvas-drop-zone" && draggedComponent) {
      let defaultField: any = {
        type: draggedComponent.type,
        label: draggedComponent.label,
        placeholder: `Enter ${draggedComponent.label.toLowerCase()}...`,
        required: false,
        style: { width: "full" as const },
      };

      if (
        draggedComponent.type === "select" ||
        draggedComponent.type === "radio"
      ) {
        defaultField.options = [
          { id: "1", label: "Option 1", value: "option1" },
          { id: "2", label: "Option 2", value: "option2" },
          { id: "3", label: "Option 3", value: "option3" },
        ];
      }

      addField(defaultField);
    }

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over?.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderFields(oldIndex, newIndex);
    }

    setDraggedComponent(null);
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <FormPreview />
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <aside className="w-64 border-r border-black/5 flex flex-col">
          <div className="flex items-center gap-2 bg-white text-black p-4 border-b border-black/5 h-16">
            <Sparkles className="w-4 h-4 text-primary" />
            <Link href="/" className="font-semibold">
              Form Builder
            </Link>
          </div>
          <ComponentLibrary />
        </aside>
        <main className="flex-1 overflow-auto">
          <FormBuilderCanvas />
        </main>
        {selectedFieldId && (
          <>
            <div className="hidden lg:flex w-80 border-l border-border bg-card/30 backdrop-blur-sm">
              <PropertyPanel />
            </div>
            <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background">
              <PropertyPanel />
            </div>
          </>
        )}
      </div>
    </DndContext>
  );
}
