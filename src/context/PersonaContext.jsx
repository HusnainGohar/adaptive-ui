import { createContext, useContext, useState, useEffect } from 'react';
import { predictPersona } from '../api/person_api';

const PersonaContext = createContext();

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function PersonaProvider({ children }) {
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const features = {
      brand_research: getRandomInteger(1, 200),
      brand_visits: getRandomInteger(1, 200),
      cart_adds: getRandomInteger(1, 50),
      deals_clicked: getRandomInteger(1, 50),
      eco_products_viewed: getRandomInteger(1, 50),
      gift_guides_viewed: getRandomInteger(1, 50),
      products_viewed: getRandomInteger(1, 500),
      purchases: getRandomInteger(1, 50),
      quick_purchases: getRandomInteger(1, 20),
      repeat_purchases: getRandomInteger(1, 20),
      reviews_read: getRandomInteger(1, 50),
      searches: getRandomInteger(1, 50),
      specs_viewed: getRandomInteger(1, 50),
      wishlists: getRandomInteger(1, 50)
    };
    predictPersona(features)
      .then(predicted => setPersona(predicted))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PersonaContext.Provider value={{ persona, loading, error }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
