export const FREE_MODULE_IDS = [
  'present-simple',
  'present-continuous',
  'past-simple',
  'past-continuous'
];

export const FREE_MOCK_QUESTION_COUNT = 10;
export const FULL_MOCK_QUESTION_COUNT = 240;
export const PREMIUM_PRICE_PEN = 50;
export const PREMIUM_DURATION_MONTHS = 12;

export const canAccessModule = (moduleId, isPremium) => (
  isPremium || FREE_MODULE_IDS.includes(moduleId)
);

export const getAccessibleMockQuestions = (questions, isPremium) => (
  isPremium ? questions : questions.slice(0, FREE_MOCK_QUESTION_COUNT)
);
