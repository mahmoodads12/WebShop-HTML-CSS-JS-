let burger = document.getElementById("burger"); //Burgerbutton fuer Mobile Navbar

function oefnen() {
  let navmenu = document.getElementById("nav-list");
  navmenu.classList.toggle("open");
}

burger.addEventListener("click", oefnen);

//login jav
window.onload = () => {
  this.sessionStorage.setItem("username", "everest");
  this.sessionStorage.setItem("password", "everest123");
  let input = document.getElementsByTagName("input");
  let login = document.getElementById("log-in");
  let form = document.querySelector("form");
  form.onsubmit = () => {
    return false;
  };
  if (login) {
    /*Id von login*/ login.onclick = () => {
      if (input[0].value != "" && input[1].value != "") {
        if (
          input[0].value == sessionStorage.getItem("username") &&
          input[1].value == sessionStorage.getItem("password")
        ) {
          form.onsubmit = () => {
            window.location.href = "/HauptSeite/HauptSeite/index.html";
          };
        } else {
          if (input[0].value != sessionStorage.getItem("username")) {
            document.getElementById("error").innerHTML =
              "Username oder Passwort ist falsch!!";
          }
          if (input[1].value != sessionStorage.getItem("password")) {
            document.getElementById("error").innerHTML =
              "Username oder Passwort ist falsch!!";
          }
        }
      }
    };
  }
};
//funktion um artikle in der Warenkorb hinzuzuf�gen

let warenkorb = document.querySelectorAll(".cart"); // zum initialisierung von der Warenkorb

/* hier haben wir alle element, die in Warenkorb hinzuzuf�gen sind. */

let produkt = [
  {
    name: "Rucksack",
    tag: "backbag",
    preise: 60,
    inWarenkorb: 0,
    },
    {
        name: "Mund-schutz",
        tag: "mask1",
        preise: 5,
        inWarenkorb: 0,
    },
  {
    name: "Mütze",
    tag: "hat",
    preise: 23,
    inWarenkorb: 0,
    },
    {
        name: "Mundschutz",
        tag: "mask1",
        preise: 5,
        inWarenkorb: 0,
    },
    {
        name: "Pullover-Everest",
        tag: "Pullover",
        preise: 30,
        inWarenkorb: 0,
    },
    {
        name: "Schutz-H",
        tag: "phonecase",
        preise: 14,
        inWarenkorb: 0,
    },
  {
    name: "T-shirt",
    tag: "Tshirt",
    preise: 19,
    inWarenkorb: 0,
  },

  {
    name: "Wasser-Flasche",
    tag: "waterbottle",
    preise: 19,
    inWarenkorb: 0,
  },
];

for (let i = 0; i < warenkorb.length; i++) {
  warenkorb[i].addEventListener("click", () => {
    number(produkt[i]);
    totalPreis(produkt[i]);
  });
}

// elemente in der Locale storage speichern.
function speicher() {
  let produktion = localStorage.getItem("number");
  if (produktion) {
    document.querySelector(".fa span").textContent = produktion;
  }
}

/*es wird hier die anzahl von Waren in Warenkorb inkrementiert.*/
function number(produkt) {
  let produktion = localStorage.getItem("number");
  produktion = parseInt(produktion);

  if (produktion) {
    localStorage.setItem("number", produktion + 1);
    document.querySelector(".fa span").textContent = produktion + 1;
  } else {
    localStorage.setItem("number", 1);
    document.querySelector(".fa span").textContent = 1;
  }

  setItems(produkt);
}

// Diese funktion helf uns bestimte element im warenkorb zu speichern.
function setItems(produkt) {
  let warenkorbElement = localStorage.getItem("produktsinWarenkorb");
  warenkorbElement = JSON.parse(warenkorbElement);

  if (warenkorbElement != null) {
    if (warenkorbElement[produkt.tag] == undefined) {
      warenkorbElement = {
        ...warenkorbElement,
        [produkt.tag]: produkt,
      };
    }
    warenkorbElement[produkt.tag].inWarenkorb += 1;
  } else {
    produkt.inWarenkorb = 1;
    warenkorbElement = {
      [produkt.tag]: produkt,
    };
  }

  localStorage.setItem("produktsinWarenkorb", JSON.stringify(warenkorbElement));
}

// function f�r die berechnung von alle Produkte in warenkorb

function totalPreis(produkt) {
  let kosten = localStorage.getItem("totalPreis");

  console.log(typeof kosten);

  if (kosten != null) {
    kosten = parseInt(kosten);
    localStorage.setItem("totalPreis", kosten + produkt.preise);
  } else {
    localStorage.setItem("totalPreis", produkt.preise);
  }
}

function warenkorbdisplay() {
  let warenkorbprodukt = localStorage.getItem("produktsinWarenkorb");
  warenkorbprodukt = JSON.parse(warenkorbprodukt);
  let produktkontainer = document.querySelector(".produkts");

  let kosten = localStorage.getItem("totalPreis"); // f�r die berechnung von der summe.

  if (warenkorbprodukt && produktkontainer) {
    produktkontainer.innerHTML = "";
    Object.values(warenkorbprodukt).map((item) => {
      console.log(warenkorbprodukt); /*es wurde inspiriert von w3School*/
      produktkontainer.innerHTML += `
             <div class="produkt">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./alleBilder/${item.tag}.PNG">
                <span>${item.name}</span> </img>
             </div>
            <div class="preise"> $${item.preise},00 </div>
             <div class="menge">
                <ion-icon name="remove-circle"></ion-icon>
                <span>${item.inWarenkorb}</span>
                <ion-icon name="add-circle"></ion-icon>
             </div>
             <div class="total">
                $${item.inWarenkorb * item.preise},00
             </div>
             `;
    });

    produktkontainer.innerHTML += `
         <div class="totalwarencontainer">
            <h4 class="totalTitel">
                 WAREN SUMME
            </h4>
            <h4 class="warensumme">
                $${kosten},00
            </h4>
         </div>
        `;
  }
}
speicher();
warenkorbdisplay();

/***auswahl von der typ von bild...**/

let grossBild = document.getElementById("gross_img");
let kleinBild = document.getElementsByClassName("klein_img");

/*es wird immer 1 danach genommen. da der erste nimmt nicht nur das Bild*/

kleinBild[0].onclick = function () {
  grossBild.src = kleinBild[0].src;
};

kleinBild[1].onclick = function () {
  grossBild.src = kleinBild[1].src;
};

kleinBild[2].onclick = function () {
  grossBild.src = kleinBild[2].src;
};

kleinBild[3].onclick = function () {
  grossBild.src = kleinBild[3].src;
};

//let remove_element = getElementById("leeren");

//remove_element.onclick = function deleteItems() {
//    localStorage.clear();
//}
