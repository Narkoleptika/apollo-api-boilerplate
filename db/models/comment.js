'use strict'

module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        content: DataTypes.TEXT
    }, {})

    comment.associate = ({post}) => {
        comment.belongsTo(post)
    }

    return comment
}
