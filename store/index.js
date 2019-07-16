import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)	
const state={
	 city:uni.getStorageSync('city_nm') || '北京',
	 cityId:uni.getStorageSync('city_id') || 1,
	}

	
const mutations={
	CITY_INFO(state,item){
		state.city=item.nm;
		state.cityId=item.id;	
	}	
}	
	
	
export default new vuex.Store({
	state,
	mutations
	
	
	
	
})
