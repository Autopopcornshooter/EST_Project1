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
    await setVidioData(current_videoData);
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

    const cards=getElbyClass("video-card");
    const newCard=cards[cards.length-1];
    await setVidioData(videoData, newCard);
}

async function load_listCard(videoData) {
    await addElement('../element/list-card.html', document.getElementById("content-list"));
    await waitForElement("#content-list");
}

function getElbyClass(target) {
    return document.querySelectorAll(target);
}
function getElbyId(target) {
    return document.getElementById(target);
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
function getVideoData(item) {
    current_videoData._link = item.dataset.link;
    current_videoData._imbedLink = item.dataset.imbedLink +"&autoplay=1&mute=0";
    current_videoData._thumbnail = item.dataset.thumbnail;
    current_videoData._channel = item.dataset.channel;
    current_videoData._channelIcon = item.dataset.channelIcon;
    current_videoData._title = item.dataset.title;
    current_videoData._channelName = item.dataset.channelName;
    current_videoData._subscriber = item.dataset.subscriber;
    current_videoData._like = item.dataset.like;
    current_videoData._view = item.dataset.view;
    current_videoData._date = item.dataset.date;
    
    console.log(current_videoData);
}


function setVidioData(data,container) {
    if(container.getElementById("#data-container")){
    const dataContainer = container.getElementById("#data-container");
    dataContainer.dataset.link=data._link;
    dataContainer.dataset.imbedLink=data._imbedLink;
    dataContainer.dataset.thumbnail = data._thumbnail;
    dataContainer.dataset.channel = data._channel;
    dataContainer.dataset.channelIcon = data._channelIcon;
    dataContainer.dataset.title = data._title;
    dataContainer.dataset.channelName = data._channelName;
    dataContainer.dataset.subscriber = data._subscriber;
    dataContainer.dataset.like = data._like;
    dataContainer.dataset.view = data._view;
    dataContainer.dataset.date = data._date;
    }

    if(getElbyId("#iframe-area")){
    getElbyId("#iframe-area").setAttribute("src", data._imbedLink);
    }

    getElbyClass("thumbnail").forEach(item => {
        item.setAttribute("src", data._thumbnail);
    });
    getElbyClass("channel-link").forEach(item => {
        item.setAttribute("href", data._channel);
    });
    getElbyClass("channel-icon").forEach(item => {
        item.setAttribute("src", data._channelIcon);
    })
    getElbyClass("content-title").forEach(item => {
        item.innerHTML = data._title;
    });
    getElbyClass("channel-name").forEach(item => {
        item.innerHTML = data._channelName;
    });
    getElbyClass("subscriber").forEach(item => {
        item.innerHTML = data._subscriber;
    });
    getElbyClass("like-count").forEach(item => {
        item.innerHTML = data._like;
    });
    getElbyClass("view-count").forEach(item => {
        item.innerHTML = data._view;
    });
    getElbyClass("update-time").forEach(item => {
        item.innerHTML = formatRelativeTime(data._date);
    });
}

const current_videoData = {
    _link: "",
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

const data1 = {
    _link: "https://www.youtube.com/watch?v=4xz9zhEuC84",
    _imbedLink: "https://www.youtube.com/embed/4xz9zhEuC84?si=N7Yb8ehKVoHC4gsD",
    _thumbnail: "https://img.youtube.com/vi/4xz9zhEuC84/maxresdefault.jpg",
    _channel: "https://www.youtube.com/@user-pq8xn3oq9y",
    _channelIcon: "https://yt3.googleusercontent.com/OFaRlmp8TmuR0OS9qylx_DVTtBUYNFFv5bXeRWoNsSPRE9H5J-yanXxOozamsW45lNcaegCj6CM=s160-c-k-c0x00ffffff-no-rj",
    _title: "여름에 먹는 별미! 걸쭉한 콩국수와 핫치즈빅싸이순살 먹방~!! Kongmulguksu, Yangnyeom Chicken",
    _channelName: "떵개떵",
    _subscriber: "구독자 526만명",
    _like: "1.2천",
    _view: "32,442회",
    _date: "2025-07-30"
}