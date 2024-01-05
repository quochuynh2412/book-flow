import { initializeApp, getApps, cert } from 'firebase-admin/app';
import key from './bookflow-e7dbd-firebase-adminsdk-vhk4z-eedc8960f3.json';
import path from 'path';

const firebaseAdminConfig = {
    credential: cert(path.resolve(__dirname, process.env.FIREBASE_SECRET_KEY||'')),
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
