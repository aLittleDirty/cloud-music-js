export class Album {
  constructor ({ albumName: name, albumImg: image } = {}, musicList = []) {
    this.name = name
    this.image = image
    this.musicList = musicList
  }
}
