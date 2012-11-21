var videoCollectionView = new VideoCollectionView();

window.Router = Backbone.Router.extend({
    routes:{
        "":"index",
        "videos/:id":"getVideo"
    },
		showIndex:function(){
			$("#detail").find("#video-img").empty();
			$("#detail").find("#desc").empty();
			$("#videos").show();
		},
		showDetail:function(){
			$("#detail").show();
			$("#videos").hide();
	  },
    index:function(){
				this.showIndex();

        videoCollectionView.render();
        // show all videos
    },
    getVideo:function(id){
        var videos = videoCollectionView.models;
				// return tapped  uniq video
				var tappedVideo = videos.filter(function(video){
					return video["_id"] === id;
				})[0];

        var video = new window.Video(tappedVideo);
        var detailView = new window.DetailView({model:video});
        detailView.render();

				this.showDetail();

    }


});

window.router  = new Router();
Backbone.history.start();
/* Backbone.history.start(); */


