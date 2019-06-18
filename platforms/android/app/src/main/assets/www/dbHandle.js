// 데이터베이스 생성 및 열기
function openDB(){
   db = window.openDatabase('exhibitDB', '1.0', '전시회DB', 1024*1024);
   console.log('1_DB 생성...');
}

// 테이블 생성 트랜잭션 실행
 function createTable() {
    db.transaction(function(tr){
        var createSQL = 'create table if not exists exhibit(id integer primary key autoincrement, name varchar(20) not null unique, type varchar(20), region varchar(20), phone varchar(20), address varchar(30), memo varchar(200), pic varchar(50))';

       tr.executeSql(createSQL, [], function(){
          console.log('2_1_테이블생성_sql 실행 성공...');
       }, function(){
          console.log('2_1_테이블생성_sql 실행 실패...');
       });
    }, function(){
                console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
    }, function(){
                console.log('2_2_테이블 생성 트랜잭션 성공...');
    });
 }

 // 데이터 입력 트랜잭션 실행
 function insertExhibit(){
    db.transaction(function(tr){
        var name = $('#exhibitName1').val();
        var type = $('#exhibitType1').val();
        var region = $('#exhibitRegion1').val();
        var phone = $('#exhibitPhone1').val();
        var address = $('#exhibitAddress1').val();
        var memo = $('#exhibitMemo1').val();
        var pic = $('#exhibitPic1').val();
        var insertSQL = 'insert into exhibit(name, type, region, phone, address, memo, pic) values(?,?,?,?,?,?,?)';
        tr.executeSql(insertSQL, [name, type, region, phone, address, memo, pic], function(tr, rs){
             console.log('3_ 전시회 등록...no: ' + rs.insertId);
             alert('전시회 명 ' + $('#exhibitName1').val() + ' 이(가) 입력되었습니다');
             $('#exhibitType1').val('미정').attr('selected', 'selected');
             $('#exhibitType1').selectmenu('refresh');
             $('#exhibitRegion1').val('미정').attr('selected', 'selected');
             $('#exhibitRegion1').selectmenu('refresh');

        	 form1.reset();
        }, function(){
            alert('전시회 명 ' + $('#exhibitName1').val() + ' 이(가) 입력 실패하였습니다');
         });
    });
 }
 
  // 전시회 목록 동적 구성을 위한 데이터 검색 트랜잭션 실행
function selectExhibitList() {
  	db.transaction(function(tr){
		var i, count, tagList='';   
	    var	sType = $('#exhibitType3').val();  	 
	    var	sRegion = $('#exhibitRegion3').val();  
	    var selectSQL = 'select name, type, region, phone, address, memo, pic  from exhibit where type like ? and region like ?'; 	     	
	  	tr.executeSql(selectSQL, [sType, sRegion], function(tr, rs){    
   			console.log(' 전시회 조회... ' + rs.rows.length + '건.');  
   			recordSet = rs;
			count = rs.rows.length;
			if(count > 0) {
				tagList = '<li data-role="list-divider">전시회 목록' + '<span style="float:right">'+count+'건'+'</span></li>';				
			    for( i = 0; i < count; i += 1) {			
					tagList += '<li><a onclick="displayExhibitInfo(' + i + ');">';
					tagList += '<img class="my_listview_img" src="' + rs.rows.item(i).pic + '">';              					
					tagList += '<h2>' + rs.rows.item(i).name + '</h2>';
					tagList += '<p>' + rs.rows.item(i).type + '</p>';
					tagList += '<p>' + rs.rows.item(i).address + '</p></a></li>';					
			    }	
			    $('#exhibitListArea').html(tagList);
			    $('#exhibitListArea').listview('refresh');
			} else {
			  	navigator.notification.alert('검색 결과 없음', null, '맛집 검색 실패');
			}
		});
	});
}

  // 데이터 삭제 트랜잭션 실행
 function deleteExhibit(){
   db.transaction(function(tr){
	  var name = varExhibitName;   
 	  var deleteSQL = 'delete from exhibit where name = ?';      
	  tr.executeSql(deleteSQL, [name], function(tr, rs){    
	     console.log('6_전시회 삭제... ');   
	     alert('전시회 명 ' + varExhibitName + ' 이(가) 삭제되었습니다');   	     
             $('#exhibitType2').val('미정').attr('selected', 'selected'); 
             $('#exhibitType2').selectmenu('refresh'); 
             $('#exhibitRegion2').val('미정').attr('selected', 'selected'); 
             $('#exhibitRegion2').selectmenu('refresh');
        	 form2.reset();        
      }, function(){
          alert('맛집명 ' + $('#exhibitName1').val() + ' 이(가) 삭제 실패하였습니다');                   	 
	  });
   });         
 } 
