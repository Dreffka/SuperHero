
<template>
  <div v-if="currentHero" class="edit-form">
    <h4>Edit</h4>
    <form>
      <div class="row">
      <div class="input-field col s6">
        <input id="nickname" type="text" class="validate" v-model="currentHero.nickname">
        <label for="nickname" class="active">Nickname</label>
      </div>
      <div class="input-field col s6">
        <input id="real_name" type="text" class="validate" v-model="currentHero.real_name">
        <label for="real_name" class="active">Real Name</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s6">
        <input id="images" type="text" class="validate" v-model="currentHero.images" >
        <label for="images" class="active">Image (url)</label>
      </div>

      <div class="input-field col s6">
        <input id="superpowers" type="text" class="validate" v-model="currentHero.superpowers" >
        <label for="superpowers" class="active">Superpowers</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s6">
        <textarea id="origin_description" type="text" class="materialize-textarea" v-model="currentHero.origin_description"/>
        <label for="origin_description" class="active">Origin description</label>
      </div>

      <div class="input-field col s6">
        <input id="catch_phrase" type="text" class="validate" v-model="currentHero.catch_phrase">
        <label for="catch_phrase" class="active">Catch phrase</label>
      </div> 
    </div>

    <button class="btn waves-effect waves-light" @click="updateHero">Edit Hero
    </button>
    </form>
  </div>

</template>

<script>
import HeroesDataService from "../services/HeroesDataService"

export default {
  name: "edit",
  data() {
    return {
      currentHero: null,
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

 updateHero(status) {
      var data = {
        id: this.currentHero.id,
        nickname: this.currentHero.nickname,
        real_name: this.currentHero.real_name,
        superpowers: this.currentHero.superpowers,
        origin_description: this.currentHero.origin_description,
        catch_phrase: this.currentHero.catch_phrase,
        images: this.currentHero.images
      }

      HeroesDataService.update(this.currentHero.id, data)
        .then(response => {
          this.currentHero.published = status
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
  mounted() {
    this.message = ''
    this.getHeroes(this.$route.params.id)
  }
}
</script>