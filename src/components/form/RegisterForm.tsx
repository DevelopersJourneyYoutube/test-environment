import React, { useState } from "react";

interface IFormInput {
  [key: string]: string;
}

const useForm = (
  initialValues: IFormInput,
  validate: (data: IFormInput) => IFormInput
) => {
  const [formData, setFormData] = useState<IFormInput>(initialValues);
  const [errors, setErrors] = useState<IFormInput>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =
    (callback: (data: IFormInput) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //   TODO: define validation logic
      const validationErrors = validate(formData);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        callback(formData);
      }
    };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

const FormInput: React.FC<{
  name: string;
  type: string;
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({ name, type, value, label, onChange, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

interface ConfigurationItem {
  name: string;
  label: string;
  type: string;
}

interface ConfigurationProps {
  configuration: ConfigurationItem[];
  validateForm: (formData: IFormInput) => IFormInput;
}

const RegisterForm: React.FC<ConfigurationProps> = ({
  configuration,
  validateForm,
}) => {
  const initialValues = configuration.reduce<IFormInput>((acc, cur) => {
    acc[cur.name] = "";
    return acc;
  }, {});

  const { formData, errors, handleInputChange, handleSubmit } = useForm(
    initialValues,
    validateForm
  );

  return (
    <form
      className="max-w-md mx-auto mt-10 shadow-lg p-8"
      onSubmit={handleSubmit(() => {
        console.log("done");
      })}
    >
      {configuration.map(({ name, label, type }) => (
        <FormInput
          key={name}
          name={name}
          type={type}
          value={formData[name]}
          label={label}
          onChange={handleInputChange}
          error={errors[name]}
        />
      ))}

      <button
        className="w-full bg-blue-500 text-white py-2 rounded mt-5 hover:bg-blue-700"
        type="submit"
        title="Submit the form"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
