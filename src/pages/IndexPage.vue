<template>
  <q-page class="flex flex-center" style="min-height:100%" id="front-main">
    <div class="video">
      <video autoplay muted loop id="myVideo">
        <source src="../assets/video2.mp4" type="video/mp4">
      </video>
      <div class="sloganA"></div>
      <div class="sloganB"></div>
      <div class="sloganC">尋找一份簡單的陪伴</div>
    </div>
    <div id="about-us">
      <h1 data-aos="fade-down" data-aos-offset="0" data-aos-duration="1000">關於我們</h1>
      <div class="row">
        <div class="left" data-aos="flip-left" data-aos-offset="0"  data-aos-duration="1500">
          <q-card>
            <q-card-section>
              開創想法
            </q-card-section>
            <q-card-section>
              <div class="content">
                在這科技越來越進步的年代，明明彼此間的距離因為科技拉近了，但心與心的距離卻也因此更遠了。何時起，無時無刻我們總只盯著手上那冰冷的螢幕，卻缺少了更多眼神間的交流。
              </div>
              <br>
              <div class="content">
                是不是偶爾想找個人出門吃飯逛街的時候，總是被推三阻四的，或是因為彼此間假期無法契合而作廢。
              </div>
              <br>
              <div class="content">
                是不是偶爾遇到上班不順利被老闆責罵，還是生活上遇到甚麼不順利，想找個人暢談自己滿腹的牢騷，卻找不到朋友，也不想與家人傾訴。
              </div>
              <br>
              <div class="content">
                「友伴」，就是在這樣的困擾中誕生了。現在有太多太多可以交到新朋友的方式了，不論是聯誼還是透過社交軟件。但是有時候我們不只是身體的疲倦，心理上的倦怠也導致我們不想再做過多的社交，尋求的就只是一份安靜但卻有人陪著的感覺。如果你偶爾也有這樣的需求，來試試看就知道了！
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="right" data-aos="flip-right" data-aos-offset="0"  data-aos-duration="1500">
          <div class="q-pa-md">
            <q-table
              title="最新消息"
              :rows="rowsNews"
              :columns="columns"
              row-key="_id"
              hide-pagination
              v-model:pagination="pagination2"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="partner-intro">
      <div class="container">
        <h1 data-aos="fade-up" data-aos-offset="0" data-aos-delay="300"  data-aos-duration="1000">夥伴介紹</h1>
        <div class="filter-btn">
          <q-btn label="全部" @click="changeCategory('all')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="300"  data-aos-duration="1000"></q-btn>
          <q-btn label="運動" @click="changeCategory('sport')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="600"  data-aos-duration="1000"></q-btn>
          <q-btn label="遊戲" @click="changeCategory('game')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="900"  data-aos-duration="1000"></q-btn>
          <q-btn label="吃飯" @click="changeCategory('eat')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="1200"  data-aos-duration="1000"></q-btn>
          <q-btn label="電影" @click="changeCategory('movie')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="1500"  data-aos-duration="1000"></q-btn>
          <q-btn label="逛街" @click="changeCategory('shopping')" data-aos="zoom-in" data-aos-offset="0" data-aos-delay="1800"  data-aos-duration="1000"></q-btn>
        </div>
        <swiper slides-per-view="1" :spaceBetween="30" :loop="true" :navigation="true" :observer="true"  :breakpoints="{
          600: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1040: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }" :key="form.change" :modules="modules" class="mySwiper">
          <!-- :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }" -->
          <swiper-slide v-for="row in rows" :key="row._id">
            <q-card>
              <q-img :src="row.pic" class="worker-pic"></q-img>
              <q-card-section>
                <div class="worker-name">{{ row.name }}</div>
                <div class="worker-hobby">興趣：{{ row.hobby }}</div>
                <div class="worker-word">給大家的一句話：{{ row.word }}</div>
                <q-btn label="預約" @click="openDialog(row._id)" v-if="user.isLogin"></q-btn>
              </q-card-section>
              <marquee scrolldelay="80" scrollamount="3">
                <span v-for="message in row.reply" :key="message._id">{{
                  message.reply
                }}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </span>
              </marquee>
            </q-card>
          </swiper-slide>
        </swiper>
      </div>
      <q-dialog v-model="form.dialog" class="appointmentForm-dialog">
        <q-card>
          <q-card-section class="appointmentForm-title">
            <div>預約表單</div>
          </q-card-section>
          <q-card-section class="appointmentForm-main">
            <div class="row justify-center">
              <div class="col-5">
                <span>日期</span>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn label="確認" flat v-close-popup></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-1"></div>
              <div class="col-5">
                <span>時間</span>
                <q-select color="teal" filled v-model="time" :options="options" label="Time" :rules="[rules.required] " lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div>
              <div class="col-5">
                <span>夥伴名字</span>
                <q-input outlined v-model="form.p_name" disable></q-input>
              </div>
              <div class="col-1"></div>
              <div class="col-5">
                <span>地點</span>
                <q-input outlined v-model="form.place" :rules="[rules.required]" lazy-rules></q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="appointmentForm-btn">
            <q-btn label="確認" @click="submit"></q-btn>
            <q-btn label="取消" v-close-popup></q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div id="contact-us">
      <div class="question" data-aos="zoom-in-up" data-aos-offset="0" data-aos-delay="300" data-aos-duration="1000">
        <h1>聯繫我們</h1>
        <q-input label="電子信箱" outlined v-model="formFeedback.email"></q-input>
        <q-input label="問題描述" outlined v-model="formFeedback.content"></q-input>
        <q-btn dense unelevated type="submit" label="送出" @click="alert"></q-btn>
      </div>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]" style="z-index: 999;">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script setup>
