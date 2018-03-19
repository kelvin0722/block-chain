
const  SHA256 = require("crypto-js/sha256")


class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce  = 0
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString()
    }
    mineBlock(difficulty){
        while (this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash()
        }
        console.log("Block mined!",this.hash)
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
        newBlock.mineBlock(2)
        return this.chain.push(newBlock)
    }
    isBlockChainValid(){
        for (let i =1;i < this.chain.length; i++){
            const currentBlock = this.chain [i]
            const previousBlock = this.chain [i -1]

            if(currentBlock.hash !== currentBlock.calculateHash() ){
                return false
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true
    }
}
let newBlockChain = new BlockChain()
newBlockChain.createGenisisBlock()
newBlockChain.addNewBlock(new Block(1,"20/03/2018",{amount:4}))
newBlockChain.addNewBlock(new Block(2,"21/03/2018",{amount:6}))

console.log(JSON.stringify(newBlockChain,null,4));