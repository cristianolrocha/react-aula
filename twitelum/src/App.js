import React, { Component, Fragment } from 'react'
import Cabecalho from './components/Cabecalho'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  constructor() {
    super()
    this.state = {
      novoTweet: '',
      tweets: [],
      loading: true
    }

    this.addTweet = this.addTweet.bind(this)
    this.list = this.list.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      fetch('https://twitelum-api.herokuapp.com/tweets')
        .then(resposta => resposta.json())
        .then(tweets => { this.setState({ tweets: tweets, loading: false }) })
    }, 10000)
  }

  isValid() {
    return this.state.novoTweet.length > 40
  }

  tweetValid = async () => {
    let tamanho = this.state.novoTweet.length
    return tamanho < 140 && tamanho > 0
  }

  addTweet = async (e) => {
    e.preventDefault()
    if (!this.tweetValid()) return

    fetch('https://twitelum-api.herokuapp.com/tweets', {
      method: 'POST',
      body: JSON.stringify({ conteudo: this.state.novoTweet, login: 'omariosouto' })
    }).then((response) => response.json())
      .then((tweetServer) => {
        this.setState({
          tweets: [tweetServer, ...this.state.tweets],
          novoTweet: ''
        })
      })
    this.setState({
      novoTweet: ''
    })
  }

  list() {
    console.log(this)
    if (this.state.tweets.length > 0)
      return (this.state.tweets.map(tweet => <Tweet key={tweet._id} conteudo={tweet.conteudo} tweetInfo={tweet} />))
    else {
      return (<h1><marquee>Não tem biscoito!</marquee></h1>)
    }
  }

  render() {
    return (
      <Fragment>
        <Cabecalho usuario="@slipalison" />
        <div className="container">
          <Dashboard>
            <Widget>
              <form onSubmit={this.addTweet} className="novoTweet">
                <div className="novoTweet__editorArea">
                  <span className={
                    `novoTweet__status ${this.isValid() ? 'novoTweet__status--invalido' : ''}`
                  }>{this.state.novoTweet.length}/140</span>
                  <textarea
                    onChange={(e) => { this.setState({ novoTweet: e.target.value }) }}
                    value={this.state.novoTweet}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"></textarea>
                </div>
                <button
                  disabled={this.isValid() ? true : false}
                  type="submit"
                  className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.list()}
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}
export default App;
