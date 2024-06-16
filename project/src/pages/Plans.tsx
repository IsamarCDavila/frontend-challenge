import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types/User';
import { Plan } from '../types/Plan';
import './Plans.scss';

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
//   age: number;
//   description: [];
//   discount?: number;
// }

// interface User {
//   age: number;
//   name: string;
// }

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  // const [user, setUser] = useState<User>({ age: 0, name: '' });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user as User | undefined;
  const initialOption = location.state?.selectedOption as string | null;

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/user.json');
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    if ( user ) {
      const fetchPlans = async () => {
        try {
          const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/plans.json');
          // const filteredPlans = response.data.filter((plan: Plan) => plan.age >= user.age);
          const filteredPlans = response.data.list.filter((plan: Plan) => plan.age >= calculateAge(user.birthDay));
          setPlans(filteredPlans);
          console.log('plan', filteredPlans);
        } catch (error) {
          console.error('Error fetching plans', error);
        }
      };

      fetchPlans();
    } else {
      navigate('/');
    }

    if (initialOption) {
      setSelectedOption(initialOption);
    }

  }, [user, navigate, initialOption]);

  const calculateAge = (birthDay: string) => {
    const birthDate = new Date(birthDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log('age',age);
    return age;
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const getDiscountedCost = (cost: string, discount: number) => {
    // const costValue = parseFloat(cost.replace('$', '').replace(' al mes', ''));
    return (parseFloat(cost) * (1 - discount / 100)).toFixed(2);
  };

  const handleSelectPlan = (plan: Plan) => {
    if (user) {
      console.log('vamos a summary');
      console.log('userFromState',plan);
      console.log('plan', plan);
      const discountedCost = selectedOption === 'other' ? getDiscountedCost(plan.price, 5) : plan.price;
      navigate('/summary', { state: { user, plan: { ...plan, price: discountedCost }, selectedOption } } );
      
    }
  };

  const handleBack = () => {
    setSelectedOption(null);
    navigate(-1);
  };

  return (
    <div className="plans-container">
      <nav className="breadcrumb">
        <span className="breadcrumb-step active">1</span>
        <span>Planes y coberturas</span>
        <span className="breadcrumb-separator">···</span>
        <span className="breadcrumb-step">2</span>
        <span>Resumen</span>
      </nav>
      <button onClick={handleBack} className="back-button">Volver</button>
      <h2>Rocío ¿Para quién deseas cotizar?</h2>
      <p>Selecciona la opción que se ajuste más a tus necesidades </p>
      <div className="options">
        <label>
          <input
            type="radio"
            name="planOption"
            value="self"
            checked={selectedOption === 'self'}
            onChange={() => handleOptionChange('self')}
          />
          Para mí
        </label>
        <label>
          <input
            type="radio"
            name="planOption"
            value="other"
            checked={selectedOption === 'other'}
            onChange={() => handleOptionChange('other')}
          />
          Para alguien más
        </label>
      </div>
      {selectedOption && (
        <div className="plans">
          {plans.map((plan) => (
            <div key={plan.id} className={`plan ${selectedOption === plan.name ? 'selected' : ''}`}>
              <h3>{plan.name}</h3>
              <label htmlFor=""> COSTO DEL PLAN</label>
              <p> {selectedOption === 'other' ? `$${getDiscountedCost(plan.price, 5)} al mes` : `$${plan.price} al mes`}</p>
              <ul>
                {plan.description.map((description) => (
                  <li>{description}</li>
                ))}
              </ul>
              <button onClick={() => handleSelectPlan(plan)}>Seleccionar Plan</button>
              {/* <p>{plan.description}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plans;
