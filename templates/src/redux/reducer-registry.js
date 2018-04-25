export default {
  _emitChange: null,
  _reducers: {},
  get reducers() {
    return { ...this._reducers };
  },
  set reducers(reducers) {
    this._reducers = reducers;
  },
  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.reducers);
    }
  },
  setChangeListener(listener) {
    this._emitChange = listener;
  }
};
