export default {
  name: 'paging',
  props: {
    listsLength: Number,
    currentPage: Number
  },
  methods: {
    gotoPage (num) {
      this.$emit('setPage', num)
    }
  }
}
