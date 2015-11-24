class Gateway
  constructor: ->
    #no need for this moment

  request: (target, params, callback) ->
    $.post(@baseUrl + target, params).done (data) =>
      callback JSON.parse(data)

  timedRequest: (target, params, interval, callback) ->
   setInterval =>
     $.post(@baseUrl + target, params).done (data) =>
       callback JSON.parse(data)
    ,
    interval

  template: (target, params, template, callback) ->
    $.post(@baseUrl + target, params).done (data) =>
      data = JSON.parse(data)
      source = $("#" + template).html()
      template = Handlebars.compile(source)
      html = template(data)
      callback html, data

  nodetemplate: (template, data, callback) ->
    source = $("##{template}").html()
    template = Handlebars.compile(source)
    html = template(data)
    callback html, data

window.Gateway = Gateway
