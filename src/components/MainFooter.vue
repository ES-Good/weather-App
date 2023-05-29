<template>
    <div class="main__footer">
        <div class="main__info-box">
            <img :src="ico">   
            <p class="main__description-weather">{{ descriptionWeather }}</p> 
            <p class="main__degree">{{temp}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["icoWeather","temp", "descriptionWeather", "tempFeelsLike"]),

        ico(){
            if (!this.icoWeather) {
                return
            }

            const fileName = this.icoWeather;

            return require(`../assets/img/animated/${fileName}.svg`)
        }
    }
}
</script>

<style>

</style>