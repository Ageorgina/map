# REQUERIMIENTOS DE LOS CSV 
DEBEN ESTAR CON FORMATO UTF-8
NO DEBEN INCLUIR SALTOS DE LINEAS
PARA DIVIDIR LA INFORMACION DEL MISMO CAMPO SE DIVIDEN CON UN '/'

# La estructura que tiene en la carpeta data es la misma que se crea en el servidor.

# ARCHIVOS EN EL SERVIDOR 
V2.6 se incluyeron los archivos de estados  /data/js/DATA_MX.js  que contiene los estados y su gentilicio
V2.6 se incluyeron los archivos INFO_DIS008.js, INFO_DIS009.js, INFO_DIS010.js, INFO_DIS014.js, INFO_DIS015.js,
INFO_DIS016.js en la ruta /data/js/COA/  que son los archivos con la información del lado derecho de la pantalla distritos
*** Cada que se suba un archivo se creará un documento con la siguiente nomenclatura INFO_DIS<numero de distrito a 3 digitos>.js dentro de la carpeta de su estado en abreviacion a 3 caracteres.

# LOS ARCHIVOS JSON TIENEN LA INFORMACION PARA PINTAR LOS MAPAS
Se encuentran dentro de una carpeta json
divididas por estado con abreviacion a 3 digitos
dentro dos carpetas: 
*la primera carpeta distritos 
** con la siguiente nomenclatura <estado a 3 caracteres>_DIS_DATA.json --> Contiene los distritos en los que esta dividido el estado
** con la siguiente nomenclatura <estado a 3 caracteres>_DIS.json --> Contiene las coordenadas de cada distrito
*la segunda carpeta secciones 
** con la siguiente nomenclatura <estado a 3 caracteres>_DIS<numero de distrito a 3 digitos>_DATA.json --> Contiene las secciones que se pintaran en el mapa
** con la siguiente nomenclatura <estado a 3 caracteres>_DIS<numero de distrito a 3 digitos>_SEC.json --> Contiene las coordenadas de cada seccion

# LOS ARCHIVOS CVS TIENEN LA INFORMACION DE CADA SECCION
Dentro de la carpeta cvs 
** con la siguiente nomenclatura <estado a 3 caracteres>_DIS<numero de distrito a 3 digitos>.cvs --> Contiene la información de la sección

# LOS USUARIOS  SIGUEN LA SIGUIENTE NOMENCLATURA
** con la siguiente nomenclatura <estado a 3 caracteres><numero de distrito a 3 digitos><partido del que se obtendra la informacion>

# EN LA CARPETA JS INFO_MAPA_MX
V2.6 SE CREO EL ARCHIVO COA_INFO.js --> Contiene la información del lado derecho del mapa de la republica.
** con la siguiente nomenclatura <estado a 3 caracteres>_INFO.json
