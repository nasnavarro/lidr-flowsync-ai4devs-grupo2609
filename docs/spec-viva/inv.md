# Cuentas y acceso

## Purpose

Permitir que una persona cree su cuenta en FlowSync, inicie sesión, mantenga la sesión entre recargas, consulte su perfil y la cierre. Solo las personas con sesión pueden acceder a las pantallas privadas.

## Requirements

### Requirement: Registro de una cuenta

El sistema SHALL crear una cuenta cuando recibe `POST /api/v1/auth/signup` con `fullName`, `email`, `password` y `passwordConfirmation` válidos. SHALL responder 200 con `{"data":{"user":{...},"token":"oat_..."}}`. El objeto `user` SHALL contener exactamente `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`. El token devuelto SHALL servir para las peticiones que requieren sesión, de modo que tras registrarse la persona ya tiene la sesión iniciada.

> ⚠️ Duda: la API responde 200 y no 201 al crear la cuenta. No está claro si eso es parte del contrato o una casualidad.

#### Scenario: Registro con nombre
- **WHEN** se envía un registro con `fullName` "Ada Lovelace", un email no registrado y dos contraseñas iguales de entre 8 y 32 caracteres
- **THEN** la respuesta es 200 con `data.user.fullName` "Ada Lovelace", el email enviado y un `data.token` que empieza por `oat_`

#### Scenario: Registro sin nombre
- **WHEN** se envía un registro válido con `fullName` a `null`
- **THEN** la respuesta es 200 y `data.user.fullName` es `null`

#### Scenario: El token del registro sirve para las peticiones con sesión
- **WHEN** se usa el `data.token` recién obtenido en el registro como `Authorization: Bearer` contra `GET /api/v1/account/profile`
- **THEN** la respuesta es 200 con los datos de la cuenta recién creada

### Requirement: La contraseña nunca se devuelve

Ninguna respuesta de registro, login ni perfil SHALL incluir la contraseña ni ningún derivado de ella.

#### Scenario: Respuesta de registro sin contraseña
- **WHEN** se completa un registro válido
- **THEN** ni `data.user` ni ninguna otra parte del cuerpo contienen `password` ni un campo equivalente

### Requirement: Formato de los errores de validación

Cuando los datos enviados a registro o login no son válidos, el sistema SHALL responder 422 con `{"errors":[{"message","rule","field","meta"?}]}`. SHALL informar de cada campo que falla, pero de cada campo solo del primer error. Los mensajes SHALL venir en inglés.

> ⚠️ Duda: no está claro si los textos en inglés de `message` son contrato o si solo lo son `rule` y `field`.

#### Scenario: Varios campos inválidos a la vez
- **WHEN** se envía un registro sin `email` y con `password` de 3 caracteres
- **THEN** la respuesta es 422 y `errors` contiene una entrada para `email` (`rule` "required") y otra para `password` (`rule` "minLength", `meta.min` 8)

#### Scenario: Un solo error por campo
- **WHEN** se envía un registro cuyo `passwordConfirmation` tiene 3 caracteres y además no coincide con `password`
- **THEN** `errors` contiene una sola entrada para `passwordConfirmation`, la de `minLength`

### Requirement: Validación del email en el registro

El registro SHALL rechazar con 422 un `email` ausente, que no tenga formato de email o que supere los 254 caracteres.

#### Scenario: Email ausente
- **WHEN** se envía un registro sin `email`
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "required"

#### Scenario: Email mal formado
- **WHEN** se envía un registro con `email` "no-es-un-email"
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "email"

#### Scenario: Email demasiado largo
- **WHEN** se envía un registro con un `email` válido de más de 254 caracteres
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "maxLength"

### Requirement: Email único

El registro SHALL rechazar con 422 un email que ya pertenece a otra cuenta. Dos emails que solo difieren en mayúsculas y minúsculas SHALL tratarse como distintos.

> ⚠️ Duda: que `Ana@x.com` y `ana@x.com` den dos cuentas distintas puede ser una casualidad y no una decisión.

