class interBody
  constructor: () ->
    #fdsfdsf
  changeTitle: (title) ->
    $("#title").html title
  createSidebar: (sidebar) ->
    $("#sidebar").css "display", "inline-block"
    $("#main-content").css "width", "79%"
    @headerSidebar side.place, side.gif, side.title for side in sidebar
  headerSidebar: (header, gif, title) ->
    $("#sidebar").append "<div class='#{header}-item'><i class='#{gif}'></i>#{title}</div>"
  createSysbar: (sysbar) ->
    $("#menu-container").append "<div class='item'>"
window.interBody = interBody
###
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
###
