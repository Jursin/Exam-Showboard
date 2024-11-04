<template>
  <v-card class="mx-auto" max-width="600">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-data-table
            :items="groupedExams"
            :headers="headers"
            item-key="name"
            hide-default-footer
            dense
            class="text-h5"
          >
            <template #item="{ item }">
              <tr :style="{ lineHeight: '2rem' }"> <!-- 设置统一行高 -->
                <td v-if="item.showDate" class="text-h5 date-column" :rowspan="item.rowspan">
                  {{ item.date }}<br>{{ item.period }}
                </td>
                <td class="text-h5 subject-column">{{ item.name }}</td>
                <td class="text-h5 time-column">{{ formatTime(item.start) }}</td>
                <td class="text-h5 time-column">{{ formatTime(item.end) }}</td>
                <td class="status-column">
                  <v-chip :color="getStatusColor(item)" dark class="exam-status-chip">
                    {{ getStatusText(item) }}
                  </v-chip>
                </td>
              </tr>
            </template>
            <template #header.date>
              <span class="text-h5 font-weight-bold">日期</span>
            </template>
            <template #header.name>
              <span class="text-h5 font-weight-bold">科目</span>
            </template>
            <template #header.start>
              <span class="text-h5 font-weight-bold">开始</span>
            </template>
            <template #header.end>
              <span class="text-h5 font-weight-bold">结束</span>
            </template>
            <template #header.status>
              <span class="text-h5 font-weight-bold">状态</span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
// ...其余代码保持不变
</script>

<style scoped>
.text-h5 {
  font-size: 1.8rem !important;
  text-align: center;
}

.font-weight-bold {
  font-weight: bold;
}

.exam-status-chip {
  font-size: 1.5rem !important;
  text-align: center;
}

.v-card {
  overflow-x: auto;
  max-width: 100%; /* 防止表格超出边界 */
  padding-right: 8px; /* 调整右边距 */
}

/* 列样式 */
.date-column,
.subject-column,
.time-column,
.status-column {
  white-space: nowrap;
  text-align: center;
  padding: 10px 0; /* 设置上下内边距以统一行高 */
}

.date-column {
  width: 90px;
}

.subject-column {
  width: 130px;
}

.time-column {
  width: 80px;
}

.status-column {
  width: 90px;
}
</style>
