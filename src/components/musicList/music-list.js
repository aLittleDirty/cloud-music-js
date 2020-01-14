import { getMusicIds, getMusicMessageList } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
import { formatValidTime } from '../../util/second-format.js'
import { addIndexedDBStore, localSet, promiseReadKeyRange } from '../../util/repository.js'
import Paging from '../../components/paging/index.vue'

export default {
  name: 'musicList',
  components: {
    Paging
  },
  data () {
    return {
      message: 'musicList',
      musicList: [],
      loading: true,
      totalPage: 5,
      currentPage: 0
    }
  },
  watch: {
    currentPage () {
      this.getData()
    }
  },
  methods: {
    setMusicId (id) {
      this.$store.commit('setMusicId', id)
    },
    setMusicList (messageList) {
      this.musicList = []
      for (let i = 0; i < messageList.length; i++) {
        let message = messageList[i]
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        let musicDetail = {
          name: music.name,
          id: music.id,
          url: music.url,
          singer: singer.name,
          albumName: album.name,
          duration: 'loading...',
          absenceUrl: false
        }
        this.musicList.push(musicDetail)
      }
    },
    storeMusicIds (billboardId, messageList) {
      let musicIds = []
      for (let i = 0; i < messageList.length; i++) {
        let message = messageList[i]
        message.url && musicIds.push(message.id)
      }
      localSet(billboardId, musicIds)
      this.$store.commit('setMusicIds', musicIds)
    },
    initDuration (musicUrls) {
      for (let i = 0; i < musicUrls.length; i++) {
        let musicUrl = musicUrls[i]
        if (musicUrl) {
          let audio = new Audio(musicUrl)
          let _this = this
          audio.oncanplay = function () {
            _this.musicList[i].duration = formatValidTime(audio.duration)
          }
        } else {
          this.musicList[i].duration = formatValidTime(0)
          this.musicList[i].absenceUrl = true
        }
      }
    },
    setDurations (durations) {
      for (let i = 0; i < durations.length; i++) {
        this.musicList[i].duration = durations[i]
      }
    },
    storeMusicMessages (billboardId, messageList, musicUrls, storeIndex) {
      let promiseDurations = []
      for (let i = 0; i < musicUrls.length; i++) {
        let musicUrl = musicUrls[i]
        let promiseDuration = new Promise((resolve, reject) => {
          if (musicUrl) {
            let audio = new Audio(musicUrl)
            audio.oncanplay = function () {
              resolve(audio.duration)
            }
          } else {
            resolve(0)
          }
        })
        promiseDurations.push(promiseDuration)
      }
      Promise.all(promiseDurations).then((result) => {
        for (let i = 0; i < result.length; i++) {
          messageList[i].duration = result[i]
          messageList[i].page = storeIndex
          addIndexedDBStore('cloud-music', billboardId, messageList[i])
        }
      })
    },
    gotoPage (num) {
      this.currentPage = num
    },
    getData () {
      let billboardId = this.$route.query.id
      this.$store.commit('setBillboardId', billboardId)
      promiseReadKeyRange('cloud-music', billboardId, 'page', this.currentPage).then((musicMessages) => {
        this.setMusicList(musicMessages)
        let musicIds = musicMessages.map(value => value.id)
        this.$store.commit('setMusicIds', musicIds)
        let durations = musicMessages.map(value => value.duration)
        this.setDurations(durations)
      }, () => {
        getMusicIds(billboardId).then((musicIds) => {
          let range = musicIds.length / this.totalPage
          let start = range * (this.currentPage - 1)
          let requiredIds = musicIds.splice(start, range)
          return getMusicMessageList(requiredIds)
        }).then((musicMessages) => {
          this.setMusicList(musicMessages)
          this.storeMusicIds(billboardId, musicMessages)
          let musicUrls = musicMessages.map(value => value.url)
          this.initDuration(musicUrls)
          this.storeMusicMessages(billboardId, musicMessages, musicUrls, this.currentPage)
        })
      })
      this.loading = false
    }
  },
  created () {
    this.getData()
  }
}