#### Scenario: Email ya registrado
- **WHEN** se envía un registro con un email idéntico al de una cuenta existente
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "database.unique"

#### Scenario: Mismo email con otras mayúsculas
- **WHEN** existe una cuenta con `ana@x.com` y se envía un registro válido con `Ana@x.com`
- **THEN** la respuesta es 200 y se crea una cuenta nueva

### Requirement: Contraseña y confirmación en el registro

El registro SHALL exigir una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` de entre 8 y 32 caracteres idéntica a `password`. Si no se cumple, SHALL responder 422.

#### Scenario: Contraseña demasiado corta
- **WHEN** se envía un registro con `password` de 7 caracteres
- **THEN** la respuesta es 422 con un error de `field` "password" y `rule` "minLength"

#### Scenario: Contraseña demasiado larga
- **WHEN** se envía un registro con `password` de 33 caracteres
- **THEN** la respuesta es 422 con un error de `field` "password" y `rule` "maxLength"

#### Scenario: Confirmación distinta
- **WHEN** se envía un registro con `password` y `passwordConfirmation` válidas en longitud pero distintas
- **THEN** la respuesta es 422 con un error de `field` "passwordConfirmation" y `rule` "sameAs"

### Requirement: El campo fullName debe enviarse

El registro SHALL exigir que el cuerpo incluya la clave `fullName`, aunque su valor sea `null` o una cadena vacía. No SHALL limitar su longitud.

> ⚠️ Duda: la pantalla presenta el nombre como opcional, pero la API rechaza la petición si falta la clave. No está claro si esa exigencia es contrato.

> ⚠️ Duda: no hay una longitud máxima observable. No se sabe qué ocurre con nombres muy largos.

#### Scenario: Registro sin la clave fullName
- **WHEN** se envía un registro válido que no incluye la clave `fullName`
- **THEN** la respuesta es 422 con un error de `field` "fullName" y `rule` "required"

### Requirement: Espacios, valores vacíos y campos desconocidos

En registro y login, el sistema SHALL ignorar los espacios al principio y al final de cada valor de texto, también en las contraseñas. SHALL tratar un valor vacío o formado solo por espacios como si no se hubiera enviado. SHALL ignorar los campos que no conoce.

> ⚠️ Duda: no está claro si recortar los espacios de las contraseñas es intencionado.

#### Scenario: Contraseña con espacios al final
- **WHEN** alguien se registra con `password` y `passwordConfirmation` "abcdefgh " y después inicia sesión con "abcdefgh"
- **THEN** el login responde 200

#### Scenario: Valor formado solo por espacios
- **WHEN** se envía un registro con `password` formado por 8 espacios
- **THEN** la respuesta es 422 con un error de `field` "password" y `rule` "required"

#### Scenario: Campo desconocido
- **WHEN** se envía un registro válido con un campo adicional `role` "admin"
- **THEN** la respuesta es 200 y `data.user` no contiene `role`

### Requirement: Iniciales del usuario

El campo `initials` del usuario SHALL calcularse así:
- con un nombre de dos o más palabras, la primera letra de cada una de las dos primeras;
- con un nombre de una sola palabra, sus dos primeras letras;
- sin nombre, la primera letra del email y la primera del dominio.

Todas SHALL ir en mayúsculas.

> ⚠️ Duda: no está claro si las iniciales hechas con el email y el dominio (p. ej. "AX") son contrato o un apaño.

#### Scenario: Nombre de dos palabras
- **WHEN** la cuenta tiene `fullName` "Ada Lovelace"
- **THEN** `initials` es "AL"

#### Scenario: Nombre de una palabra
- **WHEN** la cuenta tiene `fullName` "Ada"
- **THEN** `initials` es "AD"

#### Scenario: Sin nombre
- **WHEN** la cuenta no tiene nombre y su email es "ana@x.com"
- **THEN** `initials` es "AX"

### Requirement: Pantalla de registro

La pantalla `/register` SHALL mostrar:
- el título "Crea tu cuenta" y el texto "Regístrate para empezar a organizar el trabajo del equipo.";
- los campos "Nombre completo (opcional)", "Email", "Contraseña" (con la ayuda "Entre 8 y 32 caracteres.") y "Repite la contraseña";
- el botón "Crear cuenta";
- el enlace "¿Ya tienes cuenta? Inicia sesión", que lleva a `/login`.

#### Scenario: Contenido de la pantalla
- **WHEN** una persona sin sesión abre `/register`
- **THEN** ve el título, los cuatro campos, el botón "Crear cuenta" y el enlace a iniciar sesión

#### Scenario: Ir a iniciar sesión
- **WHEN** una persona en `/register` pulsa "Inicia sesión"
- **THEN** pasa a `/login`

### Requirement: Comprobación de contraseñas en la pantalla de registro

La pantalla de registro SHALL impedir crear la cuenta si "Contraseña" y "Repite la contraseña" no son exactamente iguales, y SHALL mostrar "Las contraseñas no coinciden." bajo la confirmación. La comparación SHALL tener en cuenta los espacios.

> ⚠️ Duda: la pantalla rechaza "abcdefgh " frente a "abcdefgh", mientras que la API los daría por iguales.

#### Scenario: Contraseñas distintas
- **WHEN** una persona rellena el registro con contraseñas distintas y pulsa "Crear cuenta"
- **THEN** ve "Las contraseñas no coinciden." bajo "Repite la contraseña", sigue en `/register` y la cuenta no se crea

#### Scenario: Solo difieren en un espacio
- **WHEN** una persona escribe "abcdefgh " en "Contraseña" y "abcdefgh" en "Repite la contraseña" y pulsa "Crear cuenta"
- **THEN** ve "Las contraseñas no coinciden." y la cuenta no se crea

### Requirement: Errores en la pantalla de registro

Cuando el registro falla, la pantalla SHALL mantener a la persona en `/register`. SHALL mostrar en castellano, bajo el campo afectado, el mensaje correspondiente:
- "Ese email ya está registrado. Inicia sesión en su lugar."
- "Introduce una dirección de email válida."
- "Falta rellenar …"
- "… debe tener al menos 8 caracteres."
- "… no puede superar los 32 caracteres."

#### Scenario: Email ya registrado
- **WHEN** una persona intenta registrarse con un email que ya tiene cuenta
- **THEN** ve "Ese email ya está registrado. Inicia sesión en su lugar." bajo "Email" y sigue en `/register`

#### Scenario: Email mal formado
- **WHEN** una persona intenta registrarse con el email "no-es-un-email"
- **THEN** ve "Introduce una dirección de email válida." bajo "Email"

#### Scenario: Campo obligatorio vacío
- **WHEN** una persona intenta registrarse con el email vacío
- **THEN** ve bajo "Email" un mensaje que empieza por "Falta rellenar"

#### Scenario: Contraseña corta
- **WHEN** una persona intenta registrarse con una contraseña de 5 caracteres repetida igual en la confirmación
- **THEN** ve bajo "Contraseña" un mensaje que termina en "debe tener al menos 8 caracteres." en lugar de la ayuda

### Requirement: Envío del registro desde la pantalla

Mientras se envía el registro, el botón SHALL mostrar "Creando cuenta…" y quedar desactivado. Si el registro se completa, SHALL llevar a la persona a `/profile` con la sesión iniciada.

#### Scenario: Registro correcto
- **WHEN** una persona rellena el registro con datos válidos y pulsa "Crear cuenta"
- **THEN** el botón muestra "Creando cuenta…" mientras espera y después la persona ve su perfil en `/profile`

### Requirement: Inicio de sesión

El sistema SHALL responder 200 a `POST /api/v1/auth/login` con un `email` y una `password` correctos, con la misma forma que el registro: `{"data":{"user":{...},"token":"oat_..."}}`.

#### Scenario: Credenciales correctas
- **WHEN** se envía un login con el email y la contraseña de una cuenta existente
- **THEN** la respuesta es 200 con los datos de esa cuenta en `data.user` y un `data.token` que empieza por `oat_`

### Requirement: Credenciales incorrectas

Si el email no pertenece a ninguna cuenta o la contraseña no es la correcta, el login SHALL responder 400 con `{"errors":[{"message":"Invalid user credentials"}]}`. La respuesta SHALL ser idéntica en los dos casos. Un email que solo difiere en mayúsculas de uno registrado SHALL considerarse inexistente.

#### Scenario: Email inexistente
- **WHEN** se envía un login con un email que no tiene cuenta
- **THEN** la respuesta es 400 con `{"errors":[{"message":"Invalid user credentials"}]}`

#### Scenario: Contraseña incorrecta
- **WHEN** se envía un login con un email existente y una contraseña que no es la suya
- **THEN** la respuesta es 400 con el mismo cuerpo que para un email inexistente

#### Scenario: Email con otras mayúsculas
- **WHEN** existe la cuenta `ana@x.com` y se envía un login con `Ana@x.com` y la contraseña correcta
- **THEN** la respuesta es 400 con `{"errors":[{"message":"Invalid user credentials"}]}`

### Requirement: Validación de los datos de login

El login SHALL responder 422 si falta el `email`, si no tiene formato de email o si supera los 254 caracteres, y también si falta la `password`.

#### Scenario: Falta el email
- **WHEN** se envía un login sin `email`
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "required"

#### Scenario: Email mal formado
- **WHEN** se envía un login con `email` "no-es-un-email"
- **THEN** la respuesta es 422 con un error de `field` "email" y `rule` "email"

#### Scenario: Falta la contraseña
- **WHEN** se envía un login con un email válido y sin `password`
- **THEN** la respuesta es 422 con un error de `field` "password" y `rule` "required"

### Requirement: Sin límite de longitud de contraseña en el login

El login no SHALL aplicar límites de longitud a la `password`. Una contraseña de cualquier longitud que no coincida SHALL tratarse como credenciales incorrectas.

> ⚠️ Duda: el registro exige entre 8 y 32 caracteres y el login no. No está claro si esa diferencia es intencionada.

#### Scenario: Contraseña de más de 32 caracteres
- **WHEN** se envía un login con un email existente y una contraseña de 40 caracteres
- **THEN** la respuesta es 400 con `{"errors":[{"message":"Invalid user credentials"}]}`, no 422

### Requirement: Varias sesiones a la vez

Cada login correcto SHALL devolver un token distinto. Los tokens obtenidos antes para la misma cuenta SHALL seguir sirviendo.

#### Scenario: Dos logins seguidos
- **WHEN** se hace login dos veces con la misma cuenta y se usa cada token contra `GET /api/v1/account/profile`
- **THEN** los dos tokens son distintos y ambos obtienen 200

### Requirement: Pantalla de login

La pantalla `/login` SHALL mostrar:
- la cabecera "FlowSync", el título "Inicia sesión" y el texto "Entra con tu cuenta para volver a tus tareas.";
- los campos "Email" y "Contraseña";
- el botón "Entrar", que mientras se envía muestra "Entrando…" y queda desactivado;
- el enlace "¿Aún no tienes cuenta? Crea una", que lleva a `/register`.

#### Scenario: Contenido de la pantalla
- **WHEN** una persona sin sesión abre `/login`
- **THEN** ve la cabecera, el título, los dos campos, el botón "Entrar" y el enlace para crear una cuenta

#### Scenario: Ir a crear una cuenta
- **WHEN** una persona en `/login` pulsa "Crea una"
- **THEN** pasa a `/register`

### Requirement: Resultado del login en pantalla

Si el login se completa, la pantalla SHALL llevar a la persona a `/profile`. Si falla, SHALL mantenerla en `/login`. Con credenciales incorrectas, SHALL mostrar el aviso general "El email o la contraseña no son correctos.". Con datos inválidos, SHALL mostrar el error bajo el campo afectado.

#### Scenario: Login correcto
- **WHEN** una persona introduce credenciales correctas y pulsa "Entrar"
- **THEN** ve su perfil en `/profile`

#### Scenario: Credenciales incorrectas
- **WHEN** una persona introduce una contraseña incorrecta y pulsa "Entrar"
- **THEN** ve el aviso "El email o la contraseña no son correctos." sobre el formulario y sigue en `/login`

#### Scenario: Email mal formado
- **WHEN** una persona escribe "no-es-un-email" como email y pulsa "Entrar"
- **THEN** ve "Introduce una dirección de email válida." bajo "Email" y sigue en `/login`

### Requirement: Aviso de sesión perdida

Cuando se pierde una sesión, por ejemplo al recargar con una sesión que ya no es válida, la pantalla de login SHALL mostrar el motivo hasta que la persona inicie sesión. El aviso SHALL seguir visible aunque se vaya a `/register` y se vuelva. Si hay un error del último envío, SHALL mostrarse ese en su lugar. La pantalla de registro no SHALL mostrar este aviso.

> ⚠️ Duda: no está claro si es intencionado que el aviso persista tras ir a registro y volver, ni que no aparezca en registro.

#### Scenario: Aviso tras ir y volver de registro
- **WHEN** una persona llega a `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión.", pulsa "Crea una" y desde `/register` vuelve a "Inicia sesión"
- **THEN** en `/login` sigue viendo "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: El registro no muestra el aviso
- **WHEN** una persona con el aviso de sesión perdida pasa a `/register`
- **THEN** no ve el aviso en `/register`

