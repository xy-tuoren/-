module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://cpdd.games/'; /* 根域名 */
		config.dataType = 'json';
		config.timeout = 8000;
		return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { 
	    config.data = config.data || {}
		// 根据custom参数中配置的是否需要登录token，否则跳转登录界面
		if(config?.custom?.needToken) {
			if(!vm.$store.state.token){
				console.log('not token')
				return uni.$u.route({
					url: 'pages/my/login',
				})
			}
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.token = vm.$store.state.token
		}
	    return config 
	}, config => { 
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		const data = response.data
		if (data.code !== 200) { 
			uni.$u.toast(data.message || 'Error')
			//-2 token过期 -3 非法token
			if(data.code==-2 || data.code==-3){
				vm.$store.dispatch('resetToken').then(()=>{
				})
			}
			return Promise.reject(new Error(data.message || 'Error'))
		}else{
			if (data.message) {
				uni.$u.toast(data.message)
			}
			return data
		}
	}, (response) => { 
		return Promise.reject(response)
	})
}