'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '@/types/form';
import { FormFieldWrapper } from './form-field-wrapper';
import { FormFieldRenderer } from './form-field-renderer';


interface SortableFormFieldProps {
  field: FormField;
  index: number;
}

export function SortableFormField({ field, index }: SortableFormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : ''}`}
    >
      <FormFieldWrapper 
        field={field} 
        index={index}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        <FormFieldRenderer field={field} />
      </FormFieldWrapper>
    </div>
  );
}