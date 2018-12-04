var Web3 = require('web3');

const nodeUrl ="https://rinkeby.infura.io/UKeUPmI1CChMbzWYbJo8";
var web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));

console.log(web3);
module.exports = web3;
