const Block = require('./Block')

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

module.exports = BlockChain;