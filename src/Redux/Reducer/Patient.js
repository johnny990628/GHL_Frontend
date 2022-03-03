import { randomTraderName } from '@mui/x-data-grid-generator';

// const initialState = [
//     { id: 'A000000000', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000001', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000002', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000003', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000004', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000005', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000006', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000007', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000008', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000009', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000010', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
// ];
const initialState = { loading: false, data: [], error: '' };

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PATIENTS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_PATIENTS_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case 'FETCH_PATIENTS_FAILURE':
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default patientReducer;
