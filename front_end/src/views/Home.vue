<template>
  <el-container class="main-container">
    <el-header :class="{ 'scrollHeader': scrollHeader }" ref="header">
      <div class="logo-container">
        <div class="logo">
          <img src="../../public/img/logoBest.png" alt="">
        </div>
        <div class="logo-span">河科院图书管理系统</div>
      </div>
      <el-menu style="border-bottom: none;" mode="horizontal" :background-color="menuBackColor"
        :text-color="menuTextColor" :active-text-color="menuActiveTextColor" unique-opened router
        :default-active="this.activePath" ref="menu" class="el-menu">
        <el-menu-item class="home">
          <!-- <i class="el-icon-s-home" style="font-size:2rem;padding-top:0.8rem" @click="backHome"></i> -->
          <div @click="backHome">首页</div>
          <!-- <template slot="title">
            <span style="font-size:100%">首页</span>
          </template> -->
        </el-menu-item>
        <el-menu-item :index="item.path" v-for=" item  in  menuList " :key="item.id" @click="saveNavState(item.path)">
          <template slot="title">
            <span style="font-size:100%">{{ item.authName }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <el-button :class="{ 'scrollHeader': scrollHeader }" @click="logOut" class="log-out">退出登录</el-button>
    </el-header>
    <el-main style="padding-top:60px;" v-if="$route.path !== '/welcome'" class="router-main">
      <transition-group appear name="animate__animated animated__bounce" enter-active-class="animate__fadeInDown"
        leave-active-class="animate__fadeOutDown">
        <router-view key="2"></router-view>
      </transition-group>
    </el-main>
    <router-view v-else></router-view>
    <el-footer v-if="$route.path === '/welcome'">
      河科院图书管理系统 &copy;2024 - present. Created by 嘉茜
    </el-footer>
  </el-container>
</template>

<script>
import 'animate.css'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      // 菜单数据
      menuList: [],
      // 被激活的链接地址
      activePath: '',
      isSticky: false,
      scrollHeader: false,
      menuBackColor: '#0B539B',
      menuTextColor: '#fff',
      menuActiveTextColor: '#9cdbfd'
    }
  },
  methods: {
    ...mapMutations('userAbout', {
      saveInfo: 'SAVE'
    }),
    // 获取菜单数据
    async getMenuList() {
      const res = await this.$http.get(this.baseUrl + '/getFormData')
      if (res.status !== 200)
        return this.$message.error('菜单初始化失败')
      this.menuList = res.data.data
      this.activePath = this.$route.fullPath
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 回到主页
    backHome() {
      if (this.$route.fullPath === '/welcome')
        return
      this.$router.push('/welcome')
      window.sessionStorage.setItem('activePath', '/welcome')
      this.activePath = '/welcome'
    },
    // 用户登出
    async logOut() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('name')
      this.$router.replace('/login')
    },
    onScroll() {
      if (window.scrollY > 100) {
        this.scrollHeader = true
        this.menuBackColor = '#0b539b0e'
        // this.menuActiveTextColor
      } else {
        this.scrollHeader = false
      }
    }
  },
  created() {
    window.sessionStorage.removeItem('_one_key')
    this.saveInfo()
    this.getMenuList()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.el-header {
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: #0B539B;
  color: #E9EEF3;
  line-height: 60px;
  padding: 0;
  padding-left: 10px;
  user-select: none;
  display: flex;
  justify-content: space-between;
}

.scrollHeader {
  /* color: #0b539b0e; */
  background-color: #0b539b94 !important;
  border-bottom: 1px solid #0a46817b;
  /* color: #0a4681; */
}

.el-footer {
  width: 100%;
  text-align: center;
  background-color: #0B539B;
  border-top: 1px solid #e8e8e8;
  line-height: 60px;
  color: #fff;
}

.logo-container {
  display: flex;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 52px;
  height: 52px;
  object-fit: cover;
}

.logo-span {
  font-size: larger;
  font-weight: bold;
  margin-left: 8px;
  font-family: 'Courier New', Courier, monospace;
}

.el-main {
  background-color: #f2f5f8;
  color: #333;
  padding-top: 60px;
}

.el-icon-s-home {
  font-family: element-icons !important;
  color: rgb(255, 255, 255);
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  margin-right: 6px;
}

.el-icon-s-home:hover {
  font-family: element-icons !important;
  color: #9cdafc;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.main-container {
  height: 100%;
  /* background-image: url('https://s4.ax1x.com/2021/12/15/TSGwWt.jpg'); */
}

.el-menu {
  display: flex;
  background-color: #0B539B;
  /* width: 60%; */
  height: 3.7rem;
  margin: -3px;
  /* margin-left: 30px; */
  /* flex: auto; */
}

.home:hover {
  cursor: pointer;
}

.router-main {
  padding: 10px 60px 20px 60px;
}

.log-out {
  /* flex: 1; */
  cursor: pointer;
  background-color: #0B539B;
  color: #ffffff;
  font-size: 16px;
  border: none;
  /* margin-left: 48px; */
  text-decoration: none;
  transition: all .3s ease;
  /* margin-right: 3px; */
}

.log-out:hover {
  background: #0a4681;
}
</style>