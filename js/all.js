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
    var generateBloc;

    function IndexController(app, conn) {
      this.app = app;
      this.conn = conn;
      this.button();
      this.app.controller('IndexCtrl', (function(_this) {
        return function($scope) {
          return $('[data-menu="envoie"]').click(function() {
            document.location.href = "#/test";
            return $.ajax({
              type: "GET",
              url: "http://127.0.0.1:3000/login/admin",
              data: {},
              cache: false,
              success: function(token) {
                return document.location.href = "#gestime/" + token.token + "/401T011T0239/UG";
              },
              error: function(error) {
                return console.log(error);
              },
              dataType: "JSON"
            });
          });
        };
      })(this));
      this.app.controller('IndexGestime', (function(_this) {
        return function($scope, $routeParams) {
          $scope.message = "";
          _this.addTemplate(["Template_blocgestime"]);
          new interBody().changeTitle("Suivi des congés");
          return $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/getAllView/" + $routeParams.token + "/" + $routeParams.code + "/" + $routeParams.instruction,
            data: {},
            cache: false,
            success: function(e) {
              console.log(e);
              return generateBloc({
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
        };
      })(this));
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

    generateBloc = function(data) {
      var gateway;
      gateway = new Gateway();
      return gateway.nodetemplate("Blocgestime-tpl", data, (function(_this) {
        return function(html) {
          return $("#main-content").append(html);
        };
      })(this));
    };

    IndexController.prototype.addTemplate = function(template) {
      var i, len, myTemplate, results;
      results = [];
      for (i = 0, len = template.length; i < len; i++) {
        myTemplate = template[i];
        $("#main-content").append("<div id='" + myTemplate + "'</div>");
        results.push($("#" + myTemplate).load("template/" + myTemplate + ".hbs.html"));
      }
      return results;
    };

    return IndexController;

  })();

  window.IndexController = IndexController;

}).call(this);

(function() {
  var interBody;

  interBody = (function() {
    function interBody() {}

    interBody.prototype.changeTitle = function(title) {
      return $("#title").html(title);
    };

    interBody.prototype.createSidebar = function(sidebar) {
      var i, len, results, side;
      $("#sidebar").css("display", "inline-block");
      $("#main-content").css("width", "79%");
      results = [];
      for (i = 0, len = sidebar.length; i < len; i++) {
        side = sidebar[i];
        results.push(this.headerSidebar(side.place, side.gif, side.title));
      }
      return results;
    };

    interBody.prototype.headerSidebar = function(header, gif, title) {
      return $("#sidebar").append("<div class='" + header + "-item'><i class='" + gif + "'></i>" + title + "</div>");
    };

    interBody.prototype.createSysbar = function(sysbar) {
      return $("#menu-container").append("<div class='item'>");
    };

    return interBody;

  })();

  window.interBody = interBody;


  /*
        <div class="menu-container">
          <div class="item">
            Fichier(s)
            <div class="sub-menu">
              <div class="sub-item" data-menu="click">
                1 menu
              </div>
            </div>
          </div>
        </div>
   */

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
      this.app.config([
        "$routeProvider", function($routeProvider, $scope) {
          return $routeProvider.when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexCtrl'
          }).when('/gestime/:token/:code/:instruction', {
            templateUrl: 'partials/gestime.html',
            controller: 'IndexGestime'
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
