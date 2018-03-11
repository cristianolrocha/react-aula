import React, { Component, Fragment } from 'react'
import Cabecalho from './components/Cabecalho'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'
import TweetService from './services/TweetServise'

class App extends Component {
  constructor() {
    super()
    this.state = {
      novoTweet: '',
      tweets: [],
      loading: true
    }
    this.service = new TweetService()
  }

  componentDidMount = async () => {
    //chama a primeira vez rapido
    var s = await this.service.getAll()
    this.setState({ tweets: s, loading: false })
    //chama no loop    
    setInterval(async () => {
      var s = await this.service.getAll()
      this.setState({ tweets: s, loading: false })
    }, 5000)
  }

  isValid = () => {
    return this.state.novoTweet.length > 140
  }

  tweetValid = () => {
    let tamanho = this.state.novoTweet.length
    return tamanho < 140 && tamanho > 0
  }

  addTweet = async (e) => {
    e.preventDefault()
    if (!this.tweetValid()) return
    // faz um random na lista de logins disponiveis 
    var login = this.service.getUser();

    var tweetServer = await this.service.sendTweet(this.state.novoTweet, login)
    this.setState({
      tweets: [tweetServer, ...this.state.tweets],
      novoTweet: ''
    })
  }


  list = () => {
    return this.state.tweets.length > 0 ?
      (this.state.tweets.map(tweet => <Tweet key={tweet._id} conteudo={tweet.conteudo} tweetInfo={tweet} />)) :
      (<h1><marquee>Não tem biscoito!</marquee></h1>)
  }

  render() {
    return (
      <Fragment>
        <Cabecalho usuario="@omariosouto" />
        <div className="container">
          <Dashboard>
            <Widget>
              <form onSubmit={this.addTweet} className="novoTweet">
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${this.isValid() ? 'novoTweet__status--invalido' : ''}`}>{this.state.novoTweet.length}/140</span>
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
