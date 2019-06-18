// 전시회 상세 정보 표시
function displayExhibitInfo(index) {
	
	var len,
	    i,
	    name = "",
	    type = "",
	    region = "",
	    phone = "",
	    address = "",
	    memo = "",
	    pic = "",
	    sDate = "",
	    eDate = "";

	// 전시회 상세 정보를 설정
	var myExhibitRecord = recordSet.rows.item(index);
	varPosition = index;
	
	
	if (myExhibitRecord.name != null) {// 맛집 이름
		name = '<div class="ui-bar ui-bar-a"><h3>' + myExhibitRecord.name + '</h3></div>';
		varExhibitName = myExhibitRecord.name;
	} else {
		name = '<p>이름 : 정보없음</p>';
	}
	if (myExhibitRecord.name != null) {// 유형
		type = '<p>유형 : ' + myExhibitRecord.type + '</p>';
	} else {
		type = '<p>유형 : 정보없음</p>';
	}
	if (myExhibitRecord.region != null) {// 지역
		region = '<p>지역 : ' + myExhibitRecord.region + '</p>';
	} else {
		region = '<p>지역 : 정보없음</p>';
	}
	if (myExhibitRecord.phone != null) {// 전화번호
		phone = '<p>전화 : ' + myExhibitRecord.phone + '</p>';
		myPhone = myExhibitRecord.phone;
	} else {
		phone = '<p>전화 : 정보없음</p>';
	}
	if (myExhibitRecord.address != null) {// 주소
		address = '<p>주소 : ' + myExhibitRecord.address + '</p>';
	} else {
		address = '<p>주소 : 정보없음</p>';
	}
	if (myExhibitRecord.memo != null) {// 메모
		memo = '<p>메모 : <div class="ui-bar ui-bar-a">' + myExhibitRecord.memo + '</div></p>';
	} else {
		memo = '<p>메모 : 정보없음</p>';
	}
	if (myExhibitRecord.sDate != null) {// 시작날찌
		sDate = '<p>시작날짜 : ' + myExhibitRecord.sDate + '</p>';
	} else {
		sDate = '<p>시작날짜 : 정보없음</p>';
	}
	if (myExhibitRecord.eDate != null) {// 종료날짜
		eDate = '<p>종료날짜 : ' + myExhibitRecord.eDate + '</p>';
	} else {
		eDate = '<p>종료날짜 : 정보없음</p>';
	}
	getExhibitRouteMap();
	$('#exhibitInfoArea').html(name + type + region + phone + address + sDate + eDate + memo);
	$.mobile.changePage("#exhibitInfoShowPage", "slide", false, true);
}

function getExhibitPic() {
	var myName = recordSet.rows.item(varPosition).name;
	var myPic = recordSet.rows.item(varPosition).pic;
	$('#picName').text(myName);
	$('#picArea').attr('src', myPic);
	$.mobile.changePage("#picShowDialog", "pop", false, true);
}

function getExhibitRouteMap() {
	// var myName = recordSet.rows.item(varPosition).address;
	// $('#routeName').text(myName);
	// $.mobile.changePage("#routeShowDialog", "pop", false, true);
	// $('#realMapArea').gmap('destroy');
	navigator.geolocation.getCurrentPosition(function(Position) {
		var lat = Position.coords.latitude;
		var lng = Position.coords.longitude;
		
		var start = new google.maps.LatLng(lat, lng);
		var end = recordSet.rows.item(varPosition).address;
		var mode = 'TRANSIT'
		var request = {
			origin : start,
			destination : end,
			travelMode : eval('google.maps.DirectionsTravelMode.' + mode)
		};
		
		$('#realMapArea').gmap('displayDirections', request, function(result, status) {
			if (status === 'OK') {
				alert('성공');
			} else {
				alert('실패 : ' + status);
			}
		});
	}, function(posError) {
		alert('Error Code : ' + posError.code + ' / Error Message : ' + posError.message);
	}, {
		maximumAge : 3000,
		timeout : 50000,
		enableHighAccuracy : true
	});
}