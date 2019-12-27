export class Singer {
  constructor ({ author: name } = {}) {
    this.name = name
    this.musics = []
    this.albums = []
  }
  publishMusic (music) {
    this.musics.push(music)
  }
  publishAlbums (album) {
    this.albums.push(album)
  }
}
