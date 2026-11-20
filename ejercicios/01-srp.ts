interface User {
  username: string;
  email: string;
}

// 1. Responsabilidad: Validar datos del usuario
class UserValidator {
  validate(email: string): void {
    if (!email.includes("@")) {
      throw new Error("El correo no es valido");
    }
  }
}

// 2. Responsabilidad: Guardar/persistir usuarios
class UserRepository {
  private users: User[] = [];

  save(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }
}

// 3. Responsabilidad: Enviar correos
class EmailService {
  sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

// 4. Servicio que coordina las demas clases usando composicion
class UserRegistrationService {
  private validator = new UserValidator();
  private repository = new UserRepository();
  private emailService = new EmailService();

  register(username: string, email: string): string {
    this.validator.validate(email);
    this.repository.save({ username, email });
    return this.emailService.sendWelcomeEmail(email);
  }
}

// Probamos que funcione
const registrationService = new UserRegistrationService();
const mensaje = registrationService.register("juanperez", "juan@example.com");
console.log(mensaje);
