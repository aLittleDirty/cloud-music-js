export default {
  name: 'paging',
  props: {
    pages: Number,
    currentPage: Number
  },
  methods: {
    gotoPage (num) {
      this.$emit('setPage', num)
    }
  }
}
