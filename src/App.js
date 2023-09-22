import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  // States
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true });

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 9 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  // Handlers
  const handleEmailChange = (e) => {
    setFormValues(prev => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    const isValid = validatePassword(e.target.value);
    setValidationStates(prev => ({ ...prev, passwordState: isValid }));
    setFormValues(prev => ({ ...prev, password: e.target.value }));
  };

  const handleSelectChange = (e) => {
    setFormValues(prev => ({ ...prev, favClass: e.target.value }));
  };

  const clickSubmit = () => {
    const emailIsValid = validateEmail(formValues.email);
    const passwordIsValid = validatePassword(formValues.password);

    setValidationStates({ ...validationStates, emailState: emailIsValid, passwordState: passwordIsValid });

    if (emailIsValid && passwordIsValid) {
      alert(JSON.stringify(formValues));
    } else {
      alert("Por favor, verifica los errores en el formulario.");
    }
  };

  // Render
  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
          {!validationStates.emailState && <Form.Text className="text-danger">Formato de correo inválido.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
          {!validationStates.passwordState && <Form.Text className="text-danger">La contraseña debe tener al menos 9 caracteres y contener letras y números.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologias web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
