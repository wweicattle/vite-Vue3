import { createApp } from 'vue'
import myEle from './components/webCom.ce.vue'
import App from './App.vue'
import router from './router'
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
	// 普通的 vue 组件
	props: {
		msg: String,
		selected: Boolean,
		index: Number,
	},
	emits: {},
	template: `<div class="msg">{{ msg }}3232323</div>`,

	styles: [`.msg { color: red; }`],
})

const myEles = defineCustomElement(myEle)
console.dir(myEles);
console.dir(MyVueElement);

// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
// customElements.define('my-vue-element', MyVueElement)
setTimeout(val=>{
customElements.define('my-element', myEles)
},4000)
// 创建vue实例
const app = createApp(App)

app.use(router)

// 挂载实例
app.mount('#app')
