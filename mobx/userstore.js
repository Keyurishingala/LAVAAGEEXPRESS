// import 'mobx-react/batchingForReactNative';
import {observable, action, makeObservable} from 'mobx';

class UserStore {
  user = null;
  bol = null;

  setUser = user => {
    console.log('user', user);
    this.user = user;
  };

  setBol = val => {
    this.bol = val;
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      bol: observable,
      setUser: action,
      setBol: action,
    });
  }
}

export default new UserStore();
