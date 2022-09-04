'use strict'

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const isValidId = id => mongoose.Types.ObjectId.isValid(id);

const StoreSchema = new mongoose.Schema({
  name: String,
  cuit: String,
  concepts: Array,
  currentBalance: Number,
  active: Boolean,
  lastSale: Date,
},{ timestamps: true });

StoreSchema.pre('save', async function (callback) {
  //completar de ser necesario
});

StoreSchema.plugin(mongoosePaginate);

const Store = mongoose.model('Store', StoreSchema);

module.exports.getStores = async (query, page, limit) => {
  let parsedQuery = {};

  if (query.length) {
    const queryFixed = query.replace(/\$not/g, '$ne')
    parsedQuery = JSON.parse(queryFixed);
  }

  const parsedPage = page > 1 ? +page : 1;
  const options = {
    page: parsedPage,
    sort: { updated_at: -1 },
    lean: true,
    limit: +limit,
  };

  const result = await Store.paginate(parsedQuery, options) || [];
  const data = this.buildStoreInfo(result);

  return {
    data,
    page: result.page,
    pages: result.pages,
    limit: result.limit,
    total: result.total,
  };
};

module.exports.createStore = async (store) => {
  const newStore = new Store(store);

  return newStore.save();
};

module.exports.buildStoreInfo = storesData => {
  return storesData.docs.map(store => {
    return {
      ...store,
      currentBalance: store.currentBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      active: store.active ? 'Sí' : 'No',
      lastSale: store.lastSale.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  })
}
