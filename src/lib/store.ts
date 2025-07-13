import { FormField, FormState } from "@/types/form";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useFormStore = create<FormState>()(
  devtools(
    (set, get) => ({
      fields: [],
      selectedFieldId: null,
      isPreviewMode: false,
      draggedComponent: null,

      addField: (fieldData) => {
        const newField: FormField = {
          ...fieldData,
          id: generateId(),
        };

        set((state) => ({
          fields: [...state.fields, newField],
          selectedFieldId: newField.id,
        }));
      },

      removeField: (id) => {
        set((state) => ({
          fields: state.fields.filter((field) => field.id !== id),
          selectedFieldId:
            state.selectedFieldId === id ? null : state.selectedFieldId,
        }));
      },

      updateField: (id, updates) => {
        set((state) => ({
          fields: state.fields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
          ),
        }));
      },

      reorderFields: (fromIndex, toIndex) => {
        set((state) => {
          const newFields = [...state.fields];
          const [removed] = newFields.splice(fromIndex, 1);
          newFields.splice(toIndex, 0, removed);
          return { fields: newFields };
        });
      },

      selectField: (id) => {
        set({ selectedFieldId: id });
      },

      togglePreviewMode: () => {
        set((state) => ({
          isPreviewMode: !state.isPreviewMode,
          selectedFieldId: state.isPreviewMode ? state.selectedFieldId : null,
        }));
      },

      setDraggedComponent: (component) => {
        set({ draggedComponent: component });
      },

      duplicateField: (id) => {
        const field = get().fields.find((f) => f.id === id);
        if (field) {
          const duplicatedField: FormField = {
            ...field,
            id: generateId(),
            label: `${field.label} (Copy)`,
          };

          set((state) => ({
            fields: [...state.fields, duplicatedField],
            selectedFieldId: duplicatedField.id,
          }));
        }
      },

      clearForm: () => {
        set({
          fields: [],
          selectedFieldId: null,
          isPreviewMode: false,
        });
      },
    }),
    {
      name: "form-builder-store",
    }
  )
);
