<template>
	<view class="content">
       <view class="intro" >
		   <view class="top" >
			   <image :src="formatImg(movie.img)" mode=""></image>
			   <view class="intro_right">
				   <view class="movie_title">{{movie.nm}}</view>
				   <view class="movie_title_eng">{{movie.enm}}</view>
				   <view>{{formatName(movie.cat)}}</view>
				   <view>{{formatName(movie.star)}}</view>
				   <view>{{movie.pubDesc}} </view>
				   <!-- <view class="tags">
					   <view><span class="iconfont icon-shoucang"></span><text>想看</text></view>
					   <view><span class="iconfont icon-shoucang1"></span><text>看过</text></view>
				   </view> -->
				   
			   </view> 
		   </view>
		   <view class="movie_intro">
			   <view class="m_title">简介</view>
			   <view class="m_content">
			   	{{movie.dra}}
			   </view>			   
			   
		     </view>
		       <view class="actors_intro">
				   <view class="mv">
				    <view class="m_title">电影视频</view>				    
				   <video id="myVideo" :src="movie.videourl" controls="true"></video>
				          
				   	 </view>
				   
				   <view class="m_title">剧照</view>
				   <view class="pics">
					 <scroll-view scroll-x="true" class="pic-content">
					   <block v-for="(item, index) in piclist" :key="index">
					     <view class="item">
					       <view class="img">
					         <image :src="item" mode=""></image>
					       </view>
					     </view>
					   </block>
					 </scroll-view>
				   
				   
			   </view>
		   
		   
		   
		   
		   
	   </view>
	</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				movie:{},
				piclist:[],
			}
		},
		onLoad(options){
			
			uni.request({
				url: '/api/detailmovie?movieId='+options.movieId,
				method: 'GET',
				data: {},
				success: res => {
					this.movie=res.data.data.detailMovie;
					console.log(this.movie);
					this.piclist=this.movie.photos.map((item)=>{
						return item=this.formatImg(item);
					});
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			formatName(str){
				
				return str.replace(/,/g,'/');
				
			},
			formatImg(url){
				return url.replace(/w\.h/,'160.150');
			}
		}
	}
</script>

<style>
	/* @import '../../common/iconfont/iconfont.css'; */
	.content{
			padding: 0upx 15upx;
	}
	.intro{
		margin-top: 10upx;	
	}
	.top{
		height:300upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		box-sizing: border-box;
		margin-bottom: 10upx;
		background-size:cover;
	}
	.top image{
		width: 40% !important;
		height: 300upx;
		
	
	}
	
	.movie_title{
		/* line-height: 70upx; */
		font-size: 40upx;
		line-height: 60upx;
		/* color: #FFFFFF; */
	}
	.movie_title_eng{
	   /* margin-bottom: 10upx; */
	}
    .tags{
		display: flex;
		flex-direction: row;
	}
	.intro_right{
	
		margin-left: 20upx;
	}
	.m_title{
		font-size: 32upx;
	}
	.pic-content {
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
	              width: 170upx;
				  height: 200upx;
	}
	uni-video{
		width: 100%;
	}
</style>
