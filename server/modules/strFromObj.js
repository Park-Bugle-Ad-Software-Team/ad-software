// creates a string from an object, used for writing dynamic sql queries
function strFromObj(obj, separator, callback) {
    return Object.keys(obj).map(callback).join(separator)
}

module.exports = strFromObj
