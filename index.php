<!DOCTYPE html>
<html>
<head>
  <title>TAG SoluУЇУЕes</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/footer.css">
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/jquery.cycle.all.js"></script>
  <script src="js/script.js"></script>
  <script src="js/swfobject_modified.js" type="text/javascript"></script>
  <link rel="shortcult icon" type="image/x-icon" href="favicon.png">
  <script type="text/javascript">
   $(function(){
    $("#slide ul").cycle({
      fx:'fade',
      speed: 2000,
      timeout: 4000
    });
  });
 </script>
</head>
<body >
  <?php include('Menu.php'); ?>
  <div id="corpo">
    <div id="slide">
      <ul>
        <li><a href=""><img src="imagem/44444.jpg"></a></li>
        <li><a href=""><img src="imagem/obra-piso-epoxi-autonivelante-g-31.jpg"></a></li>
        <li><a href=""><img src="imagem/imagen3.jpg"></a></li>  
      </ul>
    </div><!--fim div slide-->

    <div id="descricao-empresa">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique eget metus ac consectetur. 
        Suspendisse posuere sapien quis pellentesque pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Nulla ligula mauris, lobortis scelerisque nisi id, sodales placerat augue. Suspendisse potenti. Vivamus ut tincidunt diam, non efficitur ipsum. 
        Vivamus lorem tortor, blandit et sagittis eu, congue at massa. Phasellus auctor, augue eu laoreet auctor, nunc eros volutpat nibh, 
        et laoreet sapien sapien ac mauris. Donec scelerisque viverra mauris eu interdum. Vestibulum tincidunt nec neque eu ultrices. 
        Aenean vehicula erat vitae faucibus ullamcorper. Etiam lacinia diam odio, tincidunt iaculis enim condimentum nec. 
        Suspendisse eleifend, orci in interdum pulvinar, erat enim ultricies nisl, eget cursus arcu urna quis mi.</p>

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