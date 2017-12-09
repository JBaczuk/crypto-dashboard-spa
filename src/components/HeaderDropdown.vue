<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/jbaczuk.jpeg" class="img-avatar" alt="jordan.baczuk@gmail.com">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-tasks"></i> Alerts<b-badge variant="danger">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<b-badge variant="success">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <!-- <b-dropdown-item><i class="fa fa-usd"></i> Payments<b-badge variant="default">{{itemsCount}}</b-badge></b-dropdown-item> -->
        <b-dropdown-item><i class="fa fa-file"></i> Accounts<b-badge variant="primary">{{itemsCount}}</b-badge></b-dropdown-item>
        <!-- <b-dropdown-divider></b-dropdown-divider> -->
        <b-dropdown-item><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
  export default {
    name: 'header-dropdown',
    data: () => {
      return { itemsCount: 3 }
    }
  }
</script>

