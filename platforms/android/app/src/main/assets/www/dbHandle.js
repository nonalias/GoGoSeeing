// 데이터베이스 생성 및 열기
function openDB(){
   db = window.openDatabase('exhibitDB', '1.0', '전시회DB', 1024*1024);
   console.log('1_DB 생성...');
}

// 테이블 생성 트랜잭션 실행
 function createTable() {
    db.transaction(function(tr){
        var createSQL = 'create table if not exists exhibit(
          id integer primary key autoincrement,
          name varchar(20) not null unique,
          type varchar(20),
          region varchar(20),
          phone varchar(20),
          address varchar(30),
          memo varchar(200),
          pic varchar(50)
        )';

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
        var insertSQL = 'insert into cafe(name, type, region, phone, address, memo, pic) values(?,?,?,?,?,?,?,?)';
        tr.executeSql(insertSQL, [name, type, region, phone, address, memo, pic], function(tr, rs){
             console.log('3_ 맛집 등록...no: ' + rs.insertId);
             alert('맛집명 ' + $('#exhibitName1').val() + ' 이(가) 입력되었습니다');
             $('#exhibitType1').val('미정').attr('selected', 'selected');
             $('#exhibitType1').selectmenu('refresh');
             $('#exhibitRegion1').val('미정').attr('selected', 'selected');
             $('#exhibitRegion1').selectmenu('refresh');

        	 form1.reset();
        }, function(){
            alert('맛집명 ' + $('#exhibitName1').val() + ' 이(가) 입력 실패하였습니다');
         });
    });
 }
