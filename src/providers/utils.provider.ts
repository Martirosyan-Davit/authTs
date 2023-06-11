import * as bcrypt from 'bcrypt';

export class UtilsProvider {

    /**
  * @param {string} password
  * @returns {string}
  */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    /**
  * @param {string} password
  * @param {string} hashPass
  * @returns {boolean}
  */
    static validatePassword(password: string, hashPass: string): Promise<boolean> {
        return bcrypt.compare(password, hashPass);
    }
}