<template>
  <div class="container-fluid main-page" @mousemove="hover" :style="{ backgroundPosition: `${posX}% ${posY}%`}">

    <div class="main">
      <div class="main__content">
        <MainHeader/>
        <MainFooter/>
      </div>
    </div>
    <ModalCity/>
  </div>
</template>

<script>
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import ModalCity from './ModalCity.vue'
import { mapActions } from "vuex";
export default {
  components:{
    MainHeader,
    MainFooter,
    ModalCity
  },
  data(){
    return{
      backgroundPositionX: 50,
      backgroundPositionY: 50,
    }
  },
  methods:{
    ...mapActions(["fetchDataWeather", "fetchDataCitys"]),
    

    hover(event){
      this.backgroundPositionX = 50 + Math.round((event.offsetX - this.centerX) / 90)
      this.backgroundPositionY = 50 + Math.round((event.offsetY - this.centerY) / 90)

    }
  },

  async mounted(){
    this.fetchDataWeather()
  },

  updated(){

  },

  computed:{
    

    posX(){
      return String(this.backgroundPositionX)
    },

    posY(){
      return String(this.backgroundPositionY)
    },

    centerX(){
      return document.querySelector('body').offsetWidth / 2;
    },

    centerY(){
      return document.querySelector('body').offsetHeight / 2;
    }
  }
}
</script>

<style>
.container-fluid{
  width: 100%;
  padding: 0 10px;
}

.main-page{
  height: 100%;
  width: 100%;
  background-image: url(../assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 50%;
  background-size: 2678px; /*140%*/
  transition: background-position-x 3s, background-position-y 3s;
}

.main{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 930px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  padding: 22px;
}

.main::before{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  box-shadow: inset 0 0 0 3000px rgba(165, 190, 207, 0.8);
  filter: blur(10px);
}

.main__content{
  position: relative;
  z-index: 1;
}

.main__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15vh;
}

.btn{
  font-size: 14px;
  font-weight: bold;
  padding: 10px 18px;
  border: none;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color .3s, color .3s;
}

.btn_dark{
  background-color: #040A1B;
  color: #fff;
}

.btn_dark:hover{
  background-color: #A5BECF;
  color: #040A1B;
}

.main__title{
  font-size: 20px;
  font-weight: 400;
}

.main__title::before{
  content: 'Город:';
}

.main__info-box{
  position: relative;
  padding: 64px 10px 10px 10px;
  max-width: 180px;
  width: 100%;
  border: 1px solid #040A1B;
  background-color: rgba(4, 10, 27, .5);
  border-radius: 10px;
}

.main__info-box img{
  position: absolute;
  top: -10px;
  right: -10px;
}

.main__degree{
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.main__degree::after{
  content: ' \00B0 C';
}

.main__description-weather{
  color: #fff;
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  padding-right: 44px;
}

@media screen and (max-width: 920px) {
  .main{
    border-radius: 0;
  }

  .main::before{
    box-shadow: inset 0 0 0 3000px rgba(165, 190, 207, 1);
  }
}

@media screen and (max-width: 576px){
  .modal{
    padding: 26px;
  }

  .modal__custom-select{
    bottom: auto;
    top: 20px;
    transform: translateY(-100%);
    border-radius: 10px 10px 0 0;
    left: 0;
    right: 0;
  }

}

</style>