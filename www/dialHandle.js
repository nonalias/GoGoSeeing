function dialContact() {
    var number = phone;
    var byPassAppChooser = true;
//     cordova plugin add cordova-plugin-call-number 을 해야 사용가능하다.
    window.plugins.CallNumber.callNumber(contactDialSuccess, contactDialError, number, byPassAppChooser);
} 

function contactDialSuccess(result){
  alert("Success:"+result);
}
 
function contactDialError(result) {
  alert("Error:"+result);
}