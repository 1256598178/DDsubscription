<template>
	<div class="wrapper PubStyle">
		<router-view v-if="isRouterAlive" />
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
				name: '',
				TypeStatus: 0,
				TYPEID: 'TypeId',
			}
		},
		methods: {
			// 页面跳转+底部主导航配合激活
			JumpPath(obj) {
				if (obj.pathName) {
					this.$router.push({
						name: obj.pathName
					});
				} else {
					this.$router.push(obj.path);
				}
				Bus.$emit('mainNameJump', obj.mainName);
			},
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				});
			},
		},
		created() {
			var self = this
			weex.requireModule('globalEvent').addEventListener('androidback', function(e) {
				if(self.$route.name === 'home' || self.$route.name === 'managerHome'){
					if (self.TypeStatus === 0) {
					    self.TypeStatus = 1
					    weex.requireModule('modal').toast({
					        message: '再点一次退出程序',
					        duration: 3
					    })
					    setTimeout(function() {
					        self.TypeStatus = 0
					    }, 3000)
					} else if (self.TypeStatus === 1) {
					    weex.requireModule('close').closeApp()
					}
				}else if(self.$route.name === 'login'){
					self.$router.push({
						name: 'home'
					});
				}else{
					self.$router.back(-1);
				}
			})
			/* weex.requireModule('storage').getItem(self.TYPEID, event => {
			    self.TYPEID = event.data
				console.log(self.TYPEID)
			    if (self.TYPEID === '2') {
			        self.$router.push({
			            name: 'managerHome'
			        })
			    }else{
					self.$router.push({
					    name: 'home'
					})
				}
			}) */
		},
		mounted() {
			var _this = this;
			// obj={path,mainName,pathName}
			Bus.$on('globalPageJump', function(obj) {
				_this.JumpPath(obj);
			}),
			// 添加预加载页面
	        Bus.$on('loadingShow', function(){
	            weex.requireModule('module').showLoading('页面加载中请稍后');
	        }),
	        // 隐藏预加载页面
	        Bus.$on('loadingHide', function(){
	            weex.requireModule('module').hideLoading();
	        })
		}
	}
</script>

<style scoped>

</style>
