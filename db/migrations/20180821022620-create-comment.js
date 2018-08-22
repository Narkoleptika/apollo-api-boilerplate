'use strict'
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Date.now()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Date.now()
            }
        })
    },
    down: async queryInterface => {
        await queryInterface.dropTable('comments')
    }
}
