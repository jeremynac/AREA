

<template>
<div>
<div>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#" to="/" > STATION F </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to='/room/search' class="px-4">
          Rooms
        </b-nav-item>
         <b-nav-item to='/reservations' class="px-4">
          Reservations
        </b-nav-item>
        <b-nav-item to="events" class="px-4">
          Events
        </b-nav-item>
        <b-nav-item to="/programs" class="px-4">
          Startup programs
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">FR</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#" to="/login">Log in</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
<div>
  <router-view></router-view>
</div>
</div>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style scoped>
  .navbar {
    background-color: black;
    width: 100%
  }
</style>
