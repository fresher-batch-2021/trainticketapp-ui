
class ValidatorCheck {

static emailValidation(email){ 
    const dbUserName='apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6';
    const dbPassword='aabcfd48d07fe38f4760f6cd11b83b4a';
    var   endpoint='https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/';
    const basicAuth='Basic '+btoa(dbUserName + ':' + dbPassword);
    
const url=endpoint+"trainticketapp_users/_find";

let requestData =
{
    selector: {
        email: email
    },
    fields: ["email"]
};
  return axios.post(url,requestData,{headers:{Authorization:basicAuth}});
}


static trainNoValidation(trainNo){ 
    const dbUserName='apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6';
    const dbPassword='aabcfd48d07fe38f4760f6cd11b83b4a';
    var   endpoint='https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/';
    const basicAuth='Basic '+btoa(dbUserName + ':' + dbPassword);
    
    const url=endpoint+"trainticketapp_trains/_find";
    
    let requestData =
    {
        selector: {
            trainNo: trainNo
        },
        fields: ["trainNo"]
    };
      return axios.post(url,requestData,{headers:{Authorization:basicAuth}});
    }

}