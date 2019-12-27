export class MusicPlayer {
  constructor (playing) {
    this.playing = playing
  }
  stop () {
    this.playing = false
  }
  play () {
    this.playing = true
  }
}
