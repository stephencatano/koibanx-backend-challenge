'use strict'

const StoreManager = require('../managers/store')

module.exports.getStores = async ({ query: { page, limit, q: queryParam = {} } }, res) => {
  const response = await StoreManager.getStores(queryParam, page, limit)

  return res.status(200).json(response)
}

module.exports.createStore = async (req, res) => {
  return res.status(200).json({ test: 'test' })
}
