<template>
    <div>
      <div id="hot"></div>
    </div>
  </template>
  
  <script>
  import Handsontable from 'handsontable';
  import "handsontable/dist/handsontable.full.css";
  import axios from 'axios';
  export default {
    mounted() {
      this.getLogs();
    },
    methods: {
      getLogs() {
        axios.get('/logs', {
              headers: {
                'Authorization': `Bearer ${localStorage.access_token}`
              }
            })
        .then(response => {
          const logs = response.data;
          this.renderTable(logs);
        })
        .catch(error => {
          console.error(error);
        });
      },
      renderTable(logs) {
      const container = document.getElementById('hot');
      const data = logs;

      const hot = new Handsontable(container, {
        data: data,
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
      });
    }
  }
};
</script>

<style scoped>
/* Стили для Handsontable */
#hot {
  width: 100%;
  height: 400px;
}
</style>