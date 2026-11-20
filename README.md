# Actividad Práctica de SOLID con TypeScript

## Objetivos

Al terminar estos ejercicios deberias poder:

- Reconocer problemas comunes en clases y dependencias.
- Explicar con tus palabras cada principio SOLID.
- Separar responsabilidades en clases pequeñas.
- Preferir composicion e interfaces simples antes que jerarquias rigidas.

Agregar un script por cada archivo de `ejercicios/`

- Abri `package.json` y, dentro de `"scripts"`, agrega una linea por cada archivo de la carpeta `ejercicios/`.
- Se puede utilizar `npx` o `node` para ejecutar los scripts.

  ```json
  {
    "scripts": {
      "01-srp": "node ejercicios/01-srp.ts",
      "02-ocp": "node ejercicios/02-ocp.ts",
      "03-lsp": "node ejercicios/03-lsp.ts",
      "04-isp": "node ejercicios/04-isp.ts",
      "05-dip": "node ejercicios/05-dip.ts"
    }
  }
  ```

## Como trabajar cada ejercicio

1. Lee primero el archivo de `ejercicios/`.
2. Ejecuta o compila el ejemplo.
3. Identifica que partes de la clase cambiarian por motivos diferentes.
4. Responde las preguntas de la seccion correspondiente.

Los ejemplos funcionan, pero estan diseñados para mostrar codigo dificil de mantener. Que el programa funcione no significa que este bien diseñado.

---

## 1. SRP: Single Responsibility Principle

### Responsabilidad unica

Una clase debe tener un solo motivo para cambiar. No significa que una clase solo pueda tener un metodo; significa que sus metodos deben pertenecer a la misma responsabilidad.

### Ejercicio

Revisa [`ejercicios/01-srp.ts`](ejercicios/01-srp.ts). La clase `UserManager` registra usuarios, valida datos, guarda informacion y envia correos.

Identificar cada responsabilidad y mover a su propia clase (validacion, almacenamiento, envio de correo). Dejar un servicio de registro que coordine esas clases por composicion y mantenga el mismo comportamiento visible.

Preguntas:

- Que responsabilidades tiene `UserManager`?
  **Respuesta:** Tiene tres responsabilidades distintas en una sola clase: validar el formato del correo, almacenar los usuarios en el arreglo y enviar el correo de bienvenida.
- Que ocurre si cambia la forma de guardar datos?
  **Respuesta:** Se tendria que modificar la clase `UserManager`. Si en el futuro se quiere guardar en una base de datos en vez de un array, modificar esa clase podria introducir errores en la validacion o en el envio de emails.
- Que clase podria encargarse de enviar correos?
  **Respuesta:** Una clase dedicada llamada `EmailService`, cuya unica responsabilidad sea gestionar y enviar correos.

La solucion separa esas tareas en `UserValidator`, `UserRepository`, `EmailService` y `UserRegistrationService`.

---

## 2. OCP: Open/Closed Principle

### Abierto para extension, cerrado para modificacion

El codigo deberia permitir agregar comportamientos nuevos sin modificar constantemente una clase estable.

### Ejercicio

Revisa [`ejercicios/02-ocp.ts`](ejercicios/02-ocp.ts). Cada nuevo medio de pago obliga a agregar otro `case` dentro de `PaymentProcessor`.

Definir una interfaz comun para los metodos de pago y crear una clase por cada uno (tarjeta, efectivo, transferencia). `PaymentProcessor` debe recibir un medio de pago y delegar en el, sin `switch`, de modo que agregar uno nuevo no lo modifique.

Preguntas:

- Que parte debe modificarse para agregar pago con transferencia?
  **Respuesta:** En el diseno original habia que agregar un nuevo tipo a la union `PaymentType` y agregar un nuevo `case` en el `switch` de la clase `PaymentProcessor`.
- Como podriamos representar un medio de pago?
  **Respuesta:** Mediante una interfaz comun llamada `PaymentMethod` que tenga un metodo `pay(amount: number): void`, y luego crear clases separadas para cada medio (`CardPayment`, `CashPayment`, `TransferPayment`).
- Que comportamiento comun tienen todos los medios de pago?
  **Respuesta:** Todos reciben un monto y efectuan un pago (`pay(amount: number)`).

La solucion utiliza la interfaz `PaymentMethod` y agrega nuevos metodos de pago mediante nuevas clases.

---

## 3. LSP: Liskov Substitution Principle

