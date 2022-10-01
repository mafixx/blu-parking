export class AuthService {
    static async logIn(username: string, password: string): Promise<string>{
        return new Promise((resolve, reject)=> setTimeout(()=> {
                if(username !== "teste@gmail.com" || password !== "12345678"){
                    reject(new Error("user invalid error"));
                }
                resolve("csgoAkColt1986")
            }, 500));
    }

    static async logInGoogle(){

    }
}