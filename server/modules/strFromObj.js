function strFromObj(obj, separator, callback) {
    return Object.keys(obj).map(callback).join(separator)
}

module.exports = strFromObj