import { initializeApp, getApps, cert } from 'firebase-admin/app';
import path from 'path';

const firebaseAdminConfig = {
    credential: cert(path.resolve(process.env.FIREBASE_SECRET_KEY || '')),
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
