/* eslint-disable no-underscore-dangle */
export default class BlogService {
  _apiBase = 'https://blog.kata.academy/api/'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(res.status)
    }

    return res.json()
  }

  async postResource(url, body) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(res.status)
    }

    return res.json()
  }

  // async postxResource(url, body, token) {
  //   const res = await fetch(`${this._apiBase}${url}`, {
  //     method: 'POST',
  //     headers: { Accept: 'application/json', 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
  //     body: JSON.stringify(body),
  //   })

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, received ${res.status}`)
  //   }

  //   return res.json()
  // }

  async getArticles(page) {
    const articles = await this.getResource(`articles?offset=${(page - 1) * 20}`)
    return articles
  }

  async getArticle(id) {
    const article = await this.getResource(`articles/${id}`)
    return article
  }

  async createAccount(body) {
    const newAccount = await this.postResource('users', body)
    return newAccount.user
  }

  async login(body) {
    let account
    try {
      account = await this.postResource('users/login', body)
      return account.user
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
