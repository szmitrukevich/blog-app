/* eslint-disable no-underscore-dangle */
export default class BlogService {
  _apiBase = 'https://blog.kata.academy/api/'

  async getResource(url, token) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'GET',
      headers,
    })
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

  async deleteResource(url, token) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
      headers,
    })
    return true
  }

  async getArticles(page, token) {
    const articles = await this.getResource(`articles?limit=5&offset=${(page - 1) * 5}`, token)
    return articles
  }

  async getArticle(id, token) {
    const article = await this.getResource(`articles/${id}`, token)
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

  async deleteArticle(id, token) {
    try {
      const article = await this.deleteResource(`articles/${id}`, token)
      if (article.errors) throw new Error(JSON.stringify(article.errors))
      return article
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updateArticle(id, body, token) {
    try {
      const article = await this.sendResource(`articles/${id}`, 'PUT', body, token)
      if (article.errors) throw new Error(JSON.stringify(article.errors))
      return article
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async likeArticle(id, token) {
    try {
      const like = await this.sendResource(`articles/${id}/favorite`, 'POST', {}, token)
      if (like.errors) throw new Error(JSON.stringify(like.errors))
      return like
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async unlikeArticle(id, token) {
    try {
      const like = await this.deleteResource(`articles/${id}/favorite`, token)
      if (like.errors) throw new Error(JSON.stringify(like.errors))
      return like
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
