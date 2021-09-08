class BookService {

    
    static addBooking(formValues){
        
        const url= endPoint + "trainticketapp_book";

        return axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } });

    }

    static listBooking(){

        const url= endPoint + "trainticketapp_book/_all_docs?include_docs=true";
        
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }

    
    static cancelBooking(id, obj){

        const url= endPoint + "trainticketapp_book/"+ id;
        
        return axios.put(url,obj, { headers: { Authorization: basicAuth } });
    }
}
