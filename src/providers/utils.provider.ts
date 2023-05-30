import * as bcrypt from 'bcrypt';

export class UtilsProvider {

     /**
   * @param {string} password
   * @returns {string}
   */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}