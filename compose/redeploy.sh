#!/bin/bash
cd ..
ng build --prod
cp dist/cartografia/index.html dist/cartografia/Inicio.html
cd compose
./stop.sh
./runprod.sh

