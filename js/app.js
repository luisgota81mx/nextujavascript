
var cal = {

	disp: document.getElementById("display"),
	valordisp: "0",
	operacion: "",
	valorUno: 0,
	valorDos: 0,
	valorFin: 0,
	resultado: 0,
	bIgual: false,

	init: (function(){
		this.cambiarTamBotones(".tecla");
		this.operaciones();

	}),


	cambiarTamBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.reduceBoton;
			x[i].onmouseleave  = this.regresaBoton;
		};
	},

	reduceBoton: function(event){
		cal.creduceBoton(event.target);
	},

	regresaBoton: function(event){
		cal.cregresaBoton(event.target);
	},



	creduceBoton: function(elemento){
		var x = elemento.id;
		if (x=="0" || x=="1" || x=="2" || x=="3" || x=="punto" || x=="igual" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21.5%";
		elemento.style.height = "62px";
		}
	},

	cregresaBoton: function(elemento){
		var x = elemento.id;
		if (x=="0" || x=="1" || x=="2" || x=="3" || x=="punto" || x=="igual" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},


	borrardisp: function(){

	    this.valordisp = "0";
		this.operacion = "";
		this.valorUno = 0;
		this.valorDos = 0;
		this.resultado = 0;
		this.Operación = "";
		this.bIgual = false;
		this.valorFin = 0;
		this.updatedisp();
	},

	cambiarSigno: function(){
		if (this.valordisp !="0") {
			var aux;
			if (this.valordisp.charAt(0)=="-") {
				aux = this.valordisp.slice(1);
			}	else {
				aux = "-" + this.valordisp;
			}
		this.valordisp = "";
		this.valordisp = aux;
		this.updatedisp();
		}
	},

	ingresoDecimal: function(){
		if (this.valordisp.indexOf(".")== -1) {
			if (this.valordisp == ""){
				this.valordisp = this.valordisp + "0.";
			} else {
				this.valordisp = this.valordisp + ".";
			}
			this.updatedisp();
		}
	},

	selNumero: function(valor){
		if (this.valordisp.length < 8) {

			if (this.valordisp=="0") {
				this.valordisp = "";
				this.valordisp = this.valordisp + valor;
			} else {
				this.valordisp = this.valordisp + valor;
			}
		this.updatedisp();
		}
	},

	selOperacion: function(oper){
		this.valorUno = parseFloat(this.valordisp);
		this.valordisp = "";
		this.operacion = oper;
		this.bIgual = false;
		this.updatedisp();
	},

	verResultado: function(){

		if(!this.bIgual){
			this.valorDos = parseFloat(this.valordisp);
			this.valorFin = this.valorDos;
			this.ejeOperacion(this.valorUno, this.valorDos, this.operacion);

		} else {
			this.ejeOperacion(this.valorUno, this.valorFin, this.operacion);
		}

		this.valorUno = this.resultado;
		this.valordisp = "";

		if (this.resultado.toString().length < 9){
			this.valordisp = this.resultado.toString();
		} else {
			this.valordisp = this.resultado.toString().slice(0,8) + "...";
		}

		this.bIgual = true;
		this.updatedisp();

	},
  operaciones: function(){
    document.getElementById("0").addEventListener("click", function() {cal.selNumero("0");});
    document.getElementById("1").addEventListener("click", function() {cal.selNumero("1");});
    document.getElementById("2").addEventListener("click", function() {cal.selNumero("2");});
    document.getElementById("3").addEventListener("click", function() {cal.selNumero("3");});
    document.getElementById("4").addEventListener("click", function() {cal.selNumero("4");});
    document.getElementById("5").addEventListener("click", function() {cal.selNumero("5");});
    document.getElementById("6").addEventListener("click", function() {cal.selNumero("6");});
    document.getElementById("7").addEventListener("click", function() {cal.selNumero("7");});
    document.getElementById("8").addEventListener("click", function() {cal.selNumero("8");});
    document.getElementById("9").addEventListener("click", function() {cal.selNumero("9");});
    document.getElementById("on").addEventListener("click", function() {cal.borrardisp();});
    document.getElementById("sign").addEventListener("click", function() {cal.cambiarSigno();});
    document.getElementById("punto").addEventListener("click", function() {cal.ingresoDecimal();});
    document.getElementById("igual").addEventListener("click", function() {cal.verResultado();});
    document.getElementById("raiz").addEventListener("click", function() {cal.selOperacion("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {cal.selOperacion("/");});
    document.getElementById("por").addEventListener("click", function() {cal.selOperacion("*");});
    document.getElementById("menos").addEventListener("click", function() {cal.selOperacion("-");});
    document.getElementById("mas").addEventListener("click", function() {cal.selOperacion("+");});
  },

	ejeOperacion: function(valorUno, valorDos, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valorUno + valorDos);
			break;
			case "-":
				this.resultado = eval(valorUno - valorDos);
			break;
			case "*":
				this.resultado = eval(valorUno * valorDos);
			break;
			case "/":
				this.resultado = eval(valorUno / valorDos);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valorUno));
		}
	},

	updatedisp: function(){
		this.disp.innerHTML = this.valordisp;
	}

};


cal.init();
