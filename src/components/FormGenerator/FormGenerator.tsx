'use client';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { FormField } from './parts';
import type { IFormDTO, IFormField, IFormGeneratorField } from './types';

export type IFormGeneratorProps = {
  formScheme: IFormDTO[];
};

export const FormGenerator: FC<IFormGeneratorProps> = ({ formScheme }) => {
  const [fields, setFields] = useState<IFormField[]>([]);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    // Check if all fields are valid before submitting
    const isFormValid = fields.every(field => !field.error);
    if (!isFormValid) {
      console.error('Form has validation errors');
      return;
    }

    setIsSubmitting(true);

    const data = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, any>);

    setFormData(data);
    // Simulate API call
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleFieldChange = (data: IFormGeneratorField) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.name === data.name ? { ...field, ...data } : field,
      ),
    );
  };

  useEffect(() => {
    if (!formScheme) {
      setFields([]);
      return;
    }

    const initialFields = formScheme.map((field, index) => ({
      ...field,
      name: field.name || `${field.type}-${index}`,
      value: field.value || field.default_value || '',
      error: '',
      handleFieldChange: () => { },
    }));

    setFields(initialFields);

    setFormData({});
  }, [formScheme]);

  return (
    <div className="mx-auto mt-8 rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {fields.map((field, index) => (
          <FormField
            key={`${field.name}_${index}`}
            {...field}
            handleFieldChange={handleFieldChange}
          />
        ))}
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
          disabled={isSubmitting || fields.some(field => !!field.error)}
          type='button'
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {Object.keys(formData).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Form Data:</h2>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-3 font-mono">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
