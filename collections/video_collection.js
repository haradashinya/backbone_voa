window.VideoCollection = Backbone.Collection.extend({
	url:"http://floating-ocean-1849.herokuapp.com/videos.json",
	model: window.Video,
	initialize:function(){
	},
	getVideos:function(callback){
		$.ajax({
			url: this.url,
			type: "get",
			dataType: 'jsonp',
			success:function(data){
				callback(data);
			}
		});
	}
});

