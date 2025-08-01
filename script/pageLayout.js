function addElement(file_location, target_tag) {
    return fetch(file_location)
        .then(res => res.text())
        .then(data => {
            target_tag.innerHTML += data;
        })
        .catch(err => console.error("불러오기 실패:", err));

}

export async function getMainPage() {
    document.getElementById("fetch-area").replaceChildren();
    await load_secondNavbar();
    await load_sidebar();
    await load_indexLayout();
    await renderingContentCards();

    // 콘텐츠 영역이 생성된 후 카드들 추가
}

export async function getSubscribePage() {
    document.getElementById("fetch-area").replaceChildren();
    await load_subscribeLayout();
    await load_sidebar();
    await load_indexLayout();
    renderingContentCards();

}
export async function getVideoPlayPage(video) {
    await getVideoData(video);
    document.getElementById("fetch-area").replaceChildren();
    await load_playScreenLayout();
}

async function load_sidebar() {
    await addElement('../element/sidebar.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
async function load_secondNavbar() {
    await addElement('../element/secondNavbar.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
async function load_indexLayout() {
    await addElement('../layout/indexLayout.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
async function load_subscribeLayout() {
    await addElement('../layout/subscribeLayout.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}

async function load_playScreenLayout() {
    await addElement('../layout/playScreenLayout.html', document.getElementById("fetch-area"));
    await waitForElement("#fetch-area");
}
async function renderingContentCards(){
    fetch("../data/contentsData.json")
    .then(res=>res.json())
    .then(dataList=>{
        dataList.forEach(videoData=>{
            load_contentCard(videoData);
        });
    });
}

async function load_contentCard(videoData) {
    await addElement("../element/content-card.html", document.getElementById("contentArea"));
    await waitForElement("#contentArea");

    const cards=document.querySelectorAll(".video-card");
    const newCard=cards[cards.length-1];
    await setVidioData(videoData, newCard);
}

async function setVidioData(data, card){
    card.dataset.imbedLink=data._imbedLink;
    card.dataset.thumbnail=data._thumbnail;
    card.dataset.channel=data._channel;
    card.dataset.channelName=data._channelName;
    card.dataset.channelIcon=data._channelIcon;
    card.dataset.title=data._title;
    card.dataset.subscriber=data._subscriber;
    card.dataset.like=data._like;
    card.dataset.view=data._view;
    card.dataset.date=data._date;
}
async function load_listCard(videoData) {
    await addElement('../element/list-card.html', document.getElementById("content-list"));
    await waitForElement("#content-list");
}



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
