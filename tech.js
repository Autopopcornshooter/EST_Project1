// async function loadHomeContent(){
//     try{
//         const loadHtml= await fetch("secondNavbar.html");
//         const navBarData=loadHtml.text();

//         document.body.innerHTML+=navBarData;

//         const loadContentCard=await fetch("content-card.html");
//         const cardData=loadContentCard.text();

//         //document.getElementById("contentArea").innerHTML +=cardData;
//     }
//     catch{
//         console.error("컨텐츠를 불러올 수 없습니다",error);
//     }
// }
// async function loadSubscribeContent(){
//     try{
//         const loadHtml= await fetch("subscribeElement.html");
//         const navBarData=loadHtml.text();

//         document.body.innerHTML+=navBarData;

//         const loadContentCard=await fetch("content-card.html");
//         const cardData=loadContentCard.text();

//         document.getElementById("contentArea").innerHTML +=cardData;
//     }
//     catch{
//         console.error("컨텐츠를 불러올 수 없습니다",error);
//     }
// }

function loadMainPage() {
    fetch("secondNavbar.html")
        .then(res => res.text())    //받아온 데이터를 텍스트로 파싱(분석) 과정
        .then(data => {             //data : text로 파싱된 데이터
            document.body.innerHTML += data;
            //문서에 데이터 삽입(target은 목표 div)
        })
        .catch(err => console.error("불러오기 실패:", err));
    //실패한다면 오류 캐치
    loadContentCard();
}

function loadSubscribePage() {
    fetch("subscribeElement.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("contentArea").innerHTML += data;
        })
        .catch(err => console.error("불러오기 실패:", err));
        loadContentCard();
}
function loadContentCard() {
    fetch("content-card.html")
        .then(res => res.text())    //받아온 데이터를 텍스트로 파싱(분석) 과정
        .then(data => {             //data : text로 파싱된 데이터
            document.getElementById("contentArea").innerHTML += data;
            //문서에 데이터 삽입(target은 목표 div)
        })
        .catch(err => console.error("불러오기 실패:", err));
    //실패한다면 오류 캐치
}

loadMainPage();

//html 파일 코드 불러오기
//첫번째 then은 데이터 파싱, 두번째 then은 데이터 활용