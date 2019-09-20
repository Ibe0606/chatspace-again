$(function() {
  function buildHTML(message) {
    var addImage = `<img src="${message.image}">`
    // イメージがあれば、<imgタグと、イメージが出るようにする。（三項演算子、← 条件分岐（if文でかく、イメージタグの使い方？
      var html = `
      <div class="message" data-message-id="${message.id}">
        <div class="upper-message" data-message-id="${message.id}">
          <div class="upper-message__user-name">${message.name}</div>
          <div class="upper-message__date">${message.date}</div>
        </div>
        <div class="lower-meesage">
          <p class="lower-message__content">${message.content}</p>
          ${addImage}
        </div>
      </div>
      `
    return html;
  } 

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html);
      // $(".messages").animate({scrollTop:$('#new_message').offset().top});
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  });
});

