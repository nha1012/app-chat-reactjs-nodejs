export default class MediaHandle{
    getPermissions(){
        return new Promise((resolve,reject)=>{
            navigator.mediaDevices.getUserMedia({video:true, audio:true})
            .then(stream=>{
                resolve(stream);
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}