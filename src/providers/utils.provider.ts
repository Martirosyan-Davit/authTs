import * as bcrypt from 'bcrypt';

export class UtilsProvider {

     /**
   * @param {string} password
   * @returns {string}
   */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    static validatePassword( 
        password: string | undefined,
        hashPass: string | undefined,): Promise<boolean> {

            if (!password || !hashPass) {
                return Promise.resolve(false);
              }
            
              return bcrypt.compare(password, hashPass);
        }

    
}