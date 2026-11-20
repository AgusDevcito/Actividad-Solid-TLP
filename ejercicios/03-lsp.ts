// Contrato comun para cualquier figura geometrica
interface Shape {
  area(): number;
}

// Rectangulo modelado por separado
class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

// Cuadrado modelado por separado (ya no hereda de Rectangle)
class Square implements Shape {
  private side: number;

  constructor(side: number) {
    this.side = side;
  }

  setSide(side: number): void {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

// Esta funcion solo acepta Rectangulos, donde cambiar ancho y alto de forma independiente es valido
function resizeRectangle(rectangle: Rectangle): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Area esperada: 50. Area obtenida: ${rectangle.area()}`);
}

// Funcion que trabaja con cualquier figura a traves del contrato Shape
function printArea(shape: Shape): void {
  console.log(`Area de la figura: ${shape.area()}`);
}

const rect = new Rectangle(1, 1);
resizeRectangle(rect);

const square = new Square(5);
printArea(square);
printArea(rect);
