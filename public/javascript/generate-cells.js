window.addEventListener("load", () => {
  fetch("https://fortnite1.p.rapidapi.com/store/get", {
    method: "GET",
    headers: {
      authorization: "store",
      "x-rapidapi-host": "fortnite1.p.rapidapi.com",
      "x-rapidapi-key": "468218c732mshd06cdfe823d7e5ap1949e7jsn55c582a1c87a",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonParsed) => {
      var objToday = new Date(),
        domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear();

      var today = `${curMonth} ${dayOfMonth} ${curYear}`;

      const actualDate = document.querySelector("#actualDate");
      actualDate.innerHTML = today;

      const featuredDiv = document.querySelector("#fortnite-featured-items");
      const dailyDiv = document.querySelector("#fortnite-daily-items");
      console.log(jsonParsed.data);
      jsonParsed.data.forEach((fData) => {
        const itemCost = fData.store.cost;
        const itemName = fData.item.name;
        var itemImage = fData.item.images.featured;
        console.log(itemImage);
        if (itemImage == null) {
          itemImage = fData.item.images.icon;
        }
        const itemRarity = fData.item.rarity;
        if (fData.store.isFeatured == true) {
          populateFeaturedDiv(
            itemCost,
            itemName,
            itemImage,
            itemRarity,
            featuredDiv
          );
        } else {
          populateFeaturedDiv(
            itemCost,
            itemName,
            itemImage,
            itemRarity,
            dailyDiv
          );
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });

  function populateFeaturedDiv(itemCost, itemName, itemImage, itemRarity, selectedDiv) {
    const divPai = document.createElement("div");
    switch (itemRarity) {
      case "uncommon":
        divPai.classList.add("uncommon-item");
        break;
      case "rare":
        divPai.classList.add("rare-item");
        break;
      case "epic":
        divPai.classList.add("epic-item");
        break;
      case "legendary":
        divPai.classList.add("legendary-item");
        break;
      default:
        divPai.classList.add("default-item");
    }
    const divFilho = document.createElement("div");
    
    // V-bucks image 
    const vBuckDiv = document.createElement("div");
    vBuckDiv.classList.add("vBuck-div");

    const vBuckImage = document.createElement("img");
    vBuckImage.src = "../images/Fortnite/v-bucks.png";
    vBuckImage.style.height = "1.5rem";
    vBuckImage.style.width = "1.5rem";

    const costP = document.createElement("p");
    costP.textContent = itemCost;
    vBuckDiv.appendChild(vBuckImage);
    vBuckDiv.appendChild(costP)
    divFilho.appendChild(vBuckDiv);

    // Item image
    const image = document.createElement("img");
    image.src = itemImage;
    image.style.width = "10rem";
    image.style.height = "auto";
    divFilho.appendChild(image);

    const nameDiv = document.createElement("div");
    const itemNameP = document.createElement("p");
    itemNameP.textContent = itemName;
    nameDiv.appendChild(itemNameP);
    nameDiv.classList.add("item-name-div");
  
    divFilho.appendChild(nameDiv);

    divPai.appendChild(divFilho);
    selectedDiv.appendChild(divPai);

    divPai.classList.add("item");

    divFilho.classList.add("item-cell");
  }
});
