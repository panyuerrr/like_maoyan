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
        		<li  v-for="(item,index) in citylist" :key="item.index" ><a :href="'#'+item.index" >{{item.index}}</a></li>
        	</ul>
        </view>



	</view>
</template>

<script>
	
	export default {
		data() {
			return {
               citylist:[],
			   hotlist:[]
			}
		},
		onLoad(){
			uni.request({
				url: '/api/cityList',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					let cities = res.data.data.cities;
					let {citylist,hotlist}=this.formatCityList(cities);
					 this.citylist=citylist;
					 this.hotlist=hotlist;
				},
				fail: () => {},
				complete: () => {}
			});
			
		},
		methods: {
          formatCityList(cities) {
          	var citylist = [];
          	var hotlist = [];
          	//热门城市
          	for(var i=0;i<cities.length;i++){
          		if(cities[i].isHot == 1){
          			hotlist.push(cities[i]);
          		}
          	}
          	// console.log(hotlist);
          	for (var i = 0; i < cities.length; i++) {
          		var firstLetter = cities[i].py.slice(0, 1).toUpperCase();
          		if (toCome(firstLetter)) { //新添加到index
          			var obj = {
          				index: firstLetter,
          				list: [{
          					nm: cities[i].nm,
          					id: cities[i].id
          				}]
          
          			}
          			citylist.push(obj);
          		} else { //累加到已有index
          			for (var j = 0; j < citylist.length; j++) {
          				if (citylist[j].index === firstLetter) {
          					citylist[j].list.push({
          						nm: cities[i].nm,
          						id: cities[i].id
          					})
          				}
          			}
          		}
          	}
              citylist.sort((a,b)=>{
          		if(a.index>b.index){
          			return -1;
          		}else if(a.index<b.index){
          			return 1;
          		}else{
          			return 0
          		}
          	})
          	citylist.reverse();
          	function toCome(firstLetter) {
          		for (var i = 0; i < citylist.length; i++) {
          			if (firstLetter === citylist[i].index) { //如果当前循环到的总数据中的某个首字母已经在自定义的citylist中出现的话，则返回false
          				return false;
          			}
          		}
          		return true;
          	}
          	return {
          		citylist,
          		hotlist
          	}
          },
         handleToCity(nm,id){
			 this.$store.commit('CITY_INFO',{nm,id});
			 console.log(1);
			 uni.setStorageSync('city_nm', nm);
			 uni.setStorageSync('city_id', id);
			 // this.$router.push('/movie/nowPlaying'); 
			 uni.navigateTo({
			 	url: '../movie/movie',
			 	success: res => {},
			 	fail: () => {},
			 	complete: () => {}
			 });
		  }




		}
	}
</script>

<style>
	 .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}
	
	 .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}
	
	 .city_hot {
		margin-top: 20px;
	}
	
	 .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}
	 .city_hot ul {
		 overflow: hidden;
		 padding-left:10upx;
		 margin-bottom: 10upx;
	 }
	 .city_hot ul li {
		float: left;
		background: #fff;
		width: 20%;
		height: 66upx;
		margin-top: 30upx;
		margin-left: 3%;
		padding: 0 8upx;
		border: 0.1upx solid #e6e6e6;
		border-radius: 6upx;
		line-height: 66upx;
		text-align: center;
		box-sizing: border-box;
		list-style: none;
	}
	
	 .city_sort div {
		margin-top: 20px;
	}
	
	 .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	
	}
	 .city_sort h2:target {
		font-size: 15px;
		color: #EF4238;
		
		
	}
	
	 .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}
	
	.city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}
	
    .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: calc(100% - 146px);
		text-align: center;
		border-left: 1px #e6e6e6 solid;
		position: fixed;
		right: 0%;
		top:96px;
		font-size: 12px;
	
	}
	 .city_index ul{
		height: 100%;
		width: 100%;
		/* display: flex; */
		/* flex-direction: column; */
		/* justify-content: space-around; */
		
	}
	 .city_index li{
		width:80upx;
		/* background: #0077AA; */
		background: red;
	}
	.city_index ul a{
		text-decoration: none;
		color: #000;
	}
	
	
	

</style>
