<template>
  <q-layout q-layout view="hHh lpR fff">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>管理員</q-toolbar-title>
        <q-btn icon="logout" @click="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" :width="200" :breakpoint="600" bordered class="bg-grey-2">
      <q-list padding>
        <q-item clickable v-ripple to='/backstage' exact>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            會員管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to='/partner'>
          <q-item-section avatar>
            <q-icon name="engineering" />
          </q-item-section>
          <q-item-section>
            夥伴管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/appointmentManage">
          <q-item-section avatar>
            <q-icon name="book_online" />
          </q-item-section>
          <q-item-section>
            預約管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/questionManage">
          <q-item-section avatar>
            <q-icon name="question_answer" />
          </q-item-section>
          <q-item-section>
            問題管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/pageMessageManage">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            頁面訊息管理
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="arrow_back"/>
          </q-item-section>
          <q-item-section>
            返回首頁
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from 'src/stores/store'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

const drawer = ref(false)
const miniState = ref(true)

const logout = async () => {
  await user.logout()
  router.push('/')
}
</script>
