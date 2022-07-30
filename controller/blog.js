const {exec,escape} = require('../db/mysql')
const xss = require('xss')
const getList = async (author, keyword) => {
    let sql = 'select * from blogs where 1=1'
    if(author) {
        author = xss(escape(author))
        sql+=` and author=${author} `
    }
    if(keyword){
        keyword = xss(escape('%'+keyword+'%'))
        sql+=` and title like ${keyword} `
    }
    sql+=` order by createtime desc;`
    return await exec(sql)
}

const getDetail = async (id) => {
    // 
    let sql = `select * from blogs where id ='${id}' `
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData是一个博客对象 包含title content author属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const author = xss(escape(blogData.author))
    const createtime = Date.now()
    let sql = `insert into blogs (title,content,author,createtime) values (${title},${content},${author},${createtime});`
    const insertData = await exec(sql)
    return {
        id:insertData.insertId
    }
}

const updateBlog = async (id,blogData={})=> {
    // blogData是一个博客对象 包含title content 属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const sql = `
        update blogs set title=${title},content=${content} where id=${id}
        `
    const updateData = await exec(sql)
    if(updateData.affectedRows>0) {
        return true
    }
    return false
}

const delBlog = async (id,author)=> {
    author = xss(escape(author))
    // id就是要删除博客的id
    const sql = `delete from blogs where id = ${id} and author=${author}`
    const delData = await exec(sql)
    if(delData.affectedRows>0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}