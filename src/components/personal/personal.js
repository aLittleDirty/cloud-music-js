import PersonalSidebarSelections from '../personal-sidebar-selections/index.vue'
import { getPersonalOptionsCount, getPersonalPlaylists } from '../../api/music-api'
import { localGet } from '../../util/repository'
export default {
  name: 'personal',
  data () {
    return {
      selectionsList: [],
      signersCount: 0,
      radiosCount: 0
    }
  },
  components: {
    PersonalSidebarSelections
  },
  async mounted () {
    let userId = localGet('userId')
    let [ [ createdPlaylist, collectedPlaylist ], { signersCount, radiosCount, createdPlaylistCount, collectedPlaylistCount } ] = await Promise.all([getPersonalPlaylists(userId), getPersonalOptionsCount()])
    this.signersCount = signersCount
    this.radiosCount = radiosCount
    this.selectionsList = [ { title: `创建的歌单(${createdPlaylistCount})`, playlist: createdPlaylist }, { title: `收藏的歌单(${collectedPlaylistCount})`, playlist: collectedPlaylist } ]
  }
}
