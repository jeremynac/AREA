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
            ret_posts.push(post)
        }
    })
    return ret_posts
}

async function checkFacebookMentionned(account, parameters, script_vars, last_activation) {
    try {
        let feed = await axios.get('https://graph.facebook.com' + '/v10.0/me/feed' + '/?access_token=' + account.access_token)
        if (feed.data) {
            let posts = feed.data.data
            let new_posts = checkNewPost(posts, last_activation)
            if (new_posts[0]) {
                script_vars.action_result = { text: new_posts[0].message }
                return true
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