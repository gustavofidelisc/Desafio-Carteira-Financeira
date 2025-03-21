import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCriptografy {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = 10; // Você pode parametrizar isso com variáveis de ambiente
  }

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
