import { AuthRepository } from './repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

const SALT_ROUNDS = 10;

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(email: string, passwordPlain: string) {
    if (!email || !passwordPlain) {
      throw new Error('Email y contraseña requeridos');
    }

    const admin = await this.repository.findAdminByEmail(email);
    if (!admin) {
      throw new Error('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(passwordPlain, admin.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password, ...adminSafe } = admin;
    return { user: adminSafe, token };
  }

  async getMe(userId: string) {
    const admin = await this.repository.findAdminById(userId);
    if (!admin) {
      throw new Error('Usuario administrador no encontrado');
    }
    return admin;
  }

  async changePassword(userId: string, currentPasswordPlain: string, newPasswordPlain: string) {
    const admin = await this.repository.findAdminById(userId);
    if (!admin) throw new Error('Usuario no encontrado');

    const fullAdmin = await this.repository.findAdminByEmail(admin.email);
    if (!fullAdmin) throw new Error('Usuario no encontrado');

    if (admin.email === 'admin@lvlup.com') {
      throw new Error('En modo de demostración pública no está permitido modificar la contraseña.');
    }

    const isMatch = await bcrypt.compare(currentPasswordPlain, fullAdmin.password);
    if (!isMatch) throw new Error('Contraseña actual incorrecta');

    if (newPasswordPlain.length < 8) {
      throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
    }

    const newHash = await bcrypt.hash(newPasswordPlain, SALT_ROUNDS);
    await this.repository.updatePassword(userId, newHash);
    return { success: true, message: 'Contraseña actualizada correctamente' };
  }
}
