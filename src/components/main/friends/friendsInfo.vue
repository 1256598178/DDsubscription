<template>
    <div class="act">
        <vheader :title="header_title" style="background-color:#fbdc8f;" :isshowFoot="true"></vheader>
        <list class="friendsInfo">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</refresh>
            <!-- 接受参数userid{{ this.$route.params.userid }} -->
            <cell class="sec1">
                <div class="infobox">
                    <div class="imagebox">
                        <image class="infoimg" :src="infoimg"></image>
                    </div>
                    <div class="infotext">
                        <text class="infotext_item infotext_name">{{NickName}}</text>
                        <text class="infotext_item infotext_type">{{TypeName}}</text>
                        <!-- <text class="infotext_item infotext_address">地区:上海市</text> -->
                    </div>
                </div>
                <text class="addIt addBtn" v-if="IsConcern === 1" @click="concernsuser">+关注</text>
                <text class="addBtn deleteIt" v-if="IsConcern === 0" @click="unconcernsuser">取消关注</text>
            </cell>
            <cell class="sec2">
                <div class="listbox">
                    <div class="item" v-for="(item,index) in newsList" :key="index" v-if="newsList.length > 0">
                        <div class="time">
                            <text class="t1">{{item.Message.day}}</text>
                            <text class="t2">{{item.Message.month}}</text>
                        </div>
                        <div class="infoimg2box" v-if="item.ImageList.length > 0">
                            <image class="infoimg2" :src="item.ImageList[0].ImageUrl"></image>
                        </div>
                        <div class="itemTextbox">
                            <text class="itemText">{{item.Message.Content}}</text>
                        </div>
                    </div>
					<v-nomore :changeName="true" :name="nomoreName" v-if="newsList.length == 0"></v-nomore>
                </div>
            </cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
				<text class="indicator-text">上拉加载更多 ...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</loading>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import header from '../../public/header'
