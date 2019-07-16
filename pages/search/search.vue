<template>
	<view>
		<view class="search">
			<view class="searchInput">
				<image src="../../static/search.png"></image><input type="text" v-model="inputValue" placeholder="找电影..."  />
			</view>
			<text @tap="cancelsearch">取消</text>
		</view>
		<view class="search_result">
			<h3>电影/电视剧/综艺</h3>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in movielist" :key="index">
					<view class="uni-media-list" @tap="handletoDetal(item.id)">
						<image class="uni-media-list-logo" :src="item.img"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top movieName">{{item.nm}}</view>
							<view class="movie_title_eng">{{item.enm}}</view>
							<view>{{item.cat}}</view>
							<view>{{item.star}}</view>
						
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				movielist:[]
			}
		},
		onLoad(){
			// console.log(this.inputValue)
			// console.log(this.movielist)
		},
		watch:{
			inputValue(val){
						uni.request({
						url: '/api/searchList?cityId=10&kw='+val,
						method: 'GET',
						data: {},
						success: res => {
							let list=res.data.data.movies.list;
							if(list.length){
							for(let i=0;i<list.length;i++){
								list[i].img=this.formatImg(list[i].img)
								list[i].star=this.formatName(list[i].star)
							}
							this.movielist=list;
							console.log(this.movielist)}
						},
						fail: () => {},
						complete: () => {}
					});
					
					
				
			}
		},
		methods: {
	         formatName(str){
	         	
	         	return str.replace(/,/g,'/');
	         	
	         },
	         formatImg(url){
	         	return url.replace(/w\.h/,'160.150');
	         },
			 cancelsearch(){
				 this.inputValue='';
				 this.movielist=[];
			 },
			 handletoDetal(id){
				 uni.navigateTo({
				 	url: '../detail/detail?movieId='+id,
				 	success: res => {},
				 	fail: () => {},
				 	complete: () => {}
				 });
				 
				 
			 }

		}
	}
</script>

<style>
	.search {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80upx;
		box-sizing: border-box;
		padding: 0upx 15upx;

	}

	.searchInput {
		display: flex;
		width: 85%;
		height: 80upx;
		align-items: center;
		background: #F4F5F6;
		box-sizing: border-box;
		border-radius: 40upx;
		margin-right: 30upx;
	}

	.search image {
		width: 40upx;
		height: 40upx;
		margin-right: 15upx;
		margin-left: 15upx;
	}

	.search input {
		outline: none;
		flex: 1;
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
	}

	.search_result h3 {
		/* font-size: 15px; */
		font-size: 28upx;
		/* color: #999; */
		color: #222222;
		padding: 18upx 30upx;
		/* border-bottom: 0.1upx solid #e6e6e6; */
	}
	.uni-list-cell{
		height: 200upx;
	}
	.uni-media-list{
		padding:0upx 20upx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}
	.uni-media-list-logo{
		width: 128upx;
		height: 180upx;
		
		}
	.uni-media-list-body{
		overflow: visible;
		height: 184upx;
		overflow: hidden;
	}
	.movieName{
		color: #c32626;
	}
</style>
