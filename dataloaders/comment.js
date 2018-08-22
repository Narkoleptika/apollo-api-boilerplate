const DataLoader = require('dataloader')
const {comment} = require('../db/models')

module.exports = () => ({
    postCommentLoader: new DataLoader(async postIds =>
        await Promise.all(postIds.map(async postId => await comment.findAll({where: {postId}})))
    )
})
