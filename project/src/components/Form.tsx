import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './Form.scss';
import heroImg from '../images/hero.svg';

interface FormData {
  documentType: string;
  documentNumber: string;
  phone: string;
  privacyPolicy: boolean;
  commercialPolicy: boolean;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    documentType: 'DNI',
    documentNumber: '',
    phone: '',
    privacyPolicy: false,
    commercialPolicy: false,
  });

  const history = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userResponse = await axios.get('https://rimac-front-end-challenge.netlify.app/api/user.json');
        console.log(userResponse.data);
        console.log(formData);
        const user = { ...userResponse.data, ...formData}
        // Redireccionar a la página de "Planes" después de la validación
        history('/plans', { state: { user }});
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    }
  };

  const validateForm = () => {
    const { documentType, documentNumber, phone, privacyPolicy, commercialPolicy } = formData;
    return documentType && documentNumber && phone && privacyPolicy && commercialPolicy;
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Creado para ti y tu familia</h2>
        <p>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</p>
        <img src={heroImg} className="Hero-img-form" alt="Hero-img" />
        <hr />
        <label className='field'>
            {/* Tipo de documento */}
            <select name="documentType" value={formData.documentType} onChange={handleChange} required>
            <option value="DNI">DNI</option>
            <option value="Pasaporte">Pasaporte</option>
            </select>
            <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} required placeholder='No. de documento' />
        </label>
        {/* <label>
            No. de documento
            <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} required placeholder='No. de documento' />
        </label> */}
        <label className='field'>
            {/* Celular */}
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder='Celular' />
        </label>
        <label className='Font-12'>
            <input type="checkbox" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange} required />
            Acepto la Política de Privacidad
        </label>
        <label className='Font-12'>
            <input type="checkbox" name="commercialPolicy" checked={formData.commercialPolicy} onChange={handleChange} required />
            Acepto la Política Comunicaciones Comerciales
        </label>
        <a href="" className='Font-12'>Aplican Términos y Condiciones</a>
        <button type="submit">Cotiza aquí</button>
    </form>
  );
};

export default Form;
