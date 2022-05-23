let ip : string|undefined;
let waitingForIp : boolean = false;

const IP_SERVICE_URL = 'https://api.ipify.org?format=json';

export function getIP():Promise<string>{
    if (ip || waitingForIp){
        console.log('already have your ip ' + ip)
        return new Promise<string>(function (resolve) {
            resolve(ip || "waiting");
        })
    } else {
        console.log('fetching ip from service');
        waitingForIp = true;
        return new Promise<string>(function (resolve, reject) {
            fetch(IP_SERVICE_URL)
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    ip = res.ip;
                    console.log(res.ip)
                    waitingForIp = false;
                    resolve(ip!);
                })
                .catch(err => {
                    console.log(err)
                    waitingForIp = false;
                    reject(err)
                })
        })
    }
}