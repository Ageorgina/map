clave_estado = estado a 3 caracteres. 
        Ejemplo:  COA = COAHUILA.
clave_distrito = numero de distrito a 3 digitos.
        Ejemplo:  008 = DISTRITO 8.
clave_partido =  siglas del partido a 3 caracteres.
        Ejemplo: PAN, PRI,MOR, MOC.

# REQUERIMIENTOS DE LOS CSV 
-- DEBEN ESTAR CON FORMATO UTF-8.
-- NO DEBEN INCLUIR SALTOS DE LINEAS.
-- PARA DIVIDIR LA INFORMACION DEL MISMO CAMPO SE DIVIDEN CON UN '/'.
-- SIN COMILLAS DOBLES O SIMPLES.

# La estructura que tiene en la carpeta data es la misma que se crea en el servidor.

# ARCHIVOS EN EL SERVIDOR 
V2.6 se incluyeron los archivos de estados  /data/js/DATA_MX.js  que contiene los estados y su gentilicio
V2.6 se incluyeron los archivos INFO_DIS008.js, INFO_DIS009.js, INFO_DIS010.js, INFO_DIS014.js, INFO_DIS015.js,
INFO_DIS016.js en la ruta /data/js/COA/  que son los archivos que obtenemos (get) con la información del lado derecho de la pantalla distritos
*** Cada que se suba un archivo se creará un documento con la siguiente nomenclatura INFO_DIS<clave_distrito>.js dentro de la carpeta de su estado en abreviacion a 3 caracteres.
V2.6 Para las pantallas agregar_info_estados y agregar_info_distritos se creo la siguiente nomenclatura
** <clave_estado>_INFO.js --> el archivo contiene la informacion que creamos para pintar la información de la pantalla del mapa de la republica.
** <clave_estado>_<clave_distrito>_INFO.js --> el archivocontiene la informacion que creamos para pintar la información de la pantalla del mapa de distrito.

# LOS ARCHIVOS JSON TIENEN LA INFORMACION PARA PINTAR LOS MAPAS
Se encuentran dentro de una carpeta json
divididas por estado con abreviacion a 3 digitos
dentro dos carpetas: 
*la primera carpeta distritos 
** con la siguiente nomenclatura <clave_estado>_DIS_DATA.json --> Contiene los distritos en los que esta dividido el estado
** con la siguiente nomenclatura <clave_estado>_DIS.json --> Contiene las coordenadas de cada distrito
*la segunda carpeta secciones 
** con la siguiente nomenclatura <clave_estado>_DIS<clave_distrito>_DATA.json --> Contiene las secciones que se pintaran en el mapa
** con la siguiente nomenclatura <clave_estado>_DIS<clave_distrito>_SEC.json --> Contiene las coordenadas de cada seccion

# LOS ARCHIVOS CSV TIENEN LA INFORMACION DE CADA SECCION
Dentro de la carpeta csv
** con la siguiente nomenclatura <clave_estado>_DIS<clave_distrito>.csv --> Contiene la información de la pantalla secciones

# LOS USUARIOS QUE SE CREEN DEBEN SEGUIR LA SIGUIENTE NOMENCLATURA
** <clave_estado><clave_distrito><clave_partido> -->Ejemplo = COA008PAN

# EN LA CARPETA JS INFO_MAPA_MX
V2.6 SE CREO EL ARCHIVO COA_INFO.js --> Contiene la información del lado derecho de la  pantalla home.
** con la siguiente nomenclatura <clave_estado>_INFO.json
V2.7 Los archivos que se muestran en la pantalla de inicio se agregan en /data/js/INFO_MAPA_MX/
 # EN LA CARPETA JS <estado a 3 caracteres>
 V2.6 SE CREO EL ARCHIVO COA_DIS<clave_distrito>_PARTIDOS.js --> Contiene la información de los partidos en la pantalla partidos.

# SE CREO LA PANTALLA 404 para cuando no existe informacion de partidos