### Requirement: Errores de conexión y errores inesperados en login y registro

Las pantallas de login y registro SHALL mostrar un aviso general y mantener a la persona en la misma pantalla en dos casos:
- si no se puede contactar con el servidor, "No se pudo conectar con el servidor. Comprueba que el backend está arrancado.";
- si el servidor falla de forma inesperada, "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.".

#### Scenario: Backend inaccesible
- **WHEN** el backend está parado y una persona pulsa "Entrar" con cualquier dato
- **THEN** ve "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." y sigue en `/login`

#### Scenario: Error inesperado del servidor
- **WHEN** el servidor responde con un error 5xx a un registro
- **THEN** la persona ve "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento." y sigue en `/register`

### Requirement: Autenticación en la API

`GET /api/v1/account/profile` y `POST /api/v1/account/logout` MUST llevar la cabecera `Authorization: Bearer <token>`, con un token obtenido en el registro o en el login. Si no hay token, si no es válido o si ya se cerró la sesión con él, SHALL responder 401 con `{"errors":[{"message":"Unauthorized access"}]}`. Registro y login no SHALL exigir token.

#### Scenario: Sin cabecera de autorización
- **WHEN** se llama a `GET /api/v1/account/profile` sin `Authorization`
- **THEN** la respuesta es 401 con `{"errors":[{"message":"Unauthorized access"}]}`

