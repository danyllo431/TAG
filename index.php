<!DOCTYPE html>
<html>
<head>
  <title>TAG Soluções Industriais</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/footer.css">

  <!--script-->
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/jquery.cycle.all.js"></script>
  <script src="js/script.js"></script>
  <link rel="shortcult icon" type="image/x-icon" href="favicon.png">
  <script type="text/javascript">
   $(function(){
    $("#slide ul").cycle({
      fx:'fadeZoom',
      speed: 2000,
      timeout: 6000
    });
  });
 </script>
</head>
<body >
  <?php include('Menu.php'); ?>
  <div id="corpo">
    <div id="slide"><center>
      <ul>
        <li><a href=""><img src="imagem/imagem01.jpg"></a></li>
        <li><a href=""><img src="imagem/imagem02.jpg"></a></li>
        <li><a href=""><img src="imagem/imagem03.jpg"></a></li>  
      </ul>
      </center>
    </div><!--fim div slide-->
  </br>
    <div class="descricao">
      <img src="tagui.png" wisth="400" height="400"><h4><p>A Tag Soluções Industriais</p></br> Tem como objetivo o fornecimento e Instalações</br> de gases Industriais, Medicinais e Especiais e GLP</br>
      Com especialidade Na aplicação de revestimento Epoxi de alta resistencia</br> para todo tipo de industria Comercio e Unidades Hospitalares  </h4>
      <div class="informacao">
      <h2>&nbsp;</h2>
    </div>
   
      <h2>&nbsp;</h2>		   
   </br>
    </div><!--fim div corpo-->
    <?php include("footer.php"); ?>
  </body>
</html>