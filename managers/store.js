'use strict'

const StoreModel = require('../models/store')

class Store {
  async getStores (query, page, limit) {
    return StoreModel.getStores(query, page, limit);
  }

  async createStore(newStore) {
    return StoreModel.createStore(newStore);
  }
}

module.exports = new Store()
