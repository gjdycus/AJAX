(function ($) {
  $.FollowToggle = function (el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');// || options.userId;
    this.followState = this.$el.data('initial-follow-state');// || options.followState;

    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  };

  $.FollowToggle.prototype.handleClick = function(e) {
    e.preventDefault();
    var method = (this.followState === "followed") ? "DELETE" : "POST";
    var that = this;

    this.followState = this.followState === "followed" ? "unfollowing" : "following";
    this.$el.prop('disabled', true);
    // this.render();

    $.ajax({
      url: "/users/" + this.userId + "/follow",
      type: method,
      dataType: 'json',
      success: function() {
        that.toggle();
        that.$el.prop('disabled', false);
        that.render();
      }
    });
  };

  $.FollowToggle.prototype.toggle = function() {
    if (this.followState === "following") {
      this.followState = "followed";
    } else if (this.followState === "unfollowing"){
      this.followState = "unfollowed";
    }
  };

  $.FollowToggle.prototype.render = function () {
    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  };

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };

  $(function () {
    $("button.follow-toggle").followToggle();
  });
})(jQuery);
