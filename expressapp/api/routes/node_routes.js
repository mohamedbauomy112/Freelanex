module.exports = function (app, web3) {
  const generalSrv = require('../../services/ethnode/general')(web3)
  const addressSrv = require('../../services/ethnode/address')(web3)
  const txSrv = require('../../services/ethnode/tx')(web3)
  const contractSrv = require('../../services/ethnode/contract')(web3)

  var VerifyToken = require('../VerifyToken');

  // general
  app.get('/api/status', (req, res) => {
      var status = generalSrv.getStatus()//this route use to get apit status
    res.send({ data: status })
  })

  // address
  app.get('/api/address/:address/balance', (req, res) => {//this route use to get eth balance on eth address

    var address = req.params.address
    addressSrv.getBalance(address)
      .then(function (result) {
        res.send({ data: result })
      }, function (err) {
        res.send({ error: err })
      })
  })

  // transactions

  app.get('/api/tx/:txhash',VerifyToken, (req, res) => {// this route use to get transaction data from transaction hash

    var txhash = req.params.txhash
    var txResult = txSrv.get(txhash)

    res.send({ data: txResult })
  })
  app.post('/api/tx/', (req, res) => {

    var rawTx = req.body.raw

    if (typeof rawTx === 'undefined') {
      // separated-fields type of Tx
      var from = req.body.from
      var fromKey = req.body.private_key
      var to = req.body.to
      var wei = req.body.wei
      var gasPrice = req.body.gas_price

      txSrv.send(from, fromKey, to, wei, gasPrice)
        .then(function (result) {
          res.send({ data: result })
        }, function (err) {
          res.send({ error: err.message })
        })
    } else {
      // raw and signed type of Tx
      txSrv.sendRaw(rawTx)
        .then(function (result) {
          res.send({ data: result })
        }, function (err) {
          res.send({ error: err.message })
        })
    }
  })

  // contracts
  app.get('/api/contract/:name/:address/call/:method', (req, res) => {
    var address = req.params.address
    var method = req.params.method
    var contractName = req.params.name

    contractSrv.call(contractName, address, method, req.query)
      .then(function (result) {
        var response = {
          data: {
            contract: contractName,
            method: method,
            args: req.query,
            result: result.value
          }
        }
        res.send(response)
      }, function (err) {
        res.send({ error: err.message })
      })
  })
  app.post('/api/contract/:name/:address/transact/:method', (req, res) => {// this is used to get smart contract transacion
    var contractAddress = req.params.address
    var method = req.params.method
    var contractName = req.params.name

    var privateKey = req.body.private_key
    var callerAddress = req.body.caller_address
    var args = req.body.args

    contractSrv.transact(contractName, contractAddress, method, callerAddress, privateKey, args)
      .then(function (result) {
        var response = {
          data: {
            contract: contractName,
            method: method,
            args: args,
            tx_hash: result.tx_hash
          }
        }
        res.send(response)
      }, function (err) {
        console.log(err)
        res.send({ error: err.message })
      })
  })
}
