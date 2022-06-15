import { login,getLikeImageIdList } from "../api/api.js"
export default {
	login({commit}) {
		
	},
	getLikeImageIdList({commit,state}){
		getLikeImageIdList({token:state.token}).then((res)=>{
			state.userLikeImageList = res.likeImageIdList;
		})
	},
	setToken({commit},token) {
		return new Promise(resolve => {
			uni.setStorage({
				key: 'token',
				data: token,
				success: function () {
					commit('setToken',token)
					resolve()
				}
			});
		})
	},
	resetToken({commit}) {
		return new Promise(resolve => {
			uni.removeStorage({
				key: 'token',
				success: function (res) {
					commit('resetState')
					resolve()
				}
			});
		})
	}
}