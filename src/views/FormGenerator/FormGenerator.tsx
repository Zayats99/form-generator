import { FC, useEffect, useState } from "react";
import { IFormGeneratorField, IFormGeneratorProps } from "./types";
import { FormField } from "./parts";

export const FormGenerator: FC<IFormGeneratorProps> = ({ formScheme, handleSubmitForm }) => {
  const [state, setState] = useState<IFormGeneratorField[]>([]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit", state);
    const data = {} as any;
    state.forEach((field) => {
      data[field.name] = field.value
    })

    handleSubmitForm(data)
  };

  const handleFieldChange = (data: IFormGeneratorField) => {
    const newState = state.map((field) => {
      if (field.name === data.name) {
        return {
          ...field,
          value: data.value,
          error: data.error,
        };
      }
      return field;
    });
    setState(newState);
  };

  useEffect(() => {
    if (!formScheme) return;
    const fildsArray = formScheme.map((field, index) => {
      const initialValue = field.value || field.devault_value || undefined;
      return {
        name: `${field.type}-${index}`,
        value: initialValue,
        error: "",
      };
    });

    setState(fildsArray);
  }, [formScheme]);

  return (
    <form className="flex flex-col gap-2 items-center">
      {formScheme.map((field, index) => (
        <FormField
          key={index}
          name={`${field.type}-${index}`}
          type={field.type}
          devault_value={field.devault_value}
          value={field.value}
          validation={field.validation}
          min_value={field.min_value}
          max_value={field.max_value}
          options={field.options}
          handleFieldChange={handleFieldChange}
        />
      ))}
      <button
        className={`border-2 py-0.5 px-1 ${
          state.findIndex((field) => field.error) ? "" : "opacity-50 pointer-events-none"
        }`}
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};
