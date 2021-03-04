<template>
  <div class="edit-form">


    <div class="row hero-row">
        <div class="col s6">
            <img :src="currentHero.images" alt="hero_image"/>
        </div>
        <div class="col s6">
         <h2>{{ currentHero.nickname }}</h2>
            <p><b>Real name:</b> {{ currentHero.real_name }}</p>
            <p><b>SuperPowers:</b> {{ currentHero.superpowers }}</p>
            <p><b>Description:</b> {{ currentHero.origin_description }}</p>
            <p><b>Catch phrase:</b> {{ currentHero.catch_phrase }}</p>
      </div>
    </div>

    <div class="buttons">
      <button class="waves-effect red btn"
       @click="deleteHero"
       >
         Delete
      </button>

    <p>{{ message }}</p>
    </div>
  </div>

</template>

<script>
import HeroesDataService from "../services/HeroesDataService"

export default {
  name: "heroes",
  data() {
    return {
      currentHero: null,
      message: ''
    };
  },
  methods: {
    getHeroes(id) {
      HeroesDataService.get(id)
        .then(response => {
          this.currentHero = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },


    deleteHero() {
      HeroesDataService.delete(this.currentHero.id)
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
    this.message = ''
    this.getHeroes(this.$route.params.id)
  }
};
</script>

<style scoped>
 img {
   max-width: 450px;
   max-height: 700px;
   border-radius: 15px;
 }
 .hero-row {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 50vh;
 }

 .btn {
     margin: 15px;
 }
</style>