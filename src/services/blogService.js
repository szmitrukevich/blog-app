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
    console.log('put', body)
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

  async putResource(url, body, token) {
    console.log('put', body)
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(res.status)
    }

    return res.json()
  }

  async getArticles(page) {
    const articles = await this.getResource(`articles?offset=${(page - 1) * 20}`)
    return articles
  }

  async getArticle(id) {
    const article = await this.getResource(`articles/${id}`)
    return article
  }

  async createAccount(body) {
    let newAccount
    console.log('create', body)
    try {
      newAccount = await this.postResource('users', body)
      return newAccount.user
    } catch (e) {
      throw new Error(e.message)
    }
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

  async updateProfile(body, token) {
    let account
    try {
      account = await this.putResource('user', body, token)
      return account.user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async createArticle(body, token) {
    const article = await this.putResource('articles', body, token)
    return article
  }
}
