<!DOCTYPE html>
<html>
<head>
  <title>TAG Soluções</title>
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

    <div id="descricao-empresa">
      <p></p>

        <p>Etiam convallis justo eget erat blandit volutpat. Morbi iaculis varius velit ac feugiat. Proin velit dui, blandit eget risus non, volutpat rutrum neque. 
          In nulla sem, facilisis et bibendum vitae, elementum et lacus. Nulla facilisi. Curabitur pharetra leo a ultricies placerat. 
          Aliquam convallis libero condimentum, ultrices tortor vel, scelerisque quam. Donec eget eleifend lacus, eget congue libero. 
          Nam vulputate finibus erat a condimentum.</p>

        <p>Nulla justo leo, dapibus eget enim a, rutrum sodales nunc. Donec vitae ullamcorper justo. 
            Donec at enim molestie, congue risus ac, dictum nisi. Quisque ligula odio, commodo et eros eget, mollis consequat justo. 
            Pellentesque magna augue, mattis a gravida sit amet, iaculis nec diam. Vestibulum porttitor dignissim felis eu vehicula. 
            Suspendisse eleifend magna ac malesuada dapibus. Fusce aliquet sapien in suscipit scelerisque. In tempor gravida hendrerit. 
            Nam rutrum est vitae augue faucibus elementum. Donec molestie massa ut accumsan lacinia. Proin nec urna sed mi ornare volutpat. 
            Aliquam et malesuada augue. Curabitur tincidunt elit eget mauris egestas feugiat. Curabitur dignissim dolor eu elit bibendum mollis. 
            Vestibulum non quam quis nunc volutpat pretium interdum vel purus.</p>
      </div>

    </div><!--fim div corpo-->
    <?php include("footer.php"); ?>
  </body>
</html>