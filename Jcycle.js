/ *!
 * Ciclo jQuery Plugin (com Definições de Transição)
 * Exemplos e documentação em: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Versão: 3.0.3 (11-JUL-2013)
 * Dupla licenciado sob as licenças MIT e GPL.
 * Http://jquery.malsup.com/license.html
 * Requer: v1.7.1 jQuery ou mais tarde
 * /
; (Function ($, undefined) {
"Use strict";

var ver = '3.0.3';

função debug (s) {
	if ($ .fn.cycle.debug)
		log (s);
}		
log function () {
	/ * Consola globais * /
	if (window.console && console.log)
		console.log ('[ciclo]' + Array.prototype.join.call (argumentos, ''));
}
$ .expr [':'] Fez uma pausa = function (el) {.
	retornar el.cyclePause;
};


// O arg opções pode ser ...
// Um ​​número - indica uma transição imediata deverá ocorrer com o índice de slides dada
// Um ​​string - 'pause', 'currículo', 'activar', 'próxima', 'prev', 'stop', 'destruir' ou o nome de um efeito de transição (ou seja, 'Fade', 'zoom', etc)
// Um ​​objeto - propriedades para controlar a apresentação de slides
//
// O arg arg2 pode ser ...
// O nome de um fx (somente usado em conjunto com um valor numérico para "opções")
// O valor verdadeiro (apenas usado na primeira arg == 'currículo') e indica
// Que o currículo deve ocorrer imediatamente (não esperar para o próximo timeout)

$ .fn.cycle = Function (opções, arg2) {
	var o = {s: this.selector, c: this.context};

	// No 1.3+ podemos corrigir erros com o estado de pronto
	if (this.length === 0 && opções! = 'stop') {
		if (! $. isReady && os) {
			log ("DOM não está pronto, filas slideshow ');
			$ (Function () {
				$ (OS, oc) .cycle (opções, arg2);
			});
			devolver este;
		}
		// É o seu DOM está pronto? http://docs.jquery.com/Tutorials:Introducing_$ (document) .ready ()
		log ("encerra; zero elementos encontrados por selector '+ ($ .isReady' ':' (DOM não está pronto) ')?);
		devolver este;
	}

	// Iterar o nodeset combinado
	retornar this.each (function () {
		var opta = handleArguments (este, opções, arg2);
		if (opta === false)
			retorno;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $ .fn.cycle.updateActivePagerLink;
		
		// Parar slideshow existente para esse recipiente (se houver)
		if (this.cycleTimeout)
			clearTimeout (this.cycleTimeout);
		this.cycleTimeout this.cyclePause = = 0;
		this.cycleStop = 0; // Edição # 108

		var $ cont = $ (this);
		var $ lâminas = opts.slideExpr? $ (Opts.slideExpr, este): $ cont.children ();
		var els = $ slides.get ();

		se (els.length <2) {
			log ("terminação; também alguns slides: '+ els.length);
			retorno;
		}

		var opts2 = buildOptions (cont $, $ slides, els, opta, o);
		if (opts2 === false)
			retorno;

		var startTime = opts2.continuous? 10: getTimeout (! Els [opts2.currSlide], els [opts2.nextSlide], opts2, opts2.backwards);

		// Se é um slideshow auto, chutá-la fora
		if (startTime) {
			startTime + = (opts2.delay || 0);
			se (startTime <10)
				startTime = 10;
			debug ('primeiro tempo limite:' + startTime);
			this.cycleTimeout = setTimeout (function () {! Go (els, opts2,0, opts.backwards);}, StartTime);
		}
	});
};

função triggerPause (cont, byHover, onPager) {
	var opta = $ (cont) .Data ('cycle.opts');
	if (!) opta
		retorno;
	var fez uma pausa = !! cont.cyclePause;
	if (pausado && opts.paused)
		opts.paused (cont, opta, byHover, onPager);
	else if (! parou && opts.resumed)
		opts.resumed (cont, opta, byHover, onPager);
}

// processar os argumentos que foram passados ​​para o fn plug-in
handleArguments função (cont, Opções, arg2) {
	if (cont.cycleStop === undefined)
		cont.cycleStop = 0;
	if (Opções === indefinidos || opções === nulos)
		options = {};
	if (options.constructor == String) {
		interruptor (opções) {
		caso 'destruir':
		caso 'stop':
			var opta = $ (cont) .Data ('cycle.opts');
			if (!) opta
				return false;
			cont.cycleStop ++; // retornos olhar para a mudança
			if (cont.cycleTimeout)
				clearTimeout (cont.cycleTimeout);
			cont.cycleTimeout = 0;
			if (opts.elements)
				$ (Opts.elements) .Stop ();
			$ (Cont) .removeData ('cycle.opts');
			if (opções == 'destruir')
				destruir (cont, opta);
			return false;
		caso 'activar':
			cont.cyclePause = (=== cont.cyclePause 1)? 0: 1;
			checkInstantResume (cont.cyclePause, arg2, cont);
			triggerPause (cont);
			return false;
		caso 'pause':
			cont.cyclePause = 1;
			triggerPause (cont);
			return false;
		caso 'currículo':
			cont.cyclePause = 0;
			checkInstantResume (false, arg2, cont);
			triggerPause (cont);
			return false;
		caso 'prev':
		caso 'próximo':
			opta = $ (cont) .Data ('cycle.opts');
			if (! opta) {
				log ("opções não encontrado", prev / next "ignorado");
				return false;
			}
			if (typeof arg2 == 'string') 
				opts.oneTimeFx = arg2;
			$ .fn.cycle [Opções] (opts);
			return false;
		default:
			options = {fx: Opções};
		}
		Opções de regresso;
	}
	else if (options.constructor == Number) {
		// Ir para o slide solicitado
		var num = opções;
		options = $ (cont) .Data ('cycle.opts');
		if (! options) {
			log ("opções não encontrado, não pode avançar slides ');
			return false;
		}
		se (num <0 || num> = options.elements.length) {
			log ("índice de slides inválido: '+ num);
			return false;
		}
		options.nextSlide = num;
		se (cont.cycleTimeout) {
			clearTimeout (cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		ir (options.elements, opções, 1, num> = options.currSlide);
		return false;
	}
	Opções de regresso;
	
	funcionar checkInstantResume (isPaused, arg2, cont) {
		if (! isPaused && arg2 === true) {// retomar agora!
			var options = $ (cont) .data ('cycle.opts');
			if (! options) {
				log ("opções não encontrado, não pode continuar ');
				return false;
			}
			se (cont.cycleTimeout) {
				clearTimeout (cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			ir (options.elements, opções, um, options.backwards!);
		}
	}
}

funcionar RemoveFilter (el, opta) {
	if (! $. support.opacity && && opts.cleartype el.style.filter) {
		try {el.style.removeAttribute ('filtro'); }
		catch (sufocar) {} // lidar com versões antigas de ópera
	}
}

// manipuladores de eventos desvincular
função de destruir (cont, opta) {
	if (opts.next)
		$ (Opts.next) .unbind (opts.prevNextEvent);
	if (opts.prev)
		$ (Opts.prev) .unbind (opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$ .each (Opts.pagerAnchors || [], function () {
			. this.unbind () remove ();
		});
	opts.pagerAnchors = null;
	$ (Cont) .unbind ('mouseenter.cycle mouseleave.cycle');
	if (opts.destroy) // callback
		opts.destroy (opts);
}

// Inicialização única
buildOptions função (cont $, $ escorregas, els, Opções, o) {
	var startingSlideSpecified;
	// Plug-in de metadados de suporte (v1.0 e v2.0)
	var opta = $ .extend ({}, $ .fn.cycle.defaults, opções || {}, $ .metadata $ cont.metadata (): $ .meta $ cont.data ():? {});
	var meta = $ .isFunction ($ cont.data)? $ Cont.data (opts.metaAttr): null;
	se (meta)
		opta = $ .extend (opta, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = cont $ [0];
	$ Cont.data ('cycle.opts », opta);
	opta $ cont = cont. $;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before? [Opts.before]: [];
	opts.after = opts.after? [Opts.after]: [];

	// Empurrar alguns depois de retornos de chamada
	(support.opacity && opts.cleartype! $.) se
		opts.after.push (function () {RemoveFilter (este, opta);});
	if (opts.continuous)
		opts.after.push (function () {ir (els, opta, 0, opts.backwards!);});

	saveOriginalOpts (opts);

	// correções ClearType
	if (! $. support.opacity && opts.cleartypeNoBg opts.cleartype &&!)
		clearTypeFix (lâminas $);

	// Recipiente exige posição de não-estático para que slides podem ser posição dentro
	if ($ cont.css ("posição") == 'estático')
		$ Cont.css ('posição', 'relativa');
	if (opts.width)
		$ Cont.width (opts.width);
	if (opts.height && opts.height! = 'auto')
		$ Cont.height (opts.height);

	if (opts.startingSlide! == undefined) {
		opts.startingSlide = parseInt (opts.startingSlide, 10);
		if (opts.startingSlide> = els.length || opts.startSlide <0)
			opts.startingSlide = 0; // Captura de entrada falso
		mais 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide els.length = - 1;
	mais
		opts.startingSlide = 0;

	// Se aleatório, mistura-se a matriz de slides
	se (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i <els.length; i ++)
			opts.randomMap.push (i);
		opts.randomMap.sort (função (a, b) {return Math () - 0,5;});
		se (startingSlideSpecified) {
			// Tentar encontrar o slide inicial especificado e se encontrado índice fixado de slides início no mapa de acordo
			for (var cnt = 0; cnt <els.length; cnt ++) {
				if (opts.startingSlide == opts.randomMap [CNT]) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap [1];
		}
	}
	else if (opts.startingSlide> = els.length)
		opts.startingSlide = 0; // Captura de entrada falso
	opts.currSlide opts.startingSlide || = 0;
	var primeiro = opts.startingSlide;

	// Posição definida e zIndex em todos os slides
	$ Slides.css ({posição: "absoluto", top: 0, deixou: 0}). Hide () cada (função (i) {.
		var z;
		if (opts.backwards)
			z = primeiro? i <= em primeiro lugar? els.length + (i-em primeiro lugar): em primeiro lugar-i: els.length-i;
		mais
			z = primeiro? i> = em primeiro lugar? els.length - (i-em primeiro lugar): em primeiro lugar-i: els.length-i;
		$ (This) css ('z-index', z);
	});

	// Certifique-se primeiro slide é visível
	$ (Els [primeiro]) css ('opacidade', 1) .show (.); // Bit opacidade necessária para lidar com casos de uso de reinício
	RemoveFilter (els [primeiro], opta);

	// lâminas de estiramento
	se (opts.fit) {
		se (opts.aspect!) {
	        if (opts.width)
	            $ Slides.width (opts.width);
	        if (opts.height && opts.height! = 'auto')
	            $ Slides.height (opts.height);
		} Else {
			Slides.each $ (function () {
				var $ slides = $ (this);
				var ratio = (opts.aspect === true)? Slide.width $ () / $ slide.height (): opts.aspect;
				if (opts.width && $ slide.width ()! = opts.width) {
					$ Slide.width (opts.width);
					$ Slide.height (opts.width / ratio);
				}

				if (opts.height && $ slide.height () <opts.height) {
					$ Slide.height (opts.height);
					Slide.width $ (opts.height * ratio);
				}
			});
		}
	}

	if (opts.center && ((! opts.fit) || opts.aspect)) {
		Slides.each $ (function () {
			var $ slides = $ (this);
			$ Slide.css ({
				"Margin-left": opts.width?
					((Opts.width - $ slide.width ()) / 2) + "px":
					0,
				"Margin-top": opts.height?
					((Opts.height - $ slide.height ()) / 2) + "px":
					0
			});
		});
	}

	if (opts.center &&! opts.fit &&! opts.slideResize) {
		Slides.each $ (function () {
			var $ slides = $ (this);
			$ Slide.css ({
				"Margin-left": opts.width? ((Opts.width - $ slide.width ()) / 2) + "px": 0,
				"Margin-top": opts.height? ((Opts.height - $ slide.height ()) / 2) + "px": 0
			});
		});
	}
		
	// Recipiente trecho
	var = reshape (opts.containerResize || opts.containerResizeHeight) && $ cont.innerHeight () <1;
	if (remodelar) {// fazer isso somente se recipiente não tem tamanho http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		para (var j = 0; j <els.length; j ++) {
			var $ e $ = (ELS [j]), e = $ E [0], w = e.outerWidth $ (), $ h = e.outerHeight ();
			se w = e.offsetWidth || e.width || $ e.attr ('width') (w!);
			se h = e.offsetHeight || e.height || $ e.attr ('altura') (h!);
			maxw = w> maxw? w: maxw;
			maxh = h> maxh? h: maxh;
		}
		if (opts.containerResize && maxw> 0 && maxh> 0)
			$ Cont.css ({width: maxw + 'px', altura: maxh + 'px'});
		if (opts.containerResizeHeight && maxh> 0)
			$ Cont.css ({height: maxh + 'px'});
	}

	var pauseFlag = false; // Https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$ Cont.bind ('mouseenter.cycle', function () {
			pauseFlag = true;
			this.cyclePause ++;
			triggerPause (cont, true);
		}). Bind ('mouseleave.cycle', function () {
				if (pauseFlag)
					this.cyclePause--;
				triggerPause (cont, true);
		});

	if (supportMultiTransitions (opte) === false)
		return false;

	// Aparentemente um monte de pessoas usam slideshows de imagem sem altura / largura atributos nas imagens.
	// Ciclo 2.50+ requer a informação de dimensionamento para cada slide; este bloco tenta lidar com isso.
	var requeue = false;
	options.requeueAttempts options.requeueAttempts || = 0;
	Slides.each $ (function () {
		// Tentar obter altura / largura de cada slide
		var $ el = $ (this);
		this.cycleH = (opts.fit opts.height &&)? opts.height: ($ el.height () || || this.offsetHeight This.Height || $ el.attr ("altura") || 0);
		this.cycleW = (opts.fit opts.width &&)? opts.width: ($ el.width () || || this.offsetWidth this.width || $ el.attr ('width') || 0);

		if ($ el.is ("img")) {
			var carregamento = (=== this.cycleH 0 && 0 && this.cycleW === this.complete!);
			// Não requeue para as imagens que ainda estão sendo carregados, mas tem um tamanho válido
			se (carga) {
				se (os && && opts.requeueOnImageNotLoaded ++ options.requeueAttempts <100) {// faixa de repetição contar portanto, não fazer loop eterno
					log (options.requeueAttempts, '- diapositivo img não carregado, requeuing slideshow:', this.src, this.cycleW, this.cycleH);
					setTimeout (function () {$ (OS, oc) .cycle (opções);}, opts.requeueTimeout);
					requeue = true;
					return false; // Quebrar cada loop
				}
				else {
					log ("não foi possível determinar o tamanho da imagem: '+ this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	Slides.not $ (': eq (' + primeira + ')') css (opts.cssBefore);.
	. $ ($ lâminas [primeiro]) css (opts.cssFirst);

	se (opts.timeout) {
		opts.timeout = parseInt (opts.timeout, 10);
		// Garantir que tempo limite e configurações de velocidade são sane
		if (opts.speed.constructor == String)
			opts.speed = $ .fx.speeds [opts.speed] || parseInt (opts.speed, 10);
		se (opts.sync!)
			opts.speed = opts.speed / 2;
		
		tampão var = opts.fx == 'none'? 0: opts.fx == 'Shuffle'? 500: 250;
		while ((opts.timeout - opts.speed) <buffer) // higienizar tempo limite
			opts.timeout + = opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (! opts.speedIn)
		opts.speedIn = opts.speed;
	if (! opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide primeiro =;
	se (opts.random) {
		if (++ opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide opts.startingSlide === = 0? (Els.length-1): opts.startingSlide-1;
	mais
		opts.nextSlide opts.startingSlide => = (els.length-1)? 0: opts.startingSlide + 1;

	// Prazo de transição de init fn
	if (! opts.multiFx) {
		var o init = $ .fn.cycle.transitions [opts.fx];
		if ($ .isFunction (init))
			init (cont $, $ slides, opta);
		else if (opts.fx! = 'custom' &&! opts.multiFx) {
			log ("transição desconhecido: '+ opts.fx,'; slideshow de terminação ');
			return false;
		}
	}

	// fogo eventos artificiais
	var e0 = $ lâminas [primeiro];
	if (! opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before [0] .Aplicar (e0, [e0, e0, opta, true]);
		if (opts.after.length)
			opts.after [0] .Aplicar (e0, [e0, e0, opta, true]);
	}
	if (opts.next)
		$ (Opts.next) .bind (opts.prevNextEvent, function () {return (antecipados opta, 1);});
	if (opts.prev)
		$ (Opts.prev) .bind (opts.prevNextEvent, function () {return (antecipados opta, 0);});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager (els, opta);

	exposeAddSlide (opta, els);

	retornar opta;
}

// Salvar off originais opta para que possamos restaurar depois de limpar estado
saveOriginalOpts função () {opta
	opts.original = {antes: [], depois de: []};
	opts.original.cssBefore = $ .extend ({}, opts.cssBefore);
	opts.original.cssAfter = $ .extend ({}, opts.cssAfter);
	opts.original.animIn = $ .extend ({}, opts.animIn);
	opts.original.animOut = $ .extend ({}, opts.animOut);
	$ .each (Opts.before, function () {opts.original.before.push (this);});
	$ .each (Opts.after, function () {opts.original.after.push (this);});
}

supportMultiTransitions função () {opta
	var i, tx, txs = $ .fn.cycle.transitions;
	// Olhar para vários efeitos
	if (opts.fx.indexOf (',') 0>) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace (/ \ s * / g, '') (') dividida.';
		// Descartar quaisquer nomes efeito falsos
		for (i = 0; i <opts.fxs.length; i ++) {
			var fx = opts.fxs [i];
			tx = txs [fx];
			if (! tx ||! txs.hasOwnProperty (fx) ||! $. isFunction (tx)) {
				log ("descartando transição desconhecido: ', fx);
				opts.fxs.splice (i, 1);
				eu--;
			}
		}
		// Se nós temos uma lista vazia, depois, jogou tudo fora!
		se (opts.fxs.length!) {
			log ("Não há transições válidas nomeados; terminação slideshow. ');
			return false;
		}
	}
	else if (opts.fx == 'all') {// auto-gen a lista de transições
		opts.multiFx = true;
		opts.fxs = [];
		para (var p em txs) {
			se (txs.hasOwnProperty (p)) {
				tx = txs [p];
				if (txs.hasOwnProperty (p) && $ .isFunction (TX))
					opts.fxs.push (p);
			}
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// Munge a matriz fxs para fazer a seleção de efeito aleatório
		var R1 = Math.floor (Math () * 20) + 30;
		for (i = 0; i <r1; i ++) {
			var r2 = Math.floor (Math.random () * opts.fxs.length);
			opts.fxs.push (opts.fxs.splice (r2,1) [0]);
		}
		debug ('randomizados sequência fx:', opts.fxs);
	}
	return true;
}

// Fornecer um mecanismo para a adição de lâminas após a apresentação de slides já começou
função exposeAddSlide (opta, els) {
	opts.addSlide = function (newSlide, anteposta) {
		var $ s = $ (newSlide), s = $ s [0];
		if (! opts.autostopCount)
			opts.countdown ++;
		els [preceder 'unshift': 'push'?] (s);
		if (opts.els)
			opts.els [preceder 'unshift': 'push'?] (s); // Shuffle precisa deste
		opts.slideCount = els.length;

		// Adiciona o slide para o mapa aleatório e resort
		se (opts.random) {
			opts.randomMap.push (opts.slideCount-1);
			opts.randomMap.sort (função (a, b) {return Math () - 0,5;});
		}

		$ S.css ('posição', 'absoluto');
		$ S [? Preceder 'prependTo': 'appendTo'] (opta $ cont.);

		if (preceder) {
			opts.currSlide ++;
			opts.nextSlide ++;
		}

		if (! $. support.opacity && opts.cleartypeNoBg opts.cleartype &&!)
			clearTypeFix ($ s);

		if (opts.fit && opts.width)
			$ S.width (opts.width);
		if (opts.fit && && opts.height opts.height! = 'auto')
			$ S.height (opts.height);
		s.cycleH = (opts.fit opts.height &&)? opts.height: s.height $ ();
		s.cycleW = (opts.fit opts.width &&)? opts.width: s.width $ ();

		$ S.css (opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$ .fn.cycle.createPagerAnchor (Els.length-1, s, $ (opts.pager), els, opta);

		if ($ .isFunction (opts.onAddSlide))
			opts.onAddSlide ($ s);
		mais
			S.hide $ (); // Comportamento padrão
	};
}

// Redefinir estado interno; fazemos isso em cada passagem, a fim de oferecer suporte a vários efeitos
$ .fn.cycle.resetState = Function (opta, fx) {
	fx = || fx opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $ .extend ({}, opts.original.cssBefore);
	opts.cssAfter = $ .extend ({}, opts.original.cssAfter);
	opts.animIn = $ .extend ({}, opts.original.animIn);
	opts.animOut = $ .extend ({}, opts.original.animOut);
	opts.fxFn = null;
	$ .each (Opts.original.before, function () {opts.before.push (this);});
	$ .each (Opts.original.after, function () {opts.after.push (this);});

	// Re-init
	var o init = $ .fn.cycle.transitions [fx];
	if ($ .isFunction (init))
		init (. opta $, $ (cont opts.elements), opta);
};

// Este é o principal motor fn, ele lida com a tempos de espera, chamadas de retorno e índice de slide mgmt
função go (els, opta, manual, fwd) {
	. var p = opta $ cont [0], curr = els [opts.currSlide], ao lado = els [opts.nextSlide];

	// Opts.busy é verdade se nós estamos no meio de uma animação
	if (manual de opts.busy && && opts.manualTrump) {
		// Permitem transições manuais solicita trunfo ativas
		debug ('manualTrump em movimento (), parando transição ativa');
		$ (Els) .Stop (true, true);
		opts.busy = 0;
		clearTimeout (p.cycleTimeout);
	}

	// Não começar outra transição à base de tempo limite se houver um ativo
	se (opts.busy) {
		debug ("transição ativa, ignorando novo pedido tx ');
		retorno;
	}


	// Ciclismo parada se temos um pedido de parada excepcional
	if (p.cycleStop! = opts.stopCount || p.cycleTimeout === 0 &&! manual)
		retorno;

	// Verificar para ver se devemos parar de ciclismo com base em opções Autostop
	if (manual do &&! p.cyclePause &&! opts.bounce! &&
		((Opts.autostop && (--opts.countdown <= 0)) ||
		(Opts.nowrap &&! Opts.random && opts.nextSlide <opts.currSlide))) {
		if (opts.end)
			opts.end (opts);
		retorno;
	}

	// Se slideshow está em pausa, apenas a transição em um disparador manual do
	var mudou = false;
	if ((Manual ||! p.cyclePause) && (opts.nextSlide! = opts.currSlide)) {
		mudado = true;
		var fx = opts.fx;
		// Continuar a tentar obter o tamanho slide se não temos ainda
		curr.cycleH = curr.cycleH || $ (curr) .height ();
		curr.cycleW = curr.cycleW || $ (curr) .width ();
		next.cycleH = next.cycleH || $ (ao lado) .height ();
		next.cycleW = next.cycleW || $ (ao lado) .width ();

		// Suporte múltiplos tipos de transição
		se (opts.multiFx) {
			if (FWD && (opts.lastFx === indefinido || ++ opts.lastFx> = opts.fxs.length))
				opts.lastFx = 0;
			else if (! fwd && (opts.lastFx === indefinido || --opts.lastFx <0))
				opts.lastFx opts.fxs.length = - 1;
			fx = opts.fxs [opts.lastFx];
		}

		// One-time substituições fx aplica:. $ ('Div') ciclo (3, 'zoom');
		se (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$ .fn.cycle.resetState (Opta, fx);

		// Executar o antes de retornos de chamada
		if (opts.before.length)
			$ .each (Opts.before, função (i, o) {
				if (p.cycleStop = opts.stopCount!) return;
				o.apply (ao lado, [curr, ao lado, opta, FWD]);
			});

		// Após encenar a callacks
		var depois = function () {
			opts.busy = 0;
			$ .each (Opts.after, função (i, o) {
				if (p.cycleStop = opts.stopCount!) return;
				o.apply (ao lado, [curr, ao lado, opta, FWD]);
			});
			se (p.cycleStop!) {
				// Fila próxima transição
				queueNext ();
			}
		};

		debug ('tx disparando (' + fx + '); currSlide:' + opts.currSlide + '; nextSlide:' + opts.nextSlide);
		
		// Prepare-se para realizar a transição
		opts.busy = 1;
		if (opts.fxFn) // função fx fornecida?
			opts.fxFn (curr, ao lado, opta, depois, fwd, manual opts.fastOnEvent &&);
		else if ($ .isFunction ($. fn.cycle [opts.fx])) // plugins fx?
			$ .fn.cycle [Opts.fx] (curr, ao lado, opta, depois, fwd, manual opts.fastOnEvent &&);
		mais
			$ .fn.cycle.custom (Curr, ao lado, opta, depois, fwd, opts.fastOnEvent && manual);
	}
	else {
		queueNext ();
	}

	if (mudou || opts.nextSlide == opts.currSlide) {
		// Calcula o próximo slide
		var rolo;
		opts.lastSlide = opts.currSlide;
		se (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++ == opts.randomIndex els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort (função (a, b) {return Math () - 0,5;});
			}
			opts.nextSlide = opts.randomMap [opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (== opts.currSlide opts.slideCount - 1)? 0: opts.currSlide + 1;
		}
		else if (opts.backwards) {
			rolo = (opts.nextSlide - 1) <0;
			if (rolo && opts.bounce) {
				opts.backwards = opts.backwards!;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = rolo? (Els.length-1): opts.nextSlide-1;
				opts.currSlide = rolo? 0: opts.nextSlide + 1;
			}
		}
		else {// seqüência
			rolo = (opts.nextSlide + 1) == els.length;
			if (rolo && opts.bounce) {
				opts.backwards = opts.backwards!;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = rolo? 0: opts.nextSlide + 1;
				opts.currSlide = rolo? els.length-1: opts.nextSlide-1;
			}
		}
	}
	if (mudou && opts.pager)
		opts.updateActivePagerLink (opts.pager, opts.currSlide, opts.activePagerClass);
	
	funcionar queueNext () {
		// Palco da próxima transição
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout &&! opts.continuous) {
			ms = getTimeout (els [opts.currSlide], els [opts.nextSlide], opta, fwd);
         if (opts.fx == 'Shuffle')
            ms - = opts.speedOut;
      }
		else if (p.cyclePause && opts.continuous) // mostras contínuas trabalhar fora um após retorno de chamada, não esta lógica temporizador
			ms = 10;
		if (ms> 0)
			p.cycleTimeout = setTimeout (function () {ir (els, opta, 0, opts.backwards!);}, ms);
	}
}

// Invocado depois da transição
$ .fn.cycle.updateActivePagerLink = Function (pager, currSlide, clsName) {
   $ (Pager) .each (function () {
       . $ (This) .children () removeClass (clsName) .eq (currSlide) .addClass (clsName);
   });
};

// Calcular o valor de tempo limite para a transição atual
função getTimeout (curr, ao lado, opta fwd,) {
	se (opts.timeoutFn) {
		// Usuário chamada fornecida calc fn
		var t = opts.timeoutFn.call (curr, curr, ao lado, opta, fwd);
		while (opts.fx = 'none' && (t - opts.speed) <250) // higienizar tempo limite
			t + = opts.speed;
		debug ('tempo limite calculado:' + t + '; velocidade:' + opts.speed);
		if (t! == false)
			retornar t;
	}
	retornar opts.timeout;
}

// Expor próxima função / prev, chamador deve passar no estado
$ .fn.cycle.next = Function () {opta antecipados (opta, 1); };
$ .fn.cycle.prev = Function () {opta antecipados (opta, 0);};

// Slides antecedência para a frente ou para trás
função do avanço (opta, moveForward) {
	var val = moveForward? 1: 1;
	var = els opts.elements;
	var p = opta $ cont [0], timeout = p.cycleTimeout.;
	if (timeout) {
		clearTimeout (tempo de espera);
		p.cycleTimeout = 0;
	}
	if (opts.random && val <0) {
		// Move de volta para a exibição de slides previamente
		opts.randomIndex--;
		se (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else {
		opts.nextSlide opts.currSlide + = Val;
		se (opts.nextSlide <0) {
			if (opts.nowrap) return false;
			opts.nextSlide els.length = - 1;
		}
		else if (opts.nextSlide> = els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // PrevNextClick está obsoleto
	if ($ .isFunction (cb))
		cb (val> 0, opts.nextSlide, els [opts.nextSlide]);
	ir (els, opta, 1, moveForward);
	return false;
}

funcionar buildPager (els, opta) {
	var $ p = $ (opts.pager);
	$ .each (Els, função (i, o) {
		$ .fn.cycle.createPagerAnchor (I, o, p $, els, opta);
	});
	opts.updateActivePagerLink (opts.pager, opts.startingSlide, opts.activePagerClass);
}

$ .fn.cycle.createPagerAnchor = Function (i, el, $ p, els, opta) {
	um var;
	if ($ .isFunction (opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder (i, el);
		debug ('pagerAnchorBuilder (' + i + ', el) retornou:' + a);
	}
	mais
		um = '<a href="#">' + (i + 1) + '</a>';
		
	se um)
		retorno;
	var $ a = $ (a);
	// Não se reparent âncora está no dom
	if ($ a.parents ('body'). length === 0) {
		var arr = [];
		if ($ p.length> 1) {
			P.each $ (function () {
				var $ clone = $ a.clone (true);
				$ (This) .append ($ clone);
				arr.push (clone $ [0]);
			});
			$ A = $ (arr);
		}
		else {
			A.appendTo $ ($ P);
		}
	}

	opts.pagerAnchors opts.pagerAnchors || = [];
	opts.pagerAnchors.push (US $);
	
	var pagerFn = function (e) {
		e.preventDefault ();
		opts.nextSlide = i;
		var p = opta $ cont [0], timeout = p.cycleTimeout.;
		if (timeout) {
			clearTimeout (tempo de espera);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // PagerClick está obsoleto
		if ($ .isFunction (cb))
			cb (opts.nextSlide, els [opts.nextSlide]);
		ir (els, opta, 1, opts.currSlide <i); // Acionar o trans
// Return false; // <== Permitir bolha
	};
	
	se (/mouseenter|mouseover/i.test(opts.pagerEvent)) {
		$ A.hover (pagerFn, function () {/ * não-op * /});
	}
	else {
		$ A.bind (opts.pagerEvent, pagerFn);
	}
	
	if (/^click/.test(opts.pagerEvent!) &&! opts.allowPagerClickBubble)
		$ A.bind ('click.cycle', function () {return false;}); // Suprimir clique
	
	var cont = opta $ cont [0].;
	var pauseFlag = false; // Https://github.com/malsup/cycle/issues/44
	se (opts.pauseOnPagerHover) {
		$ A.hover (
			function () { 
				pauseFlag = true;
				cont.cyclePause ++; 
				triggerPause (cont, verdade, verdade);
			}, Function () { 
				if (pauseFlag)
					cont.cyclePause--; 
				triggerPause (cont, verdade, verdade);
			} 
		);
	}
};

// Ajudante fn para calcular o número de lâminas entre a corrente e a próxima
$ .fn.cycle.hopsFromLast = Function (opta, fwd) {
	lúpulo var, l = opts.lastSlide, c = opts.currSlide;
	if (FWD)
		lúpulo = c> l? c - l: opts.slideCount - l;
	mais
		lúpulo = c <l? l - c: l + opts.slideCount - c;
	retornar lúpulo;
};

// problemas correção ClearType no IE6, definindo uma cor bg explícita
// (Caso contrário slides de texto olhar horrível durante uma transição de fade)
clearTypeFix função ($ lâminas) {
	debug ('aplicação ClearType background-color hack');
	função hex (s) {
		s = parselnt (s, 10) .toString (16);
		retornar s.length <2? '0' + s: s;
	}
	getBg função (e) {
		for (;! e && e.nodeName.toLowerCase () = 'html'; e = e.parentNode) {
			var v = $ .css (e, 'background-color');
			if (v && v.indexOf ('rgb')> = 0) {
				var = v.match rgb (/ \ d + / g);
				retorno '#' + hex (rgb [0]) + hex (rgb [1]) + hex (rgb [2]);
			}
			if (v && v! = 'transparente')
				retornar v;
		}
		retorno '#ffffff';
	}
	Slides.each $ (function () {$ (this) CSS ("background-color ', getBg (this));});
}

// Redefinir adereços comuns antes da próxima transição
$ .fn.cycle.commonReset = Function (curr, ao lado, opta, w, h, rev) {
	$ (Opts.elements) .não (curr) .hide ();
	if (typeof opts.cssBefore.opacity == 'indefinido')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w! == false && next.cycleW> 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h! == false && next.cycleH> 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$ (Curr) css ('zIndex', opts.slideCount + (rev === verdadeiro 1: 0));
	$ (Ao lado) css ('zIndex', opts.slideCount + (rev === true 0: 1));
};

// O fn real para efectuar uma transição
$ .fn.cycle.custom = Function (curr, ao lado, opta, cb, fwd, speedOverride) {
	var $ l = $ (curr), $ n = $ (ao lado);
	var speedin = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
	$ N.css (opts.cssBefore);
	se (speedOverride) {
		if (typeof speedOverride == 'número')
			speedin = speedOut = speedOverride;
		mais
			speedin = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function () {
		$ N.delay (animInDelay) .animate (opts.animIn, speedin, easeIn, function () {
			cb ();
		});
	};
	$ L.delay (animOutDelay) .animate (opts.animOut, speedOut, easeOut, function () {
		$ L.css (opts.cssAfter);
		se (opts.sync!) 
			fn ();
	});
	if (opts.sync) fn ();
};

// Definições de transição - única desaparecer é definido aqui, bloco de transição define o resto
$ = {.fn.cycle.transitions
	desvanece: function (cont $, $ slides, opta) {
		Slides.not $ (': eq (' + opts.currSlide + ')'). Css ('opacidade', 0);
		opts.before.push (function (curr, ao lado, opta) {
			$ .fn.cycle.commonReset (Curr, ao lado, opta);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn = {opacidade: 1};
		opts.animOut = {opacidade: 0};
		opts.cssBefore = {top: 0, deixou: 0};
	}
};

$ .fn.cycle.ver = Function () {return ver; };

// Substituir estes globalmente se você gosta (eles são todos opcionais)
$ = {.fn.cycle.defaults
    activePagerClass: 'ActiveSlide', // nome da classe usado para o link ativo pager
    depois: nulo, // retorno de chamada de transição (de escopo definido como elemento que foi mostrado): function (currSlideElement, nextSlideElement, opções, forwardFlag)
    allowPagerClickBubble: false, // permite ou impede de eventos clique sobre âncoras de pager de borbulhamento
    animIn: null, // propriedades que definem como o slide anima em
    animInDelay: 0, // permite atraso antes próximas transições de slides em	
    animOut: null, // propriedades que definem como o slide anima fora
    animOutDelay: 0, // permite atraso antes slide atual transições para fora
    aspecto: false, // preservar a relação de aspecto durante o ajuste de redimensionamento, recorte, se necessário (deve ser usada com opção de ajuste)
    autostop: 0, // true para acabar com slideshow após transições X (onde X == contagem de slides)
    autostopCount: 0, // número de transições (opcionalmente utilizadas com autostop para definir X)
    para trás: false, // true para iniciar a apresentação de slides no último slide e mover-se para trás através da pilha
    antes: null, // retorno de chamada de transição (escopo definido como elemento a ser mostrado): function (currSlideElement, nextSlideElement, opções, forwardFlag)
    Centro: null, // definido como verdadeiro para ter ciclo adicionar margem superior / esquerda a cada slide (uso com opções de largura e altura)
    cleartype:. $ support.opacity, // verdade se as correcções ClearType deve ser aplicado (para IE)
    cleartypeNoBg: false, // definida como true para desabilitar fixação cleartype adicional (deixar falsa para forçar configuração de cores de fundo em slides)
    containerResize: 1, // redimensionar recipiente para caber maior de slides
    containerResizeHeight: 0, // redimensionar contentores altura para encaixar o maior slide, mas deixar a dinâmica largura
    contínuo: 0, // true para começar a próxima transição imediatamente após uma corrente completa
    cssAfter: null, // propriedades que definiram o estado do slide após a transição para fora
    cssBefore: null, // propriedades que definem o estado inicial do slide antes da transição em
    atraso: 0, // atraso adicional (em ms) para a primeira transição (dica: pode ser negativo)
    easeIn: null, facilitando para // "em" transição
    easeOut: null, // facilitando para a transição "para fora"
    easing: null, // método para aliviar tanto dentro como fora transições
    final: null, // callback invocado quando termina o slideshow (use com opções Autostop ou NoWrap): function (opções)
    fastOnEvent: 0, // forçar transições rápidas quando acionado manualmente (via pager ou anterior / seguinte); == valor tempo em ms
    caber: 0, // lâminas de força para encaixar recipiente
    fx: 'Fade', // nome de efeito de transição (ou nomes separados por vírgulas, ex: "fade, scrollUp, Shuffle ')
    fxFn: null, // função usada para controlar a transição: function (currSlideElement, nextSlideElement, opções, afterCalback, forwardFlag)
    height: 'auto', // altura do recipiente (se a opção 'Ajuste' é verdade, os slides serão definidos para esta altura também)
    manualTrump: true, faz com que // transição manual para parar uma transição ativa em vez de ser ignorado
    metaAttr: 'ciclo', // atributo de dados que contém os dados de opção para o slideshow
    próximo: null, // elemento, objeto jQuery, jQuery ou selector string para o elemento para usar como gatilho de eventos para o próximo slide
    nowrap: 0, // true para evitar a apresentação de slides a partir de embrulho
    onPagerEvent: null, // fn callback para eventos de pager: function (zeroBasedSlideIndex, slideElement)
    onPrevNextEvent: null, // fn callback para Prev / Next eventos: function (isNext, zeroBasedSlideIndex, slideElement)
    pager: null, // elemento, objeto jQuery, jQuery ou selector string para o elemento para usar como recipiente pager
    pagerAnchorBuilder: null, // callback fn para a construção de links de âncora: function (índice, DOMElement)
    pagerEvent: 'click.cycle', // nome do evento que acciona a navegação pager
    pausar: 0, // true para permitir "fazer uma pausa em foco"
    pauseOnPagerHover: 0, // true para pausar quando pairando sobre ligação pager
    prev: null, // elemento, objeto jQuery, jQuery ou selector string para o elemento para usar como disparador de evento para slide anterior
    prevNextEvent: 'click.cycle', // evento que impulsiona a transição manual para o diapositivo anterior ou seguinte
    aleatória: 0, // verdadeiro para aleatório, falsa para a sequência (não aplicável a embaralhar fx)
    randomizeEffects: 1, // válida quando vários efeitos são utilizados; true para tornar a seqüência de efeito aleatório
    requeueOnImageNotLoaded: true, // requeue o slideshow se qualquer slides de imagens ainda não estão loaded
    requeueTimeout: 250, // ms atrasar para requeue
    rev: 0, // faz com animações a transição no sentido inverso (para efeitos que o suportam, como scrollHorz / scrollVert / aleatória)
    aleatória: null, // coords para animação shuffle, ex: {top: 15, à esquerda: 200}
    skipInitializationCallbacks: false, // definida como true para desativar a primeira antes / depois callback que ocorre antes de qualquer transição
    slideExpr: null, // expressão para a seleção de lâminas (se algo diferente de todas as crianças é exigido)
    slideResize: 1, // largura força de deslizar / altura de tamanho fixo antes de cada transição
    velocidade: 1000, // velocidade da transição (qualquer valor de velocidade fx válido)
    speedin: null, // velocidade da 'em' transição
    speedOut: null, // velocidade da transição "para fora"
    startingSlide: indefinido, índice baseado em zero // do primeiro slide a ser exibido
    sync: 1, // verdade se in / out transições devem ocorrer simultaneamente
    timeout: 4000, // milissegundos entre transições de slides (0 para desativar o avanço automático)
    timeoutFn: nulos, // chamada de retorno para determinar per-slides valor de timeout: function (currSlideElement, nextSlideElement, opções, forwardFlag)
    updateActivePagerLink: null, // callback fn invocado para atualizar o vínculo pager ativa (adiciona / remove estilo activePagerClass)
    width: largura recipiente // nulo (se a opção 'Ajuste' é verdade, os slides serão definidos para esta largura também)
};

}) (JQuery);


/ *!
 * Definições de transição jQuery Cycle Plugin
 * Este script é um plugin para o Ciclo Plugin jQuery
 * Exemplos e documentação em: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Versão: 2.73
 * Dupla licenciado sob as licenças MIT e GPL:
 * Http://www.opensource.org/licenses/mit-license.php
 * Http://www.gnu.org/licenses/gpl.html
 * /
(Function ($) {
"Use strict";

//
// Essas funções definir a inicialização slide e propriedades para o nome
// Transições. Para salvar o tamanho do arquivo sinta-se livre para remover qualquer um desses que você
// Não precisa.
//
$ .fn.cycle.transitions.none = Função (cont $, $ slides, opta) {
	opts.fxFn = function (curr, ao lado, opta, depois) {
		$ (Ao lado) .Show ();
		$ (Curr) .hide ();
		depois ();
	};
};

// Não um cross-fade, fadeout única desaparece o carro superior
$ .fn.cycle.transitions.fadeout = Function (cont $, $ slides, opta) {
	Slides.not $ (': eq (' + opts.currSlide + ')') css. ({Display: 'block', 'opacidade': 1});
	opts.before.push (function (curr, ao lado, opta, w, h, rev) {
		$ (Curr) css ('zIndex', opts.slideCount + (rev == true 1:!? 0));
		$ (Ao lado) CSS (! 'ZIndex', opts.slideCount + (rev == true 0: 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// ScrollUp / Baixo / Esquerda / Direita
$ .fn.cycle.transitions.scrollUp = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push ($ fn.cycle.commonReset.);
	var h = cont.height $ ();
	opts.cssBefore.top = H;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -H;
};
$ .fn.cycle.transitions.scrollDown = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push ($ fn.cycle.commonReset.);
	var h = cont.height $ ();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -H;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = H;
};
$ .fn.cycle.transitions.scrollLeft = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push ($ fn.cycle.commonReset.);
	var w = cont.width $ ();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-W;
};
$ .fn.cycle.transitions.scrollRight = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push ($ fn.cycle.commonReset.);
	var w = cont.width $ ();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$ .fn.cycle.transitions.scrollHorz = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido') largura (.);
	opts.before.push (function (curr, ao lado, opta, fwd) {
		if (opts.rev)
			! FWD = fwd;
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.cssBefore.left = FWD? (Next.cycleW-1): (1-next.cycleW);
		opts.animOut.left = FWD? -curr.cycleW: curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$ .fn.cycle.transitions.scrollVert = Função (cont $, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (function (curr, ao lado, opta, fwd) {
		if (opts.rev)
			! FWD = fwd;
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.cssBefore.top = FWD? (1-next.cycleH): (next.cycleH-1);
		opts.animOut.top = FWD? curr.cycleH: -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// SlideX / Slidey
$ .fn.cycle.transitions.slideX = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ (Opts.elements) .não (curr) .hide ();
		$ .fn.cycle.commonReset (Curr, ao lado, opta, false, true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$ .fn.cycle.transitions.slideY = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ (Opts.elements) .não (curr) .hide ();
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, falso);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// Shuffle
$ .fn.cycle.transitions.shuffle = Função (cont $, $ slides, opta) {
	. var i, w = $ cont.css ('estouro', 'visível') width ();
	$ Slides.css ({left: 0, top: 0});
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdade, verdade, true);
	});
	// Única ajustar a velocidade de uma vez!
	if (! opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // Shuffle tem duas transições
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left: -w, superior: 15};
	opts.els = [];
	for (i = 0; i <$ slides.length; i ++)
		opts.els.push ($ lâminas [i]);

	for (i = 0; i <opts.currSlide; i ++)
		opts.els.push (opts.els.shift ());

	// Fn transição personalizado (gorjeta de chapéu de Benjamin Sterling para este pouco de doçura!)
	opts.fxFn = function (curr, ao lado, opta, cb, fwd) {
		if (opts.rev)
			! FWD = fwd;
		var $ el = FWD? $ (Curr): $ (ao lado);
		$ (Ao lado) CSS (opts.cssBefore);
		contagem var = opts.slideCount;
		$ El.animate (opts.shuffle, opts.speedIn, opts.easeIn, function () {
			var lúpulo = $ .fn.cycle.hopsFromLast (opta, fwd);
			for (var k = 0; k <lúpulo; k ++) {
				if (FWD)
					opts.els.push (opts.els.shift ());
				mais
					opts.els.unshift (opts.els.pop ());
			}
			if (FWD) {
				for (var i = 0, len = opts.els.length; i <len; i ++)
					$ (opts.els [i]) css ('z-index ", len-i + contagem.);
			}
			else {
				var z = $ (curr) CSS ('z-index');
				$ El.css ('z-index', parseInt (z, 10) + 1 + count);
			}
			$ El.animate ({left: 0, top: 0}, opts.speedOut, opts.easeOut, function () {
				$ (FWD esta: curr?) .hide ();
				if (cb) cb ();
			});
		});
	};
	$ .extend (Opts.cssBefore, {display: 'block', a opacidade: 1, top: 0, que restam: 0});
};

// TurnUp / Baixo / Esquerda / Direita
$ .fn.cycle.transitions.turnUp = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, falso);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$ .fn.cycle.transitions.turnDown = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, falso);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$ .fn.cycle.transitions.turnLeft = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, false, true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$ .fn.cycle.transitions.turnRight = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, false, true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$ .extend (Opts.cssBefore, {top: 0, que restam: 0, width: 0});
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// Zoom
$ .fn.cycle.transitions.zoom = Function (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, falso, falso, true);
		opts.cssBefore.top = next.cycleH / 2;
		opts.cssBefore.left = next.cycleW / 2;
		$ .extend (Opts.animIn, {top: 0, esquerda: 0, largura: next.cycleW, altura: next.cycleH});
		$ .extend (Opts.animOut, {width: 0, height: 0, top: curr.cycleH / 2, para a esquerda: curr.cycleW / 2});
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// FadeZoom
$ .fn.cycle.transitions.fadeZoom = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, false, false);
		opts.cssBefore.left = next.cycleW / 2;
		opts.cssBefore.top = next.cycleH / 2;
		$ .extend (Opts.animIn, {top: 0, esquerda: 0, largura: next.cycleW, altura: next.cycleH});
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// BLINDX
$ .fn.cycle.transitions.blindX = Função (cont $, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'escondido') width ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// BlindY
$ .fn.cycle.transitions.blindY = Função (cont $, $ slides, opta) {
	. var h = $ cont.css ('estouro', 'escondido') Altura ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssBefore.top = H;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = H;
};
// BlindZ
$ .fn.cycle.transitions.blindZ = Função (cont $, $ slides, opta) {
	. var h = $ cont.css ('estouro', 'escondido') Altura ();
	var w = cont.width $ ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssBefore.top = H;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = H;
	opts.animOut.left = w;
};

// GrowX - crescer horizontalmente a partir centrado 0 width
$ .fn.cycle.transitions.growX = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, false, true);
		opts.cssBefore.left = this.cycleW / 2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// GrowY - crescer verticalmente a partir centrado 0 altura
$ .fn.cycle.transitions.growY = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, falso);
		opts.cssBefore.top = this.cycleH / 2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// CurtainX - aperto em ambas as bordas horizontal
$ .fn.cycle.transitions.curtainX = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, falso, verdade, verdade);
		opts.cssBefore.left = next.cycleW / 2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW / 2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// CurtainY - aperto em ambas as bordas verticalmente
$ .fn.cycle.transitions.curtainY = Função (cont $, $ slides, opta) {
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, falso, true);
		opts.cssBefore.top = next.cycleH / 2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH / 2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// Cover - slides curr cobertos pela próximo slide
$ .fn.cycle.transitions.cover = Function (cont $, $ slides, opta) {
	var d = opts.direction || 'esquerda';
	. var w = $ cont.css ('estouro', 'escondido') width ();
	var h = cont.height $ ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta);
		opts.cssAfter.display = '';
		if (d == 'direito')
			opts.cssBefore.left = w;
		else if (d == 'up')
			opts.cssBefore.top = H;
		else if (d == 'down')
			opts.cssBefore.top = -H;
		mais
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// Uncover - curr corrediça move off próximo slide
$ .fn.cycle.transitions.uncover = Function (cont $, $ slides, opta) {
	var d = opts.direction || 'esquerda';
	. var w = $ cont.css ('estouro', 'escondido') width ();
	var h = cont.height $ ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdade, verdade, true);
		if (d == 'direito')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -H;
		else if (d == 'down')
			opts.animOut.top = H;
		mais
			opts.animOut.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// Toss - mover cursor superior e desaparecer
$ .fn.cycle.transitions.toss = Função (cont $, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'visível') width ();
	var h = cont.height $ ();
	opts.before.push (function (curr, ao lado, opta) {
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdade, verdade, true);
		// Fornecer as configurações de lance padrão se animOut não fornecidas
		if (! opts.animOut.left &&! opts.animOut.top)
			$ .extend (Opts.animOut, {left: w * 2, top: -h / 2, opacidade: 0});
		mais
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// Limpe - animação clipe
$ .fn.cycle.transitions.wipe = Função (cont $, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'escondido') width ();
	var h = cont.height $ ();
	opts.cssBefore = opts.cssBefore || {};
	var clipe;
	se (opts.clip) {
		se (/l2r/.test(opts.clip))
			clipe = 'rect (0px 0px "+ h +" px 0px)';
		else if (/r2l/.test(opts.clip))
			clipe = 'rect (0px "+ w +' px '+ h +' px '+ w +' px) ';
		else if (/t2b/.test(opts.clip))
			clipe = 'rect (0px "+ w +" px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clipe = 'rect (' + h + 'px' + w + 'px' + h + "px 0px) ';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt (h / 2,10);
			var esquerda = parseInt (w / 2,10);
			clipe = 'rect (' + top + 'px' + esquerda + 'px' + top + 'px' + esquerda + 'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || || clipe 'rect (0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match (/ (\ d +) / g);
	var t = parselnt (d [0], 10), R = parselnt (d [1], 10), b = parselnt (d [2], 10), l = parselnt (d [3], 10);

	opts.before.push (function (curr, ao lado, opta) {
		if (curr == seguinte) retorno;
		var $ curr = $ (curr), $ next = $ (ao lado);
		$ .fn.cycle.commonReset (Curr, ao lado, opta, verdadeiro, verdadeiro, falso);
		opts.cssAfter.display = 'block';

		var passo = 1, count = parseInt ((opts.speedIn / 13), 10) - 1;
		(Função f () {
			var tt t =? t - parseInt (passo * (t / count), 10): 0;
			var ll = l? l - parseInt (passo * (l / count), 10): 0;
			var bb = b <h? b + parseInt (passo * ((hb) / contagem || 1), 10): h;
			var rr = r <w? r + parseInt (passo * ((wr) / contagem || 1), 10): w;
			$ Next.css ({clipe: 'rect (' + tt + 'px' + rr + 'px' + bb + 'px' ll + + 'px) "});
			(Passo ++ <= count)? setTimeout (f, 13): $ curr.css ('display', 'none');
		}) ();
	});
	$ .extend (Opts.cssBefore, {display: 'block', a opacidade: 1, top: 0, que restam: 0});
	opts.animIn = {left: 0};
	opts.animOut = {left: 0};
};

}) (JQuery);