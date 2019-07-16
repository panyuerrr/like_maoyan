<template>
	<view class="content">
		<view class="index_top">
		<view class="location" @tap="getlocation">
			<text>重庆</text><text class="triangle"></text>
		</view>
		<view class="search" @tap="handleToSearch">	
		<image src="../../static/search.png" ></image><input type="text" v-model="inputvalue" placeholder="找电影..." />
		</view>
		</view>
		<!-- 轮播 -->
		<view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item>
                            <view class="swiper-item uni-bg-red"><image src="../../static/image/1.jpg"></image></view>
                        </swiper-item>
						 <swiper-item>
						    <view class="swiper-item uni-bg-red"><image src="../../static/image/2.jpg"></image></view>
						</swiper-item>
						 <swiper-item>
						    <view class="swiper-item uni-bg-red"><image src="../../static/image/3.jpg"></image></view>
						</swiper-item>
                    </swiper>
                </view>
            </view>
		</view>
		<!-- 主题选项 -->
		<view class="topics">
			<view class="topic_con"><view class="img_con"><view class="imga">
				
			<image class="pp" src="../../static/image/hongbao.png" mode=""></image></view><span>电影红包</span></view></view>
			<view class="topic_con"><view class="img_con"><view class="imga"><image class="pp"  src="../../static/image/chaoren.png" mode=""></image></view><span>周边商城</span></view></view>
			<view class="topic_con"><view class="img_con"><view class="imga"><image class="pp" src="../../static/image/tuzirabbit.png" mode=""></image></view><span>爱宠大作战</span></view></view>
			<view class="topic_con"><view class="img_con"><view class="imga"><image class="pp" src="../../static/image/zhekou-.png" mode=""></image></view><span>折上折</span></view></view>
			<view class="topic_con"><view class="img_con"><view class="imga"><image class="pp" src="../../static/image/star_full.png" mode=""></image></view><span>超级企鹅</span></view></view>
		</view>
          <!-- 电影统计 -->
	 <view class="movie_calc">
      <view class="title">
		<view class="title_left">
        <view :class="tabIndex==index?'active':''" @tap="showlist(index)" v-for="(item,index) in tabBar" :key="index">{{item.name}}</view>
		 </view>
        <text class="fr">全部{{movieList.length}}部</text>
      </view>
      <scroll-view scroll-x="true" class="movieshelf-content">
        <block v-for="(item, index) in movieList" :key="index">
          <view class="item" @tap="handleToDetail(item.id)">
            <view class="img">
              <image :src="item.img" mode=""></image>
            </view>
            <text class="item-title">{{item.nm}}</text>
			<view class="btn_mall" v-if="tabIndex==0">
				购票
			</view>
			<view class="showdate" v-else>
				{{formatDate(item.rt)}}
			</view>
          </view>
        </block>
      </scroll-view>
      <!-- 电影资讯 -->
	  <view class="movieNews">
		  <view class="uni-list">
		  	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in newsList" :key="index">
		  		<view class="uni-media-list" @tap="goNewsdetail(item.id)">
		  			<image class="uni-media-list-logo pic"  :src="item.image"></image>
		  			<view class="uni-media-list-body">
		  				<view class="uni-media-list-text-top">{{item.title}}</view>
						<!-- <view class="uni-media-list-text-bottom uni-ellipsis bottom-left"></view> -->
		  				<view class="uni-media-list-text-bottom uni-ellipsis"><text>{{util.dateUtils.humanize(item.publishTime)}}</text><text>评论数:{{item.commentCount}}</text></view>
		  			</view>
		  		</view>
		  	</view>
		  </view>
	  	
	  </view>

			
	</view>
	</view>
</template>

