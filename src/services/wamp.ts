import Wampy from 'wampy'


let ws: Wampy.Wampy | undefined

export function initWAMP(address: string, realm: string, onConnection: (success: boolean) => void) {
    if (!ws) {
        ws = new Wampy(address, {
            realm,
            onConnect: () => onConnection(true),
            onReconnectSuccess: () => onConnection(true),
            onError: () => {
                onConnection(false)
            },
            autoReconnect: true,
            reconnectInterval: 5000,
            maxRetries: 0
        });
        
    }

}

export function disconnect(){
    if(ws){
        ws.disconnect()
        ws = undefined
    }
}