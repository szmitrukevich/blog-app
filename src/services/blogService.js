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
    const articles = await this.getResource(`articles?page=${page}`)
    return articles
  }

  // async sendRequest(id) {
  //   let res
  //   try {
  //     res = await fetch(`${this._apiBase}tickets?searchId=${id}`)
  //     if (res.status === 500) {
  //       throw new Error('500')
  //     }
  //   } catch (e) {
  //     if (e.message === '500') {
  //       res = this.sendRequest(id)
  //       return res
  //     }
  //     throw new Error()
  //   }
  //   return res
  // }

  // async getTickets(id) {
  //   const res = await this.sendRequest(id)
  //   return res.json()
  // }
}
