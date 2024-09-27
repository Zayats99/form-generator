import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { IFormField } from '../types';

type TFormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export const FormField: FC<IFormField> = ({
  name,
  default_value,
  value,
  validation,
  min_value,
  max_value,
  options,
  type,
  handleFieldChange,
}) => {
  const initialStateValue = value ?? default_value ?? '';

  const [state, setState] = useState({
    value: initialStateValue,
    error: '',
  });

  const validateField = (value: any) => {

    let error = '';

    if (validation) {
      error = new RegExp(validation).test(String(value)) ? '' : 'Invalid value';
    }

    if (type === 'text' || type === 'longtext') {
      const length = String(value).length;
      if (min_value !== undefined && length < min_value) {
        error = `Minimum ${min_value} characters required`;
      } else if (max_value !== undefined && length > max_value) {
        error = `Maximum ${max_value} characters allowed`;
      }
    } else if (type === 'number') {
      const numValue = Number(value);
      if (min_value !== undefined && numValue < min_value) {
        error = `Minimum value is ${min_value}`;
      } else if (max_value !== undefined && numValue > max_value) {
        error = `Maximum value is ${max_value}`;
      }
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<TFormField>) => {
    let value: any;

    switch (type) {
      case 'number':
        value = Number(e.target.value);
        break;
      case 'dropdown':
        value = typeof options === 'object' && options.every(Number.isInteger) ? Number(e.target.value) : e.target.value;
        break;
      case 'checkbox':
        value = (e.target as HTMLInputElement).checked;
        break;
      default:
        value = e.target.value;
    }

    const error = validateField(value);

    setState(prevState => ({
      ...prevState,
      value,
      error,
    }));

    handleFieldChange({
      name,
      value,
      error,
    });
  };

  useEffect(() => {
    // Validate initial value
    const error = validateField(state.value);
    if (error !== state.error) {
      setState(prevState => ({ ...prevState, error }));
      handleFieldChange({ name, value: state.value, error });
    }
  }, [validateField, state.value, state.error, name, handleFieldChange]);

  const renderValidationMessage = () => {
    if (state.error) {
      return <div className="mb-0 mt-[5px] text-sm text-red-500">{state.error}</div>;
    }
    return null;
  };

  const commonInputProps = {
    onChange: handleChange,
    className: `border-2 rounded px-2 py-1 ${state.error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`,
    required: true,
  };

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'longtext':
        return (
          <>
            {type === 'text'
              ? (
                <input {...commonInputProps} type="text" value={state.value as string} />
              )
              : (
                <textarea {...commonInputProps} value={state.value as string} rows={4} />
              )}
            {renderValidationMessage()}
          </>
        );

      case 'number':
        return (
          <>
            <input
              {...commonInputProps}
              type="number"
              value={state.value as number}
              min={min_value}
              max={max_value}
            />
            {renderValidationMessage()}
          </>
        );

      case 'dropdown':
        return (
          <>
            <select {...commonInputProps} value={state.value as string | number}>
              {(options as (string | number)[]).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {renderValidationMessage()}
          </>
        );

      case 'checkbox':
        return (
          <>
            <label className="flex cursor-pointer items-center">
              <div className="relative">
                <input
                  {...commonInputProps}
                  type="checkbox"
                  checked={state.value as boolean}
                  className="sr-only" // Hide the default checkbox
                />
                <div className="size-6 rounded-md border-2 border-gray-300 bg-white transition-colors duration-200 ease-in-out peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  {state.value && (
                    <svg className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-2 text-gray-700">Checkbox</span>
            </label>
            {renderValidationMessage()}
          </>
        );

      default:
        return null;
    }
  };

  return <div className="flex flex-col">{renderField()}</div>;
};
