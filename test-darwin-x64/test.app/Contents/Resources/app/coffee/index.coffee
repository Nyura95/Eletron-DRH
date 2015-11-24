class IndexController
  constructor: (@app, @conn) ->
    @button()
    new interBody().createSidebar [{place:"header", gif:"fa fa-cubes", title:"Téléchargement"}, {place:"normal", gif:"fa fa-cube", title:"<a href='#/'>Home</a>"}, {place:"normal", gif:"fa fa-cube", title:"<a href='#/gestime/token/401T011T0239/UG'>Gestime</a>"}]


    @app.controller 'IndexCtrl', ($scope) =>
      $('[data-menu="envoie"]').click ->
        document.location.href = "#/test";
        $.ajax {
          type: "GET"
          url: "http://127.0.0.1:3000/login/admin"
          data:{}
          cache:false
          success: (token) ->
            document.location.href = "#gestime/#{token.token}/401T011T0239/UG";
          error: (error) ->
            console.log error
          dataType: "JSON"
        }

    @app.controller 'IndexGestime', ($scope, $routeParams) =>
      $scope.message = ""

      @addTemplate ["Template_blocgestime"]
      new interBody().changeTitle "Suivi des congés"

      $.ajax {
        type: "GET"
        url: "http://127.0.0.1:3000/getAllView/#{$routeParams.token}/#{$routeParams.code}/#{$routeParams.instruction}"
        data:{}
        cache:false
        success: (e) ->
          console.log e
          generateBloc {UP:e.UP, date:e.date, structure_lib:e.structure_lib, account:e.account, donnee:e.donnee.all[0].donnee}
        error: (error) ->
          console.log error
        dataType: "JSON"
      }


      #$scope.message = "Je suis une vaiable"
      #$scope.orderId = $routeParams.orderId
  button: () ->
    remote = require 'remote'
    $(".bubble-red").click ->
      remote.getCurrentWindow().close()
    $(".bubble-orange").click ->
      remote.getCurrentWindow().minimize()
  generateBloc = (data) ->
    gateway = new Gateway()
    gateway.nodetemplate "Blocgestime-tpl", data, (html) =>
      $("#main-content").append html
  addTemplate: (template) ->
    for myTemplate in template
      $("#main-content").append "<div id='#{myTemplate}'</div>"
      $("##{myTemplate}").load "template/#{myTemplate}.hbs.html"
window.IndexController = IndexController