import utils from '@/components/public/utils.js'
import NoMore from '@/components/public/NoMore.vue'
import Bus from '@/components/public/Bus.js'
import BusFn from '@/components/public/BusFn.js'
const GETMESSAGELIST_URL = 'api/friendcircle/getfriendprofile'
const CONCERNSUSER_URL = 'api/friendcircle/concernsuser'
const UNCONCERNSUSER_URL = 'api/friendcircle/removeconcernsuser'
export default {
	components: {
	    vheader: header,
		"v-nomore": NoMore,
	},
	inject: ['reload'],
    data() {
        return {
			temBool: {
			    loading: true,
			},
            header_title: '个人信息',
			nomoreName: '暂未发表动态',
            infoimg: '',
            infoimg2: '',
            isadd: false,
            Page: 1,
            PageSize: 10,
            ToUserId: '',
            USERID: 'UserId',
			TOKEN: 'Token',
			NickName:'',
			TypeName:'',
			IsConcern:'',
			refreshing: false, //下拉刷新
			loadinging: false, //上拉加载
			loadType: true,
			newsList:[]
        }
    },
    created() {
        BusFn.mainFootHide_Fn();
        this.ToUserId = this.$route.query.ToUserId
		var self = this
		/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
			self.$router.back(-1);
			BusFn.mainFootShow_Fn();
		}) */
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
				utils.WeexAjax({
				    url: 'api/friendcircle/getfriendprofile?UserId='+self.USERID+'&ToUserId='+self.ToUserId,
				    method: 'GET',
				    type: 'JSON',
					token: self.TOKEN,
				    callback: function(ret) {
				        // let rets = utils.JsonFormat(ret);
				        if (ret.Status == 1) {
				        	self.infoimg = ret.obj.HeadImageUrl
				        	self.NickName = ret.obj.NickName
				        	self.IsConcern = ret.obj.IsConcern
				        	if(ret.obj.TypeId === 1){
				        		self.TypeName = "客户"
				        	}else{
				        		self.TypeName = "经理人"
				        	}
				        }
						console.log(ret)
						/* weex.requireModule("modal").toast({
						  message: ret.obj,
						  duration: 2
						}) */
				    }
				})
				utils.WeexAjax({
				    url: 'api/friendcircle/getfriendmessagelist?Page='+self.Page+'&PageSize='+self.PageSize+'&ToUserId='+self.ToUserId,
				    method: 'GET',
				    type: 'JSON',
					token: self.TOKEN,
				    callback: function(ret) {
				        console.log(ret)
						if(ret.Status == 1){
							var items=[]
							items=ret.obj.Items
							for(var i=0;i<ret.obj.Items.length;i++){
								var timearr=ret.obj.Items[i].Message.AddTime.replace(" ",":").replace(/\:/g,"-").split("-")
								items[i].Message.month=timearr[1]
								items[i].Message.day=timearr[2]
							}
							self.newsList = items
							self.temBool.loading = false
						}
				    }
				})
            })
        });
        /* self.getinfo_list({
            Fn: function(ret) {
                if (ret.Status == 1) {
                	console.log(ret)
					self.infoimg = ret.obj.HeadImageUrl
					self.NickName = ret.obj.NickName
					self.IsConcern = ret.obj.IsConcern
					if(ret.obj.TypeId === 1){
						self.TypeName = "客户"
					}else{
						self.TypeName = "经理人"
					}
                }
            }
        }) */
		
    },
    methods: {
        getinfo_list(obj) {
            var self = this;
            utils.WeexAjax({
                url: GETMESSAGELIST_URL+'?UserId='+self.USERID+'&ToUserId='+self.ToUserId,
                method: 'GET',
                type: 'JSON',
				token: self.TOKEN,
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    obj.Fn(ret);
                }
            })
        },
        concernsuser() {
        	var self = this
            utils.goLogin({
                "USERID": self.USERID,
                "TOKEN": self.TOKEN,
                "success": function() {
                	utils.WeexAjax({
		                url: CONCERNSUSER_URL,
		                method: 'POST',
		                type: 'JSON',
		                token: self.TOKEN,
		                body: {
		                    "UserId": self.USERID,
		                    "ToUserId": self.ToUserId
		                },
		                callback: function(ret) {
		                	console.log(ret)
		                	if(ret.Status == 1){
		                		weex.requireModule("modal").toast({
		                          message: ret.Message,
		                          duration: 1
		                        })
		                        //self.isadd = true;
								//self.reload()
								self.IsConcern = 0
		                	}else if(ret.Status == 0){
		                		weex.requireModule("modal").toast({
		                          message: ret.Message,
		                          duration: 1
		                        })
		                	}else{
		                		weex.requireModule("modal").toast({
		                          message: "操作失败",
		                          duration: 1
		                        })
		                	}
		                }
		            })
                },
                "fail": function() {
                    self.$router.push({ name: 'login' })
                }
            })
        },
        unconcernsuser() {
        	var self = this
            utils.goLogin({
                "USERID": self.USERID,
                "TOKEN": self.TOKEN,
                "success": function() {
                	utils.WeexAjax({
		                url: UNCONCERNSUSER_URL,
		                method: 'POST',
		                type: 'JSON',
		                token: self.TOKEN,
		                body: {
		                    "UserId": self.USERID,
		                    "ToUserId": self.ToUserId
		                },
		                callback: function(ret) {
		                	console.log(ret)
		                	if(ret.Status == 1){
		                		weex.requireModule("modal").toast({
		                          message: ret.Message,
		                          duration: 1
		                        })
		                        //self.isadd = false;
								//self.reload()
								self.IsConcern = 1
		                	}else if(ret.Status == 0){
		                		weex.requireModule("modal").toast({
		                          message: ret.Message,
		                          duration: 1
		                        })
		                	}else{
		                		weex.requireModule("modal").toast({
		                          message: "操作失败",
		                          duration: 1
		                        })
		                	}
		                }
		            })
                },
                "fail": function() {
                    self.$router.push({ name: 'login' })
                }
            })
        },
		onrefresh() {
			var self = this;
			if (self.refreshing) return;
			self.refreshing = true;
			self.Page = 1;
			utils.WeexAjax({
			    url: 'api/friendcircle/getfriendprofile?UserId='+self.USERID+'&ToUserId='+self.ToUserId,
			    method: 'GET',
			    type: 'JSON',
				token: self.TOKEN,
			    callback: function(ret) {
			        if (ret.Status == 1) {
			        	self.NickName = ret.obj.NickName
			        	self.IsConcern = ret.obj.IsConcern
			        	if(ret.obj.TypeId === 1){
			        		self.TypeName = "客户"
			        	}else{
			        		self.TypeName = "经理人"
			        	}
			        }
			    }
			})
			utils.WeexAjax({
			    url: 'api/friendcircle/getfriendmessagelist?Page='+self.Page+'&PageSize='+self.PageSize+'&ToUserId='+self.ToUserId,
			    method: 'GET',
			    type: 'JSON',
				token: self.TOKEN,
			    callback: function(ret) {
			        console.log(ret)
					if(ret.Status == 1){
						var items=[]
						items=ret.obj.Items
						for(var i=0;i<ret.obj.Items.length;i++){
							var timearr=ret.obj.Items[i].Message.AddTime.replace(" ",":").replace(/\:/g,"-").split("-")
							items[i].Message.month=timearr[1]
							items[i].Message.day=timearr[2]
						}
						self.newsList = items
						weex.requireModule('modal').toast({
							message: "刷新成功",
							duration: 2
						})
						self.refreshing = false;
						self.loadType = true
					}else{
						weex.requireModule('modal').toast({
							message: "刷新失败",
							duration: 2
						})
						self.refreshing = false;
					}
			    }
			})
		},
		onloading() {
			var self = this
			if (self.loadinging) return;
			self.loadinging = true
			if (self.loadType) {
				this.Page = this.Page + 1
				utils.WeexAjax({
				    url: 'api/friendcircle/getfriendmessagelist?Page='+self.Page+'&PageSize='+self.PageSize+'&ToUserId='+self.ToUserId,
				    method: 'GET',
				    type: 'JSON',
					token: self.TOKEN,
				    callback: function(ret) {
				        console.log(ret)
						if(ret.status == 1){
							var items=[]
							items=ret.obj.Items
							if (rets.obj.Items.length != 0) {
								for(var i=0;i<ret.obj.Items.length;i++){
									var timearr=ret.obj.Items[i].Message.AddTime.replace(" ",":").replace(/\:/g,"-").split("-")
									items[i].Message.month=timearr[1]
									items[i].Message.day=timearr[2]
								}
								self.newsList.push(items) 
								self.loadinging = false
							} else {
								self.loadType = false
								self.loadinging = false
								weex.requireModule('modal').toast({
									message: '没有更多数据了',
									duration: 2
								})
							}
						}
				    }
				})
			} else {
				setTimeout(() => {
					this.loadinging = false
					weex.requireModule('modal').toast({
						message: '没有更多数据了',
						duration: 2
					})
				}, 2000)
			}
		},
    },
}
</script>
<style scoped>
.friendsInfo {
    position: fixed;
    top: 90px;
    bottom: 0px;
    width: 750px;
}

