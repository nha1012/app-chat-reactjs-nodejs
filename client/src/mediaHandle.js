export default class mediahendle{
    getPermissions(){
        return new Promise((resolve,reject)=>{
            navigator.mediaDevices.getUserMedia({video:true, audio:false})
            .then(stream=>{
                resolve(stream);
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}