"use client";

import { useFormStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Settings,
  Plus,
  Trash2,
  GripVertical,
  Type,
  Palette,
  Zap,
} from "lucide-react";
import { FormField } from "@/types/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function PropertyPanel() {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center mb-3 mx-auto">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Select a component to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handleUpdateField = (updates: any) => {
    updateField(selectedField.id, updates);
  };

  const addOption = () => {
    const currentOptions = selectedField.options || [];
    const newOption = {
      id: Math.random().toString(36).substr(2, 9),
      label: `Option ${currentOptions.length + 1}`,
      value: `option${currentOptions.length + 1}`,
    };

    handleUpdateField({
      options: [...currentOptions, newOption],
    });
  };

  const updateOption = (optionId: string, updates: any) => {
    const updatedOptions = selectedField.options?.map((option) =>
      option.id === optionId ? { ...option, ...updates } : option
    );
    handleUpdateField({ options: updatedOptions });
  };

  const removeOption = (optionId: string) => {
    const updatedOptions = selectedField.options?.filter(
      (option) => option.id !== optionId
    );
    handleUpdateField({ options: updatedOptions });
  };

  const addValidationRule = () => {
    const currentRules = selectedField.validationRules || [];
    const newRule = {
      id: Math.random().toString(36).substr(2, 9),
      type: "",
      value: "",
      message: "",
      enabled: true,
    };

    handleUpdateField({
      validationRules: [...currentRules, newRule],
    });
  };

  const updateValidationRule = (ruleId: string, updates: any) => {
    const updatedRules = selectedField.validationRules?.map((rule) =>
      rule.id === ruleId ? { ...rule, ...updates } : rule
    );
    handleUpdateField({ validationRules: updatedRules });
  };

  const removeValidationRule = (ruleId: string) => {
    const updatedRules = selectedField.validationRules?.filter(
      (rule) => rule.id !== ruleId
    );
    handleUpdateField({ validationRules: updatedRules });
  };

  const hasOptions = ["select", "radio"].includes(selectedField.type);

  return (
    <div className="h-full flex flex-col overflow-hidden slide-in-right">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <Card className="p-4 glass-strong border-accent/20 bg-gradient-to-br from-accent/5 to-transparent fade-in-up">
            <div className="flex items-center space-x-3 mt-3">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"></div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {selectedField.type.charAt(0).toUpperCase() +
                    selectedField.type.slice(1)}{" "}
                  Field
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Field ID: {selectedField.id.slice(-8)}
                </p>
              </div>
            </div>
          </Card>
          <Card
            className="p-4 glass hover:glass-strong transition-all duration-300 fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                <Type className="w-3 h-3 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Basic Properties</h3>
              <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 ml-2" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="label"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Label
                  <span className="text-xs text-muted-foreground">
                    (required)
                  </span>
                </Label>
                <Input
                  id="label"
                  value={selectedField.label}
                  onChange={(e) => handleUpdateField({ label: e.target.value })}
                  placeholder="Enter field label"
                  className="transition-all hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeholder" className="text-sm font-medium">
                  Placeholder
                </Label>
                <Input
                  id="placeholder"
                  value={selectedField.placeholder || ""}
                  onChange={(e) =>
                    handleUpdateField({ placeholder: e.target.value })
                  }
                  placeholder="Enter placeholder text"
                  className="transition-all hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="required" className="text-sm font-medium">
                      Required Field
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Make this field mandatory for users
                    </p>
                  </div>
                  <Switch
                    id="required"
                    checked={selectedField.required}
                    onCheckedChange={(checked) =>
                      handleUpdateField({ required: checked })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </div>
          </Card>
          {hasOptions && (
            <Card
              className="p-4 glass hover:glass-strong transition-all duration-300 fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Palette className="w-3 h-3 text-accent" />
                  </div>
                  <h3 className="font-medium text-sm">Options</h3>
                  <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 ml-2" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="gap-1.5 bg-accent/5 hover:bg-accent/10 text-accent border-accent/20 hover:border-accent/40 transition-all hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-3">
                {selectedField.options?.map((option, index) => (
                  <div
                    key={option.id}
                    className="group flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 hover:border-border/50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs text-accent font-medium">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Input
                        value={option.label}
                        onChange={(e) =>
                          updateOption(option.id, { label: e.target.value })
                        }
                        placeholder="Option display text"
                        className="text-sm border-transparent focus:border-accent group-hover:border-border/30 transition-all"
                      />
                      <Input
                        value={option.value}
                        onChange={(e) =>
                          updateOption(option.id, { value: e.target.value })
                        }
                        placeholder="Option value"
                        className="text-xs border-transparent focus:border-accent group-hover:border-border/30 transition-all"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(option.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0 opacity-50 group-hover:opacity-100 transition-all hover:bg-destructive/10"
                      disabled={selectedField.options?.length === 1}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card
            className="p-4 glass hover:glass-strong transition-all duration-300 fade-in-up"
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-warning" />
                </div>
                <h3 className="font-medium text-sm">Validation Rules</h3>
                <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 ml-2" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addValidationRule}
                className="gap-1.5 bg-warning/5 hover:bg-warning/10 text-warning border-warning/20 hover:border-warning/40 transition-all hover:scale-105"
              >
                <Plus className="w-3 h-3" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-3">
              {selectedField.validationRules?.map((rule, index) => (
                <div
                  key={rule.id}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 hover:border-border/50 transition-all"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2 flex-col">
                      <div>
                        <Label className="text-sm font-medium">Type</Label>
                        <Select
                          value={rule.type}
                          onValueChange={(value) =>
                            updateValidationRule(rule.id, {
                              type: value as any,
                            })
                          }
                        >
                          <SelectTrigger className="glass">
                            <SelectValue placeholder="Select Rule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minLength">
                              Min Length
                            </SelectItem>
                            <SelectItem value="maxLength">
                              Max Length
                            </SelectItem>
                            <SelectItem value="pattern">
                              Pattern (Regex)
                            </SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Value</Label>

                        <Input
                          value={rule.value}
                          onChange={(e) =>
                            updateValidationRule(rule.id, {
                              value: e.target.value,
                            })
                          }
                          placeholder={
                            rule.type === "custom"
                              ? "Custom validation expression like phone , url and email."
                              : "Value"
                          }
                          className="text-sm border-transparent focus:border-warning group-hover:border-border/30 transition-all flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Message</Label>
                      <Input
                        value={rule.message}
                        onChange={(e) =>
                          updateValidationRule(rule.id, {
                            message: e.target.value,
                          })
                        }
                        placeholder="Error message"
                        className="text-xs border-transparent focus:border-warning group-hover:border-border/30 transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeValidationRule(rule.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0 opacity-50 group-hover:opacity-100 transition-all hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}

              {(!selectedField.validationRules ||
                selectedField.validationRules.length === 0) && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No validation rules yet. Add one to get started.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
