import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
    isConfirm: false,
    resolve: null
  });

  const showAlert = useCallback((message, type = 'info') => {
    setAlertState({
      isOpen: true,
      message,
      type,
      isConfirm: false,
      resolve: null
    });
  }, []);

  const showConfirm = useCallback((message) => {
    return new Promise((resolve) => {
      setAlertState({
        isOpen: true,
        message,
        type: 'warning',
        isConfirm: true,
        resolve
      });
    });
  }, []);

  const closeAlert = useCallback((value = false) => {
    if (alertState.resolve) {
      alertState.resolve(value);
    }
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  }, [alertState]);

  return (
    <AlertContext.Provider value={{ ...alertState, showAlert, showConfirm, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
