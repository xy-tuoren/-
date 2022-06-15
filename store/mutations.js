const getDefaultState = () => {
	return {
		token: uni.getStorageSync('token')
	}
}

export default {
	changeTabBarIdx(state,index) {
		state.currTabBarIdx = index;
	},
	setToken(state,token){
		state.token = token;
	},
	resetState(state){
		Object.assign(state,getDefaultState())
	},
	setUserLikeImageList(state,imageId){
		state.userLikeImageList.push(imageId);
	}
}