import { MousePointer2, Sparkles } from 'lucide-react';

interface EmptyCanvasProps {
  isOver: boolean;
}

export function EmptyCanvas({ isOver }: EmptyCanvasProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className={`
        text-center transition-all duration-300 p-12 rounded-2xl border-2 border-dashed
        ${isOver 
          ? 'border-primary bg-primary/10 scale-105' 
          : 'border-muted-foreground/30 hover:border-muted-foreground/50'
        }
      `}>
        <div className={`
          inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300
          ${isOver ? 'bg-primary/20 glow-primary' : 'bg-muted/20'}
        `}>
          {isOver ? (
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          ) : (
            <MousePointer2 className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        
        <h3 className={`
          text-lg font-semibold mb-2 transition-colors duration-300
          ${isOver ? 'text-primary' : 'text-foreground'}
        `}>
          {isOver ? 'Drop to Add Component' : 'Start Building Your Form'}
        </h3>
        
        <p className="text-muted-foreground max-w-sm mx-auto">
          {isOver 
            ? 'Release to add this component to your form'
            : 'Drag components from the sidebar to start building your form. Components will appear here as you add them.'
          }
        </p>
        
        {!isOver && (
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Ready to build something amazing</span>
          </div>
        )}
      </div>
    </div>
  );
}