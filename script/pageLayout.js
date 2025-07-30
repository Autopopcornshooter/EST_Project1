

export function load_mainPageLayout() {
    fetch("../element/secondNavbar.html")
        .then(res => res.text())    //받아온 데이터를 텍스트로 파싱(분석) 과정
        .then(data => {             //data : text로 파싱된 데이터
            document.body.innerHTML += data;
            //문서에 데이터 삽입(target은 목표 div)
            load_sidebar();
            load_mainContentArea();
        })
        .catch(err => console.error("불러오기 실패:", err));


    //실패한다면 오류 캐치
}
export function load_subscribePageLayout() {
    fetch("../layout/subscribeLayout.html")
        .then(res => res.text())
        .then(data => {
            document.body.innerHTML += data;
            load_sidebar();
            load_mainContentArea();
        })
        .catch(err => console.error("불러오기 실패:", err));
}
export function load_playScreenLayout() {
    fetch("../layout/playScreenLayout.html")
        .then(res => res.text())
        .then(data => {
            document.body.innerHTML += data;
            load_listCard();
            load_listCard();
            load_listCard();
            load_listCard();
        })
        .catch(err => console.error("불러오기 실패:", err));
}
function load_sidebar() {
    fetch("../element/sidebar.html")
        .then(res => res.text())
        .then(data => {
            document.body.innerHTML += data;
        })
        .catch(err => console.error("불러오기 실패:", err));
}
function load_mainContentArea() {
    fetch("../layout/indexLayout.html")
        .then(res => res.text())
        .then(data => {
            document.body.innerHTML += data;
            load_contentCard();
        })
        .catch(err => console.error("불러오기 실패:", err));
}


function load_contentCard() {
    fetch("../element/content-card.html")
        .then(res => res.text())    //받아온 데이터를 텍스트로 파싱(분석) 과정
        .then(data => {             //data : text로 파싱된 데이터
           document.getElementById("contentArea").innerHTML += data;
            //문서에 데이터 삽입(target은 목표 div)
        })
        .catch(err => console.error("불러오기 실패:", err));
    //실패한다면 오류 캐치
}
function load_listCard() {
    fetch("../element/list-card.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("content-listSide").innerHTML += data;
        })
        .catch(err => console.error("불러오기 실패:", err));
}

//html 파일 코드 불러오기
//첫번째 then은 데이터 파싱, 두번째 then은 데이터 활용