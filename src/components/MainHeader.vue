<template>
  <div class="main__header">
        <MainTitle/>
        <btn modifierClass="btn_dark" @click="openModal">
            Выберете город
        </btn>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Btn from './Btn.vue'
import MainTitle from './MainTitle.vue'
export default {
    name: 'MainHeader',
    components:{
        Btn,
        MainTitle
    },
    methods:{
        ...mapMutations(["openModal"])
    }
}
</script>

<style>

</style>