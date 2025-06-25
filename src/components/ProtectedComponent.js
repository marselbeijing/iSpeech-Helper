import React from 'react';
import { useAccessControl } from '../hooks/useAccessControl';
import AccessBlockModal from './AccessBlockModal';

const ProtectedComponent = ({ children, onFeatureAccess }) => {
  const { 
    hasAccess, 
    isLoading, 
    showBlockModal, 
    showInitialModal,
    setShowBlockModal, 
    setShowInitialModal,
    checkFeatureAccess, 
    getTexts 
  } = useAccessControl();

  // Передаем функцию проверки доступа в дочерний компонент
  const enhancedChildren = React.cloneElement(children, {
    checkFeatureAccess,
    hasAccess,
    isLoading
  });

  return (
    <>
      {enhancedChildren}
      
      {/* Модальные окна блокировки доступа */}
      <AccessBlockModal 
        open={showBlockModal || showInitialModal}
        onClose={() => {
          setShowBlockModal(false);
          setShowInitialModal(false);
        }}
        texts={getTexts()}
      />
    </>
  );
};

export default ProtectedComponent; 