// Code javascript

// import du fichier data.js
import { data } from "./data.js";
// import du fichier function.js
import { generateDialogHTML, generateProductHTML } from "./functions.js";

// afficher tous les produits du site
const productsContainer = document.querySelector(".produits");

// parcour du tableau data pour afficher les produit sur le site
const afficherProduit = (produits) => {
  produits.forEach((produit) => {
    const produitHTML = document.createElement("div");
    produitHTML.classList.add("carte-produit");
    // creation de l'element HTML de chaque produits
    produitHTML.setAttribute("data-id", produit.id);
    produitHTML.innerHTML = generateProductHTML(produit);
    productsContainer.appendChild(produitHTML);
  });
};
afficherProduit(data);

// rechercher un produit
const input = document.querySelector(".recherche");
input.addEventListener("keyup", (e) => {
  const filtre = data.filter((p) =>
    p.nom.toLocaleLowerCase().includes(e.target.value)
  );
  //console.log(filtre); //ici on recuper et on recherche dans le tableau data
  productsContainer.innerHTML = "";
  // condition pour afficher le produit
  if (filtre.length > 0) {
    // si l'on retrouve au moins un elements durant la recherche l'on  l'affiche
    afficherProduit(filtre);
  } else {
    // si rien n'est trouver alors on affiche un message
    const vide = document.createElement("h3");
    vide.textContent = "Aucun element n'a ete trouver...";

    productsContainer.appendChild(vide);
  }
  // debut de la copie ici

  // afficher la boite de dialogue
  const dialog = document.querySelector("dialog");

  // initialisation du pagnier
  let produisCarte = [];
  const nombreProduit = document.querySelector(".carte .nombre");
  nombreProduit.textContent = produisCarte.length; //produiscarte par ce que c'est sera stocker les produit selectionner

  // Fonction pour tester si une fois un produit existe dans le panier
  const testerSiProduitExiste = (arr, produit) => {
    const ele = arr.find((p) => p.id === produit.id);
    return ele ? true : false;
  };

  // action sur les produits

  const cartes = document.querySelectorAll(".carte-produit");
  // parcour le tableau pour ecouter le click sur une carte
  cartes.forEach((produit) => {
    produit.addEventListener("click", () => {
      dialog.showModal(); //affiche boite de dialogue

      // ici on suprime l'element qui se trouve deja dans la boite de dialogue avant d'ajouter l'element courant
      const contenuDialog = document.querySelector(".dialog-menu");
      contenuDialog && contenuDialog.remove();
      // afficher les info du produit selectionner
      // console.log(produit.dataset);
      const curentproduct = data.filter((p) => p.id == produit.dataset.id)[0];
      // console.log(curentproduct);

      // creation de l'element dans le quelle il sera afficher
      const section = document.createElement("section");
      section.classList.add("dialog-menu");
      section.innerHTML = generateDialogHTML(curentproduct);
      dialog.appendChild(section); //ajout a element parent

      // changer de couleur de fond d'image
      const bgPng = document.querySelector(".gauche");
      // Colors
      const colors = document.querySelectorAll(".color.change");
      colors.forEach((item, key) => {
        item.addEventListener("click", () => {
          switch (key) {
            case 0:
              bgPng.style.background = "#ff6b58";
              break;
            case 1:
              bgPng.style.background = "#3333";
              console.log(key);
              break;
            case 2:
              bgPng.style.background = "#5f69d5";
              break;
            default:
              break;
          }
        });
      });

      // ajouter produit au panier
      const ajouter = document.querySelector(".ajouter");
      const qte = document.querySelector(".qte");
      let qteProduit = testerSiProduitExiste(produisCarte, curentproduct)
        ? 1
        : 0;
      qte.textContent = qteProduit;
      // tester une fois si le produit existe et afficher directement le message effacer
      if (testerSiProduitExiste(produisCarte, curentproduct)) {
        ajouter.textContent = "Effacer du pagner";
        ajouter.classList.add("ajoute");
      }
      console.log(testerSiProduitExiste(produisCarte, curentproduct));

      ajouter.addEventListener("click", () => {
        // teste si produit existe pour suprimer du pagner si oui
        if (testerSiProduitExiste(produisCarte, curentproduct)) {
          const btntext = `
          <div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>
        `;
          ajouter.innerHTML = btntext;
          ajouter.classList.remove("ajoute");
          // suprimer du tableua
          produisCarte = produisCarte.filter((p) => p.id !== curentproduct.id);
          // actualisation du pagner
          nombreProduit.textContent = produisCarte.length;
          qte.textContent = 0;
        } else {
          // si il n'est pas dans le tableau alors on l'ajoute
          produisCarte.push(curentproduct);
          ajouter.textContent = "Effacer du pagner";
          ajouter.classList.add("ajoute");
          // modifier automatiquement la taille du pagner
          nombreProduit.textContent = produisCarte.length;

          // gestion de la quantiter du produit
          qte.textContent = 1;
        }
      });
      // quqntiter du produit
      const reduire = document.querySelector(".counter .fa-minus");
      const augmenter = document.querySelector(".counter .fa-plus");
      // qteProduit = testerSiProduitExiste(produisCarte, curentproduct) ? 1 : 0;
      augmenter.addEventListener("click", () => {
        qteProduit = qteProduit + 1;
        qte.textContent = qteProduit;
      });
      reduire.addEventListener("click", () => {
        qteProduit = qteProduit - 1;
        qte.textContent = qteProduit;
      });
    });
  });
  console.log(cartes);

  // Close boite de dialogue
  const btnClose = document.querySelector(".close");
  btnClose.addEventListener("click", () => {
    dialog.close();
  });
});

