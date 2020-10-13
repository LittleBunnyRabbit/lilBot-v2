// Events
import onMessage from '../events/onMessage';
import onReady from '../events/onReady';

export const events: { [key: string]: any } = {
    "message": onMessage,
    "ready": onReady
};
