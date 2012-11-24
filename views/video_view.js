window.VideoView = Backbone.View.extend({
    tagName: "li",
    initialize:function(){
    },

    imgSrc:function(model){
        var base = _.template("<img  class='thumbnail' src=\"http://i.ytimg.com/vi/<%= video_id %>/default.jpg\" class='play' id= <%= video_id %> desc_id = <%= _id %> />",{
            video_id: model.get("video_id"),
            desc_id: model.get("desc_id"),
            _id: model.get("_id"),
            published: model.get("published")
        });
			return base;
	},
    render:function(){
        var template = _.template($("#video-li-template").html(),{
            title: this.model.get("title"),
            src: this.imgSrc(this.model),
            id: this.model.get("video_id"),
            _id: this.model.get("_id"),
            desc_id:this.model.get("desc_id"),
            published: this.trimDate(this.model.get("published"))
        });

        this.$el.html(template);
        return this;
    },
    trimDate:function(str){
        return str.replace(/T.*/,"");
    }
});
