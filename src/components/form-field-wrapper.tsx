import { ReactNode } from 'react';
import { useFormStore } from '@/lib/store';
import { FormField } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  Trash2,
  Star
} from 'lucide-react';

interface FormFieldWrapperProps {
  field: FormField;
  index: number;
  children: ReactNode;
  dragHandleProps?: any;
}

export function FormFieldWrapper({ 
  field, 
  index, 
  children, 
  dragHandleProps 
}: FormFieldWrapperProps) {
  const { 
    selectedFieldId, 
    selectField, 
    removeField, 
    duplicateField 
  } = useFormStore();

  const isSelected = selectedFieldId === field.id;

  return (
    <Card 
      className={`
        relative group transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'ring-2 ring-primary bg-primary/5 border-primary/50' 
          : 'hover:border-primary/30 hover:bg-card/80'
        }
      `}
      onClick={() => selectField(field.id)}
    >
      {isSelected && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <Star className="w-2.5 h-2.5 text-primary-foreground" />
        </div>
      )}

      <Badge 
        variant="secondary" 
        className="absolute -top-2 left-4 text-xs"
      >
        {index + 1}
      </Badge>
      <div 
        {...dragHandleProps}
        className={`
          absolute -left-4 top-1/2 transform -translate-y-1/2 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          cursor-grab active:cursor-grabbing
        `}
      >
        <div className="p-1 bg-background border border-border rounded">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className={`
        absolute -top-2 -right-2 flex gap-1 transition-all duration-200
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
      `}>    
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
          className="h-6 w-6 hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      {field.required && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 right-16 text-xs"
        >
          Required
        </Badge>
      )}
      <div className="p-6">
        {children}
      </div>
    </Card>
  );
}