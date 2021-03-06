import Immutable from 'seamless-immutable';
import { createReducer, } from '../helper-function';
import { Types, } from './actions';

const initState = Immutable({
  isLoading: false,
  byId: {},
  transaction: {},
});

const reducer = createReducer(initState, {
  [Types.SET_CART_LOADING_STATUS]: ({ state, action, }) => {
    return state.merge({ isLoading: action.payload, });
  },
  [Types.SET_CART_DATA]: ({ state, action, }) => {
    return state.merge({ byId: action.payload, });
  },
  [Types.SET_TRANSACTION]: ({ state, action, }) => {
    return state.merge({ transaction: action.payload, });
  },
});

export default reducer;
