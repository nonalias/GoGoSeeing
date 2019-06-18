function dialContact(phone) {
    var number = phone;
    var byPassAppChooser = true;
    window.plugins.CallNumber.callNumber(contactDialSuccess, contactDialError, number, byPassAppChooser);
} 

function contactDialSuccess(result){
  alert("Success:"+result);
}
 
function contactDialError(result) {
  alert("Error:"+result);
}