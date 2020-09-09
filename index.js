class Gallery {
  constructor(config) {
    this.config = config;
    this.activeSlide = 1;
    this.delay = false;

    this.renderBanner();
  }

  renderBanner = () => {
    if (this.config.length < 4) {
      throw new Error("Incorrect number of slides. At least 4 required");
    }
    const arrows = document.querySelectorAll(".gallery__change-slide");

    arrows.forEach((arrow) =>
      arrow.addEventListener("click", this.changeSlide)
    );

    this.renderCards();
  };

  renderCards = () => {
    const cards = document.createDocumentFragment();

    this.config.forEach((element, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      if (this.activeSlide === index) {
        card.classList.add("card--active");
      } else if (index === this.activeSlide + 1) {
        card.classList.add("card--inactive-right");
      } else if (index === this.activeSlide - 1) {
        card.classList.add("card--inactive-left");
      }

      const imgContainer = document.createElement("div");
      imgContainer.classList.add("card__img-container");

      const img = document.createElement("img");
      img.setAttribute("src", element.img);
      img.classList.add("card__img");

      const title = document.createElement("div");
      title.classList.add("card__title");
      title.textContent = element.title;

      const desc = document.createElement("div");
      desc.classList.add("card__description");
      desc.textContent = element.desc;

      imgContainer.appendChild(img);
      card.appendChild(imgContainer);
      card.appendChild(title);
      card.appendChild(desc);

      cards.appendChild(card);
    });

    document.querySelector(".gallery__inner-container").appendChild(cards);
    this.displayNewSlide();
  };

  changeSlide = () => {
    const container = document.querySelector(".gallery__inner-container");

    if (!this.delay) {
      this.delay = true;
      if (event.clientX < container.clientWidth / 2) {
        if (this.activeSlide === 0) {
          this.activeSlide = this.config.length - 1;
        } else {
          this.activeSlide = this.activeSlide - 1;
        }
      } else {
        if (this.activeSlide === this.config.length - 1) {
          this.activeSlide = 0;
        } else {
          this.activeSlide = this.activeSlide + 1;
        }
      }
      this.displayNewSlide();
      setTimeout(() => {
        this.delay = false;
      }, 500);
    }
  };

  displayNewSlide = () => {
    const cards = document.querySelectorAll(".card");
    const leftIndex =
      this.activeSlide - 1 < 0 ? this.config.length - 1 : this.activeSlide - 1;
    const rightIndex =
      this.activeSlide + 1 > this.config.length - 1 ? 0 : this.activeSlide + 1;

    cards.forEach((card) => {
      card.classList.remove(
        "card--active",
        "card--inactive-left",
        "card--inactive-right"
      );
      card.removeEventListener("click", this.changeSlide);
    });

    // add class and listener to side card
    cards[leftIndex].classList.add("card--inactive-left");
    cards[leftIndex].addEventListener("click", this.changeSlide);
    // add class to active card
    cards[this.activeSlide].classList.add("card--active");
    // add class and listener to side card
    cards[rightIndex].classList.add("card--inactive-right");
    cards[rightIndex].addEventListener("click", this.changeSlide);
  };

  // e.clientX z eventu mousedown - e.clientX z eventu mouse move
}

const gallerySlides = [
  {
    img: "./assets/pic1.JPG",
    title: "First photo",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, atque animi? ",
  },
  {
    img: "./assets/pic2.JPG",
    title: "Second photo",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, atque animi? ",
  },
  {
    img: "./assets/pic3.JPG",
    title: "Third photo",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, atque animi? ",
  },
  {
    img: "./assets/pic4.JPG",
    title: "Fourth photo",
    desc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, atque animi? ",
  },
  {
    img: "./assets/pic5.JPG",
    title: "Fifth photo",
    desc: "description5",
  },
];

const myGallery = new Gallery(gallerySlides);
