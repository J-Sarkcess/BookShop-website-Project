<template>
  <div class="PersonalCenter">
    <div @click="showDialog"><mt-cell :title="title" is-link :icon="isIconShow" class="login"></mt-cell></div>
    <mt-cell title="会员俱乐部" is-link class="cell"></mt-cell>
    <mt-cell title="我的订单" is-link class="cell" v-show="!isIconShow"></mt-cell>
    <mt-cell title="我的收藏" is-link class="cell" v-show="!isIconShow"></mt-cell>
    <mt-cell title="社区论坛" is-link class="cell"></mt-cell>
    <mt-cell title="联系客服" is-link class="cell"></mt-cell>
    <mt-cell title="关于本项目" is-link to="/about" class="about"></mt-cell>
    <transition name="dialog" mode="out-in">
      <div v-if="isLoginShow" class="loginBg" @click="showDialog">
        <div class="loginDialog">
          <div><label for="username">账号</label><input id="username" type="text" placeholder="请输入手机号码" name="username" @blur="checkAccount" v-model="account" @focus="clearWarning"></div>
          <p class="warning" v-text="isShowWarning1"></p>
          <div><label for="pwd">密码：</label><input type="password" placeholder="请输入密码" id="pwd" name="pwd"></div>
          <button class="registerButton" @click="goToRegister">注册</button>
          <button class="loginButton" @click="goToLogin">登录</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { Cell, Toast } from 'mint-ui'
import Vue from 'vue'

Vue.component(Cell.name, Cell)

export default {
  data () {
    return {
      title: '请登录',
      isLoginShow: false,
      isIconShow: 'more',
      account: '',
      isShowWarning1: ''
    }
  },
  methods: {
    showDialog (ev) {
      if (ev.target.className.indexOf('loginBg') !== -1) {
        this.isLoginShow = !this.isLoginShow
      }
      if (ev.target.className.indexOf('mint') !== -1) {
        this.isLoginShow = !this.isLoginShow
      }
    },
    checkAccount () {
      const test = /^1[3|4|5|7|8][0-9]{9}$/
      if (!test.test(this.account)) {
        this.isShowWarning1 = '请输入正确的手机号码'
      }
    },
    clearWarning () {
      this.isShowWarning1 = ''
    },
    goToLogin () {
      if (this.isShowWarning1 !== '') {
        return
      }
      this.isLoginShow = !this.isLoginShow
      this.title = '欢迎 ' + this.account
      this.isIconShow = false
      Toast({
        message: '登录成功',
        position: 'bottom',
        duration: 3000
      })
    },
    goToRegister () {
      if (this.isShowWarning1 !== '') {
        return
      }
      this.isLoginShow = !this.isLoginShow
      this.title = '欢迎 ' + this.account
      this.isIconShow = false
      Toast({
        message: '注册成功',
        position: 'bottom',
        duration: 3000
      })
    }
  }
}
</script>

<style scoped>
.PersonalCenter {
  
}
.login {
  text-align: left;
  border-bottom: 10px solid #eee;
}
.cell {
  text-align: left;
  border-bottom: 1px solid #eee;
}
.cell:nth-last-of-type(2) {
  border-bottom: 10px solid #eee;
}
.about {
  text-align: left;
  border-bottom: 1px solid #eee;
}
.loginBg {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1111;
  width: 100%;
  height: 100%;
}
.loginDialog {
  background-color: #fff;
  font-size: 30px;
  border-radius: 20px;
  position: absolute;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  top: 300px;
  padding: 40px 20px;
  box-sizing: border-box;
}
.loginDialog div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 1px dashed #ccc;
}
.loginDialog div label {
  flex: 1;
}
.loginDialog input {
  flex: 4;
  width: 100%;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
}
.warning {
  font-size: 24px;
  color: red;
  height: 30px;
}
.registerButton {
  outline: none;
  border: none;
  background-color: yellowgreen;
  color: white;
  padding: 10px 25px;
  border-radius: 10px;
  font-size: 30px;
  margin-right: 50px;
}
.loginButton {
  outline: none;
  border: none;
  background-color: skyblue;
  color: white;
  padding: 10px 25px;
  border-radius: 10px;
  font-size: 30px;
}

.dialog-enter {
  opacity: 0;
}

.dialog-enter-to {
  opacity: 1;
}

.dialog-leave {
  opacity: 1;
}

.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

</style>
