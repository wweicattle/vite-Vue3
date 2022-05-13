import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
let path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		//设置别名
		alias: [
			{ find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
			{ find: '@', replacement: '/src' },
		],
	},
	plugins: [
		vue({
			customElement: true,
			template: {
				compilerOptions: {
					// 将所有包含短横线的标签作为自定义元素处理
					isCustomElement: tag => tag.includes('-')
				},
			},
		}),
	],
	server: {
		port: 8080, //启动端口
		hmr: {
			host: '127.0.0.1',
			port: 8080,
		},
	},
})
