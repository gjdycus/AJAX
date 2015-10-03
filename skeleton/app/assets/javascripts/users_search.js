(function ($) {
  $.UsersSearch = function(el) {
    this.$el = $(el);

    this.$el.on("keyup", this.handleInput.bind(this));

  };

  $.UsersSearch.prototype.handleInput = function(e) {
    var that = this;

    $.ajax({
      url: '/users/search',
      type: 'GET',
      data: { query: e.target.value },
      dataType: 'json',
      success: function (users) {
        that.renderResults( users );
      },
      error: function() {
        alert("error");
      }
    });
  };

  $.UsersSearch.prototype.renderResults = function(users) {
    this.$el.find("ul").empty();
    var that = this;

    users.forEach(function(user) {
      var followStatus = (user.followed) ? "followed" : "unfollowed";

      var $userLink = $('<li><a href="/users/'+user.id+'">'+user.username+'</a></li>');
      var $followButton = $('<button class="follow-toggle" data-user-id="'+user.id+'" data-initial-follow-state="'+followStatus+'"></button>').followToggle();
      that.$el.find('ul').append($userLink).append($followButton);
    });
  };

  $.fn.usersSearch = function () {
    return this.each(function () {
      new $.UsersSearch(this);
    });
  };

  $(function () {
    $("div.users-search").usersSearch();
  });
})(jQuery);
