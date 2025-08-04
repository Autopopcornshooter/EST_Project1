init();

async function init() {
const module = await import("./pageLayout.js");
module.getVideoPlayPage();
}
