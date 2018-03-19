const BlockChain = require('./BlockChain')
const Block = require('./Block')

let newBlockChain = new BlockChain()
newBlockChain.createGenisisBlock()
newBlockChain.addNewBlock(new Block(1,"20/03/2018",{amount:4}))
newBlockChain.addNewBlock(new Block(2,"21/03/2018",{amount:6}))

console.log(JSON.stringify(newBlockChain,null,4));