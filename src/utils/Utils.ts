import got from 'got';

export const logger = {
    error: (message: any) => sendLog(message, 'ERROR', colors.RED.FG),
    warn: (message: any) => sendLog(message, 'WARN', colors.YELLOW.FG),
    info: (message: any) => sendLog(message, 'INFO', colors.BRIGHT_CYAN.FG),
    debug: (message: any) => sendLog(message, 'DEBUG', colors.YELLOW.BG),
    command: (message: any) => sendLog(message, 'COMMAND', colors.GREEN.FG),
    system: (message: any) => sendLog(message, 'SYSTEM', colors.CYAN.FG),
};

function sendLog(message: any, name: string, color: string): void {
    const spacing: string = ' '.repeat(7 - name.length);
    const message_prefix: string = applyColor(`${name}${spacing} |`);
    return console.log(`${message_prefix} ${message}`);

    function applyColor(msg: string): string {
        const canApply = process.platform !== 'win32';
        if (!canApply) return msg;
        return `${color}${msg}${colors.RESET}`;
    }
}

export function shuffle(array: any[]): any[] {
    array = [...array];
    return new Array(array.length).fill(0).map(() => {
        const index: number = Math.floor(Math.random() * array.length);
        array.splice(index, 1);
        return array[index];
    });
}

export const colors = {
    RESET: '\x1b[0m',
    BLACK: {
        FG: '\x1b[30m',
        BG: '\x1b[40m',
    },
    RED: {
        FG: '\x1b[31m',
        BG: '\x1b[41m',
    },
    GREEN: {
        FG: '\x1b[32m',
        BG: '\x1b[42m',
    },
    YELLOW: {
        FG: '\x1b[33m',
        BG: '\x1b[43m',
    },
    BLUE: {
        FG: '\x1b[34m',
        BG: '\x1b[44m',
    },
    MAGENTA: {
        FG: '\x1b[35m',
        BG: '\x1b[45m',
    },
    CYAN: {
        FG: '\x1b[36m',
        BG: '\x1b[46m',
    },
    WHITE: {
        FG: '\x1b[37m',
        BG: '\x1b[47m',
    },
    GRAY: {
        FG: '\x1b[90m',
        BG: '\x1b[100m',
    },
    BRIGHT_RED: {
        FG: '\x1b[91m',
        BG: '\x1b[101m',
    },
    BRIGHT_GREEN: {
        FG: '\x1b[92m',
        BG: '\x1b[102m',
    },
    BRIGHT_YELLOW: {
        FG: '\x1b[93m',
        BG: '\x1b[103m',
    },
    BRIGHT_BLUE: {
        FG: '\x1b[94m',
        BG: '\x1b[104m',
    },
    BRIGHT_MAGENTA: {
        FG: '\x1b[95m',
        BG: '\x1b[105m',
    },
    BRIGHT_CYAN: {
        FG: '\x1b[96m',
        BG: '\x1b[106m',
    },
    BRIGHT_WHITE: {
        FG: '\x1b[97m',
        BG: '\x1b[107m',
    },
};

export function getData(url: string, json: boolean, headers?: any) {
    return new Promise((resolve, reject) => {
        logger.system(`GET request: ${url}`);
        return got
            .get(url, {
                responseType: json ? 'json' : undefined,
                resolveBodyOnly: true,
                headers,
            })
            .then(resolve)
            .catch(reject);
    });
}
