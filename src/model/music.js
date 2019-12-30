export class Music {
  constructor ({ name, id, authorName: author, url } = {}) {
    this.name = name
    this.id = id
    this.author = author
    this.url = url
  }
}
