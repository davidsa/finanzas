import ApolloClient from 'apollo-boost';

const URL = '165.227.186.10';
//const URL = '172.21.0.141';

const client = new ApolloClient({uri: `http://${URL}:4000`});

export default client;
