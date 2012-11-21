window.VideoCollection = Backbone.Collection.extend({
	url:"http://www20402ue.sakura.ne.jp:9000/videos.json",
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

