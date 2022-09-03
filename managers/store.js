'use strict'

const StoreModel = require('../models/store')

class Store {
  async getStores (query, page, limit) {
    return StoreModel.getStores(query, page, limit)
  }
}

module.exports = new Store()
