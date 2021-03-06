import { put, call, } from 'redux-saga/effects';

import { actions, } from 'src/stores';
import { API, } from 'src/services';

import * as AppController from 'src/AppController';
export default function* handleLogout() {
  try {
    yield put(actions.user.setAuthLoadingStatus(true));
    yield call(API.AuthFb.logOut);
    AppController.startLogin();
    yield put(actions.user.setAuthData());
    yield put(actions.user.setProfile());
    yield put(actions.map.setShopData());
    yield put(actions.cart.setCartData());
    // yield put(actions.cart.setTransaction());
    yield put(actions.menu.setMenuDataById());
    yield put(actions.menu.setCategoryByMerchant());
    yield put(actions.transaction.setTransactionData());
    yield put(actions.transaction.setHistoryData());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    yield put(actions.user.setAuthLoadingStatus(false));
  }
}
