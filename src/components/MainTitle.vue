<template>
    <p class="main__title">
        {{city}}
    </p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed:{
        ...mapGetters(["city"])
    }
}
</script>

<style>

</style>