import { FC, useState } from "react";
import { IFormField } from "../types";

type TFormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export const FormField: FC<IFormField> = ({
  name,
  devault_value,
  value,
  validation,
  min_value,
  max_value,
  options,
  type,
  handleFieldChange,
}) => {
  const initialStateValue = value || devault_value || undefined;

  const [state, setState] = useState({
    value: initialStateValue,
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<TFormField>) => {
    let value;

    if (type === "number") {
      value = Number(e.target.value);
    } else if (type === "dropdown") {
      if (typeof options === "number") {
        value = Number(e.target.value);
      } else {
        value = e.target.value;
      }
    } else if (typeof state.value === "boolean") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    let error = "";
    if (validation) {
      const regex = new RegExp(validation);
      const isValid = regex.test(e.target.value);
      if (!isValid) {
        error = "Invalid value";
      } else {
        error = "";
      }
    }

    setState({
      ...state,
      value,
      error,
    });

    handleFieldChange({
      name: name,
      value,
      error,
    });
  };

  if (type === "text" && typeof state.value === "string") {
    return (
      <input
        onChange={handleChange}
        className={`border-2 py-0.5 px-1 ${state.error ? "border-red-500" : ""}`}
        type="text"
        value={state.value}
      />
    );
  }

  if (type === "longtext" && typeof state.value === "string") {
    return (
      <textarea
        onChange={handleChange}
        className={`border-2 py-0.5 px-1 ${state.error ? "border-red-500" : ""}`}
        value={state.value}
      />
    );
  }

  if (type === "number" && typeof state.value === "number") {
    return (
      <input
        onChange={handleChange}
        className={`border-2 py-0.5 px-1 ${state.error ? "border-red-500" : ""}`}
        type="number"
        value={state.value}
        min={min_value}
        max={max_value}
      />
    );
  }

  if (type === "dropdown" && typeof state.value !== "boolean") {
    const selectOptions = options || [];
    return (
      <select
        onChange={handleChange}
        className={`border-2 py-0.5 px-1 ${state.error ? "border-red-500" : ""}`}
        value={state.value}
      >
        {selectOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (typeof state.value === "boolean") {
    return (
      <input
        onChange={handleChange}
        className={`border-2 py-0.5 px-1 ${state.error ? "border-red-500" : ""}`}
        type="checkbox"
        checked={state.value}
      />
    );
  }

  return null;
};
