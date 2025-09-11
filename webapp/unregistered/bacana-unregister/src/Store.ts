export interface StoreInterface {
    on: boolean;
    setLoginSuccess: any
}
export default function Store(): StoreInterface {
    return {
        on: false,

        setLoginSuccess() {
            this.on = true;
        }
    }
}