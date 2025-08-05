//------------------지정 위치에 html문 추가----------------------
function addElement(file_location, target_tag) {
    return fetch(file_location)
        .then(res => res.text())
        .then(data => {
            target_tag.innerHTML += data;
        })
        .catch(err => console.error("불러오기 실패:", err));

}
//------------요소 로딩 대기-------------------
async function waitForElement(selector) {
    return new Promise(resolve => {
        function check() {
            if (document.querySelector(selector)) {
                resolve();
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}

//----------------홈페이지 로드------------------
export async function getMainPage() {
    document.getElementById("fetch-area").replaceChildren();
    await load_navbar();
    await load_secondNavbar();
    await load_sidebar();
    await load_indexLayout();
    await fetchContentCards();

    // 콘텐츠 영역이 생성된 후 카드들 추가
}
//----------------구독 페이지 로드------------------
export async function getSubscribePage() {
    document.getElementById("fetch-area").replaceChildren();
    await load_navbar();
    await load_subscribeLayout();
    await load_sidebar();
    await load_indexLayout();
    await fetchContentCards();

}
//----------------영상 재생 페이지 로드------------------
export async function getVideoPlayPage() {
    //----별도 video.html 로드----
    await load_navbar();
    await load_offcanvasSidebar();
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("videoId");
    console.log(videoId);
    await load_playScreenLayout(videoId);
    await fetchListCards();
}
export async function addVideoComment(comment) {
    const username = "자동팝콘발사기";
    const date = new Date();
    await waitForElement("#comments-list");
    const target = document.getElementById("comments-list");
    const commentEl = `<div class="d-flex gap-3">
                            <img src="https://yt3.ggpht.com/a_J71DucErxPy5kQ3CGhVYmkpoim77YN9-1J76xrBm0eLpVtnVV4e3IFM-zj8x-VUYwiBxA3vg=s108-c-k-c0x00ffffff-no-rj"
                                class="icon" alt="user icon">
                            <div style="flex:auto;">
                                <div class="d-flex align-items-center gap-2" style="margin-bottom: 0.5rem;">
                                    <span id="userName"
                                        style="color: white; font-weight: 500; font-size: 0.9rem;">${username}</span>
                                    <span id="timeStamp" style="color: gray; font-size: 0.8rem;">방금 전</span>
                                </div>
                                <p id="commentText" style="color: white; margin: 0; line-height: 1.4;">${comment}</p>
                                <div class="d-flex gap-3" style="margin-top: 0.5rem;">
                                    <a class="btn custom-btn" style="padding: 0.2rem 0.5rem;">
                                        <i class="bi bi-hand-thumbs-up"></i> <span style="font-size: 0.8rem;"></span>
                                    </a>
                                    <button class="btn custom-btn" style="padding: 0.2rem 0.5rem;">
                                        <i class="bi bi-hand-thumbs-down"></i>
                                    </button>
                                    <button class="btn custom-btn"
                                        style="display: inline; padding: 0.2rem 0.5rem; font-size: 0.8rem; width:3rem;">답글</button>
                                </div>
                            </div>
                        </div>`;
    target.innerHTML += commentEl;
}
//--------------------------영상 재생 페이지 우측 리스트 카드 출력 로드------------------------
async function load_listCard(videoData) {
    await waitForElement("#content-listSide");

    const target = document.getElementById("content-listSide");
    const listCardEl = 
                `<div class="custom-card d-flex video-card" style="position:relative; width:100%; height:7rem; margin-top:1rem;margin-bottom:1rem;"
                    id="data-container" data-video-id=${videoData._videoId}>
                    <a class="btn main-link" id="content-btn"
                        style="box-sizing: border-box; position:absolute; width:inherit;height:inherit;"></a>

                    <div class="col" style="width:inherit;height:inherit;">
                        <img class="thumbnail" src=${videoData._thumbnail}
                            style="height:inherit; background-size:cover; aspect-ratio: 16/9; border-radius: 10px;">

                    </div>
                    <div class="col">
                        <h5 class="content-title" style="color: white; font-size:small;">${videoData._title}</h5>
                        <span class="card-text channel-name" style="font-size:smaller;">${videoData._channelName}</span><br>
                        <span class="card-text view-count" style="font-size:smaller">${videoData._view}</span>
                        <span class="card-text bi bi-dot" style="font-size:smaller"></span>
                        <span class="card-text update-time" style="font-size:smaller">${formatRelativeTime(videoData._date)}</span>
                    </div>
                </div>`;
                target.innerHTML+=listCardEl;

}
//----------------사이드바 로드------------------
async function load_sidebar() {
    await addElement('../element/sidebar.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
//----------------오프캔버스 사이드바 로드------------------
async function load_offcanvasSidebar() {
    await addElement('../element/offcanvasSidebar.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
    const el = document.getElementById('offcanvasSidebar');
}
//----------------네비게이션바-1 로드------------------
async function load_navbar() {
    await addElement('../EST_Project1/element/navbar.html', document.getElementById("default-area"));
    await waitForElement("#default-area");
}
//----------------네비게이션바-2 로드------------------
async function load_secondNavbar() {
    await addElement('../element/secondNavbar.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
//----------------index 레이아웃 로드------------------
async function load_indexLayout() {
    await addElement('../indexLayout.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
//----------------구독 레이아웃 로드------------------
async function load_subscribeLayout() {
    await addElement('../subscribeLayout.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
//----------------영상재생 레이아웃 로드------------------
async function load_playScreenLayout(videoId) {
    await waitForElement("#fetch-area");
    await addElement('../playScreenLayout.html', document.getElementById("fetch-area"));
    await setVideoPageElement(videoId);
}

//----------------영상재생 요소 데이터 입력---------------
async function setVideoPageElement(videoId) {
    const playside = document.getElementById("content-playSide");
    const data = await fetch("../data/contentsData.json")
        .then(res => res.json())
        .then(dataList => {
            return dataList.find(element => element._videoId === videoId);
        });
        
    console.log(data._videoId);
    playside.querySelector("#iframe-area").setAttribute("src", `${data._imbedLink}&autoplay=1&mute=1`);
    playside.querySelector("#content-title").innerHTML = data._title;

    playside.querySelectorAll(".channel-icon").forEach(el => {
        el.setAttribute("src", data._channelIcon);
    });
    playside.querySelectorAll(".channel-link").forEach(el => {
        el.setAttribute("href", data._channel);
    });
    playside.querySelectorAll(".channel-name").forEach(el => {
        el.innerHTML = data._channelName;
    });
    playside.querySelectorAll(".subscriber").forEach(el => {
        el.innerHTML = data._subscriber;
    });
    playside.querySelectorAll(".view-count").forEach(el => {
        el.innerHTML = '조회수 ' + data._view;
    });
    playside.querySelectorAll(".update-time").forEach(el => {
        el.innerHTML = formatRelativeTime(data._date);
    });
    playside.querySelector(".video-description").innerHTML = data._description + " ...더보기";
    playside.querySelector(".like-count").innerHTML = data._like;

    // 댓글 로드
    await loadVideoComments(videoId);
}
async function loadVideoComments(videoId) {

}

//----------------댓글 HTML 요소 생성 함수------------------

//----------------Json에서 컨텐츠카드 데이터 fetch------------------
async function fetchContentCards() {
    fetch("../data/contentsData.json")
        .then(res => res.json())
        .then(dataList => {
            dataList.forEach(videoData => {
                load_contentCard(videoData);
            });
        });
}
//----------------Json에서 리스트(컨텐츠)카드 데이터 fetch------------------
async function fetchListCards() {
    fetch("../data/contentsData.json")
        .then(res => res.json())
        .then(dataList => {
            dataList.forEach(videoData => {
                load_listCard(videoData);
            });
        });

}

//----------------카드 목록에 카드 추가------------------
async function load_contentCard(videoData) {
    await waitForElement("#contentArea");
    const obj = await addElement("../element/content-card.html", document.getElementById("contentArea"));

    const cards = document.querySelectorAll(".video-card");
    const newCard = cards[cards.length - 1];
    newCard.dataset.videoId = cards.length - 1;
    setContentCardElement(newCard, videoData);
}




//----------------Json에서 id로 카드 불러와 카드에 데이터 입력------------------
async function setContentCardElement(object, videoData) {
    object.querySelector(".thumbnail").setAttribute("src", videoData._thumbnail);
    object.querySelector(".channel-href").setAttribute("href", videoData._channel);
    object.querySelector(".channel-icon").setAttribute("src", videoData._channelIcon);
    object.querySelector(".content-title").innerHTML = videoData._title;
    object.querySelector(".channel-name").innerHTML = videoData._channelName;
    object.querySelector(".view-count").innerHTML = videoData._view;
    object.querySelector(".update-time").innerHTML = formatRelativeTime(videoData._date);
}



function formatRelativeTime(dateInput) {
    const now = new Date();
    const past = new Date(dateInput);

    const diffTime = now - past; // 밀리초 차이
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays < 30) {
        return `${diffDays}일 전`;
    } else if (diffMonths < 12) {
        return `${diffMonths}개월 전`;
    } else {
        return `${diffYears}년 전`;
    }
}

const current_videoData = {
    _imbedLink: "",
    _thumbnail: "",
    _channel: "",
    _channelIcon: "",
    _title: "",
    _channelName: "",
    _subscriber: "",
    _like: "",
    _view: "",
    _date: ""
}
