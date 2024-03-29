window.Video = Backbone.Model.extend({
    defaults:{
        link:"",
        ja:"",
        en:""
    },

		baseUrl:"http://floating-ocean-1849.herokuapp.com/",

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
