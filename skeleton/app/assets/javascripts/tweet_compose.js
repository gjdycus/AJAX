(function ($) {

  $.TweetCompose = function (el) {
    this.$el = $(el);

// debugger;

    this.$el.on("click", "input", this.submit.bind(this));
  };

  $.TweetCompose.prototype.submit = function (e) {
    e.preventDefault();

    this.$el.find("input").prop('disable', true);

    var jsonObject = this.$el.serializeJSON();

    var that = this;

    $.ajax({
      url: '/tweets/',
      name: 'POST',
      dataType: 'json',
      data: jsonObject,
      success: function (result) {
        that.handleSuccess(result);
      }
    });
  };

  $.TweetCompose.prototype.handleSuccess = function (result) {
    debugger;
    this.clearInput();
    this.$el.find("input").prop('disable', false);
  };

  $.fn.tweetCompose = function () {
    return this.each(function () {
      new $.TweetCompose(this);
    });
  };

  $(function () {
    $('form.tweet-compose').tweetCompose();
  });
})(jQuery);
