import { initializeApp, getApps, cert } from 'firebase-admin/app';
import key from "@/lib/bookflow-e7dbd-firebase-adminsdk-vhk4z-eedc8960f3.json"
const firebaseAdminConfig = {
    credential: cert(JSON.parse(JSON.stringify(key))),
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
