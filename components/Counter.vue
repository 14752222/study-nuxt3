<script setup lang="ts">
const props = defineProps({
    expires: {
        type: Number,
        default: 30
    }
})

const emit = defineEmits(['end'])

const transform = (data: number) => {
    const minutes = Math.floor((data % (60 * 60)) / 60)
    const seconds = data % 60;
    const _minutes = minutes < 10 ? `0${minutes}` : minutes
    const _seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${_minutes}:${_seconds}`
}
let timer: any

const timeOut = ref(0)

onMounted(()=>init())
onBeforeUnmount(() => clearInterval(timer))

function init() {
    if (timer) {
        clearInterval(timer)
    }

    timeOut.value = props.expires * 60
    if (timeOut.value > 0) {
        timer = setInterval(HandleTimeOut, 1000)
    }

}

function HandleTimeOut() {
    if (timeOut.value === 0) {
        emit('end')
        return clearInterval(timer)
    }
    timeOut.value--
}

</script>

<template>
    <div class="text-center">
        {{ transform(timeOut) }}
    </div>
</template>

<style scoped>

</style>
