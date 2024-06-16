import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import { Plan } from '../types/Plan';
import './Summary.scss';

interface LocationState {
  user: User;
  plan: Plan;
}

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    // Si no hay state, redirigir a la página principal
    navigate('/');
    return null;
  }

  const { user, plan } = state;

  return (
    <div className="summary-container">
      <h2>Resumen del seguro</h2>
      <div className="summary-details">
        <p><strong>Precios calculados para:</strong> {user.name}</p>
        <p><strong>Responsable de pago:</strong></p>
        <p>DNI: {user.dni}</p>
        <p>Celular: {user.phone}</p>
        <p><strong>Plan elegido:</strong></p>
        <p>{plan.name}</p>
        <p>Costo del Plan: {plan.price}</p>
      </div>
    </div>
  );
};

export default Summary;
