export default {
  name: 'paging',
  props: {
    listsLength: Number,
    currentPage: Number
  },
  methods: {
    gotoPage (num) {
      console.log(num)
      this.$emit('setPage', num)
    }
  }
}
