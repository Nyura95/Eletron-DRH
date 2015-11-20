class IndexController
  constructor: (@app, @conn) ->
    @button()
    @app.controller 'IndexCtrl', ($scope) =>
      token = ""
      $('[data-menu="envoie"]').click ->
        #token/UG/401T011T0239
        $.ajax {
          type: "GET"
          url: "http://127.0.0.1:3000/login/admin"
          data:{}
          cache:false
          success: (e) ->
            token = e.token
            $("#test").load "template/Template_blocgestime.hbs.html"
            $.ajax {
              type: "GET"
              url: "http://127.0.0.1:3000/getAllView/#{token}/401T011T0239/UG"
              data:{}
              cache:false
              success: (e) ->
                console.log e
                GenerateBloc {UP:e.UP, date:e.date, structure_lib:e.structure_lib, account:e.account, donnee:e.donnee.all[0].donnee}
              error: (error) ->
                console.log error
              dataType: "JSON"
            }
          error: (error) ->
            console.log error
          dataType: "JSON"
        }
      $('[data-menu="token"]').click ->
        #token/UG/401T011T0239



    @app.controller 'IndexTest', ($scope, $routeParams) ->
      $scope.message = "Je suis une vaiable"
      $scope.orderId = $routeParams.orderId
  button: () ->
    remote = require 'remote'
    $(".bubble-red").click ->
      remote.getCurrentWindow().close()
    $(".bubble-orange").click ->
      remote.getCurrentWindow().minimize()
  GenerateBloc = (data) ->
    gateway = new Gateway()
    gateway.nodetemplate "Blocgestime-tpl", data, (html) =>
      $("#bloc").html html
window.IndexController = IndexController
