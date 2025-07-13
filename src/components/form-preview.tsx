import { useState } from 'react';
import { useFormStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Eye, 
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { FormFieldRenderer } from './form-field-renderer';

export function FormPreview() {
  const { fields } = useFormStore();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});


  console.log(fields)

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  if (fields.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 mx-auto">
            <Eye className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Form to Preview</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Add some components to your form first, then preview how it will look to users.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="outline" className="gap-1.5">
              <Eye className="w-3 h-3" />
              Live Preview
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Form</h1>
          <p className="text-muted-foreground">
            This is how your form will appear to users
          </p>
        </div>
        <Card className="glass-strong p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <FormFieldRenderer
                  field={field}
                  value={formData[field.id]}
                  onChange={(value) => handleFieldChange(field.id, value)}
                />
                
                {errors[field.id] && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors[field.id]}
                  </div>
                )}
              </div>
            ))}

            <Separator className="my-8" />
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                {fields.length} field{fields.length !== 1 ? 's' : ''} •
                {fields.filter(f => f.required).length} required
              </div>
              
              <Button type="submit" className="gap-2">
                <Send className="w-4 h-4" />
                Submit Form
              </Button>
            </div>
          </form>
        </Card>

        <Card className="mt-6 p-4 glass">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Form Data (Debug)
          </h3>
          <pre className="text-xs text-muted-foreground overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}