### Sustitucion de Liskov

Una subclase debe poder utilizarse en cualquier lugar donde se espera su clase base sin romper las reglas del programa.

### Ejercicio

Revisa [`ejercicios/03-lsp.ts`](ejercicios/03-lsp.ts). `Square` hereda de `Rectangle`, pero cambia el comportamiento esperado de `setWidth` y `setHeight`.

Eliminar la herencia entre `Square` y `Rectangle`. Definir un contrato comun `Shape` con `area()` y modelar cada figura por separado, para que `resizeRectangle` solo dependa de operaciones que toda figura cumple sin sorpresas.

Preguntas:

- Por que el area final no coincide con lo que espera `resizeRectangle`?
  **Respuesta:** Porque en la clase `Square`, al modificar el alto se cambia tambien el ancho para que sigan siendo iguales. Entonces al poner alto 10, el ancho tambien pasa a 10 y el area termina dando 100 en lugar de 50.
- Es siempre correcto modelar un cuadrado como un rectangulo por herencia?
  **Respuesta:** No. Aunque geometricamente un cuadrado sea un rectangulo, en codigo rompe el principio de sustitucion porque sus dimensiones no pueden modificarse de manera independiente sin romper la regla del cuadrado.
- Que abstraccion comun podriamos usar?
  **Respuesta:** Una interfaz comun llamada `Shape` con el metodo `area(): number`, modelando `Rectangle` y `Square` como clases separadas que implementan `Shape`.

La solucion elimina la herencia incorrecta y modela ambas figuras como objetos que cumplen el contrato `Shape`.

---

## 4. ISP: Interface Segregation Principle

### Segregacion de interfaces

Es mejor tener varias interfaces pequenas y especificas que una interfaz grande que obligue a implementar metodos innecesarios.

### Ejercicio

Revisa [`ejercicios/04-isp.ts`](ejercicios/04-isp.ts). Una impresora sencilla debe implementar `scan` y `fax` aunque solo puede imprimir.

Partir la interfaz `MultifunctionPrinter` en interfaces chicas (`Printer`, `Scanner`, `Fax`). Hacer que `SimplePrinter` implemente solo `Printer`, sin metodos que lancen errores, y deja las demas capacidades para clases que si las necesiten.

Preguntas:

- Que metodo no necesita `SimplePrinter`?
  **Respuesta:** No necesita los metodos `scan` ni `fax`, porque es una impresora simple que unicamente imprime.
- Que problema causa implementar metodos que lanzan errores?
  **Respuesta:** Causa errores inesperados en tiempo de ejecucion si otra parte del codigo intenta usarlos. Ademas, obliga a la clase a depender de cosas que en realidad no soporta.
- Como separar las capacidades de una impresora?
  **Respuesta:** Dividiendo la interfaz general en tres interfaces pequenas: `Printer`, `Scanner` y `Fax`. De esta forma, cada clase implementa solo lo que realmente puede hacer.

La solucion divide la interfaz en `Printer`, `Scanner` y `Fax`.

---

## 5. DIP: Dependency Inversion Principle

### Inversion de dependencias

Las clases de alto nivel no deberian depender directamente de clases concretas de bajo nivel. Ambas deberian depender de abstracciones.

### Ejercicio

Revisa [`ejercicios/05-dip.ts`](ejercicios/05-dip.ts). `OrderService` crea directamente un `EmailSender`, por lo que no puede cambiar facilmente a SMS ni probarse sin enviar un correo real.

Definir una interfaz `Notifier` con un metodo de envio y haz que `OrderService` la reciba por el constructor en lugar de instanciar `EmailSender`. Crear al menos una implementacion concreta y pasala desde afuera al crear el servicio.

Preguntas:

- Que dependencia concreta crea `OrderService`?
  **Respuesta:** Crea directamente una instancia de la clase concreta `EmailSender` usando `new EmailSender()` dentro del metodo `createOrder`.
- Como probarias la clase sin enviar un correo?
  **Respuesta:** Pasandole por el constructor una implementacion simulada (mock) o falsa de la interfaz `Notifier`, para verificar que se llame al metodo de envio sin mandar un correo de verdad.
- Que contrato comun podrian implementar el correo y el SMS?
  **Respuesta:** Una interfaz `Notifier` que defina el metodo `send(to: string, message: string): void`.

La solucion recibe una dependencia que cumple la interfaz `Notifier` mediante el constructor.

---
