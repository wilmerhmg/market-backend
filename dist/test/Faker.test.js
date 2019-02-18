"use strict";

var faker = require('faker/locale/en_US');

var post = require('../config/init.data').posts;

var nposts = [];
faker.locale = "en";

for (var x = 0; x < 10; x++) {
  nposts.push({
    id_post: faker.random.uuid(),
    sku: 'SKU-' + faker.random.alphaNumeric(10).toString().toUpperCase(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.random.number({
      max: 999
    }),
    active: !!faker.random.number({
      max: 10
    }),
    description: faker.lorem.text() + '\n' + faker.lorem.text(),
    category_id: faker.random.number({
      max: 28,
      min: 5
    })
  });
}

console.log(JSON.stringify(nposts));
var g = [];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = post[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;

    for (var y = 0; y < faker.random.number({
      max: 5,
      min: 2
    }); y++) {
      g.push({
        id_picture: faker.random.uuid(),
        url: "https://picsum.photos/500/300?image=".concat(g.length + 1000),
        thumbnail: "https://picsum.photos/180/100?image=".concat(g.length + 1000),
        post_id: item.id_post
      });
    }
  } //console.log(JSON.stringify(g));

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}