<?php

?>
<!DOCTYPE html>
<html>
<head>
  <title>TAG Soluções</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
   <link rel="stylesheet" href="styles.css">
   <script type="text/javascript" src="jquery.js"></script>
   <script type="text/javascript" src="jquery.cycle.all.js"></script>
   <script src="script.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"/></script>
  <link rel="shortcult icon" type="image/x-icon" href="favicon.png">
  <script type="text/javascript">
   $(function(){
    $("#slide ul").cycle({
      fx:'fade',
      speed: 2000,
      timeout: 4000,
    })
   })
  </script>
</head>
<body >
  <?php include('Menu.php'); ?>
<div class="slide">
   <ul>
    <li><img src="imagen1.jpg" alt="" title="" height="620"></li>
    <li><img src="imagen2.jpg" alt="" title="" height="620"></li>
    <li><img src="imagen3.jpg" alt="" title="" height="620"></li>  
   </ul>
     
</div>
</body>
</html>