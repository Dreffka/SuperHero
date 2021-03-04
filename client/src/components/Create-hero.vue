<template>
  <div class="about">
    <h1>Create Hero</h1>

  <div v-if="!submitted">
    <div class="row">
      <div class="input-field col s6">
        <input id="nickname" type="text" v-model="hero.nickname">
        <label for="nickname">Nickname</label>
      </div>
      <div class="input-field col s6">
        <input id="real_name" type="text" v-model="hero.real_name">
        <label for="real_name">Real Name</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s6">
        <input id="images" type="text" v-model="hero.images">
        <label for="images">Image (url)</label>
      </div>

      <div class="input-field col s6">
        <input id="superpowers" type="text" v-model="hero.superpowers">
        <label for="superpowers">Superpowers</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s6">
        <textarea id="origin_description" type="text" class="materialize-textarea" v-model="hero.origin_description"/>
        <label for="origin_description">Origin description</label>
      </div>

      <div class="input-field col s6">
        <input id="catch_phrase" type="text" v-model="hero.catch_phrase">
        <label for="catch_phrase">Catch phrase</label>
      </div> 
    </div>

    <button class="btn waves-effect waves-light" @click="saveHero()">Add new Hero
    </button>
  </div>

   <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newHero">Add</button>
  </div>

    </div>
</template>


<script>
import HeroesDataService from "../services/HeroesDataService";

export default {
  name: "create-hero",
  data() {
    return {
      hero: {
        id: null,
        nickname: '',
        real_name: '',
        superpowers: '',
        origin_description: '',
        catch_phrase: '',
        images: ''
      },
      submitted: false
    }
  },
  methods: {
    saveHero() {
      var data = {
        nickname: this.hero.nickname,
        real_name: this.hero.real_name,
        superpowers: this.hero.superpowers,
        origin_description: this.hero.origin_description,
        catch_phrase: this.hero.catch_phrase,
        images: this.hero.images
      };

      HeroesDataService.create(data)
        .then(response => {
          this.hero.id = response.data.id
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        });
    },
    
    newHero() {
      this.submitted = false
      this.hero = {}
    }
  }
}
</script>
