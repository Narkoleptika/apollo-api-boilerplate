const DataLoader = require('dataloader')
const {post} = require('../db/models')

module.exports = () => ({
    postLoader: new DataLoader(async ids =>
        await Promise.all(ids.map(async id => await post.find({where: {id}})))
    )
})
