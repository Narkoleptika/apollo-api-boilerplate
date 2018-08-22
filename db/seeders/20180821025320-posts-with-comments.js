'use strict'

module.exports = {
    up: async queryInterface => {
        await queryInterface.bulkInsert('posts', Array(10).fill().map((_, i) => ({
            title: `Post #${i + 1}`,
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi iusto blanditiis, recusandae eligendi nisi cupiditate aliquam reiciendis fuga voluptatem rerum ut quo veniam numquam. Numquam, quas? Dicta ducimus voluptate id, animi aliquam sunt quam dolore praesentium suscipit. Totam facere, soluta obcaecati temporibus vel distinctio eum, aut illum, officia asperiores quasi!'
        })))

        const [posts] = await queryInterface.sequelize.query('SELECT id FROM "posts";')

        await Promise.all(posts.map(async({id: postId}) => {
            await queryInterface.bulkInsert('comments', Array(5).fill().map((_, i) => ({
                postId,
                content: `Comment #${i + 1} for Post #${postId}`
            })))
        }))
    },

    down: async queryInterface => {
        await Promise.all([
            queryInterface.bulkDelete('posts'),
            queryInterface.bulkDelete('comments')
        ])
    }
}
