const prod = {
    apiUrl: '',
};
const dev = {
    apiUrl: 'http://localhost:4100',
};

export const env = process.env.NODE_ENV === 'development' ? dev : prod;
