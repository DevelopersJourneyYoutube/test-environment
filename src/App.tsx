import "./App.css";
import RegisterForm from "./components/form/RegisterForm";

interface IFormInput {
  [key: string]: string;
}

const configuration = [
  { type: "text", name: "username", label: "Username" },
  { type: "email", name: "email", label: "Email" },
  { type: "password", name: "password", label: "Password" },
  { type: "password", name: "confirmPassword", label: "ConfirmPassword" },
];

const validateForm = (formData: IFormInput): IFormInput => {
  let errors: IFormInput = {};

  if (!formData.username) errors.username = "Username is required";
  if (!formData.email.includes("@")) errors.email = "Email is invalid";
  if (formData.password.length < 9)
    errors.password = "Password needs to be at least 8 character long";
  if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = "Passwords dont match";

  return errors;
};

function App() {
  return (
    <div>
      <RegisterForm configuration={configuration} validateForm={validateForm} />
    </div>
  );
}

export default App;
