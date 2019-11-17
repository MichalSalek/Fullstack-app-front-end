// Copy this file as environment.js and replace "your-environment" part to correct one

const prod = {
    apiUrl: 'your-environment',
};
const dev = {
    apiUrl: 'your-environment',
};

export const env = process.env.NODE_ENV === 'development' ? dev : prod;
