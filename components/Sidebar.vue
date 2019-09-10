<template>
  <div class="sidebar-wraper">
    <div class="app-title">
      Languages
    </div>
    <div class="account-picture">
      <i class="material-icons user-icon"> account_circle </i>
      <span>Admin</span>
    </div>

    <ul class="sidebar-menu">
      <li :class="currentRoute.includes('/admin/subjects')? 'active':''" @click="subjectsClick">Subjects</li>
      <li :class="currentRoute.includes('/admin/words')? 'active':'' " @click="wordsClick">Words</li>
    </ul>
  </div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		created() {
		},
	  computed: {
		  currentRoute() {
			  return this.$store.state.currentRoute.route;
		  },
	  },
		methods: {
			wordsClick() {
				this.$router.push('/admin/words');
			},
      subjectsClick() {
        this.$router.push('/admin/subjects');
      }
		}
	}
</script>
<style lang="scss" scoped>
  .sidebar-wraper {
    width: 250px;
    height: 100vh;
    background-color: #343a40;
    color: #c2c7d0;
  }

  .app-title {
    height: 60px;
    border-bottom: 1px solid #4b545c;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .account-picture {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 60px;
    font-size: 15px;
    border-bottom: 1px solid #4b545c;

    .user-icon {
      font-size: 40px;
      margin-right: 10px;
    }
  }

  .sidebar-menu {
    margin-top: 20px;
    list-style: none;
    padding-left: 10px;

    li {
      font-size: 16px;
      line-height: 24px;
      padding: 10px;
      padding-left: 15px;
      margin-bottom: 5px;
      width: 190px;
      border-radius: .25rem;
    }

    li.active {
      background-color: #007bff;
      border-radius: .25rem;
      color: #fff;
    }

    li:hover {
      cursor: pointer;
      color: #fff;
    }

    li:not(.active):hover {
      background-color: #7F828B;
    }
  }
</style>
