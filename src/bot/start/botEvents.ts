import { EventHandler } from '../../imports/classes/EventHandler';
import onMessage from '../events/onMessage';
import onReady from '../events/onReady';

export const getBotEvents = (): EventHandler[] => [
    onMessage,
    onReady
];