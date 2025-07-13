"use client";

import { Badge } from "@/components/ui/badge";
import { FormComponent } from "@/types/form";
import { COMPONENT_CATEGORIES, FORM_COMPONENTS } from "@/lib/form-elements";
import DraggableComponent from "./draggable-component";

export default function ComponentLibrary() {
  const componentsByCategory = FORM_COMPONENTS.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, FormComponent[]>);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-lg font-semibold">Components</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Drag components to the canvas to build your form
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {Object.entries(componentsByCategory).map(
            ([categoryKey, components], index) => {
              const category =
                COMPONENT_CATEGORIES[
                  categoryKey as keyof typeof COMPONENT_CATEGORIES
                ];

              return (
                <div
                  key={categoryKey}
                  className="space-y-4 fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-foreground">
                        {category.label}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {components.length}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="grid gap-3">
                    {components.map((component, componentIndex) => (
                      <div
                        key={component.id}
                        className="fade-in-up"
                        style={{
                          animationDelay: `${
                            index * 100 + componentIndex * 50
                          }ms`,
                        }}
                      >
                        <DraggableComponent component={component} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
