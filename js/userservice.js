class UserService {

    static login(email, password1,role) {


        const url = endPoint + "trainticketapp_users/_find";

        const requestData = {
            selector: {
                email: email,
                password: password1,
                role: role
            },
            fields: ["_id", "name", "email", "role"],
        };

        return axios.post(url, requestData, { headers: { Authorization: basicAuth } });
    }
    
    static register(formValues) {



        const url= endPoint + "trainticketapp_users";

        return   axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } });

    }

    
    static getUsers(){
        
        const url= endPoint + "trainticketapp_users/_all_docs?include_docs=true";
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }



}