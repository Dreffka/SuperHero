<template>
<div>
  <div>
     <b-pagination
        v-model="page"
        :total-rows="10"
      ></b-pagination>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      count: 5,
      pageSize: 5
    }
  },
  methods: {
    handlePageChange(value) {
      this.page = value
    },
  },
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 85px;
}
</style>