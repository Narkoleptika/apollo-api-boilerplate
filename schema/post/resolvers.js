const {post: postModel} = require('../../db/models')

module.exports = {
    Post: {
        comments: async({id}, _, {dataLoaders: {postCommentLoader}}) => await postCommentLoader.load(id)
    },
    Query: {
        getPosts: async(_, __, {dataLoaders: {postLoader}}) => {
            const posts = await postModel.findAll({
                order: [
                    ['createdAt', 'desc']
                ]
            })

            posts.forEach(post => {
                postLoader.prime(post.id, post)
            })

            return posts
        }
    }
}
