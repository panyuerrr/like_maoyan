<template>

		 <view>
			 	<view class="city_list">
			 		<view class="city_hot">
			 			<h2>热门城市</h2>
			 			<ul class="clearfix">
			 				<li v-for="item in hotlist" :key="item.id" @click="handleToCity(item.nm,item.id)">{{item.nm}}</li>
			 			</ul>
			 	</view>
			 	<view class="city_sort" ref="city_sort">
			 			<view v-for="item in citylist" :key="item.index">
			 				<h2 :id="item.index">{{item.index}}</h2>
			 				<ul v-for="value in item.list" :key="item.id" @click="handleToCity(value.nm,value.id)">
			 					<li>{{value.nm}}</li>	
			 				</ul>
			 			</view>
			 		</view>
			 	</view>
			 	<view class="city_index">
			 		<ul>
			 			<li  v-for="(item,index) in citylist" :key="item.index" ><navigator :url="'#'+item.index" >{{item.index}}</navigator></li>
			 		</ul>
			 	</view>
    </view>

</template>

<script>
export default {
    data() {
        return {
           
        }
    },
	onLoad(){
       		uni.chooseLocation({
            success: function(res){
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
           	 // this.latitude=res.latitude;
       	     // this.longitude=res.longitude;
       	     // this.cityName=res.name;
 
            }
       });

	},
    methods: {
	

    }
}
</script>

<style>
	.city_index ul{
		background: white;
	}
 	
	
	

</style>
