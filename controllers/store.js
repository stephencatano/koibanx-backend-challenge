'use strict'

const { OK } = require('http-status');

const StoreManager = require('../managers/store')

module.exports.getStores = async ({ query: { page, limit, q: queryParam = {} } }, res) => {
  const stores = await StoreManager.getStores(queryParam, page, limit)

  return res.status(OK).json(stores)
}

module.exports.createStore = async ({ body }, res) => {
  const response = await StoreManager.createStore(body);

  return res.status(OK).json(response)
}
