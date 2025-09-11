import axios from 'axios';

const loginUrl = 'https://app.bacarotruckfoodapp.ovh/api/login';
const unregisterUrl = 'https://app.bacarotruckfoodapp.ovh/api/user/unregister';

// const loginUrl = 'http://localhost:3000/api/login';
// const unregisterUrl = 'http://localhost:3000/api/user/unregister';

console.log(loginUrl);
interface LoginResponse {
    user: {
        tu: string;
        r: string;
    };
    access_token: string;
    expires_in: string;
}
const configLogin = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function LoginComponent() {
    return {
        showPassword: false,
        isLoggedIn: false,
        loginPassword: '',
        loginEmail: '',
        token: '',
        login(e: any) {
            e.preventDefault();
          
            const body = {
                email: this.loginEmail,
                password: this.loginPassword
            };
            axios.post<LoginResponse>(loginUrl, body, configLogin)
                .then(response => {                    
                    if (response.status === 200) {
                        this.isLoggedIn = true;
                        this.token = response.data.access_token;
                    } else {
                        this.isLoggedIn = false;
                        console.error('Login fallito');
                        return null;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        unregister(e: any) {
            e.preventDefault();
            
            if (!this.token || this.token === '') {
                console.warn("warn")
                return;
            }
            axios.post<void>(unregisterUrl, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
                .then(response => {
                    console.log(response.data);                    
                })
                .catch(error => {
                    console.error(error);
                });
        },
        unsubscribe() {
            console.log('Disiscrizione richiesta per:', this.loginEmail);
        }
    };
}