export default class Table {
  constructor(element, data) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      this.data = data;
      this.col = null;

      this.appearance();
      this.work();
      setInterval(this.work.bind(this), 16000);
    }
  }

  appearance() {
    for (const film of this.data) {
      this.element.insertAdjacentHTML(
        'beforeend',
        `<tr class="table__row" data-id="${film.id}" data-title="${film.title}" data-year="${film.year}" data-imdb="${film.imdb.toFixed(2)}"><td>#${film.id}</td><td>${film.title}</td><td>(${film.year})</td><td>imdb: ${film.imdb.toFixed(2)}</td></tr>`,
      );
    }
    this.rows = [...this.element.getElementsByClassName('table__row')];
  }

  ascendingSortId() {
    this.rows.sort((a, b) => a.dataset.id - b.dataset.id);
    this.transformationDOM('id', '↓');
  }

  descendingSort(parametre) {
    this.rows.reverse();
    this.transformationDOM(parametre, '↑');
  }

  ascendingSortYear() {
    this.rows.sort((a, b) => a.dataset.year - b.dataset.year);
    this.transformationDOM('year', '↓');
  }

  ascendingSortImdb() {
    this.rows.sort((a, b) => a.dataset.imdb - b.dataset.imdb);
    this.transformationDOM('imdb', '↓');
  }

  ascendingSortTitle() {
    this.rows.sort((a, b) => {
      if (a.dataset.title.trim().toLowerCase().replace(/ё/g, 'е') < b.dataset.title.trim().toLowerCase().replace(/ё/g, 'е')) return -1;
      return 1;
    });
    this.transformationDOM('title', '↓');
  }

  transformationDOM(parametre, trend) {
    if (this.col) {
      this.col.textContent = this.col.textContent.slice(0, -2);
    }
    for (const film of [...this.element.getElementsByClassName('table__row')]) {
      film.remove();
    }
    for (const film of this.rows) {
      this.element.appendChild(film);
    }
    this.col = document.querySelector(`.header__${parametre}`);
    this.col.textContent = `${parametre} ${trend}`;
  }

  work() {
    setTimeout(this.ascendingSortId.bind(this), 2000);
    setTimeout(this.descendingSort.bind(this), 4000, 'id');
    setTimeout(this.ascendingSortTitle.bind(this), 6000);
    setTimeout(this.descendingSort.bind(this), 8000, 'title');
    setTimeout(this.ascendingSortYear.bind(this), 10000);
    setTimeout(this.descendingSort.bind(this), 12000, 'year');
    setTimeout(this.ascendingSortImdb.bind(this), 14000);
    setTimeout(this.descendingSort.bind(this), 16000, 'imdb');
  }
}
