const prod = {
    apiUrl: '',
    apiBlockChain: 'https://blockchain.info'
};
const dev = {
    apiUrl: 'http://localhost:4100',
    apiBlockChain: 'https://blockchain.info'
};

export const env = process.env.NODE_ENV === 'development' ? dev : prod;
