<template>
	<!-- <div> -->
		<my-vue-element />
		<my-element />

	<!-- </div> -->
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { ref, reactive } from 'vue'



const count = ref(0)
let data = reactive({ sa: 232 }) as any

const { x, y } = useMouse()
console.log(x, y)
setTimeout((val) => {
	console.log(32)
	delete data.sa
}, 5000)
</script>

<style scoped>
a {
	color: #42b983;
}

label {
	margin: 0 0.5em;
	font-weight: bold;
}

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
