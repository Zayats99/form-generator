export interface IFormField {
  name: string;
  devault_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: "text" | "longtext" | "dropdown" | "number";
  handleFieldChange: (data: IFormGeneratorField) => void;
}

export interface IFormGeneratorProps {
  formScheme: IFormField[];
  handleSubmitForm: (data:any) => void;
}

export interface IFormGeneratorField {
  name: string;
  value?: string | number | boolean;
  error?: string;
}
