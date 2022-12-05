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

  async sendResource(url, method, body, token) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      method,
      headers,
      body: JSON.stringify(body),
    })

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
    try {
      const newAccount = await this.sendResource('users', 'POST', body)
      if (newAccount.errors) throw new Error(JSON.stringify(newAccount.errors))
      return newAccount.user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async login(body) {
    try {
      const account = await this.sendResource('users/login', 'POST', body)
      if (account.errors) throw new Error(JSON.stringify(account.errors))
      return account.user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updateProfile(body, token) {
    try {
      const account = await this.sendResource('user', 'PUT', body, token)
      if (account.errors) throw new Error(JSON.stringify(account.errors))
      return account.user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async createArticle(body, token) {
    const article = await this.sendResource('articles', 'POST', body, token)
    return article
  }
}
