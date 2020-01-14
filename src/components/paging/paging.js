export default {
  name: 'paging',
  props: {
    lists: Number,
    currentPage: Number
  },
  methods: {
    gotoPage (num) {
      this.$emit('setPage', num)
    }
  }
}
