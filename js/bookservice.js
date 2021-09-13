class BookService {

    /**
     * This function is for add bookings
     * @param {*} formValues 
     * @returns 
     */

    static addBooking(formValues) {

        const url = endPoint + "trainticketapp_book";

        return axios.post(url, formValues, {
            headers: {
                'Authorization': basicAuth
            }
        });

    }

    /**
     * This function is for list bookings
     * @returns 
     */
    static listBooking() {

        const url = endPoint + "trainticketapp_book/_all_docs?include_docs=true";

        return axios.get(url, {
            headers: {
                Authorization: basicAuth
            }
        });
    }

    /**
     * This function is for cancel bookings
     * @param {*} id 
     * @param {*} obj 
     * @returns 
     */
    static cancelBooking(id, obj) {

        const url = endPoint + "trainticketapp_book/" + id;

        return axios.put(url, obj, {
            headers: {
                Authorization: basicAuth
            }
        });
    }


    /**
     * This function is used to get data
     * @param {*} id 
     * @returns 
     */

    static getBooking(id) {

        const url = endPoint + "trainticketapp_book/" + id;


        return axios.get(url, {
            headers: {
                Authorization: basicAuth
            }
        });
    }

    /**
     * This function is for update booking(cancel)
     * @param {*} formValues 
     * @returns 
     */

    static updateBook(formValues) {

        const url = endPoint + "trainticketapp_book/" + formValues._id;

        return axios.put(url, formValues, {
            headers: {
                'Authorization': basicAuth
            }
        });
    }

}