<script>
	import util from '../../common/util.js'
	export default {
		data() {
			return {
			title: '首页',
			inputvalue:'',
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
			tabIndex:0,
		    util:{},
			tabBar:[
				{name:"正在热映"},
				{name:"即将上映"}
			],
			movieList:[],
			newsList:[]
			}
		},
		onLoad() {
         
		 this.getList();
		 // console.log(util);
		 this.util=util;
		  uni.request({
		  	url: '../../static/NewsList.json',
		  	method: 'GET',
		  	data: {},
		  	success: res => {
				// console.log(res);
				this.newsList=res.data.newsList;
			},
		  	fail: () => {},
		  	complete: () => {}
		  });
		 
		},
		methods: {
		changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay
        },
        intervalChange(e) {
            this.interval = e.target.value
        },
        durationChange(e) {
            this.duration = e.target.value
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
		showlist(index){
			if(this.tabIndex===index){
				return false;
			}else{
				this.tabIndex=index;
				this.getList()
			}
		
		},
		formatDate(date){
			let arr=date.split("-");
			return arr[1]+"-"+arr[2];	
		},
		getlocation(){
			uni.navigateTo({
				url: '../cities/cities',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
	
		},
		goNewsdetail(id){
			uni.navigateTo({
				url: '../newsDetail/newsDetail?id='+id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
			
		},
		handleToDetail(id){
			// console.log(id);
			uni.navigateTo({
				url: '../detail/detail?movieId='+id,
				
			});
		
		},
		handleToSearch(){
			uni.navigateTo({
				url: '../search/search',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
			
			
		}
	
	
		
    },
	

		
	}
</script>

<style scoped>
	.content {
		text-align: center;
		height: 400upx;
	}
	.index_top{
		width: 94%;
		height: 52upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 20upx;
		margin-bottom: 22upx;
	     
	}
    .location{
		width: 15%;
		line-height: 52upx;
		font-size: 32upx;
	}
   .location .triangle{
	   display: inline-block;
	   width: 0;
	   height: 0;
	   border:10upx solid #666666;
	   border-left:10upx solid transparent;
	   border-right:10upx solid transparent;
	   border-bottom: 10upx solid transparent;
	   margin-left: 10upx;
	   vertical-align: baseline;
   }
   .search{
	   width: 74%;
	   display: flex;
	   flex-direction: row;
	   align-items: center;
	   margin-right: 15upx;
	   padding: 0px 20upx;
	   border: 1upx solid #cccccc;
	   border-radius: 40upx;
	   box-sizing: border-box;
	   
	  
   }
   .search image{
	   width: 40upx;
	   height: 40upx;
   }
   .search input{
	   width: 100%;
	   border: none;
	   text-align: left;
	   margin-left: 10upx;
   }
   .uni-bg-red{
	   background: transparent;
	   width: 100%;
   }
  
 uni-image>img{
	 width:100%;
	 height: 300upx;
 }
 uni-image{
	 width: 100%;
	 height: 300upx;
 }
 .uni-padding-wrap{
	 width: 100%;
	 padding: 0px;
 }
 .uni-tab-bar {
 	display: flex;
 	flex: 1;
 	flex-direction: column;
 	overflow: hidden;
 	height: 100%;
 	position: fixed;
 }
 
 .uni-tab-bar .list {
 	width: 750upx;
 	height: calc(100% - 100upx);
 	/* height:90%; */
 	margin-top: 100upx;
 }
 
 .uni-swiper-tab {
 	width: 100%;
 	white-space: nowrap;
 	line-height: 100upx;
 	height: 100upx;
 	border-bottom: 1px solid #c8c7cc;
 	position: fixed;
 	background: #FFFFFF;
 	z-index: 999;
 	top: var(--window-top);
 	left: 0;
    
 }
 
 .swiper-tab-list {
 	font-size: 30upx;
 	/* width: 150upx; */
 	/* width: 50%; */
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
 .topics{
	 display: flex;
     flex-direction: row;
	 justify-content:space-between;
	 box-sizing: border-box;
	 padding: 0px 5upx;
	 padding: 20upx 0upx;
	 color: #666666;
	box-shadow: 0.01upx 0.01upx 0.01upx #cccccc;	 
 }
 uni-image{
	 overflow: visible;
 }
.topics .topic_con{
	  flex: 1;
	  margin: 0px 5upx;
	  /* height: 100upx; */
	}
.img_con{
	 display: flex;
	 flex-direction: column;
	 justify-content: space-between;
 }
 .imga{
	 width: 90upx;
	 height: 90upx;
	 margin: 0 auto;
	 border-radius: 50%;
	 
 }
.pp{
	 width: 75upx !important;
	 height: 75upx !important;
	 
 }
.title{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 90upx;
	align-items: center;
	font-size: 30upx;
	padding-right: 10upx;
}
.pic{
	height: 150upx;
}
.title_left {
	display: flex;	
	
}
.title_left>view{
	line-height: 40upx;
	width: 140upx;
}
.title_left view:nth-of-type(1){
	
	border-right: 0.1upx solid #cccccc;

}
.movieshelf-content {
        white-space: nowrap; 
        width: 100%;
        padding:20upx 20upx;
		padding-left: 0upx;
		height:344upx;
		padding-bottom: 0upx;
}
 .item {
       width: 24%;
       margin-right: 20upx;	
       display: inline-block;
       vertical-align: top;
}
  .img {
        display: inline-block;
}
.img image {
              width: 160upx;
			  height: 200upx;
              border-radius: 6upx;
}
          
.item-title {
            display: block; 
            width: 80%;
            font-size: 30upx;
			padding-bottom: 8upx;
			white-space: nowrap;
			text-overflow: ellipsis;
            line-height: 40upx;
			overflow: hidden;
			margin: 0 auto;
          }
.btn_mall{
	width: 80upx;
	height:55upx;
	line-height: 55upx;
	text-align: center;
	background-color: #f03d37;
	color: #fff;
	border-radius: 8upx;
	/* font-size: 12px; */
	font-size:24upx;
	margin: 0 auto;
	margin-bottom: 25upx;
}
 .active{
	 font-size: 32upx;
	 font-weight: bold;
 }    
 .showdate{
	 margin-bottom: 25upx;
	 font-size:20upx; 
 }  
.uni-media-list-logo{
	width: 224upx !important;
}
.uni-media-list {
	padding: 22upx 18upx;
	box-sizing: border-box;
	height: 100%;
}
.uni-list-cell {
	height: 200upx;
}
.uni-media-list-body{
	overflow: visible;
}
.uni-media-list-body{
	overflow: visible;
	height: auto;
}
.uni-media-list-text-top{
	margin:22upx 0upx;
	height: 40upx;
	text-align: left;
    flex: 1;
}
.uni-media-list-text-bottom{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.uni-list{
	margin-bottom: 100upx;
}

</style>
