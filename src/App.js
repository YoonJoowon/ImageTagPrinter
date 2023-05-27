const unplashImageNone =
  "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
const insteadUnplashImageNone =
  "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https:%2F%2Fblog.kakaocdn.net%2Fdn%2FWddvk%2FbtqAqhHHM3k%2F6hAu4NLbmUqKfR2SVJ4bM1%2Fimg.png";

const images = Array.from(document.querySelectorAll(".image")).map((image) => image);

// 모듈 내에서 DOM 요소를 가져오는 코드
const dataModule = (function () {
  const DOM = {
    addTag: document.querySelector(".addTag"),
    container: document.querySelector(".container"),
    tagContainer: document.querySelector(".container_tag"),
    tags: document.querySelectorAll(".tag"),
  };

  return {
    getDOM() {
      return DOM;
    },
  };
})();

let currentIndex = 0;
function showNextImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}

// 실행 컨트롤러
function tagHTML(keyword, [R, G, B]) {
  return `<article style="background-color: rgba(${R}, ${G}, ${B}, 0.7);" class="tag" data-keyword="${keyword}">#${keyword}</article>`;
}

// 사진 추가
const DOM = dataModule.getDOM();

async function searchByTag(event, keyword) {
  try {
    const response = await fetch(
      `https://source.unsplash.com/featured/?${keyword.toLowerCase()}`
    );
    let imageUrl = response.url;
    if (response.url.toString() === unplashImageNone) {
      imageUrl = insteadUnplashImageNone;
    }
    images[currentIndex].src = imageUrl;
    images[currentIndex].alt = keyword;
    images[currentIndex].addEventListener("load", () => {
      document.body.style.backgroundImage = `url(${imageUrl})`;
    });
  } catch (error) {
    // 오류 처리
  } finally {
    showNextImage();
  }
}

DOM.tagContainer.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("tag")) return;
  const keyword = event.target.dataset.keyword;
  await searchByTag(null, keyword);
});

// 태그 추가
async function addNewTag(target, parentNode) {
  const newColor = getRandomRGB(180, 230);
  const newHTML = tagHTML(target.value, newColor);
  parentNode.insertAdjacentHTML("beforeend", newHTML);
  await searchByTag(null, target.value);
  target.value = "";
}

DOM.addTag.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await addNewTag(e.target, DOM.tagContainer);
  }
});

function randomRGB(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

function getRandomRGB(min, max) {
  let arrRGB = [];
  arrRGB.push(randomRGB(min, max));
  arrRGB.push(randomRGB(min, max));
  arrRGB.push(randomRGB(min, max));
  return arrRGB;
}

// 이미지 저장 버튼 관리
const button = document.getElementById("export");
const body = document.body;

button.addEventListener("click", () => {
  const backgroundImageUrl = getComputedStyle(body)
    .backgroundImage.slice(4, -1)
    .replace(/"/g, "");
  const link = document.createElement("a");
  link.href = backgroundImageUrl;
  link.download = "background.jpg";

  const popup = window.open("", "popup", "width=1280, height=860");
  popup.document.write('<img src="' + link.href + '" width="100%" />');
});
