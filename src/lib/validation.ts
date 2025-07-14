import { ValidationRule } from '@/types/form';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateFieldValue(
  value: any,
  validationRules: ValidationRule[] = [],
  required = false
): ValidationResult {
  if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return {
      isValid: false,
      message: 'This field is required'
    };
  }
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: true };
  }
  for (const rule of validationRules) {
    if (!rule.enabled) continue;

    const result = validateRule(value, rule);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

function validateRule(value: any, rule: ValidationRule): ValidationResult {
  const stringValue = String(value);

  switch (rule.type) {
    case 'minLength':
      const minLength = Number(rule.value);
      if (stringValue.length < minLength) {
        return {
          isValid: false,
          message: rule.message || `Must be at least ${minLength} characters`
        };
      }
      break;

    case 'maxLength':
      const maxLength = Number(rule.value);
      if (stringValue.length > maxLength) {
        return {
          isValid: false,
          message: rule.message || `Must be no more than ${maxLength} characters`
        };
      }
      break;

    case 'pattern':
      try {
        const regex = new RegExp(String(rule.value));
        if (!regex.test(stringValue)) {
          return {
            isValid: false,
            message: rule.message || 'Value does not match the required pattern'
          };
        }
      } catch (error) {
        return {
          isValid: false,
          message: 'Invalid pattern configuration'
        };
      }
      break;

    case 'custom':
      try {
        const customRule = String(rule.value);
        if (customRule.includes('email')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(stringValue)) {
            return {
              isValid: false,
              message: rule.message || 'Please enter a valid email address'
            };
          }
        } else if (customRule.includes('phone')) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          if (!phoneRegex.test(stringValue.replace(/[\s\-\(\)]/g, ''))) {
            return {
              isValid: false,
              message: rule.message || 'Please enter a valid phone number'
            };
          }
        } else if (customRule.includes('url')) {
          try {
            new URL(stringValue);
          } catch {
            return {
              isValid: false,
              message: rule.message || 'Please enter a valid URL'
            };
          }
        } else if (customRule.includes('number')) {
          if (isNaN(Number(stringValue))) {
            return {
              isValid: false,
              message: rule.message || 'Please enter a valid number'
            };
          }
        }
      } catch (error) {
        return {
          isValid: false,
          message: 'Custom validation error'
        };
      }
      break;
  }

  return { isValid: true };
}