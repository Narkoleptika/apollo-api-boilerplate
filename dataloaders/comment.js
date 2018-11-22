const DataLoader = require('dataloader')
const {comment} = require('../db/models')

module.exports = () => ({
    postCommentLoader: new DataLoader(async postId => {
        const comments = await comment.findAll({where: {postId}})

        return postId.map(id => comments.filter(c => c.postId === id))
    })
})
