const Storage = require('./storage.js');
// const stream = weex.requireModule('stream');
const navigator = weex.requireModule('navigator')
const modal = weex.requireModule('modal')
const AJAX_URL = 'http://cn-api.ipuyuan.com/'
let utils = {
    // 发送请求
    WeexAjax(obj) {
        let me = this;
        let URL = obj.url;
        if (obj.method == 'POST' || obj.method == 'GET') {
            weex.requireModule('stream').fetch({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + obj.token },
                method: obj.method,
                url: AJAX_URL + URL,
                type: obj.type,
                // body: 'MobilePhone='+this.loginValue.name
                // 拼接字符串
                body: me.toParams(obj.body)
            }, function(res) {
                if (!res.ok) {
                    if(res.status == -1){
                        weex.requireModule('modal').toast({
                            message: '网络连接错误',
                            duration: 2
                        })
                    }else{
                        weex.requireModule('modal').toast({
                            message: '请求错误',
                            duration: 2
                        })
                    }
                    if(obj.loginbool){
                        obj.backLogding(!obj.loginbool)
                    }
                    // me.loginTip = '请求错误,请重试!'
                } else {
                    // 返回相应内容
                    let rets = me.JsonFormat(res.data);
                    // console.log(rets.Status)
                    obj.callback(rets);
                }
            }, function(response) {
            });
        } else {
            console.log('请求方式错误')
        }
    },
    // body请求主体转换函数
    toParams(obj) {
        var param = ""
        for (const name in obj) {
            if (typeof obj[name] != 'function') {
                param += "&" + name + "=" + encodeURI(obj[name])
            }
        }
        return param.substring(1)
    },
    // 不同的设备json解析不同
    JsonFormat(msg) {
        let rest = {};
        if (this.device() == 0 || this.device() == 2) {
            rest = JSON.parse(msg)
        } else if (this.device() == 1) {
            rest = eval(msg)
        } else {
            rest = msg;
        }
        return rest;
    },
    // 页面跳转navigation
    jump(href, event) {
        var me = this;
        if (WXEnvironment.platform === 'Web') {
            console.warn('Web端跳转待开发')
            me.$router.push({name: href.web})
            // window.location.href = 'http://192.168.1.103:8082/src/components/other/find.vue'
            // window.location.href = href
        } else {
            var bundleUrl = this.bundleUrl;
            var url = decodeURI(weex.config.bundleUrl); //取得整个地址栏
            var result = url.match(new RegExp("[a-zA-z]+://[^\s]{19}", "g"));
            weex.requireModule('navigator').push({
                // url: '../../../dist/components/other/find.js',
                url: result + 'dist/' + href,
                // url: 'http://192.168.1.104:8082/dist/components/other/find.js',
                animated: "true"
            }, event => {
                // modal.toast({ message: 'callback: ' + event })
            })
        }
    },
    // 页面返回函数
    pops(event){
        if (WXEnvironment.platform === 'Web') {
            console.warn('Web端跳转待开发')
        } else {
            weex.requireModule('navigator').pop({
                animated: "true"
            }, event => {
            })
        }
    },
    //跳转延迟
    NavigatUrl(obj) {
        const self = this;
        weex.requireModule('modal').toast({
            message: obj.message,
            duration: obj.duration
        })
        setTimeout(function() {
            if(self.device() == 0 || self.device() == 1){
                self.bindThis(self.jump(obj.urls), obj._this)
            }else if(self.device() == 2){
                self.bindThis(self.jump(obj.urls), obj._this)
            }
        }, obj.duration)
    },
    // 判断当前处于哪个设备
    device() {
        if (WXEnvironment.platform === 'android') {
            // console.log('Android')
            return 0;
        } else if (WXEnvironment.platform === 'iOS') {
            // console.log('iOS')
            return 1;
        } else {
            // console.log('Web')
            return 2;
        }
    },
    // 改变this指向问题
    bindThis(f, oTarget) {
        return function() {
            return f.apply(oTarget, arguments);
        };
    },
    // 页面跳转用的分析url
    analAjax() {
        var url = decodeURI(weex.config.bundleUrl) + '?CategoryId=' + 12; //取得整个地址栏
        console.log(url)
        var result = url.match(new RegExp(/\?\w*\=\w*(\&\w*\=\w*)*/, "g"))[0].slice(1);
        // console.log(result)
        var key = result.match(new RegExp(/\w*\=/, "g"));
        // console.log(key)
        var value = result.match(new RegExp(/\=\w*/, "g"));
        // console.log(value)
        var warp = {};
        for (var indexes in value) {
            key[indexes] = key[indexes].slice(0, key[indexes].length - 1)
            value[indexes] = value[indexes].slice(1)
            // console.log(value[indexes])
            warp[key[indexes]] = value[indexes]
        }
        // console.log(warp)
        return warp
    },
    modalPanel(msg,duration){
        if(duration == null || duration == undefined) duration = 1;
        weex.requireModule("modal").toast({
            message: msg,
            duration: duration
        })
    },
	//日期格式转换
	Format(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	// 判断没有userid和token就前往登录页
    goLogin(obj) {
        if(obj.USERID == 'user_id' || obj.USERID == 'null' || obj.USERID == 'undefined' || obj.TOKEN == 'user_token' || obj.TOKEN == 'null' || obj.TOKEN == 'undefined'){
             obj.fail()
             console.log('请先登录')
        }else{
            obj.success()
        }
    },
}
export default utils;


// login () {
//   navigator.push({url:this.getJumpBaseUrl('login')})
// },
// getJumpBaseUrl(toUrl) {  
//  console.log(1)
//     var bundleUrl = weex.config.bundleUrl;  
//     bundleUrl = new String(bundleUrl);  
//     var nativeBase;  
//     var native;  
//     if (WXEnvironment.platform === 'Android') {
//      console.log('Android')  
//         nativeBase = 'file://assets/dist/';  
//         native = nativeBase + toUrl + ".js";  
//     } else if (WXEnvironment.platform === 'iOS') {  
//      console.log('iOS')  
//         nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);  
//         native = nativeBase + toUrl + ".js";  
//     } else {  
//      console.log('Web')  
//         var host = 'localhost:8082';  
//         var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);  
//         if (matches && matches.length >= 2) {  
//             host = matches[1];  
//         }  

//         //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.  
//         if (typeof window === 'object') {  
//             nativeBase = 'http://' + host + '/';  
//             console.log(nativeBase+'---1')
//         } else {  
//             nativeBase = 'http://' + host + '/';  
//             console.log(nativeBase+'---2')
//         }  

//         native = nativeBase + toUrl + ".html";  
//         console.log(native+'---3')
//     }  
//     return native;  
// },