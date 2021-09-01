const loadingBlockDiv = document.createElement('div');
loadingBlockDiv.insertAdjacentHTML("afterbegin", `
  <div class="load_data" style="display: block;">
    <h1>Yuklanmoqda...</h1>
  </div>
`);
const body = document.querySelector('body');
body.appendChild(loadingBlockDiv);

setTimeout(() => {
  loadingBlockDiv.parentNode.removeChild(loadingBlockDiv);
    //! Global Variables  
    let images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    const boxes = document.getElementById("boxes");
    const carts_size = images.length;
    let clicks = 0;
    let trueAnswered = 0;
    const header = document.querySelector('.header');
    //! Functions
    function sortArrayRandomly(arr) {
      arr = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
      return arr;
    }
    function renderBoxes() {
      let previousCard = undefined; 
      const click_count = document.getElementById('click_count');
      for (let i = 0; i < carts_size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
          <div class="front" data-id="${i+1}" style="background-image: url(./images/${images[i]}.png);"></div>   
          <div class="back" data-id="${i+1}" style="background-image: url(./images/back.jpg);"></div>
        `;
        box.addEventListener("click", () => {
          
          //* box => birinchi bosilgan card
          //* previousCard => ikkinchi bosilgan card
          if (!box.classList.contains("show")) {
            box.classList.add("show")
            clicks ++;
          }
          if (!previousCard) {
            previousCard = box;
          }
          else {
            const previousCardImage = getUrlOfImage(previousCard.firstElementChild);
            const currentCardImage = getUrlOfImage(box.firstElementChild);
            if (previousCardImage !== currentCardImage) {
              const debugSetTimeOut = previousCard;
              setTimeout(() => {
                box.classList.remove('show');
                debugSetTimeOut.classList.remove('show');
              }, 300);
            }
            else if (box.firstElementChild.dataset.id === previousCard.firstElementChild.dataset.id) {
              box.classList.remove('show');
              previousCard.classList.remove('show');
            }
            else {
              trueAnswered++;
              console.log(trueAnswered);;
            }
            previousCard = undefined;
          }
          if (trueAnswered === 8) {
            header.innerText = `You Win! You clicked ${clicks} times!`;
          }
            click_count.innerText = clicks;
        })
        boxes.appendChild(box);
      }
    }
    function getUrlOfImage(element) {
      let prop = window.getComputedStyle(element).getPropertyValue('background-image');
      let re = /url\((['"])?(.*?)\1\)/gi;
      let matches;
      while ((matches = re.exec(prop)) !== null) {
        return matches[2];
      }
    }
    function startApp() {
      sortArrayRandomly(images);
      renderBoxes();
    }
    startApp();
}, 30000);
