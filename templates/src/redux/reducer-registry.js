export default {
  _emitChange: null,
  _reducers: {},
  get reducers() {
    return { ...this._reducers };
  },
  set reducers(reducers) {
    this._reducers = reducers;
  },
  register(name: string, reducer: Function) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.reducers);
    }
  },
  setChangeListener(listener: Function) {
    this._emitChange = listener;
  }
};
