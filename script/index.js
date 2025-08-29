let count = 0;
let coins = 100;
let historyData = [];

// heart icon functionality

const countValue = document.getElementById("heart-count");
const heartBtns = document.querySelectorAll(".heart-btn");

for (let i = 0; i < heartBtns.length; i++) {
  heartBtns[i].addEventListener("click", function () {
    count++;
    countValue.innerText = count;
  });
}

// function to get coin update
function updateCoin() {
  document.getElementById("coin-count").innerText = coins;
}

// call button functionality

function callHandle(card) {
  const btn = card.querySelector(".call-btn");
  const serviceName = card.querySelector(".service-name").innerText;
  const serviceNumber = card.querySelector(".service-number").innerText;

  btn.addEventListener("click", function () {
    if (coins < 20) {
      alert("Not enough coins to make a call");
      return;
    }

    coins = coins - 20;
    updateCoin();

    alert("📞" + "Calling " + serviceName + " at " + serviceNumber + "...");

    const data = {
      name: serviceName,
      number: serviceNumber,
      date: new Date().toLocaleTimeString(),
    };

    historyData.push(data);

    const historyContainer = document.getElementById("history-container");
    historyContainer.innerHTML = "";

    for (let data of historyData) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="p-4">
            <div
              class="flex justify-between items-center p-5 bg-[#fafafa] rounded-lg"
            >
              <div>
                <h2 class="text-sm font-semibold">${data.name}</h2>
                <p class="text-sm text-[#5C5C5C]">${data.number}</p>
              </div>
              <h2 class="text-[10px]">${data.date}</h2>
            </div>
          </div>
      `;
      historyContainer.appendChild(div);
    }

    const clearBtn = document.getElementById("clear-btn");
    clearBtn.addEventListener("click", function () {
      historyData = [];

      const historyContainer = document.getElementById("history-container");
      historyContainer.innerHTML = "";
    });
  });
}

// copy functionality

function copyHandle(card) {
  const btn = card.querySelector(".copy-btn");
  const copyCount = document.getElementById("copy-count");
  const textEl = card.querySelector(".service-number");
  btn.addEventListener("click", function () {
    const copyText = textEl.innerText;
    navigator.clipboard.writeText(copyText);
    alert("Copied");

    copyCount.innerText = parseInt(copyCount.innerText) + 1;
  });
}

const cards = document.querySelectorAll(".card");

for (let i = 0; i < cards.length; i++) {
  callHandle(cards[i]);
  copyHandle(cards[i]);
}