#### Scenario: Token inválido
- **WHEN** se llama a `GET /api/v1/account/profile` con `Authorization: Bearer inventado`
- **THEN** la respuesta es 401 con `{"errors":[{"message":"Unauthorized access"}]}`

#### Scenario: Token de una sesión cerrada
- **WHEN** se llama a `GET /api/v1/account/profile` con un token con el que ya se hizo logout
- **THEN** la respuesta es 401 con `{"errors":[{"message":"Unauthorized access"}]}`

### Requirement: Duración de la sesión

Un token SHALL seguir sirviendo mientras no se cierre la sesión con él. La respuesta de registro y de login no SHALL indicar ninguna fecha de caducidad.

> ⚠️ Duda: no se ha observado que un token caduque solo. No está claro si la ausencia de caducidad es contrato o falta de configuración. Además, la pantalla habla de "sesión caducada".

#### Scenario: Token usado tiempo después
- **WHEN** se usa contra `GET /api/v1/account/profile` un token obtenido en un login anterior y con el que no se ha hecho logout
- **THEN** la respuesta es 200

### Requirement: Recargar sin sesión

Al abrir o recargar la aplicación sin una sesión abierta, SHALL mostrarse directamente la pantalla que corresponde a una persona sin sesión.

#### Scenario: Recargar /login sin sesión
- **WHEN** una persona sin sesión recarga `/login`
- **THEN** ve la pantalla de login

