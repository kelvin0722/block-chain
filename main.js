
const  SHA256 = require("crypto-js/sha256")


class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenisisBlock()]
    }

    createGenisisBlock(){
        return new Block(0,"19/03/2018","This is the Genesis Block","0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    addNewBlock(newBlock){
        newBlock.previousHash= this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        return this.chain.push(newBlock)
    }
}
let newBlockChain = new BlockChain()
newBlockChain.createGenisisBlock()
newBlockChain.addNewBlock(new Block(1,"20/03/2018",{amount:4}))
newBlockChain.addNewBlock(new Block(2,"21/03/2018",{amount:6}))
newBlockChain.addNewBlock(new Block(3,"22/03/2018",{amount:8}))

console.log(JSON.stringify(newBlockChain,null,4));