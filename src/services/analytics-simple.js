// Упрощенная версия аналитики для устранения ошибок
const simpleAnalytics = {
  trackAppStart: () => {
    try {
      console.log('App started');
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackPageView: (pageName, data = {}) => {
    try {
      console.log('Page view:', pageName, data);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackUIInteraction: (type, name, action, data = {}) => {
    try {
      console.log('UI interaction:', type, name, action, data);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackExerciseStart: (type, settings = {}) => {
    try {
      console.log('Exercise start:', type, settings);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackExerciseComplete: (type, duration, results = {}) => {
    try {
      console.log('Exercise complete:', type, duration, results);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackSettingsChange: (setting, oldValue, newValue) => {
    try {
      console.log('Settings change:', setting, oldValue, newValue);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackFeatureUsage: (feature, action, data = {}) => {
    try {
      console.log('Feature usage:', feature, action, data);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  },
  
  trackSubscriptionAction: (action, type, data = {}) => {
    try {
      console.log('Subscription action:', action, type, data);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }
};

export default simpleAnalytics; 