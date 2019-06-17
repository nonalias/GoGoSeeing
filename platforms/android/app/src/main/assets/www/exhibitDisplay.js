// 맛집 상세 정보 표시
function displayCafeInfo(index) {
  var len, i, name="", type="", region="", phone="", address="", memo="", pic="";

  // 맛집 상세 정보를 설정
  var myCafeRecord = recordSet.rows.item(index);    
  varPosition = index;
  
  if(myCafeRecord.name != null) {          // 맛집 이름           
    name = '<div class="ui-bar ui-bar-a"><h3>' + myCafeRecord.name + '</h3></div>';   
  } else {
      name = '<p>이름 : 정보없음</p>';
  }  
  if(myCafeRecord.name != null) {          // 유형 
      type = '<p>유형 : ' + myCafeRecord.type + '</p>';
  } else {
      type = '<p>유형 : 정보없음</p>';
  }   
  if(myCafeRecord.region != null) {          // 지역 
      region = '<p>지역 : ' + myCafeRecord.region + '</p>';            
  } else {
      region = '<p>지역 : 정보없음</p>';
  }   
  if(myCafeRecord.phone != null) {          // 전화번호 
      phone = '<p>전화 : ' + myCafeRecord.phone + '</p>';            
  } else {
      phone = '<p>전화 : 정보없음</p>';
  }   
  if(myCafeRecord.address != null) {          // 주소 
      address = '<p>주소 : ' + myCafeRecord.address + '</p>';   
  } else {
      address = '<p>주소 : 정보없음</p>';
  }  
  if(myCafeRecord.memo != null) {          // 메모  
      memo = '<p>메모 : ' + myCafeRecord.memo + '</p>';   
  } else {
      memo = '<p>메모 : 정보없음</p>';
  }  
                             
  $('#exhibitInfoArea').html(name + type + score + region + phone + address + memo);
  $.mobile.changePage("#exhibitInfoShowPage", "slide", false, true);
}