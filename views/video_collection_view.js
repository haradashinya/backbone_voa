window.VideoCollectionView = Backbone.View.extend({
	el: $("#videos"),
	models: "",
	initialize:function(){
		var videoCollection = new window.VideoCollection;
		videoCollection.getVideos(this.handleData.bind(this));
	},
	cache: "",
	render:function(){
		console.log(window.router);
		 return this;
  },
	handleData:function(res){
							 this.models = res;
							 _.each(res,function(item){
								 var video = new window.Video(item);
								 var videoView = new window.VideoView({model:video});
								 this.cache += videoView.render().$el;
								 this.$el.append(videoView.render().$el);
							 },this);
	 }
});
