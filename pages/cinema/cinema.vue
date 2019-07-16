<template>
	<view>
		<view class="cinema_menu">
			<view class="city_switch">
				全城<text class="triangle"></text>
			</view>
			<view class="brand_swtich">
				品牌<text class="triangle"></text>
			</view>
			<view class="feature_switch">
				特色<text class="triangle"></text>
			</view>
		</view>
		<view class="cinema_body">
				<ul> 
				<li v-for='item in cinemaList' :key='item.id'>
					<div>
						<span>{{item.nm}}</span>
						<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
					</div>
					<div class="address">
						<span>{{item.addr}}</span>
						<span>{{item.distance}}</span>
					</div>
					<div class="card">
					  <div v-for="(value,key) in item.tag" :key="key" v-if="value===1" :class="key| classformat">{{ key | formatCard}}</div>
					</div>
				</li>
			</ul>
			</view>
			
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                cinemaList:[],
			}
		},
		onLoad(){
			
			setTimeout(function () {
			    console.log('start pulldown');
				
			            }, 1000);
			uni.startPullDownRefresh();
				loadingText: '加载中...';
			},
			 onPullDownRefresh() {
			   console.log('refresh');
			   this.getlist();
			
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 1000);
		},
			filters:{
			formatCard(key){
				var card=[
					{key:'allowRefund',value:'退'},
					{key:'endorse',value:'改签'},
					{key:'snack',value:'小吃'},
					{key:'sell',value:'折扣卡'}]
			
				
				   for(var i=0;i<card.length;i++){
					  if(card[i].key==key){
						 return card[i].value
					  }   
				   }		
					return '';
			},
			classformat(key){
				var card=[
					{key:'allowRefund',value:'bl'},
					{key:'endorse',value:'bl'},
					{key:'snack',value:'or'},
					{key:'sell',value:'or'}]
				   for(var i=0;i<card.length;i++){
					  if(card[i].key==key){
						 return card[i].value
					  }   
				   }		
					return '';
				
			}
		},
		methods: {
           getlist(){
			      uni.request({
			   	url: '/api/cinemaList?cityId=10',
			   	method: 'GET',
			   	data: {},
			   	success: res => {
			   		// console.log(res);
			   		this.cinemaList=res.data.data.cinemas;
			   	},
			   	fail: () => {},
			   	complete: () => {}
			   });
		   }
		}
	}
</script>

<style>
	.cinema_menu {
		width: 100%;
		height: 90upx;
		border-bottom:0.1upx solid #e6e6e6;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: white;
		position: fixed;
		z-index: 200;
	}
	.triangle{
		   display: inline-block;
		   width: 0;
		   height: 0;
		   border:8upx solid #666666;
		   border-left:10upx solid transparent;
		   border-right:10upx solid transparent;
		   border-bottom: 10upx solid transparent;
		   margin-left: 10upx;
		   position: relative;
		   top:6upx;
	}
	.cinema_body{
		/* position: fixed; */
		width: 100%;
	    padding-top:90upx;
		height: 90%;
		/* background: red; */
	}
	.cinema_body ul{ padding:0px 20px 20px 20px;list-style: none;}
	 /* .movie_body ul li.pulldown{margin-top: 0px;padding-bottom: 0px; border: none;} */
	.cinema_body li{  border-bottom:0.1upx solid #e6e6e6; margin-bottom: 20px; list-style: none;}
	.cinema_body div{ margin-bottom: 10px;}
	.cinema_body .q{ font-size: 11px; color:#f03d37;}
	.cinema_body .price{ font-size: 18px;}
	.cinema_body .address{ font-size: 13px; color:#666;}
	.cinema_body .address span:nth-of-type(1){ display: inline-block;width:75%; overflow: hidden; word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;} 
	.cinema_body .address span:nth-of-type(2){ float:right; }
	.cinema_body .card{ display: flex;}
	.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
	.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
	.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
