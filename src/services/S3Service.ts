import {DEFAULT_IMAGE,  thumbnailUrl} from "../context/context";


export function doesImageExists(id : number) : Promise<boolean>{
    return new Promise<boolean>(async resolve => {
        const url = thumbnailUrl(id+DEFAULT_IMAGE);
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'cors',
                cache: 'no-cache',
                redirect: 'follow'
            });
            resolve(response.status >= 200 && response.status < 300)
        }catch (e){
            resolve(false)
        }
    })
}

// export function doesImageExists(id : number) : Promise<boolean>{
//     const params = {
//         Bucket: "north-pole-thumbnails",
//         Key: id + DEFAULT_IMAGE + PNG
//     }
//
//     return new Promise<boolean>(resolve => {
//         s3.headObject(params, function(err, data) {
//             console.log(err)
//             console.log(data)
//             resolve(!err);
//         });
//     })
// }

