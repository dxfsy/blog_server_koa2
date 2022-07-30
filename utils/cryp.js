const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'Mogiaxe_35664#'

// md5加密
const md5 = (content)=> {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

const genPassword = (password)=> {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}