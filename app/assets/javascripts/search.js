$(function() {

var users_list = $(".user-search-result");

function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    users_list.append(html);             
  }

  $(".chat-group-form__input").on("input", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  function appendAddProduct(name, id) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;             
  }
  function appendRemoveProduct(name, id) {
    var html = `<div class='chat-group-users'>
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-add chat-group-user__btn chat-group-user__btn--add js-remove-btn'>追加</div>
                </div>`
    return html;             
  }
  
  $(".user-search-result").on('click', '.user-search-add', function(){
    $(this).parent().remove()
    var name = $(this).date('user-name');
    var id = $(this).date('user-id');
    var user = appendAddProduct(name, id)
    $('.chat-group-users').append(user)

  });

  $(".chat-group-users").on('click', '.user-search-remove', function(){
    $(this).parent().remove()
  });
});