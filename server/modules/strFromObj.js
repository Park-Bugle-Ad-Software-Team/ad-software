// creates a string from an object, using the specific separator and callback
// used for writing dynamic sql queries
function strFromObj(obj, separator, callback) {
    return Object.keys(obj).map(callback).join(separator)
}

module.exports = strFromObj
