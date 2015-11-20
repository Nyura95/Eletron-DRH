(function() {
  var IndexController;

  IndexController = (function() {
    function IndexController(app, conn) {
      this.app = app;
      this.conn = conn;
      this.button();
      this.app.controller('IndexCtrl', (function(_this) {
        return function($scope) {
          _this.conn.query('select * from ennemie', [], function(err, rows) {
            var i, len, results, row;
            console.log(rows);
            results = [];
            for (i = 0, len = rows.length; i < len; i++) {
              row = rows[i];
              results.push($scope.message = row.name);
            }
            return results;
          });
          return $('[data-menu="click"]').click(function() {
            return console.log("yep");
          });
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
