<template>
  <div>
    <div>
      <label>Найти в таблице:</label>
      <v-text-field id="search_field" type="search" label="Поиск" color="blue" hide-details="auto">
      </v-text-field>
    </div>
    <div>
      <label>Отображать записей на странице:</label>
      <v-select
        v-model="itemsPerPage"
        :items="[10, 25, 50, 100]"
        dense
        outlined
      ></v-select>
    </div>
    <div>
      <div id="hot"></div>
    </div>
    <div>
      <v-pagination 
      v-model="currentPage" 
      :length="totalPages"
      :total-visible="7" 
      ></v-pagination>
    </div>
    <div>
      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="manualPageNumber"
            label="Перейти к странице"
            type="number"
            min="1"
            :max="totalPages"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn @click="goToPageFromInput" color="primary">Перейти</v-btn>
        </v-col>
      </v-row>
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
      hotInstance: null,
      manualPageNumber: 1,
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
    currentPage() {
      this.updateTableData();
    },
    itemsPerPage() {
      this.currentPage = 1;
      this.updateTableData();
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
        const search = this.hotInstance.getPlugin('search');
        const searchValue = event.target.value;
        search.query(searchValue);

        const filteredData = this.logs.filter(log => {
        return (
          log.id.toString().toLowerCase().includes(searchValue) ||
          log.date.toString().toLowerCase().includes(searchValue) ||
          log.level.toLowerCase().includes(searchValue) ||
          log.logger.toLowerCase().includes(searchValue) ||
          log.responsetime.toString().toLowerCase().includes(searchValue) ||
          log.message.toLowerCase().includes(searchValue) ||
          log.username.toLowerCase().includes(searchValue) ||
          log.exception.toLowerCase().includes(searchValue) ||
          log.statuscode.toString().toLowerCase().includes(searchValue) ||
          log.url.toLowerCase().includes(searchValue) ||
          log.action.toLowerCase().includes(searchValue)
          );
        });
        this.hotInstance.loadData(filteredData);
        if (!searchValue) {
          this.updateTableData();
        }
      });
    },
    updateTableData() {
      console.log("Вызыван updateTableData");
      if (this.hotInstance) {
        this.hotInstance.loadData(this.paginatedLogs); // Обновляем данные в таблице.
      }
    },
    goToPageFromInput() {
      if (this.manualPageNumber >= 1 && this.manualPageNumber <= this.totalPages) {
        this.currentPage = this.manualPageNumber;
      }
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