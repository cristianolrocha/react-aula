import React, { Component, Fragment } from 'react'
import TweetService from '../../services/TweetServise'
import Moment from 'moment';
import Tweet from '../../components/Tweet'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import Cabecalho from '../../components/Cabecalho'


export default class PerfilPage extends Component {

  constructor() {
    super()
    this.state = {
      user: {},
      tweets: []
    }

    this.service = new TweetService()
  }

  componentDidMount = async () => {
    const user = await this.service.getProfile(this.props.match.params.login)
    let tweets = await this.service.getAll()
    console.log(tweets)
    tweets = tweets.filter(x => x.usuario.login === this.props.match.params.login).slice(0, 3)

    this.setState({ user: user, tweets: tweets })
  }

  list = () => {
    return this.state.tweets.length > 0 ?
      (this.state.tweets.map(tweet => <Tweet key={tweet._id} conteudo={tweet.conteudo} tweetInfo={tweet} />)) :
      (<h1><marquee>Não tem biscoito!</marquee></h1>)
  }

  render() {
    const user = this.state.user
    return (
      <Fragment>
        <Cabecalho usuario={`@${this.props.match.params.login}`} />
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-24">
              <div className="tile">
                <div className="tile is-parent">
                  <article className="tile is-child notification is-info">
                    <p className="title">{`${user.nome} ${user.sobrenome}`}</p>
                    <p className="subtitle">@{user.login}</p>
                    <figure className="image">
                      <img src={user.foto} />
                    </figure>
                  </article>
                </div>
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification is-primary">
                    <p className="title">e-mail</p>
                    <p className="subtitle">{user.email}</p>
                    <p className="title">Últimos tweets</p>
                    <Dashboard posicao="esquerda">
                      <Widget>
                        <div className="tweetsArea">
                          {this.list()}
                        </div>
                      </Widget>
                    </Dashboard>
                  </article>
                  <article className="tile is-child notification is-warning">
                    <p className="title">Desde</p>
                    <p className="subtitle">{Moment(user.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                    <p className="title">Ultima atualização </p>
                    <p className="subtitle">{Moment(user.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}