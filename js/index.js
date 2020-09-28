
/* Variables globales */
var $main = $("#main");
var $carContainer = $("#mayor-menu");
// var $btnEnviar = $("#btnEnviar");
//var $cardContainer = $("#servi-menu");
var	counter = 1;
var opt = "";

$(document).ready(function () {
	menuClick();
	// menuMobClick();
	// menuColor();
	$main.load("pages/start.html?nocache="+getRandomValue(), loadSlider);
	$main.fadeIn("slow");
	// loadFancybox();
	setTimeout(loadScroll, 1000);
});

hoverCard = function() {
	$("#mayor-menu .card").hover(
		function() {
			$(this).removeClass("border-success");
			$(this).addClass("border-primary");
			$(this).find(".card-header").removeClass("bg-success");
			$(this).find(".card-header").addClass("bg-primary");
		},
		function() {
			$(this).removeClass("border-primary");
			$(this).addClass("border-success");
			$(this).find(".card-header").removeClass("bg-primary");
			$(this).find(".card-header").addClass("bg-success");
		}
	);
}

menuClick = function () {
	$("#navbarMain li a, #navbarFoot li a").click(function (e) {
		opt = $(this).attr("id"); // Get "id" attribute of "li" tag

		// Active clicked element
		$("#navbarMain li").removeClass("active");
		$(this).parent(".nav-item").addClass("active");
		// console.log($(this).parent(".nav-item"))
		$main.empty();
		$main.hide();
		$main.fadeIn(function() {
			$("div#mayor-menu div.card.border-success").click(function(e) {
				// console.log($(this).attr("id"));
				opt = $(this).attr("id");
				optionToExecute(opt);
			});	
		});

		optionToExecute(opt);
	});
}

clickContact = function() {
	$("#btnEnviar").click(function(e) {
		$("#mensajeExito").addClass("d-none");
		$("#mensajeError").addClass("d-none");
		$(this).prop("disabled", true);
		if ($("#name").val() !== "" && $("#email").val() !== "" && $("#message").val() !== "") {
			url = "pages/contact_send_mail.php";
			parameters = {
				"name" : $("#name").val(),
				"email" : $("#email").val(),
				"message" : $("#message").val()
			}
			// console.log(parameters);
			$.post(url, parameters, function(response) {
//console.log(response);
				result = JSON.parse(response)
				// console.log(result);
				if (result.success) {
					$("#mensajeExito").html(result.message);
					$("#mensajeExito").removeClass("d-none");
				} else {
					$("#mensajeError").html(result.message);
					$("#mensajeError").removeClass("d-none");
				}
				$("#btnEnviar").prop("disabled", false);
			});
		}
	});
}

optionToExecute = function(opt) {
	// console.log(opt)
	// Option to run
	switch (opt) {
		case "start":
			$main.load("pages/start.html?nocache="+getRandomValue(), loadSlider);
			break;

		case "mayoralty":
		case "mayoralty2":
			$main.load("pages/mayoralty.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "government":
			$main.load("pages/mayoralty/government.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "history":
			$main.load("pages/mayoralty/history.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "tourism":
			$main.load("pages/mayoralty/tourism.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "citizen":
			$main.load("pages/mayoralty/citizen.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "register":
			$main.load("pages/services/register.html?nocache="+getRandomValue(), hoverCard);
		break;

		//services menu	
		case "services":
		case "services2":
			$main.load("pages/services.html?nocache="+getRandomValue(), hoverCard);
		break;

		case "registre":
			$main.load("pages/services/registre.html?nocache="+getRandomValue(), hoverCard);
			break;
		case "catastre":
			$main.load("pages/services/catastre.html?nocache="+getRandomValue(), hoverCard);
			break;
		case "education":
			$main.load("pages/services/education.html?nocache="+getRandomValue(), hoverCard);
			break;

		case "public":
			$main.load("pages/services/public.html?nocache="+getRandomValue(), hoverCard);
			break;

		// Portal Transparencia menu	
		case "portal":
		case "portal2":
			$main.load("pages/transparency.html?nocache="+getRandomValue(), hoverCard);
		break;

		case "information":
			$main.load("pages/transparency/information.html?nocache="+getRandomValue(), hoverCard);
		break;

		case "laws":
			$main.load("pages/transparency/laws.html?nocache="+getRandomValue(), hoverCard);
		break;

		case "budgets":
			$main.load("pages/transparency/budget.html?nocache="+getRandomValue(), hoverCard);
		break;

		case "participation":
			$main.load("pages/transparency/participation.html?nocache="+getRandomValue(), hoverCard);
		break;

		//Noticias

		case "news":
		case "news2":
		$main.load("pages/news.html?nocache="+getRandomValue(), hoverCard);
		break;

		//Projects

		case "projects":
		case "projects2":
		$main.load("pages/projects.html?nocache="+getRandomValue(), hoverCard);
		break;
		
			//Projects

		case "partidas":
		case "partidas2":
		$main.load("pages/partidas.html?nocache="+getRandomValue(), hoverCard);
		break;
		//Contacto

		case "contact":
		case "contact2":
		$main.load("pages/contact.html?nocache="+getRandomValue(), clickContact);
		break;

		default:
			console.log("Option isn't controllable: " + opt);
			break;

		
	}
}


loadSlider = function () {
	$('#camera_wrap_1').camera({
		hover: false,
		barPosition: 'top',
		height: '600px',
		loader: 'bar',
		loaderColor: '#4CAF50',
		loaderBgColor: '#FFFFFF',
		loaderOpacity: 0.8,
		pagination: false,
		time: 6000,
		transPeriod: 2000,
		easing: 'easeInOutBounce',
		fx: 'stampede,mosaicRandom,blindCurtainBottomLeft,blindCurtainBottomRight,scrollHorz'
	});
}

loadFancybox = function () {
	$(".fancybox").fancybox({
		openEffect	: "elastic",
		closeEffect	: "elastic",
		helpers : {
    		title : null
    	}
	});
}

loadScroll = function () {
	$(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $("#btnOnTop").fadeIn();
        } else {
            $("#btnOnTop").fadeOut();
        }
    });

    $("#btnOnTop").click(function(){
        $("html, body").animate({ "scrollTop": "0" }, 900);
        return false;
    });
}

getRandomValue = function () {
	return Math.random()*100000000000000000;
}

/////////////////////////////////////////////////////////////////////////

//Clik menu servicios 



