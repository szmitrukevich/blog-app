/* eslint-disable no-underscore-dangle */
export default class BlogService {
  _apiBase = 'https://blog.kata.academy/api/'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
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
}
