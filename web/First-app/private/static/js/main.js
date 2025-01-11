$(function() {
  $('#goMain').click(()=>location.href='/')

  $('.login').click(()=>$('#loginModal').modal())
  $('.logout').click(()=>location.href='/logout')

  $('#loginBtn').click(()=>{
    if($('input[name=username]').val().length == 0 || $('input[name=password]').val().length == 0) return 0

    $('#loginForm').attr('action', '/login')
    $('#loginForm').submit()
  })
})