<!DOCTYPE html>
<html>
<head>
	<title>Fale Conosco</title>
	 <meta http-equiv="content-type" content="text/html;charset=utf-8" />
	 <link rel="stylesheet" href="css/styles.css">
	 <link rel="stylesheet" type="text/css" href="css/footer.css">
	 <link rel="stylesheet" type="text/css" href="css/fale-conosco.css">

	 <!--script-->
	 <script type="text/javascript" src="js/jquery.js"></script>
	 <script src="js/script.js"></script>
</head>
<body>
<?php include("Menu.php"); ?>
	<div id="conteudo">
		<div class="titulo">
			<h2>Fale conosco</h2>
		</div>
		<div class="form">
			<form name="formulario" method="post" action="">
				<div class="rows">
					<label>Nome</label><br>
					<input type="text" id="nome" class="input" name="nome" placeholder="Nome">
				</div>
				<div class="rows">
					<label>Email</label><br>
					<input type="text" id="email" class="input" name="email" placeholder="Email">
				</div>
				<div class="rows">
					<label>Telefone</label><br>
					<input type="text" id="telefone" class="input" name="telefone" placeholder="Telefone">
				</div>
				<div class="rows">
					<label>Assunto</label><br>
					<input type="text" id="assunto" class="input" name="assunto" placeholder="Assunto">
				</div>
				<div class="rows">
					<label>Mensagem</label><br>
					<textarea rows="10" cols="48" name="mensagem" id="mensagem"></textarea>
				</div>
				<div class="rows">
					<button class="btenviar" name="btenviar">Enviar</button>
				</div>
			</form>
		</div><!--fim div form-->
	</div><!--fim div conteudo-->


<?php include("footer.php"); ?>
</body>
</html>