import { apiAuth, api } from 'src/boot/axios'
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/store'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper'

import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import aos from 'aos'
import 'aos/dist/aos.css'
gsap.registerPlugin(TextPlugin)

const modules = [Pagination, Navigation]
const router = useRouter()
const user = useUserStore()
const getDate = new Date()
const year = getDate.getFullYear()
let month = (getDate.getMonth() + 1).toString()
let day = (getDate.getDate() + 1).toString()

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

const formFeedback = reactive({
  email: '',
  content: ''
})

const alert = () => {
  Swal.fire({
    icon: 'success',
    title: '成功',
    text: '謝謝您的意見，我們會予以參考並繼續進步',
    customClass: {
      popup: 'top'
    }
  })
}

const columns = reactive([
  {
    name: 'date',
    label: '發布日期',
    align: 'left',
    field: row => row.date
  },
  {
    name: 'title',
    label: '主旨',
    align: 'left',
    field: row => row.title
  },
  {
    name: 'content',
    label: '內容',
    align: 'left',
    field: row => row.content
  }
])

const pagination2 = {
  sortBy: 'date',
  descending: false,
  page: 1,
  rowsPerPage: 5
}

const changeCategory = (category) => {
  if (category === 'shopping') {
    rows = rows.filter(el => el.category.includes('逛街') === true)
    form.change = 1
  } else if (category === 'sport') {
    rows = rowsOld
    rows = rows.filter(el => el.category.includes('運動') === true)
    form.change = 2
  } else if (category === 'eat') {
    rows = rowsOld
    rows = rows.filter(el => el.category.includes('吃飯') === true)
    form.change = 3
  } else if (category === 'movie') {
    rows = rowsOld
    rows = rows.filter(el => el.category.includes('電影') === true)
    form.change = 4
  } else if (category === 'game') {
    rows = rowsOld
    rows = rows.filter(el => el.category.includes('遊戲') === true)
    form.change = 5
  } else if (category === 'all') {
    rows = rowsOld
    form.change = 6
  }
}

const addZeroFunction = () => {
  if (month < 10) {
    month = month.padStart(2, '0')
  } else {
    return month
  }
  if (day < 10) {
    day = day.padStart(2, '0')
  } else {
    return day
  }
}
addZeroFunction()
const date = ref(year + '/' + month + '/' + day)

const time = ref(null)
const options = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

const form = reactive({
  dialog: false,
  time: '',
  date: '',
  account: '',
  name: '',
  phone: '',
  email: '',
  p_name: '',
  place: '',
  p_pic: '',
  p_id: '',
  change: false
})

const openDialog = (id) => {
  const index = rows.findIndex(el => el._id === id)
  form.p_pic = rows[index].pic
  form.p_name = rows[index].name
  form.p_id = rows[index]._id
  form.dialog = true
  form.place = ''
}

const submit = async () => {
  form.time = time.value
  form.date = date.value
  form.account = user.account
  form.name = user.name
  form.phone = user.phone
  form.email = user.email
  form.dialog = false
  try {
    const { data } = await apiAuth.post('/users/appointment', form)
    if (data.message === '預約時間重複') {
      Swal.fire({
        icon: 'error',
        title: '預約失敗',
        text: '不好意思，該時段已被預約，請重新選取'
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: '預約成功',
        text: '確認預約資料無誤後，麻煩送出預約'
      })
      router.push('/appointment')
    }
  } catch (error) {
    if (form.time === '' || form.place === '') {
      Swal.fire({
        icon: 'error',
        title: '預約失敗',
        text: '有內容尚未填寫'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '預約失敗',
        text: '請聯絡客服，協助進行處理'
      })
    }
  }
}

let rows = reactive([])
const rowsOld = reactive(rows)
const rowsNews = reactive([]);

(async () => {
  const { data } = await apiAuth.get('/users/partner')
  const { data: news } = await api.get('/backstages/news')
  rows.push(...data.result)
  news.result.reverse()
  rowsNews.push(...news.result)
  console.log(rows)
  aos.init()

  const sloganA = document.querySelector('.sloganA')
  const sloganB = document.querySelector('.sloganB')
  const tl = gsap.timeline({ delay: 1.5 })
  tl.to(sloganA, {
    duration: 1.5,
    text: '寂寞不簡單',
    ease: 'linear',
    opacity: 1
  })
    .to(sloganB, {
      duration: 1.5,
      text: '簡單不寂寞',
      ease: 'linear',
      opacity: 1
    })
})()
</script>

<style>
@media (min-width: 600px) {
  .q-dialog__inner--minimized>div {
    max-width: none;
  }
}
</style>

<!-- <q-card v-for="row in rows" :key="row._id">
  <q-card-section>
    <q-img :src="row.pic"></q-img>
    <q-btn label="預約" @click="openDialog(row._id)"></q-btn>
  </q-card-section>
</q-card> -->
