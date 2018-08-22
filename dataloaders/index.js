const glob = require('glob')
const {join} = require('path')

const dataLoaderFies = glob.sync(join(__dirname, './**/!(index|_*).js'))

module.exports = (...args) =>
    dataLoaderFies
        .map(file => require(file))
        .reduce((sum, dataLoader) => ({
            ...sum,
            ...dataLoader(...args)
        }), {})
