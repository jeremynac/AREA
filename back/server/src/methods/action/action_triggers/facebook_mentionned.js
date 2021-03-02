const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function dateToTime(date) {
    return Date.parse(date) / 1000
}

function checkNewPost(posts, last_activation) {
    let ret_posts = [];
    posts.map(post => {
        if (dateToTime(post.created_time) > last_activation) {
            console.log(post)
            ret_posts.push(post)
        }
    })
    return ret_posts
}

function getPage(pages, page_name) {
    let ret_page = null;
    pages.map(page => {
        if (page.name === page_name) {
            ret_page = page
        }
    })
    if (ret_page) {
        return ret_page
    } else {
        return null
    }
}

async function checkFacebookMentionned(account, parameters, script_vars, last_activation) {
    try {
        // let feed = await axios.get('https://graph.facebook.com' + '/v10.0/me/feed' + '/?access_token=' + account.access_token)
        let res = await axios.get('https://graph.facebook.com' + '/v10.0/me/accounts' + '/?access_token=' + account.access_token)
        if (res.data) {
            console.log('got pages', res.data.data)
            let pages = res.data.data
            let page = getPage(pages, parameters.page_name)
            let feed = await axios.get('https://graph.facebook.com' + '/v10.0/' + page.id + '/feed' + '/?access_token=' + page.access_token)
            if (feed.data) {
                console.log('check facebook mentionned', feed.data)
                let posts = feed.data.data
                let new_posts = checkNewPost(posts, last_activation)
                if (new_posts[0]) {
                    script_vars.action_result = { text: 'this was just published: ' + new_posts[0].message + ' on page ' + page.name }
                    return true
                }
            }
        }
        return false
    } catch (e) {
        console.log(e)
        return false
    }
    return false
}
module.exports = {
    checkFacebookMentionned,
}