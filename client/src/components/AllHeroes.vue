<template>

<div class="card-heroes">
    <div class="row">
      <div class="col col-md-4" >
        
        <div class="card" v-for="(hero, index) in heroes"
             :key="index"
             :item="hero" 
             > 
          <div class="card-image">
            <img :src="hero.images">
          </div>
          <div class="card-content">
            <span class="card-title">{{ hero.nickname }}</span>
          </div>
          <div class="card-action buttons">

            <a :href="/heroes/ + hero.id" class="waves-effect green btn">Open</a>
            <a :href="/edit/ + hero.id" class="waves-effect orange btn">Edit</a>
            <button class="waves-effect red btn" @click="deleteHero(hero._id)">Delete</button>
          
          </div>
        </div>
      </div>
    </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        @change="handlePageChange"
      ></b-pagination>

      <!-- <p>{{count}}</p>
      <p>{{currentPage}}</p> -->
     <!-- <pagination/> -->
  </div>

</template>

<script>
import HeroesDataService from "../services/HeroesDataService";

export default {
  name: "AllHeroes",
  data() {
    return {
      heroes: [],
      currentHero: null,
      currentIndex: -1,

      currentPage: 1,
      page: 1,
      count: 2,
      pageSize: 5
    }
  },
  methods: {

    getRequestParams(page, pageSize) {
      let params = {}

      if (page) {
        params["page"] = page - 1
      }
      if (pageSize) {
        params["size"] = pageSize
      }
      return params
    },

    retrieveHeroes() {

      const params = this.getRequestParams(
        this.page,
        this.pageSize,
        // this.currentPage
      )
      HeroesDataService.getAll(params)
        .then((response) => {
          const { heroes, totalItems} = response.data

          this.heroes = heroes
          this.count = totalItems
          // this.currentPage = currentPage 
          // this.pageSize = totalPages
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
  
    handlePageChange(value) {
      this.currentPage = value
      this.retrieveHeroes()
    },

    deleteHero() {
      HeroesDataService.delete()
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: "heroes" })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted() {
    this.retrieveHeroes()
  }
}
</script>

<style scoped>

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card {
  width: 350px;
  margin: 30px 0;
}
.card-image img {
  max-height: 450px;
  max-width: 400px;
}

.card-title {
  color: #2c3e50;
}

.buttons {
  display: flex;
  justify-content: center;
}

.btn {
  margin: 0 15px;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 85px;
}


</style>

<style>
.pagination li.active {
    background-color: #fff;
}
</style>