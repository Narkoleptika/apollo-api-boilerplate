const DataLoader = require('dataloader')
const {post} = require('../db/models')

module.exports = () => ({
    postLoader: new DataLoader(async id =>
        await post.findAll({where: {id}})
    )
})