### Requirement: Recargar con una sesión válida

Al recargar la aplicación con una sesión abierta y todavía válida, SHALL mostrarse un indicador de carga a pantalla completa ("Cargando…"). Después, la persona SHALL seguir en la misma pantalla con la sesión iniciada.

#### Scenario: Recargar el perfil
- **WHEN** una persona con sesión válida recarga `/profile`
- **THEN** ve un momento el indicador "Cargando…" y después su perfil, sin volver a iniciar sesión

### Requirement: Recargar con una sesión que ya no es válida

Al recargar con una sesión que el servidor ya no acepta, SHALL llevarse a la persona a `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión.". Esa sesión no SHALL recuperarse en recargas posteriores.

#### Scenario: Sesión cerrada desde otro sitio
- **WHEN** una persona tiene la sesión abierta en el navegador, su token se invalida con un logout hecho desde otro cliente y ella recarga `/profile`
- **THEN** llega a `/login` con "Tu sesión ha caducado. Vuelve a iniciar sesión." y, si vuelve a recargar, sigue sin sesión

### Requirement: Recargar con el backend caído

Al recargar con una sesión abierta mientras el servidor no responde o responde con error, SHALL llevarse a la persona a `/login` con el aviso de conexión o de servidor. La sesión SHALL recuperarse sin volver a iniciar sesión en una recarga posterior con el servidor disponible.

> ⚠️ Duda: la persona ve la pantalla de login como si no tuviera sesión, pero la sesión se recupera después. No está claro si es intencionado.

#### Scenario: Backend parado al recargar
- **WHEN** una persona con sesión válida recarga `/profile` con el backend parado
- **THEN** llega a `/login` con "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: El backend vuelve
- **WHEN** después de lo anterior el backend vuelve a estar disponible y la persona recarga la página
- **THEN** ve su perfil en `/profile` sin haber iniciado sesión otra vez

### Requirement: Consulta del perfil

`GET /api/v1/account/profile` con un token válido SHALL responder 200 con `{"data":{"id","fullName","email","createdAt","updatedAt","initials"}}` de la cuenta dueña del token. La respuesta no SHALL incluir la contraseña.

#### Scenario: Perfil propio
- **WHEN** se llama a `GET /api/v1/account/profile` con el token de la cuenta "ana@x.com"
- **THEN** la respuesta es 200 y `data.email` es "ana@x.com"

### Requirement: Pantalla de perfil

La pantalla `/profile` SHALL mostrar:
- un círculo con las iniciales;
- el nombre, o "Sin nombre" si la cuenta no tiene;
- el email;
- "Miembro desde", con la fecha de alta en formato largo en español (p. ej. "30 de septiembre de 2026");
- el botón "Cerrar sesión".

No SHALL tener otra navegación.

#### Scenario: Perfil con nombre
- **WHEN** una persona con sesión y `fullName` "Ada Lovelace" abre `/profile`
- **THEN** ve "AL" en el círculo, "Ada Lovelace", su email, "Miembro desde" con su fecha de alta y el botón "Cerrar sesión"

#### Scenario: Perfil sin nombre
- **WHEN** una persona con sesión y sin nombre abre `/profile`
- **THEN** ve "Sin nombre" en lugar del nombre y, debajo, su email

### Requirement: Cierre de sesión en la API

`POST /api/v1/account/logout` con un token válido SHALL responder 200 con `{"message":"Logged out successfully"}` y dejar inservible solo ese token. Los demás tokens de la misma cuenta SHALL seguir sirviendo.

> ⚠️ Duda: esta es la única respuesta correcta sin el envoltorio `data`. No está claro si es intencionado.

#### Scenario: Logout correcto
- **WHEN** se llama a `POST /api/v1/account/logout` con un token válido
- **THEN** la respuesta es 200 con `{"message":"Logged out successfully"}` y usar ese token después da 401

#### Scenario: Las otras sesiones siguen abiertas
- **WHEN** una cuenta tiene dos tokens y se hace logout con uno
- **THEN** el otro token sigue obteniendo 200 en `GET /api/v1/account/profile`

#### Scenario: Logout sin token
- **WHEN** se llama a `POST /api/v1/account/logout` sin `Authorization`
- **THEN** la respuesta es 401 con `{"errors":[{"message":"Unauthorized access"}]}`

### Requirement: Cierre de sesión desde la pantalla

Al pulsar "Cerrar sesión" en `/profile`, la persona SHALL llegar de inmediato a `/login` sin sesión, esté o no disponible el servidor, y sin ver ningún error.

> ⚠️ Duda: si el servidor no está disponible al cerrar sesión, el token parece seguir sirviendo contra la API y la persona no recibe ningún aviso. No está claro si es contrato o casualidad.

#### Scenario: Cerrar sesión
- **WHEN** una persona con sesión pulsa "Cerrar sesión" en `/profile`
- **THEN** llega a `/login` y, si abre `/profile`, se la lleva de nuevo a `/login`

#### Scenario: Cerrar sesión con el backend parado
- **WHEN** una persona con sesión pulsa "Cerrar sesión" con el backend parado
- **THEN** llega a `/login` sin ver ningún mensaje de error

### Requirement: Protección de la pantalla de perfil

Si una persona sin sesión abre `/profile`, SHALL llevársela a `/login`. Tras iniciar sesión, SHALL llegar a `/profile`.

#### Scenario: Perfil sin sesión
- **WHEN** una persona sin sesión abre `/profile`
- **THEN** llega a `/login`

### Requirement: Pantallas solo para personas sin sesión

Si una persona con sesión abre `/login` o `/register`, SHALL llevársela a `/profile`.

#### Scenario: Login con sesión
- **WHEN** una persona con sesión abre `/login`
- **THEN** llega a `/profile`

#### Scenario: Registro con sesión
- **WHEN** una persona con sesión abre `/register`
- **THEN** llega a `/profile`

### Requirement: Las redirecciones no quedan en el historial

Las redirecciones entre pantallas de acceso SHALL sustituir la URL de origen en el historial del navegador. El botón Atrás no SHALL volver a ella.

#### Scenario: Atrás después de una redirección
- **WHEN** una persona sin sesión abre `/profile`, llega a `/login` y pulsa Atrás en el navegador
- **THEN** no vuelve a `/profile`

### Requirement: Indicador de carga mientras se decide la pantalla

Mientras la aplicación comprueba si hay una sesión válida, SHALL mostrar un indicador de carga a pantalla completa con el texto accesible "Cargando…", en lugar de la pantalla de destino.

#### Scenario: Comprobación en curso
- **WHEN** una persona con sesión abierta recarga `/login` y la comprobación de la sesión aún no ha terminado
- **THEN** ve el indicador "Cargando…" y no el formulario de login

---

## Revisión

### 1. Requisitos

- Escritos por el agente: 36.
- Comprobados por mí: 6.

### 2. Incoherencias

- No veo que el backend formatee el error, cosa que el frontend sí hace. Se ve en "Formato de los errores de validación" frente a "Errores en la pantalla de registro". La API devuelve los mensajes en inglés (message, rule, field), mientras que la pantalla muestra sus propios textos en castellano.
- El email en backend tiene una restricción de 254 caracteres que el frontend no parece considerar. Se ve en "Validación del email en el registro" frente a "Errores en la pantalla de registro".
- El email es único tanto en front como en backend, pero no tengo claro si distingue entre mayúsculas y minúsculas. Se ve en "Email único" frente a "Errores en la pantalla de registro".

### 3. Bug o contrato

- "Sin límite de longitud de contraseña en el login" dice que el login no SHALL aplicar límites de longitud a la `password` y que una contraseña de cualquier longitud que no coincida SHALL tratarse como credenciales incorrectas. En cambio, "Pantalla de registro" muestra en "Contraseña" la ayuda "Entre 8 y 32 caracteres.".
- Por un lado se dice que "la sesión no caduca", sin embargo en otra indica en pantalla "sesión caducada".
