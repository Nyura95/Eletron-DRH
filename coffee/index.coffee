class IndexController
  constructor: (@app, @conn) ->
    @button()
    @app.controller 'IndexCtrl', ($scope) =>
      @conn.query 'select * from ennemie', [], (err, rows) =>
        console.log rows
        for row in rows
          $scope.message = row.name


      $('[data-menu="click"]').click ->
        console.log "yep"


    @app.controller 'IndexTest', ($scope, $routeParams) ->
      $scope.message = "Je suis une vaiable"
      $scope.orderId = $routeParams.orderId
  button: () ->
    remote = require 'remote'
    $(".bubble-red").click ->
      remote.getCurrentWindow().close()
    $(".bubble-orange").click ->
      remote.getCurrentWindow().minimize()
window.IndexController = IndexController
