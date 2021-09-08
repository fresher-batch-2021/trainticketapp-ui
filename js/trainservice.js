class TrainService {

    static addTrains(formValues){

        const url= endPoint + "trainticketapp_trains";

        return axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } });
    }

    
    static updateTrain(formValues){

        const url= endPoint + "trainticketapp_trains/" + formValues._id;

        return axios.put(url,formValues,{ headers: { 'Authorization': basicAuth } });
    }

    static getTrains(){
        
        const url= endPoint + "trainticketapp_trains/_all_docs?include_docs=true";
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }

    static getTrain(id){
        
        const url= endPoint + "trainticketapp_trains/"+ id;
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }


}

