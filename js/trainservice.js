
const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";

const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

class TrainService {

    static addTrains(formValues){

        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains";

        return axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } });
    }

    
    static updateTrain(formValues){

        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/" + formValues._id;

        return axios.put(url,formValues,{ headers: { 'Authorization': basicAuth } });
    }

    static getTrains(){
        
        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/_all_docs?include_docs=true";
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }

    static getTrain(id){
        
        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/"+ id;
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }


}

