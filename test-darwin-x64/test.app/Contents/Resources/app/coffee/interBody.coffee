class interBody
  constructor: () ->
    #fdsfdsf
  changeTitle: (title) ->
    $("#title").html title
  createSidebar: (sidebar) ->
    @headerSidebar side.place, side.gif, side.title for side in sidebar
  headerSidebar: (header, gif, title) ->
    $("#sidebar").append "<div class='#{header}-item'><i class='#{gif}'></i>#{title}</div>"

window.interBody = interBody
###
<div class="header-item"><i class="fa fa-arrow-down"></i> Téléchargement</div>
<div class="normal-item"><i class="fa fa-clock-o"></i> En attente</div>
<div class="normal-item"><i class="fa fa-spinner"></i> En cours</div>
<div class="normal-item"><i class="fa fa-check-circle"></i> Terminer</div>
<br />
<div class="header-item"><i class="fa fa-hdd-o"></i> Librairie</div>
<div class="normal-item"><i class="fa fa-film"></i> Vidéo</div>
<div class="normal-item"><i class="fa fa-music"></i> Audio</div>
<div class="normal-item"><i class="fa fa-file-archive-o"></i> Compressé</div>
<br />
<div class="header-item"><i class="fa fa-globe"></i> Web</div>
<div class="normal-item"><i class="fa fa-compass"></i> Découvrir</div>
<div class="normal-item"><i class="fa fa-search"></i> Rechercher</div>
###
