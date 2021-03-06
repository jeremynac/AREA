const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function dateToTime(date) {
    return Date.parse(date) / 1000
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

async function getPageToken(page_id, user_token) {
    let res = await axios.get("https://graph.facebook.com/" + page_id + "?fields=access_token&access_token=" + user_token)
    console.log('got token page', )
    if (res) {
        return res.data.access_token
    } else {
        return null
    }
}

async function postToPage(page, content, account) {
    if (page.access_token) {
        var config = {
            method: 'post',
            url: 'https://graph.facebook.com/v10.0/' + page.id + '/feed?message=' + content + '&access_token=' + page.access_token,
            headers: {}
        };

        axios(config)
            .then(function(response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    return false
}

async function reactFacebookPostPage(account, parameters, script_vars, last_activation) {
    try {
        let res = await axios.get('https://graph.facebook.com' + '/v10.0/me/accounts' + '/?access_token=' + account.access_token)
        if (res.data) {
            console.log('got pages', res.data.data)
            let pages = res.data.data
            let page = getPage(pages, parameters.page_name)
            let content = script_vars.action_result.message || script_vars.action_result.text
            return postToPage(page, content, account)
        }
        console.log('test', feed)
        return false
    } catch (e) {
        console.log(e)
        return false
    }
    return false
}
module.exports = {
    reactFacebookPostPage,
}