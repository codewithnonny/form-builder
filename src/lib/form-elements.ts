import { FormComponent } from "@/types/form";

export const FORM_COMPONENTS: FormComponent[] = [
  {
    id: "text",
    type: "text",
    label: "Text Input",
    icon: "Type",
    description: "Single line text input for names, titles, etc.",
    category: "input",
  },
  {
    id: "textarea",
    type: "textarea",
    label: "Text Area",
    icon: "FileText",
    description: "Multi-line text input for descriptions, comments",
    category: "input",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    icon: "Mail",
    description: "Email input with built-in validation",
    category: "input",
  },
  {
    id: "number",
    type: "number",
    label: "Number",
    icon: "Hash",
    description: "Numeric input with validation",
    category: "input",
  },
  {
    id: "select",
    type: "select",
    label: "Dropdown",
    icon: "ChevronDown",
    description: "Single selection from a list of options",
    category: "selection",
  },
  {
    id: "radio",
    type: "radio",
    label: "Radio Group",
    icon: "Circle",
    description: "Single selection from visible options",
    category: "selection",
  },
  {
    id: "checkbox",
    type: "checkbox",
    label: "Checkbox",
    icon: "Square",
    description: "Boolean true/false or multiple selections",
    category: "selection",
  },
];

export const COMPONENT_CATEGORIES = {
  input: {
    label: "Input Fields",
    description: "Text and data entry components",
  },
  selection: {
    label: "Selection",
    description: "Choice and option components",
  },
  layout: {
    label: "Layout",
    description: "Structure and organization",
  },
} as const;
