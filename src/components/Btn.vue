<template>
    <button class="btn" :class="modifierClass">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:{
        modifierClass: String
    }
}
</script>

<style>

</style>