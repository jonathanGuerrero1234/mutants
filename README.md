# MERCADOLIBRE X-MAN PROJECT

[![xmen](https://assets.entrepreneur.com/content/3x2/2000/20160520193328-xmen.jpeg?width=700&crop=2:1)](https://www.terraform.io)


## Prerequisitos

Necesitas tener instaldo en el computador

[![node](https://img.shields.io/badge/node-v12.X-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v6.13.X-red.svg)](https://www.npmjs.com/)
[![typescript](https://img.shields.io/npm/types/typescript)](https://www.typescriptlang.org/)
[![terraform](https://img.shields.io/badge/terraform%20-%235835CC.svg?&style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io)

## Variables de Entorno
El proyecto se realizo usando Amazon Web Services, para crear la infraestructura se uso terraform. Para la instalacion es necesario generar desde aws las claves de acceso, adjunto la documentación oficial desde el siguiente enlace [aws](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html).

Luego de tener las claves de acceso es necesario generar a siguientes variables de entorno.

```shell script
export AWS_ACCESS_KEY_ID="123456"
export AWS_SECRET_ACCESS_KEY="XXXXXX"
```

## Installation
## Mac o linux
Una vez clonado el repositorio dentro de la carpeta mutants/ existe un archivo install.sh, este archivo 
instala dependenias de las dos lambdas y posteriormente ejecuta terraform, al final por la consola debe aparecer la confirmacion para aplicar los cambios en aws,  se debe escribir yes y enter en la consola.
```sh
$ sh install.sh
```
## Ejecucion
Dentro del repositorio hay una carpeta con el nombre de postman, dentro de esta caperta hay un archivo en formato .json el cual contiene la informacion de los endpoints que ya se encuentran desplegados y listos para usar. se debe importar ese json en postman y empezar a jugar con las Apis!!   :)

## Cobertura
Para garantizar la covertura de pruebas unitarias se uso SonarQube.
Para ver la covertura de cada lambda se debe ejecutar los siguientes scripts
```shell script
npm run test
npm run coverage
sonar-scanner
```