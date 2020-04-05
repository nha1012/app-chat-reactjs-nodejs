export default class mediahendle{
    getPermissions(){
        return new Promise((resolve,reject)=>{
            navigator.mediaDevices.getUserMedia({video:true, audio:false})
            .then(stream=>{
               return resolve(stream);
            })
            .catch(err=>{
                return reject(err)
            })
        })
    }
}