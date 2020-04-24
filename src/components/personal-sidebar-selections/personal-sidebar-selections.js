export default {
  name: 'personal-sidebar-selections',
  props: ['selections'],
  data () {
    return {
      title: '',
      options: []
    }
  },
  mounted () {
    let { title, playlist } = this.selections
    this.title = title
    this.options = playlist
  }
}
