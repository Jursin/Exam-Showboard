<template>
  <v-card class="mx-auto" max-width="800">
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
            <!-- 自定义标题 -->
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

            <!-- 自定义行内容 -->
            <template #item.date="{ item }">
              <td :rowspan="item.rowspan" class="text-h5 text-center">{{ item.date }}</td>
            </template>
            <template #item.name="{ item }">
              <td class="text-h5 text-center">{{ item.name }}</td>
            </template>
            <template #item.start="{ item }">
              <td class="text-h5 text-center">{{ formatTime(item.start) }}</td>
            </template>
            <template #item.end="{ item }">
              <td class="text-h5 text-center">{{ formatTime(item.end) }}</td>
            </template>
            <template #item.status="{ item }">
              <td class="text-center">
                <v-chip :color="getStatusColor(item)" dark class="exam-status-chip">
                  {{ getStatusText(item) }}
                </v-chip>
              </td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  exam: {
    type: Array as () => any[],
    default: () => []
  }
});

const state = reactive({
  exams: props.exam
});

// Computed properties and methods
const sortedExams = computed(() => {
  return state.exams.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
});

const groupedExams = computed(() => {
  const grouped = [];
  let currentDate = '';

  sortedExams.value.forEach((exam, index) => {
    const examDate = new Date(exam.start).toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric'
    });
    const period = getPeriod(exam.start);

    // 添加日期行
    if (examDate !== currentDate) {
      currentDate = examDate;
      grouped.push({
        date: `${examDate} ${period}`,
        name: '',
        start: '',
        end: '',
        status: '',
        rowspan: 1,
      });
    } else {
      grouped[grouped.length - 1].rowspan += 1;
    }

    grouped.push({ ...exam, date: `${examDate} ${period}`, isDate: false });
  });

  return grouped;
});

const headers = [
  { text: '日期', value: 'date', sortable: false },
  { text: '科目', value: 'name' },
  { text: '开始', value: 'start', sortable: false },
  { text: '结束', value: 'end', sortable: false },
  { text: '状态', value: 'status', sortable: false }
];

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  date.setSeconds(date.getSeconds() + 1); // 加1秒
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

function getPeriod(isoString: string): string {
  const hour = new Date(isoString).getHours();
  if (hour < 12) return "上午";
  else if (hour < 18) return "下午";
  else return "晚上";
}

function getStatusColor(item: any): string {
  const now = new Date();
  const startTime = new Date(item.start);
  const endTime = new Date(item.end);

  if (now < startTime) return 'orange';
  else if (now >= startTime && now <= endTime) return 'green';
  else return 'red';
}

function getStatusText(item: any): string {
  const now = new Date();
  const startTime = new Date(item.start);
  const endTime = new Date(item.end);

  if (now < startTime) {
    return '未开始';
  } else if (now >= startTime && now <= endTime) {
    return '进行中';
  } else {
    return '已结束';
  }
}

// Update exams every minute
onMounted(() => {
  const interval = setInterval(() => {
    state.exams = state.exams.map((exam) => ({
      ...exam,
      status: getStatusText(exam)
    }));
  }, 1000); // 1000 ms = 1 second

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
.text-h5 {
  font-size: 1.8rem !important;
}

.font-weight-bold {
  font-weight: bold;
}

.exam-status-chip {
  font-size: 1.5rem !important;
}

/* 确保所有单元格居中对齐并不换行 */
.text-center {
  text-align: center;
  white-space: nowrap;
}
</style>