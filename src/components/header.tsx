import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFormStore } from "@/lib/store";
import { Eye, Edit3, Trash2 } from "lucide-react";

export function Header() {
  const { isPreviewMode, togglePreviewMode, fields, clearForm } =
    useFormStore();

  return (
    <header className="h-16 border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold gradient-text">FormKit</h1>
          <div className="text-sm text-muted-foreground">
            {fields.length} component{fields.length !== 1 ? "s" : ""}
          </div>
          <Badge variant="secondary" className="text-xs">
            {isPreviewMode ? "Preview Mode" : "Builder Mode"}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={isPreviewMode ? "default" : "outline"}
            size="sm"
            onClick={togglePreviewMode}
            className="gap-2"
          >
            {isPreviewMode ? (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Form
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Preview
              </>
            )}
          </Button>

          {fields.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearForm}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
