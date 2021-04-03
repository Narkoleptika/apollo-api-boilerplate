'use strict'

module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {})

    post.associate = ({comment}) => {
        post.hasMany(comment)
    }

    return post
}
