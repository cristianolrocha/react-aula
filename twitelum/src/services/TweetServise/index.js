import React from 'react'
import 'bulma/css/bulma.css'

export default class TweetService extends React.Component {

    constructor() {
        super()
        this.url = 'https://twitelum-api.herokuapp.com/'
    }

    getAll = async () => {
        const url = `${this.url}tweets`
        return await this._get(url)
    }

    sendTweet = async (msg, login) => {
        const url = `${this.url}tweets`
        const options = {
            method: 'POST',
            body: JSON.stringify({ conteudo: msg, login: login })
        }
        const response = await fetch(url, options)
        const json = await response.json();
        return json
    }

    getProfile = async (login) => {
        const url = `${this.url}usuarios/${login}`
        return await this._get(url)
    }

    getUser = () => {
        let items = ['artdiniz', 'omariosouto', 'vanessametonini', 'marcobrunobr'];
        return items[Math.floor(Math.random() * items.length)];
    }


    _get = async (url) => {
        const response = await fetch(url, { method: 'GET' })
        const json = await response.json();
        return json
    }
}