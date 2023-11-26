const Mock = require('mockjs');
 
//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/index/tabData', 'post', require('./json/tabData.json'));
 
Mock.mock('/index/oftenGoods', 'get', require('./json/oftenGoods.json'));

Mock.mock('/index/type0Goods', 'get', require('./json/type0Goods.json'));

