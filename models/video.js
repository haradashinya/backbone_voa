window.Video = Backbone.Model.extend({
    defaults:{
        link:"",
        ja:"",
        en:""
    },

    baseUrl:"http://www20402ue.sakura.ne.jp:9000/",

    formatUrl:function(id){
        return this.baseUrl + id + ".json";
    },

    fetchDescription:function(id,callback){
        $.ajax({
            dataType:"jsonp",
            url:this.formatUrl(id),
						success:function(data){
							callback(data);
						}
				});
    }


});
