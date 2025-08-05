// 페이지 로드 완료 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function () {
    console.log('이벤트 핸들러 초기화 시작');

    // 동적으로 로드되는 요소들에 대한 이벤트 위임 사용
    //클릭 이벤트 동작
    document.addEventListener('click', function (event) {
        const target = event.target;

        // 사이드바 구독 버튼 클릭 (구독 페이지로 이동)
        if (target.id === 'link-subscribed-btn') {
            event.preventDefault();
            console.log('구독 페이지로 이동');
            handleSubscribePageNavigation();
        }
        else if (target.id === 'content-btn') {
            event.preventDefault();
            console.log('영상 재생 페이지로 이동');
            const object = target.closest(".video-card");
            console.log(object);
            window.location.href = `../layout/video.html?videoId=${object.dataset.videoId}`
            //handlePlayScreenNavigation();
        }
        else if (target.id === 'expand_description') {
            event.preventDefault();
        }
        // 댓글 취소 버튼 클릭
        else if (target.id === 'comment-cancel') {
            event.preventDefault();
            console.log('댓글 작성 취소');
            handleCommentCancel();
        }

    });

    document.addEventListener('submit', function (event) {
        const target = event.target;
        if (target.id === "comments-form") {
            event.preventDefault();
            console.log('댓글 작성 버튼 클릭');
            handleCommentSubmit(target);
        }
    })
});
//----------------댓글작성이벤트 추가----------------

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


async function handleCommentSubmit(target) {
    const inputEl = target.querySelector("#input-comment");
    const commentInput=inputEl.value.trim();
    if(!commentInput){
        alert("댓글을 입력하세요");
        return;
    }
    const module = await import("./pageLayout.js");
    await module.addVideoComment(commentInput);
    console.log(commentInput);
    console.log("댓글 작성 완료");
    inputEl.value="";
}
// 댓글 작성 취소 함수
function handleCommentCancel() {
    const commentInput = document.getElementById('input-comment');
    commentInput.value = '';
    console.log('댓글 작성이 취소되었습니다.');
}


