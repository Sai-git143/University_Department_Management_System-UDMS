import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const strength = getStrength();
  const variant = strength < 3 ? 'danger' : strength < 5 ? 'warning' : 'success';
  const label = strength < 3 ? 'Weak' : strength < 5 ? 'Medium' : 'Strong';

  return (
    <ProgressBar now={(strength / 5) * 100} variant={variant} label={label} />
  );
};

export default PasswordStrengthIndicator;
