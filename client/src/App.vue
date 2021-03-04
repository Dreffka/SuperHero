<template>
  <div id="app">
    <nav>
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo">Superheroes</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/">All Heroes</router-link></li>
        <li><router-link to="/create">Create Hero</router-link></li>
      </ul>
    </div>
  </nav>
    <div class="container">

    
      
    
    <router-view/>
  </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 100px;
}

nav {
  background-color: #26a69a;
  position: fixed;
  top: 0;
  z-index: 2;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
