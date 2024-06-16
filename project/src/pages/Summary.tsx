import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import { Plan } from '../types/Plan';
import './Summary.scss';
import IcFamily from '../images/icon-family.svg'

interface LocationState {
  user: User;
  plan: Plan;
  selectedOption: string;
}

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  console.log('location.state', location.state);
  console.log('STATE', state);

  if (!state) {
    // Si no hay state, redirigir a la página principal
    navigate('/');
    return null;
  }

  const { user, plan, selectedOption  } = state;
  
  const handleBack = () => {
    navigate('/plans', { state: { user, selectedOption } });
    // navigate(-1);
  };

  

  return (
    <div>
      <nav className="breadcrumb">
          <span className="breadcrumb-step">1</span>
          <span className="breadcrumb-step-plans step-text">Planes y coberturas</span>
          <span className="breadcrumb-separator">····</span>
          <span className="breadcrumb-step active">2</span>
          <span className="breadcrumb-step-summary step-text-active">Resumen</span>
        </nav>
      <div className="summary-container">
        
        <button onClick={handleBack} className="back-button"><i className="fa fa-chevron-circle-left"></i> Volver</button>
        <h2>Resumen del seguro</h2>
        <div className="summary-details">
          <p><strong>Precios calculados para:</strong> <p className='name-person'> <img src={IcFamily} className="icon-family" alt="IcFamily" /> {user.name} {user.lastName}</p></p>
          <hr />
          <p><strong className='font-16'>Responsable de pago:</strong></p>
          <p className='font-14'>{user.documentType}: {user.documentNumber}</p>
          <p className='font-14'>Celular: {user.phone}</p>
          <p><strong className='font-16'>Plan elegido:</strong></p>
          <p className='font-14'>{plan.name}</p>
          <p className='font-14'>Costo del Plan: {`$${plan.price} al mes`}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
