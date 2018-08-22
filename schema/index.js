/* eslint no-sync: 0 */
const fs = require('fs')
const glob = require('glob')
const {join} = require('path')

const gqlFiles = glob.sync(join(__dirname, './!(_*)/*.?(graphql|gql)'))
const resolverFiles = glob.sync(join(__dirname, './!(_*)/!(index).js'))

let typeReplacements = ['Query', 'Mutation', 'Subscription'].map(type => ({
    regExp: new RegExp(`extend type ${type}`),
    replacement: `type ${type}`
}))

const typeDefs = gqlFiles
    .map(file => fs.readFileSync(file, 'utf8'))
    .map(file => {
        let newFile = file

        typeReplacements = typeReplacements.filter(({regExp, replacement}) => {
            if (regExp.test(newFile)) {
                newFile = newFile.replace(regExp, replacement)
                return false
            }
            return true
        })

        return newFile
    })

const resolvers = resolverFiles.map(file => require(file))

module.exports = {
    typeDefs,
    resolvers
}
