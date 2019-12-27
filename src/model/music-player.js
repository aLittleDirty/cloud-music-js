export class MusicPlayer {
  constructor (playing, music, musicList) {
    this.playing = playing
    this.music = music
    this.musicList = musicList
  }
  stop () {
    this.playing = false
  }
  play () {
    this.playing = true
  }
  next () {
    let currentIndex = this.musicList.findIndex(this.music)
    currentIndex++
    if (currentIndex > this.musicList.length) {
      currentIndex--
    }
    this.music = this.musicList[currentIndex]
  }
  prev () {
    let currentIndex = this.musicList.findIndex(this.music)
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = 0
    }
    this.music = this.musicList[currentIndex]
  }
  refreshMusicList (newMusicList) {
    this.musicList = newMusicList
  }
  refreshMusic (newMusic) {
    this.music = newMusic
  }
}
