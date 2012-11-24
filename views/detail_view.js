window.DetailView = Backbone.View.extend({
    el: "#detail",
    initialize:function(){
				var self = this;

				// bind this to handleDetailVideoReceived method
				_.bindAll(this,"handleDetailVideoReceived");
        this.model.fetchDescription(this.model.get("_id"),this.handleDetailVideoReceived);

				this.swipeObserve();

    },

		swipeObserve:function(){
			var self = this;
			var touchStartX;
			var touchEndX;
			this.$el.bind("touchstart",function(e){
				touchStartX = e.touches[0].pageX;
			});

			this.$el.bind("touchmove",function(e){
				touchEndX = e.touches[0].pageX;
				var diff = touchStartX - touchEndX;
				if (diff < 0) diff = diff * -1;
				if (diff > 100){
					self.toggleDescription();
				}
			});
			this.$el.bind("click",function(e){
				self.toggleDescription();
			});
		},

    events:{
    },
    // renderVideo is called once.
    renderVideo:function(){
        this.$el.find("#video-img").html(this.videoTemplate);
				// optimized for screen size.
				// width:height = 4:3
				var optimize = (function(){
					$(".thumbnail-video").css({
							width:screen.width,
							height:screen.width * 0.75
					});
				})();

        return this;
    },
    renderDescription:function(){

        var args = {
            currentDescription: this.model.get("currentDescription")
        };
        var template = _.template($("#detail-template").html(),args);

        this.$el.find("#desc").html(template);
    },
    // video id is this.model.get("_id")
    handleDetailVideoReceived:function(video){
        this.model.set("en",video.en);
        this.model.set("ja",video.ja);
        this.model.set("currentDescription",this.model.get("en"));
        this.videoTemplate = _.template('<iframe class="thumbnail-video" src="http://www.youtube.com/embed/<%= video_id %>?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>',{video_id: this.model.get("video_id")});
        this.flag = "en";
        this.renderDescription();
        this.renderVideo();
        return this;
    },

    toggleDescription:function(){
        if (this.flag === "en"){
           this.model.set("currentDescription",this.model.get("ja")) ;
            this.flag = "ja";
        }else{
            this.model.set("currentDescription",this.model.get("en")) ;
						this.flag = "en";
        }
        this.renderDescription();
    }


});
