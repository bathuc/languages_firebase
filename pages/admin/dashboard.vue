<template>
  <div class="wrapper">
      Dashboard
      <a href="/admin/logout">logout</a>
  </div>
</template>

<script>

export default {
    middleware: ['authenticated'],
}
</script>