.sec1 {
    margin-bottom: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fbdc8f;
    height: 245px;
    padding-top: 30px;
}

.infobox {
    flex-direction: row;
}

.infoimg {
    width: 150px;
    height: 150px;
    border-radius: 150px;
}

.infotext {
    margin-left: 35px;
    height: 150px;
    justify-content: center;
}

.infotext_item {
    margin-top: 8px;
    color: #333333;
}

.infotext_name {
    font-size: 30px;
    margin-top: 0px;
}

.infotext_type {
    font-size: 24px;
}

.infotext_address {
    font-size: 20px;
}

.addBtn {
    width: 150px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    color: #ffffff;
    border-radius: 7px;
    background-color: #ff6c45;
}

.sec2 {
    padding-left: 20px;
    padding-right: 20px;
}

.item {
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
    flex-direction: row;
    align-items: top;
}

.time {
    flex-direction: row;
    width: 130px;
}

.t1 {
    font-size: 56px;
    color: #333333;
}

.t2 {
    font-size: 22px;
    color: #333333;
    margin-top: 25px;
}

.infoimg2 {
    width: 150px;
    height: 150px;
}

.infoimg2box{
	margin-right: 25px;
}

.itemTextbox {
    flex: 2;
}

.itemText {
    lines: 3;
    font-size: 24px;
    line-height: 42px;
    color: #333333;
}
</style>