export type FormFieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "number"
  | "email";

export interface FormFieldOption {
  id: string;
  label: string;
  value: string;
}

export interface ValidationRule {
  id: string;
  type: "minLength" | "maxLength" | "pattern" | "custom";
  value: string | number;
  message: string;
  enabled: boolean;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
  validationRules?: ValidationRule[];
  style?: {
    width: "full" | "half" | "third";
    margin?: "sm" | "md" | "lg";
  };
}

export interface FormComponent {
  id: string;
  type: FormFieldType;
  label: string;
  icon: string;
  description: string;
  category: "input" | "selection" | "layout";
}

export interface FormState {
  fields: FormField[];
  selectedFieldId: string | null;
  isPreviewMode: boolean;
  draggedComponent: FormComponent | null;
  addField: (field: Omit<FormField, "id">) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  selectField: (id: string | null) => void;
  togglePreviewMode: () => void;
  setDraggedComponent: (component: FormComponent | null) => void;
  duplicateField: (id: string) => void;
  clearForm: () => void;
}
