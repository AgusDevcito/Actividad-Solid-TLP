// Interfaz comun para todos los medios de pago
interface PaymentMethod {
  pay(amount: number): void;
}

// Implementacion para tarjeta
class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con tarjeta`);
  }
}

// Implementacion para efectivo
class CashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} en efectivo`);
  }
}

// Implementacion para transferencia
class TransferPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con transferencia`);
  }
}

// PaymentProcessor delega la accion directamente al medio de pago sin ningun switch
class PaymentProcessor {
  pay(paymentMethod: PaymentMethod, amount: number): void {
    paymentMethod.pay(amount);
  }
}

// Probamos los distintos medios de pago
const processor = new PaymentProcessor();
processor.pay(new CardPayment(), 100);
processor.pay(new CashPayment(), 50);
processor.pay(new TransferPayment(), 200);
