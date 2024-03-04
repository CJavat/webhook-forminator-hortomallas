<p align="center">
  <a href="https://github.com/CJavat" target="blank"><img src="https://nodejs.org/static/images/logo.svg" width="400" alt="Node Logo" /></a>
</p>

# Send Email

## Arrancar Aplicación (DEV)
1. Instalar dependencias del proyecto con ```npm install```.

2. Arrancar el servidor en modo desarrollo ```npm run dev```.

3. Arrancar el servicio de __NGROK__ para crear el subdominio.

4. La IP pública que te da __NGROK__ se pone en donde requieren el link para el __WebHook__.

## Hacer Pruebas En Postman (DEV)
1. Poner el endpoint configurado.
2. Enviar los datos configurados en el formulario, en formato ```raw > json```.
3. En el ```HEADERS``` enviar ```User-Agent: WordPress/6.4.3; https://www.hortomallas.com ForminatorWebhook/1.0```.
4. Debe configurarse dependiendo de como entregué el header el forminator en tu página.


## Configuración de NodeMailer
1. Configurar variables de entorno de email
```
  MAILER_HOST=smt.example.com
  MAILER_PORT=44412
  MAILER_SERVICE=example
  MAILER_EMAIL=email@example.com
  MAILER_PASSWORD=123456
  MAILER_NAME_EMAIL=NombreDelHost
```

### En caso de usar Gmail como el proveedor de servicios:
1. Las SECRET_KEY sacarlas de [aquí](https://myaccount.google.com/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4MGnVRbY29WMknX71S3z0rFI1fso65mxzgPLf-9Jrdn8eEcsRmZzAi2WVnw7o6iE-usP9ci6_oWjtSqk4L5yuyu9RfCj0wjRJznAhZDu_79XRLjVYQ).
2. [Explicación de contraseña de aplicaciones](https://support.google.com/accounts/answer/185833?hl=es-419)


## Como crear más webhooks
1. Crear carpeta con nombre del formulario/webook en la carpeta presentation.

2. Dentro de esa carpeta se crea el controller.ts

3. Crear un ```servicio.service.ts``` con el __mismo nombre__ de la carpeta en la carpeta de service.

4. De ser necesario crear una interfaz de ese webook en la carpeta de ```interfaces```

5. Crear un método privado en el ```servicio.service.ts```, ahí agregar el htmlTemplate.

6. Agregar el archivo estático en el ```service.ts``` del proyecto, en el ```htmlBody``` en caso de querer hacer las pruebas antes de pasar todo el template al service.

7. En el ```email.service.ts``` configurar en días (número entero) cuanto tiempo va a demorar en envíar el correo. Ejemplo:
```
  setTimeout( async () => {

    const sentEmail = await this.transporter.sendMail({
      from: 'multimedia@hortomallas.com',
      to,
      subject,
      html: htmlBody,
    })
    
    console.log( sentEmail );
  }, daysToMilliseconds( 2 ) ); // En 2 días se enviará el correo.
```
8. Si necesitas que se reenvie el correo de inmediato, eliminar el setTimeout.


## DOCKERFILE
1. Construir la imagen con `docker build --tag <nombre_imaen> . `
2. Correr el `DockerFile` mediante la terminal:
```
docker container run `
-e PORT=agregar_puerto `
-e MAILER_HOST=agregar_host_mail `
-e MAILER_PORT=puerto_del_mail `
-e MAILER_SERVICE=servicio_del_mail `
-e MAILER_EMAIL=tu_email `
-e MAILER_PASSWORD=tu_password `
-e MAILER_NAME_EMAIL=nombre_en_el_correo `
-dp puertos:puertos `
--name nombre_contenedor `
webhook-forminator-hortomallas
```
3. Correr el `DockerFile` mediante el archivo `docker-compose.yaml`
```
docker compose up -d
```
__NOTA:__  
  Agregar los valores a las variables de entorno primero antes de ejecutar el `docker-compose.yaml`