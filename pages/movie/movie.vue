<template>
	<!-- <view class="movie_header">
      		
	</view> -->
	
	<view class="uni-tab-bar">
		<!-- <appHeader title="juner"><text>aaaa</text></appHeader> -->
		<scroll-view id="tab-bar" class="uni-swiper-tab">
			<view v-for="(tab, index) in tabBars" :key="tab.ref" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
			 :id="tab.ref" :data-current="index" @tap="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- #ifndef MP-BAIDU -->
		<view class="movie_body" v-if="tabIndex==0">
			<ul>	
				 <navigator url="../rank/rank" class="rank"><image src="../../static/image/paixing.png" mode=""></image><span class="rank_txt">实时排行</span></navigator>	
				<li v-for="item in movieList" :key="item.id" @tap="handleToDetail(item.id)">
					<view class="pic_show"><img :src="item.img"></view>
					<view class="info_list">
						<h2>{{item.nm}}<img v-if="item.version" src="../../static/maxs.png" alt="" /></h2>
						<p>观众评 <span class="grade">{{item.sc}}</span></p>
						<p>主演:{{item.star}}</p>
						<p>{{item.showInfo}}</p>
					</view>
					<view class="btn_mall">
						购票
					</view>
				</li>
			</ul>
		</view>
		
		<view class="movie_body" v-show="tabIndex==1">
			<ul>
				<li v-for='item in movieList' :key="item.id" @tap="handleToDetail(item.id)">
					<view class="pic_show"><img :src="item.img"></view>
					<view class="info_list">
						<h2>{{item.nm}} <img v-if="item.version" src="../../static/maxs.png" /></h2>
						<p><span class="person">{{item.wish}}</span> 人想看</p>
						<p>主演:{{item.star}}</p>
						<p>{{item.rt}}上映</p>
					</view>
					<view class="btn_pre">
						预售
					</view>
				</li>
			</ul>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	
   
	export default {
		
		data() {
			return {
				movieList: [],
				tabIndex: 0,
				tabBars: [{
					name: '正在热映',
					id: 0,
					ref: 'new'
				}, {
					name: '即将上映',
					id: 1,
					ref: 'company'
				}]
			}
		},
		onLoad: function() {
			// 初始化列表信息
            setTimeout(function () {
            console.log('start pulldown');
			
                    }, 1000);
        uni.startPullDownRefresh();
			loadingText: '加载中...';
		},
		 onPullDownRefresh() {
           console.log('refresh');
		   this.getList();
		
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
    },
		methods: {
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					this.tabIndex = index;
					// 首次切换后加载数据	
					this.getList();
				}
			},
			getList() {
				if (this.tabIndex == 0) {
					uni.request({
						url: '/api/movieOnInfoList?cityId=10',
						method: 'GET',
						data: {},
						success: res => {
							// console.log(res);
							this.movieList = res.data.data.movieList;
							console.log(this.movieList);
							this.movieList.forEach((item) => {
								return item.img = this.formatImg(item.img);
							})

						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.request({
						url: '/api/movieComingList?cityId=10',
						method: 'GET',
						data: {},
						success: res => {
							// console.log(res);
							this.movieList = res.data.data.comingList;
							console.log(this.movieList)
							this.movieList.forEach((item) => {
								return item.img = this.formatImg(item.img);
							})
						},
						fail: () => {},
						complete: () => {}
					});
				}


			},
			formatImg(url) {
				return url.replace(/w\.h/, '128.120');
			},
			handleToDetail(id){
				// console.log(id);
				uni.navigateTo({
					url: '../detail/detail?movieId='+id,
					
				});
				
				
				
			}


		}


	}
</script>
<style scoped="scoped">
	
	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 11px;
		line-height: 1.8;
	}
    
	.uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		position: fixed;
		z-index: 1000;
	}
 /* uni-page-head .uni-page-head{
			position: static;
			display: none;
		} */
	.uni-tab-bar .list {
		width: 750upx;
		height: calc(100% - 100upx);
		/* height:90%; */
		margin-top: 100upx;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 70upx;
		height: 70upx;
		border-bottom: 1px solid #c8c7cc;
		position: fixed;
		background: #FFFFFF;
	    z-index: 1000;
		top: 88upx !important;
		left: 0;
		
	}

	.swiper-tab-list {
		font-size: 30upx;
		/* width: 150upx; */
		width: 50%;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.uni-tab-bar .active {
		color: #e54847;
	}

	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
		overflow: scroll;
	}

	.uni-swiper-tab {
		position: fixed;
		top: 0upx;
	}

	.movie_body {
		flex: 1;
		position: fixed;
		top: 160upx;
		width:100%;
		height: calc(100% - 300upx);
		overflow: scroll;
	}

	.movie_body ul {
		padding-left: 20px;
		width: 100%;
		box-sizing: border-box;
	}

	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}
    .movie_body ul li:nth-of-type(1){
		margin-top: 12upx;
	} 
	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}

	.movie_body .pic_show img {
		width: 100%;
	}

	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}

	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}

	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}

	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
		margin-right: 50upx;
	}

	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
	.rank{
		width: 100%;
		height: 70upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	    
	}
	.rank>image{
		width: 60upx;
		height: 60upx;
		/* vertical-align: middle; */
	}
	uni-image{
		overflow: initial;
	}
	.rank_txt{
	    /* vertical-align: middle; */
		margin-top: 12upx;
		margin-left: 10upx;
	}
  
</style>
