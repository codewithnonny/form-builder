import { FormField } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FormFieldRendererProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
}

export function FormFieldRenderer({ field, value, onChange }: FormFieldRendererProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleInputChange}
            className="glass"
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleInputChange}
            className="glass"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleInputChange}
            className="glass"
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleInputChange}
            className="glass min-h-[100px]"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="glass">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="text-sm font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value || false}
              onCheckedChange={onChange}
            />
            <Label 
              htmlFor={field.id} 
              className="text-sm font-normal cursor-pointer"
            >
              {field.placeholder || 'Check this option'}
            </Label>
          </div>
        );

      default:
        return (
          <div className="p-4 border border-dashed border-muted-foreground/50 rounded-lg text-center text-muted-foreground">
            Unknown field type: {field.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label 
          htmlFor={field.id}
          className="text-sm font-medium"
        >
          {field.label}
        </Label>
        {field.required && (
          <span className="text-destructive text-sm">*</span>
        )}
      </div>
      {renderField()}
    </div>
  );
}