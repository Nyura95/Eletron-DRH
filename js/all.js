(function() {
  var Gateway;

  Gateway = (function() {
    function Gateway() {}

    Gateway.prototype.request = function(target, params, callback) {
      return $.post(this.baseUrl + target, params).done((function(_this) {
        return function(data) {
          return callback(JSON.parse(data));
        };
      })(this));
    };

    Gateway.prototype.timedRequest = function(target, params, interval, callback) {
      return setInterval((function(_this) {
        return function() {
          return $.post(_this.baseUrl + target, params).done(function(data) {
            return callback(JSON.parse(data));
          });
        };
      })(this), interval);
    };

    Gateway.prototype.template = function(target, params, template, callback) {
      return $.post(this.baseUrl + target, params).done((function(_this) {
        return function(data) {
          var html, source;
          data = JSON.parse(data);
          source = $("#" + template).html();
          template = Handlebars.compile(source);
          html = template(data);
          return callback(html, data);
        };
      })(this));
    };

    Gateway.prototype.nodetemplate = function(template, data, callback) {
      var html, source;
      source = $("#" + template).html();
      template = Handlebars.compile(source);
      html = template(data);
      return callback(html, data);
    };

    return Gateway;

  })();

  window.Gateway = Gateway;

}).call(this);

(function() {
  var IndexController;

  IndexController = (function() {
    var GenerateBloc;

    function IndexController(app, conn) {
      this.app = app;
      this.conn = conn;
      this.button();
      this.app.controller('IndexCtrl', (function(_this) {
        return function($scope) {
          var token;
          token = "";
          $('[data-menu="envoie"]').click(function() {
            return $.ajax({
              type: "GET",
              url: "http://127.0.0.1:3000/login/admin",
              data: {},
              cache: false,
              success: function(e) {
                token = e.token;
                $("#test").load("template/Template_blocgestime.hbs.html");
                return $.ajax({
                  type: "GET",
                  url: "http://127.0.0.1:3000/getAllView/" + token + "/401T011T0239/UG",
                  data: {},
                  cache: false,
                  success: function(e) {
                    console.log(e);
                    return GenerateBloc({
                      UP: e.UP,
                      date: e.date,
                      structure_lib: e.structure_lib,
                      account: e.account,
                      donnee: e.donnee.all[0].donnee
                    });
                  },
                  error: function(error) {
                    return console.log(error);
                  },
                  dataType: "JSON"
                });
              },
              error: function(error) {
                return console.log(error);
              },
              dataType: "JSON"
            });
          });
          return $('[data-menu="token"]').click(function() {});
        };
      })(this));
      this.app.controller('IndexTest', function($scope, $routeParams) {
        $scope.message = "Je suis une vaiable";
        return $scope.orderId = $routeParams.orderId;
      });
    }

    IndexController.prototype.button = function() {
      var remote;
      remote = require('remote');
      $(".bubble-red").click(function() {
        return remote.getCurrentWindow().close();
      });
      return $(".bubble-orange").click(function() {
        return remote.getCurrentWindow().minimize();
      });
    };

    GenerateBloc = function(data) {
      var gateway;
      gateway = new Gateway();
      return gateway.nodetemplate("Blocgestime-tpl", data, (function(_this) {
        return function(html) {
          return $("#bloc").html(html);
        };
      })(this));
    };

    return IndexController;

  })();

  window.IndexController = IndexController;

}).call(this);

(function() {
  var Main;

  Main = (function() {
    function Main() {
      var connection, indexController, mysql;
      mysql = require("mysql");
      this.app = angular.module('perplexe', ["ngRoute"]);
      connection = mysql.createConnection({
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        user: 'root',
        password: "root"
      });
      connection.query("USE kingoloto");
      this.app.config([
        "$routeProvider", function($routeProvider, $scope) {
          return $routeProvider.when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexCtrl'
          }).when('/test/:orderId', {
            templateUrl: 'partials/test.html',
            controller: 'IndexTest'
          });
        }
      ]);
      indexController = new IndexController(this.app, connection);
      this.app.run(function($rootScope, $templateCache) {
        return console.log('Started');
      });
    }

    return Main;

  })();

  $(function() {
    var main;
    return main = new Main();
  });

  window.Main = Main;

}).call(this);
