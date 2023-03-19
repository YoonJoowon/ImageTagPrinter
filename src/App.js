// 1. case
// // Unsplash API에서 이미지를 가져오는 함수
// async function getRandomImage() {
//   const accessKey = 'YOUR_ACCESS_KEY';
//   const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&per_page=30`);
//   const data = await response.json();
//   return data.urls.regular;
// }

// // HTML에서 이미지를 보여주는 img 태그
// const imgElement = document.querySelector('#image');

// // 버튼 클릭 이벤트 리스너 등록
// const buttonElement = document.querySelector('#button');
// buttonElement.addEventListener('click', async () => {
//   try {
//     // Unsplash API에서 랜덤 이미지 가져오기
//     const imageUrl = await getRandomImage();

//     // 이미지 태그의 src 속성을 업데이트하여 이미지 보여주기
//     imgElement.src = imageUrl;
//   } catch (error) {
//     console.error(error);
//   }
// });


// "use strict"

// // const dataModule = (function() {

// //   const DOM = {
// //     addTag: document.querySelector('.addTag'),
// //     container: document.querySelector('.container'),
// //     tagContainer: document.querySelector('.container__tag'),
// //     tags: document.querySelectorAll('.tag'),
// //   };

// //   return {
    
// //     getDOM() {
// //       return DOM;
// //     },

// //   }
// // })();


const controller = (function() {

  const tagHTML = function (keyword, [R, G, B]) {
    return `<article style="background-color: rgba(${R}, ${G}, ${B}, 0.7);" class="tag" data-keyword="${keyword}">#${keyword}</article>`
  };

  const randomRGB = function(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }

  const getRandomRGB = function(min, max) {
    let arrRGB = [];
    arrRGB.push(randomRGB(min, max));
    arrRGB.push(randomRGB(min, max));
    arrRGB.push(randomRGB(min, max));
    return arrRGB;
  }

  return {

    searchByTag(keyword) {
      fetch(`https://source.unsplash.com/featured/?${keyword.toLowerCase()}`)
      .then((response) => {
        document.body.style.backgroundImage = `url(${response.url})`;
      });
    },

    addNewTag(target, parentNode) {
      const newColor = getRandomRGB(180, 230);
      const newHTML = tagHTML(target.value, newColor);
      parentNode.insertAdjacentHTML('beforeend', newHTML);
      this.searchByTag(target.value);
      target.value = '';
      target.focus();
    },

  }

})();




// const UIController = (function() {

//   const DOM = dataModule.getDOM();
//   DOM.tagContainer.addEventListener('click', event => {
//     if (!event.target.classList.contains('tag')) return;
//     const keyword = event.target.dataset.keyword;
//     controller.searchByTag(keyword)
//   });

//   DOM.addTag.addEventListener('keydown', e => {
//     if (e.key === 'Enter') {
//       controller.addNewTag(e.target, DOM.tagContainer);
//     }
//   })

//   DOM.addTag.focus();

// })();


// const msg = "%cWonkook Lee ⓒ oneook";
// const css = "font-size: 2em; color: #FEDC45; background-color: #000;font-family: 'Libre Baskerville', serif;";
// console.log(msg, css);
