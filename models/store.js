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
  const parsedPage = page > 1 ? +page : 1
  const options = {
    page: parsedPage,
    sort: { updated_at: -1 },
    lean: true,
    limit: +limit,
  };

  return Store.paginate(query, options)
};

module.exports.createStore = async (store) => {
  const newStore = new Store(store);

  return newStore.save();
};
