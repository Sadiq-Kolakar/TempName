import { createContext, useContext, useState, useEffect } from 'react';
import { cars as initialCars } from '../data/cars';

const CarContext = createContext();

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('luxury_cars');
    return savedCars ? JSON.parse(savedCars) : initialCars;
  });

  useEffect(() => {
    localStorage.setItem('luxury_cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (car) => {
    const newCar = {
      ...car,
      id: Math.max(0, ...cars.map(c => c.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'approved', // Admin added cars are auto-approved
    };
    setCars([newCar, ...cars]);
  };

  const updateCar = (id, updatedCar) => {
    setCars(cars.map(car => car.id === id ? { ...car, ...updatedCar } : car));
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const updateCarStatus = (id, status) => {
    setCars(cars.map(car => car.id === id ? { ...car, status } : car));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar, updateCarStatus }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
