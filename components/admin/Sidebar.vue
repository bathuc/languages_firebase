<template>
    <div class="sidebar-wraper" :class="hambugerClick? 'toggle' : ''">
        <div class="app-title" @click="languageClick">
            Languages
        </div>
        <div class="account-picture" @click="dashboardClick">
            <i class="material-icons user-icon"> account_circle </i>
            <span>Admin</span>
        </div>

        <ul class="sidebar-menu">
            <li :class="currentRoute.includes('/admin/subject')? 'active':''" @click="subjectClick">Subjects</li>
            <li :class="currentRoute.includes('/admin/word')? 'active':'' " @click="wordClick">Words</li>
            <li :class="currentRoute.includes('/admin/phrase')? 'active':'' " @click="phraseClick">Phrases</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {
            console.log('hambegerClick',this.hambegerClick);
        },
        computed: {
            currentRoute() {
                return this.$store.state.currentRoute.route;
            },
            hambugerClick(){
                return this.$store.state.utility.hambugerClick;
            }
        },
        methods: {
            phraseClick() {
                this.$store.commit('utility/setHambugerClick', false)
                this.$router.push('/admin/phrase');
            },
            wordClick() {
                this.$store.commit('utility/setHambugerClick', false)
                this.$router.push('/admin/word');
            },
            subjectClick() {
                this.$store.commit('utility/setHambugerClick', false)
                this.$router.push('/admin/subject');
            },
            dashboardClick() {
                this.$store.commit('utility/setHambugerClick', false)
                this.$router.push('/admin/dashboard');
            },
            languageClick() {
                this.$router.push('/');
            }
        }
    }
</script>
<style lang="scss" scoped>

    .sidebar-wraper {
        width: 15rem;
        height: 100vh;
        background-color: #343a40;
        color: #c2c7d0;
        margin-left: -15rem;
    }

    .sidebar-wraper.toggle {
        margin-left: 0rem;
    }

    @media (min-width: 768px) {
        .sidebar-wraper {
            margin-left: 0;
        }

        .sidebar-wraper.toggle {
            margin-left: -15rem;
        }
    }

    .app-title {
        height: 60px;
        border-bottom: 1px solid #4b545c;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding-left: 20px;
        cursor:pointer;
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