//
//
// En dehor de la recherche
//
//

// afficher la boite de dialogue
const dialog = document.querySelector("dialog");

// initialisation du pagnier
let produisCarte = [];
const nombreProduit = document.querySelector(".carte .nombre");
nombreProduit.textContent = produisCarte.length; //produiscarte par ce que c'est sera stocker les produit selectionner

// Fonction pour tester si une fois un produit existe dans le panier
const testerSiProduitExiste = (arr, produit) => {
  const ele = arr.find((p) => p.id === produit.id);
  return ele ? true : false;
};

// action sur les produits

const cartes = document.querySelectorAll(".carte-produit");
// parcour le tableau pour ecouter le click sur une carte
cartes.forEach((produit) => {
  produit.addEventListener("click", () => {
    dialog.showModal(); //affiche boite de dialogue

    // ici on suprime l'element qui se trouve deja dans la boite de dialogue avant d'ajouter l'element courant
    const contenuDialog = document.querySelector(".dialog-menu");
    contenuDialog && contenuDialog.remove();
    // afficher les info du produit selectionner
    // console.log(produit.dataset);
    const curentproduct = data.filter((p) => p.id == produit.dataset.id)[0];
    // console.log(curentproduct);

    // creation de l'element dans le quelle il sera afficher
    const section = document.createElement("section");
    section.classList.add("dialog-menu");
    section.innerHTML = generateDialogHTML(curentproduct);
    dialog.appendChild(section); //ajout a element parent

    // changer de couleur de fond d'image
    const bgPng = document.querySelector(".gauche");
    // Colors
    const colors = document.querySelectorAll(".color.change");
    colors.forEach((item, key) => {
      item.addEventListener("click", () => {
        switch (key) {
          case 0:
            bgPng.style.background = "#ff6b58";
            break;
          case 1:
            bgPng.style.background = "#3333";
            console.log(key);
            break;
          case 2:
            bgPng.style.background = "#5f69d5";
            break;
          default:
            break;
        }
      });
    });

    // ajouter produit au panier
    const ajouter = document.querySelector(".ajouter");
    const qte = document.querySelector(".qte");
    let qteProduit = testerSiProduitExiste(produisCarte, curentproduct) ? 1 : 0;
    qte.textContent = qteProduit;
    // tester une fois si le produit existe et afficher directement le message effacer
    if (testerSiProduitExiste(produisCarte, curentproduct)) {
      ajouter.textContent = "Effacer du pagner";
      ajouter.classList.add("ajoute");
    }
    console.log(testerSiProduitExiste(produisCarte, curentproduct));

    ajouter.addEventListener("click", () => {
      // teste si produit existe pour suprimer du pagner si oui
      if (testerSiProduitExiste(produisCarte, curentproduct)) {
        const btntext = `
          <div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>
        `;
        ajouter.innerHTML = btntext;
        ajouter.classList.remove("ajoute");
        // suprimer du tableua
        produisCarte = produisCarte.filter((p) => p.id !== curentproduct.id);
        // actualisation du pagner
        nombreProduit.textContent = produisCarte.length;
        qte.textContent = 0;
      } else {
        // si il n'est pas dans le tableau alors on l'ajoute
        produisCarte.push(curentproduct);
        ajouter.textContent = "Effacer du pagner";
        ajouter.classList.add("ajoute");
        // modifier automatiquement la taille du pagner
        nombreProduit.textContent = produisCarte.length;

        // gestion de la quantiter du produit
        qte.textContent = 1;
      }
    });
    // quqntiter du produit
    const reduire = document.querySelector(".counter .fa-minus");
    const augmenter = document.querySelector(".counter .fa-plus");
    // qteProduit = testerSiProduitExiste(produisCarte, curentproduct) ? 1 : 0;
    augmenter.addEventListener("click", () => {
      qteProduit = qteProduit + 1;
      qte.textContent = qteProduit;
    });
    reduire.addEventListener("click", () => {
      qteProduit = qteProduit - 1;
      qte.textContent = qteProduit;
    });
  });
});
console.log(cartes);

// Close boite de dialogue
const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  dialog.close();
});
