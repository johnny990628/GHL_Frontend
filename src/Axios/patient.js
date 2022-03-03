import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const fetchPatients = async () => {
    return await axios.get(BASE_URL + 'users');
};
