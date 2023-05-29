<template>
  <div class="overlay" v-show="showModal" @click.self="closeModal">
    <transition name="fade">
        <div class="modal" v-show="showModal">
            <input type="text" class="input-city" v-model="inputCity" placeholder="Введите город" @input="disabledBtn">
            <div class="modal__custom-select" v-show="hintsCity.length">
                <ul class="modal__city-list">
                    <li v-for="(item, index) in hintsCity" :key="index" class="modal__city-item" @click="addCityInput(item)">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <!-- changeCityPage -->
            <btn-vue modifierClass="btn_dark btn_modal-city" :class="{'btn_disabled': !chackClickCity}" @click="changeCityPage"> 
                Ок
            </btn-vue>
        </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { city } from "../assets/cityPars";
import BtnVue from './Btn.vue'
export default {
    data(){
        return{
            citys: [],
            hintsCity:[],
            inputCity: '',
            chackClickCity: false
        }
    },
    components:{
        BtnVue
    },
    methods:{
        ...mapMutations(["closeModal"]),
        ...mapActions(["fetchDataWeather"]),

        addCityInput(cityItem){
            this.inputCity = cityItem
            this.chackClickCity = true
        },
        

        changeCityPage(){
            if (this.chackClickCity) {
                localStorage.setItem('city', this.inputCity)
                this.fetchDataWeather(this.inputCity)
                this.hintsCity = []
                this.closeModal()
            }
        },

        disabledBtn(){
            this.chackClickCity = false
        }
    },
    watch:{
        inputCity(){
            this.inputCity = this.inputCity.trim()
            if (this.inputCity.length < 3) {
                return
            }
            let hintsArr = this.citys.filter(item => {
                return item.toLocaleLowerCase().indexOf(this.inputCity.toLocaleLowerCase()) > -1; 
            })
            this.hintsCity = hintsArr
        }
    },
    computed:{
        ...mapGetters(["showModal"])
    },
    async mounted(){
        let resCity = await city()

        for (const city of resCity) {
            this.citys.push(city.city)
        }

        navigator.geolocation.getCurrentPosition(function(position) {
        do_something(position.coords.latitude, position.coords.longitude);
        });

        function do_something(data1, data2){
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=2759e6cd-b387-436a-95b8-9a9f59e7a7b1&format=json&geocode=${data2},${data1}`)
            .then(res => {
            return res.json()
            })
            .then(res => {
            localStorage.setItem('cityGeolocation', res.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',')[0])
            })
        }
    }

}
</script>

<style>
.overlay{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
}

.modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    max-width: 930px;
    width: 100%;
    border-radius: 10px;
    padding: 50px;
    display: flex;
    justify-content: space-between;
}

.input-city{
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(102, 139, 196, 0.5);
    width: 90%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal__custom-select{
    position: absolute;
    left: 50px;
    right: 50px;
    bottom: 42px;
    transform: translateY(100%);
    border-left: 1px solid #040A1B;
    border-right: 1px solid #040A1B;
    border-bottom: 1px solid #040A1B;
}

.modal__custom-select{
    background-color: #fff;
    overflow: auto;
    border-radius: 0 0 10px 10px;
    max-height: 320px;

}

.modal__city-list{
    list-style: none;
}

.modal__city-item{
    padding: 8px 12px;
    cursor: pointer;
    transition: color .3s, background-color .3s;
}

.modal__city-item:hover{
    background-color: #040A1B;
    color: #fff;
}

.btn_disabled{
    opacity: 0.5;
}
</style>