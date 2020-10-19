import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';
import { AlertsService } from '../../general/services/alerts.service';
import { FilesService } from '../../general/services/files.service';
import { error } from 'protractor';

@Component({
	selector: 'app-documentos',
	templateUrl: './documentos.component.html',
	styleUrls: ['./documentos.component.scss']
})
	export class DocumentosComponent implements OnInit {
	cargada = false;
	disabledDist = true;
	saveDisabled = true;
	arcName: string;
	info: any;
	loading = true;
	nombreArchivo = '';
	textalert: string;
	files: any;
	token: any ;
	claveEntNom: string;
	numDistrito: string;
	opcionSeleccionado = '0';
	distSeleccionado = '0';
	verSeleccion = '';
	verDistrito = '';
	private base64textString = '';
	username = '';
	pass = '';
	titulo = 'Agrega un archivo csv';
	distritosArr: any;

	constructor(private menu: MenuService, private alert: AlertsService, private fileSrv: FilesService) {
		this.menu.getinfoMx().subscribe(info => this.info = info );
		this.loading = false;
	}
	
	ngOnInit() { }

	obtenerArchivo(event) {
		this.files = event.target.files;
		this.arcName = event.srcElement.files[0].name;
		if (this.arcName !== '') {
			this.cargada = true;
			this.textalert =  'Se cargo el archivo: ' + this.arcName;
		}
	}

	handleFileSelect() {
		const files = this.files;
		const file = files[0];
		if (files && file) {
			const reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	_handleReaderLoaded(readerEvt) {
		const binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
		this.fileSrv.postCSV(this.nombreArchivo, this.base64textString).subscribe(() => {
			this.loading = false;
			this.success().finally(() => {
	 				this.cargada = false;
	 				this.disabledDist = true;
	 				this.opcionSeleccionado = '0';
	 				this.distSeleccionado = '0';
	 				this.verSeleccion = '';
	 				this.verDistrito = '';
	 				this.saveDisabled = true;
			});
		}, error=> {
			this.loading = false;
			this.error().finally(() => {
				this.cargada = false;
				this.disabledDist = true;
				this.opcionSeleccionado = '0';
				this.distSeleccionado = '0';
				this.verSeleccion = '';
				this.verDistrito = '';
				this.saveDisabled = true;
			});
		});
	}

	clicked() {
		this.loading = true;
			this.handleFileSelect();
	}

	estadoSelected() {
		this.verSeleccion = this.opcionSeleccionado;
		this.info.filter(estado => {
			if (estado.nombre === this.opcionSeleccionado ) {
				this.claveEntNom = estado.clave_entidad;
			this.distritosArr = estado.distritos;
			this.disabledDist = false;
			}
		});
	}

	capturarNombre() {
		this.verDistrito = this.distSeleccionado;
		if (this.verDistrito !== '') {
			this.saveDisabled = false;
		}
		if (this.verDistrito.length === 2) {
			this.numDistrito = '0' + this.verDistrito;
		} else {
			this.numDistrito = '00' + this.verDistrito;
		}
		this.nombreArchivo = this.claveEntNom + this.numDistrito + '.csv';
	}

async success() { this.alert.showSaveSuccess(); }
async error() { this.alert.showError(); }

}
