export default class mediahendle{
    getPermissions(){
        return new Promise((resolve,reject)=>{
            navigator.mediaDevices.getUserMedia({video:true, audio:true})
            .then(stream=>{
                resolve(stream);
            })
            .catch(err=>{
               throw reject(err)
            })
        })
    }
}