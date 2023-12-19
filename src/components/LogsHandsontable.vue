<template>
  <div>
    <div>
      <v-text-field id="search_field" type="search" label="Поиск" color="blue" hide-details="auto">
      </v-text-field>
    </div>
    <p></p>
    <div>
      <div id="hot"></div>
    </div>
    <div>
      <v-pagination 
      v-model="currentPage" 
      :length="totalPages" 
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Handsontable from 'handsontable';
import "handsontable/dist/handsontable.full.css";
import axios from 'axios';

export default {
  
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 25,
      logs: [],
      hotInstance: null, // Добавлено новое свойство для ссылки на экземпляр Handsontable
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.logs.length / this.itemsPerPage);
    },
    paginatedLogs() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.logs.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.renderTable(); // Изменено - сначала отрисовываем пустую таблицу
    this.getLogs(); // Затем загружаем данные
  },
  watch: {
    currentPage(newPage) {
      this.changePage(newPage);
    }
  },
  methods: {
    getLogs() {
      axios.get('/logs', {
        headers: {
          'Authorization': `Bearer ${localStorage.access_token}`
        }
      })
      .then(response => {
        this.logs = response.data;
        this.updateTableData(); // Вызываем метод для обновления данных в таблице
      })
      .catch(error => {
        console.error(error);
      });
    },
    renderTable() {
      const container = document.getElementById('hot');
      const searchField = document.querySelector('#search_field');

      const hot = new Handsontable(container, {
        data: [],
        columns: [
          { data: 'id', title: 'ID' },
          { data: 'date', title: 'Date' },
          { data: 'level', title: 'Level' },
          { data: 'logger', title: 'Logger' },
          { data: 'responsetime', title: 'Response Time' },
          { data: 'message', title: 'Message' },
          { data: 'username', title: 'Username' },
          { data: 'exception', title: 'Exception' },
          { data: 'statuscode', title: 'Status Code' },
          { data: 'url', title: 'URL' },
          { data: 'action', title: 'Action' },
        ],
        rowHeaders: true,
        colHeaders: true,
        multiColumnSorting: true,
        search: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      });

      this.hotInstance = hot;

      searchField.addEventListener('keyup', event => {
        const search = hot.getPlugin('search');
        const queryResult = search.query(event.target.value);

        console.log(queryResult);

        hot.render();
      });
    },
    updateTableData() {
      console.log("Вызыван updateTableData");
      if (this.hotInstance) {
        this.hotInstance.loadData(this.paginatedLogs); // Обновляем данные в таблице.
      }
    },
    changePage(page) {
      console.log("Вызыван changePage");
      this.currentPage = page;
      this.updateTableData(); // Вызываем метод для обновления данных в таблице
    },
  },
};

</script>

<style scoped>
/* Стили для Handsontable */
#hot {
  width: 100%;
  height: calc(100% - 100px); /* Высота таблицы минус высота пагинации */
}
</style>