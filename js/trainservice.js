class TrainService {

    /**
     * This function is for add trains
     * @param {*} formValues 
     * @returns 
     */

    static addTrains(formValues) {

        const url = endPoint + "trainticketapp_trains";

        return axios.post(url, formValues, {
            headers: {
                'Authorization': basicAuth
            }
        });
    }

    /**
     * This function is for update train
     * @param {*} formValues 
     * @returns 
     */

    static updateTrain(formValues) {

        const url = endPoint + "trainticketapp_trains/" + formValues._id;

        return axios.put(url, formValues, {
            headers: {
                'Authorization': basicAuth
            }
        });
    }
    /**
     * This function is for list trains
     * @returns 
     */

    static getTrains() {

        const url = endPoint + "trainticketapp_trains/_all_docs?include_docs=true";


        return axios.get(url, {
            headers: {
                Authorization: basicAuth
            }
        });
    }

    /**
     * This function is for edit trains
     * @param {*} id 
     * @returns 
     */

    static getTrain(id) {

        const url = endPoint + "trainticketapp_trains/" + id;


        return axios.get(url, {
            headers: {
                Authorization: basicAuth
            }
        });
    }


}