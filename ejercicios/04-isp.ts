// Separamos la interfaz grande en interfaces chicas y especificas
interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

// La impresora sencilla solo implementa la interfaz que realmente necesita
class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }
}

// Una impresora multifuncion puede implementar todas las interfaces que soporta
class MultifunctionPrinter implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  scan(document: string): void {
    console.log(`Escaneando: ${document}`);
  }

  fax(document: string): void {
    console.log(`Enviando fax: ${document}`);
  }
}

// Probamos el uso de cada clase
const simple = new SimplePrinter();
simple.print("tarea.txt");

const multi = new MultifunctionPrinter();
multi.print("reporte.pdf");
multi.scan("foto.jpg");
multi.fax("contrato.pdf");
