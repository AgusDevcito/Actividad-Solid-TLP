// Definimos una abstraccion (interfaz) para las notificaciones
interface Notifier {
  send(to: string, message: string): void;
}

// Implementacion concreta para envio por correo
class EmailSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

// Implementacion concreta para envio por SMS
class SmsSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`SMS para ${to}: ${message}`);
  }
}

// OrderService depende de la abstraccion Notifier recibida por constructor
class OrderService {
  private notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  createOrder(customerContact: string): void {
    console.log("Pedido creado");
    this.notifier.send(customerContact, "Tu pedido fue creado");
  }
}

// Probamos inyectando diferentes implementaciones desde afuera
const emailNotifier = new EmailSender();
const orderServiceWithEmail = new OrderService(emailNotifier);
orderServiceWithEmail.createOrder("ana@example.com");

const smsNotifier = new SmsSender();
const orderServiceWithSms = new OrderService(smsNotifier);
orderServiceWithSms.createOrder("+54 11 1234-5678");
