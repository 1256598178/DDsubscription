let mixins = {
	get_img_path: function(img_name) {
        let platform = weex.config.env.platform
        let img_path = ''

        if (platform == 'Web') {
            img_path = `images/${img_name}`
        } else if (platform == 'android') {
            // android 不需要后缀
            img_name = img_name.substr(0, img_name.lastIndexOf('.'));
            img_path = `local:///${img_name}`
        } else {
            // img_path = `../images/${img_name}`
            img_path = `local:///${img_name}`
        }
        return img_path
    }
}
export default mixins;