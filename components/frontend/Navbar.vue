<template>
    <div class="navigation-bar d-none d-md-block">
        <div class="container">
            <div class="row">
                <nav class="navbar navbar-expand-sm d-flex justify-content-between">
                    <button class="navbar-toggler" :class="isClickNavbar? 'change' : ''" type="button" @click="clickNavbar()">
                        <span class="bar1"></span>
                        <span class="bar2"></span>
                        <span class="bar3"></span>
                    </button>

                    <div class="collapse navbar-collapse" :style="isClickNavbar? 'display:block' : 'display:none'">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item dropdown">
                                <a :class="['nav-link', (this.currentRoute === '' || this.currentRoute === '/')? 'active':'', ]" @click="wordClick" href="javascript:void(0);">Words</a>
                                <a :class="['nav-link', currentRoute.includes('viet')? 'active':'']" @click="vietClick" href="javascript:void(0);">Viet</a>
                                <a :class="['nav-link', currentRoute.includes('phrase')? 'active':'']" @click="phraseClick" href="javascript:void(0);">Phrases</a>
                            </li>
                        </ul>
                    </div>

                    <div class="left-bar d-none d-sm-block">
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    /*function menuMobile(event) {
        event.classList.toggle("change");
    }
    $(document).ready(function () {
        $(".navbar-toggler").click(function () {
            $(".collapse").slideToggle(300);
        });
    });*/
    export default {
        data(){
            return {
                isClickNavbar: false,
            }
        },
        computed: {
            currentRoute() {
                return this.$store.state.currentRoute.route;
            },
        },
        methods: {
            clickNavbar(){
                this.isClickNavbar = ! this.isClickNavbar;
            },
            wordClick(){
                this.$router.push('/');
                window.location.href = '/';
            },
            vietClick(){
                this.$router.push('/viet');
                window.location.href = '/viet';
            },
            phraseClick(){
                this.$router.push('/phrase');
                window.location.href = '/phrase';
            },
        }
    }
</script>

<style>
    /*navigation bar*/
    .navigation-bar {
        background-color: #5aa0a0; /* nav background color */
        width: 100%;
    }

    nav.navbar {
        border: 0;
        border-radius: 0;
        clear: both;
        margin: 0 auto;
        min-height: auto;
        width: 100%;
        padding-left: 0px;
    }

    .navbar-toggler {
        display: none;
    }

    .navbar-nav {
        list-style: none;
        padding-left: 0;
    }

    .navbar-nav li {
        float: none;
        padding: 0px 10px; /* nav item padding */
        display: inline-block;
    }

    .navbar-nav li a {
        color: #fff; /* nav item color */
        display: inline-block;
        padding: 8px 25px;
        font-weight: bold;
        line-height: normal;
    }

    .navbar-nav li a:hover, .navbar-nav li a.active {
        background: #72bab9; /* nav hover, active background */
        border-radius: 20px;
        text-decoration: none;
    }

    @media only screen and (max-width: 570px) {
        nav.navbar {
            padding-left: 20px;
        }

        .navbar-toggler, .collapse {
            display: block;
        }

        .collapse {
            display: none;
        }

        .navbar-toggler {
            border-radius: 5px;
            float: right;
            margin-right: 15px;
            border: 1px #fff solid;
            background: transparent;
            padding: 0px 5px;
            outline: none;
        }

        .bar1, .bar2, .bar3 {
            background-color: #fff;
            display: block;
            margin: 6px 0;
            transition: 0.4s;
            width: 30px;
            height: 2px;
        }

        .navbar-collapse {
            background: #5aa0a0;
            position: absolute;
            top: 100%;
            float: left;
            left: 0;
            width: 100%;
            z-index: 99;
        }

        .navbar-nav {
            padding: 0;
            padding-top: 5px;
            margin: 0 auto;
        }

        .navbar-nav li {
            border-top: 1px #fff solid; /* border each item */
            border-radius: 0;
            display: block;
            line-height: normal;
            margin: 0 auto;
            padding: 0px;
            width: 100%;
        }

        .navbar-nav li a:not(.active) {
            display: block;
            padding: 6px 22px;
            margin: 0 auto;
            line-height: 32px;
            text-align: left;
            width: 100%;
            /*background-color: red;*/
        }

        .nav-item:hover{
            background: #72bab9;
            border-radius: 0px;
            text-decoration: none;
        }
        .navbar-nav li a.active {
            background: #72bab9;
            border-radius: 0px;
            text-decoration: none;
            display: block;
            padding: 6px 22px;
            margin: 0 auto;
            line-height: 32px;
            text-align: left;
            width: 100%;
        }
    }
</style>
