export class Album {
  constructor (musicList, { albumName: name, albumImg: image } = {}) {
    this.name = name
    this.image = image
    this.musicList = musicList
  }
}
