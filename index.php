<?php

?>
<!DOCTYPE html>
<html>
<head>
  <title>TAG SoluУЇУЕes</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
   <link rel="stylesheet" href="styles.css">
   <script type="text/javascript" src="jquery.js"></script>
   <script type="text/javascript" src="jquery.cycle.all.js"></script>
   <script src="script.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"/>
  <script src="Scripts/swfobject_modified.js" type="text/javascript"></script>
  </script>
  <link rel="shortcult icon" type="image/x-icon" href="favicon.png">
  <script type="text/javascript">
   $(function(){
    $("#slide ul").Cycle({
      fx:'fade',
      speed: 2000,
      timeout: 4000,
    })
   })
  </script>
</head>
<body >
  <?php include('Menu.php'); ?>
  <div id="corpo">
<div class="slide">
  <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="862" height="600" id="FlashID" title="slide">
    <param name="movie" value="teste.swf">
    <param name="quality" value="high">
    <param name="wmode" value="opaque">
    <param name="swfversion" value="15.0.0.0">
    <!-- Esta tag param solicita que os usuários com o Flash Player 6.0 r65 e versões posteriores baixem a versão mais recente do Flash Player. Exclua-o se você não deseja que os usuários vejam o prompt. -->
    <param name="expressinstall" value="Scripts/expressInstall.swf">
    <param name="BGCOLOR" value="#D6D6D6">
    <!-- A tag object a seguir aplica-se a navegadores que não sejam o IE. Portanto, oculte-a do IE usando o IECC. -->
    <!--[if !IE]>-->
    <object type="application/x-shockwave-flash" data="teste.swf" width="862" height="600">
      <!--<![endif]-->
      <param name="quality" value="high">
      <param name="wmode" value="opaque">
      <param name="swfversion" value="15.0.0.0">
      <param name="expressinstall" value="Scripts/expressInstall.swf">
      <param name="BGCOLOR" value="#D6D6D6">
      <!-- O navegador exibe o seguinte conteúdo alternativo para usuários que tenham o Flash Player 6.0 e versões anteriores. -->
      <div>
        <h4>O conteúdo desta página requer uma versão mais recente do Adobe Flash Player.</h4>
        <p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Obter Adobe Flash player" width="112" height="33" /></a></p>
      </div>
      <!--[if !IE]>-->
    </object>
    <!--<![endif]-->
  </object>
</div>
</div>
<script type="text/javascript">
swfobject.registerObject("FlashID");
  </script>
</body>
</html>