// 페이지 로드 완료 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    console.log('이벤트 핸들러 초기화 시작');
    
    // 동적으로 로드되는 요소들에 대한 이벤트 위임 사용
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // 사이드바 구독 버튼 클릭 (구독 페이지로 이동)
        if (target.id === 'link-subscribed-btn') {
            event.preventDefault();
            console.log('구독 페이지로 이동');
            handleSubscribePageNavigation();
        }
        
        // 홈 버튼 클릭
        else if (target.id === 'link-home-btn' ) {
            event.preventDefault();
            console.log('홈 페이지로 이동');
            handleHomeNavigation();
        }
        //컨텐츠 카드 클릭-영상 재생
        else if(target.id==='content-btn'){
            event.preventDefault();
            console.log('영상 재생 페이지로 이동');
            const object=target.closest(".content-card");
            handlePlayScreenNavigation(object);
        }
    });
});

// 구독 페이지로 이동하는 함수
async function handleSubscribePageNavigation() {
    try {
        const module = await import("./pageLayout.js");
        await module.getSubscribePage();
        console.log('구독 페이지 로드 완료');
    } catch (error) {
        console.error('구독 페이지 로드 실패:', error);
    }
}

// 홈 페이지로 이동하는 함수
async function handleHomeNavigation() {
    try {
        const module = await import("./pageLayout.js");
        await module.getMainPage();
        console.log('홈 페이지 로드 완료');
    } catch (error) {
        console.error('홈 페이지 로드 실패:', error);
    }
}

async function handlePlayScreenNavigation(object) {
    try {
        const module = await import("./pageLayout.js");
        await module.getVideoPlayPage(object);
        console.log('영상 재생 페이지 로드 완료');
    } catch (error) {
        console.error('영상 재생 페이지 로드 실패:', error);
    }
}