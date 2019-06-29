import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
	
	public ldr: number;
	public temperatura: number;
	public humedad: number;
	public angX: number;
	public angY: number;
	public ultimaact: string;
	
  constructor(public api: RestApiService) {
	  this.empezarEjecucion();
  }
  
  empezarEjecucion(){
	  var _this = this;
	  console.log('Solicitando datos de forma automatica');
	  //hacemos una peticion primera al cargar la pagina
	  _this.api.obtenerDatosSensor().subscribe(data => {
			console.log(data);
			//vamos a poner los datos en las variables
			//y con el model se actualizan solas
			if(data!=undefined && data!=null && data.feeds!=undefined && data.feeds!=null && data.feeds.length > 0){
				_this.ldr = data.feeds[0].field1;
				_this.temperatura = data.feeds[0].field2;
				_this.humedad = data.feeds[0].field3;
				_this.angX = data.feeds[0].field4;
				_this.angY = data.feeds[0].field5;
				_this.ultimaact = data.feeds[0].created_at;
			}
			console.log('Fin de solicitud automatica con exito');
	  }, err => {
			console.log(err);
			console.log('Fin de solicitud automatica con error');
	  });
	  //programamos las siguientes
	  setInterval(function(){
		console.log('Solicitando datos de forma automatica');
		_this.api.obtenerDatosSensor().subscribe(data => {
			console.log(data);
			//vamos a poner los datos en las variables
			//y con el model se actualizan solas
			if(data!=undefined && data!=null && data.feeds!=undefined && data.feeds!=null && data.feeds.length > 0){
				_this.ldr = data.feeds[0].field1;
				_this.temperatura = data.feeds[0].field2;
				_this.humedad = data.feeds[0].field3;
				_this.angX = data.feeds[0].field4;
				_this.angY = data.feeds[0].field5;
				_this.ultimaact = data.feeds[0].created_at;
			}
			console.log('Fin de solicitud automatica con exito');
	  }, err => {
			console.log(err);
			console.log('Fin de solicitud automatica con error');
	  });	
	  },60000);
	  
  }
  
  obtenerdatos(event) {
    console.log('Pidiendo datos manualmente');
	this.pedirDatosURL(event);
  }
  
  pedirDatosURL(event){ 
	  this.api.obtenerDatosSensor().subscribe(data => {
			console.log(data);
			//vamos a poner los datos en las variables
			//y con el model se actualizan solas
			if(data!=undefined && data!=null && data.feeds!=undefined && data.feeds!=null && data.feeds.length > 0){
				this.ldr = data.feeds[0].field1;
				this.temperatura = data.feeds[0].field2;
				this.humedad = data.feeds[0].field3;
				this.angX = data.feeds[0].field4;
				this.angY = data.feeds[0].field5;
				this.ultimaact = data.feeds[0].created_at;
			}
			event.target.complete(); 
			
			console.log('Finalizacion  manual de datos exitosa');
	  }, err => {
			console.log(err);
			event.target.complete(); 
			console.log('Finalizacion manual de datos con error');
	  });
	  
  }

}
