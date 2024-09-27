export type IFormDTO = {
  name: string;
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: 'text' | 'longtext' | 'dropdown' | 'number' | 'checkbox' | 'radio';
};

export type IFormField = IFormDTO & {
  error?: string;
  handleFieldChange: (data: IFormGeneratorField) => void;
};

export type IFormGeneratorField = {
  name: string;
  value?: string | number | boolean;
  error?: string;
};
