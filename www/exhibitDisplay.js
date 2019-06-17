// 전시회 상세 정보 표시
function displayExhibitInfo(index) {
  var len, i, name="", type="", region="", phone="", address="", memo="", pic="";

  // 전시회 상세 정보를 설정
  var myExhibitRecord = recordSet.rows.item(index);    
  varPosition = index;
  
  if(myExhibitRecord.name != null) {          // 맛집 이름           
    name = '<div class="ui-bar ui-bar-a"><h3>' + myExhibitRecord.name + '</h3></div>';   
  } else {
      name = '<p>이름 : 정보없음</p>';
  }  
  if(myExhibitRecord.name != null) {          // 유형 
      type = '<p>유형 : ' + myExhibitRecord.type + '</p>';
  } else {
      type = '<p>유형 : 정보없음</p>';
  }   
  if(myExhibitRecord.region != null) {          // 지역 
      region = '<p>지역 : ' + myExhibitRecord.region + '</p>';            
  } else {
      region = '<p>지역 : 정보없음</p>';
  }   
  if(myExhibitRecord.phone != null) {          // 전화번호 
      phone = '<p>전화 : ' + myExhibitRecord.phone + '</p>';            
  } else {
      phone = '<p>전화 : 정보없음</p>';
  }   
  if(myExhibitRecord.address != null) {          // 주소 
      address = '<p>주소 : ' + myExhibitRecord.address + '</p>';   
  } else {
      address = '<p>주소 : 정보없음</p>';
  }  
  if(myExhibitRecord.memo != null) {          // 메모  
      memo = '<p>메모 : ' + myExhibitRecord.memo + '</p>';   
  } else {
      memo = '<p>메모 : 정보없음</p>';
  }  
                             
  $('#exhibitInfoArea').html(name + type + region + phone + address + memo);
  $.mobile.changePage("#exhibitInfoShowPage", "slide", false, true);
}