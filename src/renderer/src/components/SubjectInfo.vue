<template>
  <v-card v-if="exam" class="mx-auto pa-4 subject-info-card" max-width="600" elevation="12">
    <v-card-text>
      <div class="text-h5 text-white">
        当前科目: <span class="text-h5 ml-2">{{ exam.name }}</span>
      </div>
      <div class="text-h5 text-white">
        考试时间: {{ formatDateTime(exam.start) }} ~ {{ formatDateTime(exam.end) }}
      </div>
      <div class="text-h5 mt-4">
        考试状态: <span :class="statusColor">{{ statusText }}</span>
      </div>
      <div v-if="isWarning" class="text-h5 text--red">考试即将结束</div>
      <div v-if="showRemainingTime" class="text-h5 text-white">剩余时间: {{ remainingTime }}</div>
      <div v-if="showCountdown" class="text-h5" :class="{'text--red': countdownIsRed}">
        倒计时: {{ countdown }}
      </div>
      <div v-if="exam.roomNumber" class="text-h5 text-white mt-4">
        考场号: <span class="text-h5 ml-2">{{ exam.roomNumber }}</span>
      </div>
    </v-card-text>
  </v-card>

  <v-card v-else class="mx-auto pa-4 subject-info-card ended-card" max-width="600" elevation="12">
    <v-card-title class="ended-text">考试已结束</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 定义 props
const props = defineProps({
exam: {
  type: Object as () => { 
    name: string; 
    start: string; 
    end: string; 
    roomNumber: string; 
  },
  default: null
}
});

// 加载配置（示例）
const config = {
examRoom: '101' // 这可以从配置文件动态加载
};

// 将考场号添加到 exam 对象
if (props.exam) {
props.exam.roomNumber = config.examRoom;
}

// 计算属性
const formatDateTime = (isoString: string) =>
new Date(isoString).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
});

const now = ref(new Date());

const statusColor = computed(() => {
if (!props.exam) return '';

const start = new Date(props.exam.start);
const end = new Date(props.exam.end);

if (now.value < start) return 'status-before';
if (now.value >= start && now.value < end) return 'status-middle';
if (now.value >= end) return 'status-after';
});

const statusText = computed(() => {
if (!props.exam) return '考试已结束';

const start = new Date(props.exam.start);
const end = new Date(props.exam.end);

if (now.value < start) return '未开始';
if (now.value >= start && now.value < end) return '进行中';
if (now.value >= end) return '已结束';
});

const isWarning = computed(() => {
if (!props.exam) return false;

const end = new Date(props.exam.end);
const fifteenMinutesBeforeEnd = new Date(end.getTime() - 15 * 60 * 1000);

return now.value >= fifteenMinutesBeforeEnd && now.value < end;
});

const showRemainingTime = computed(() => {
if (!props.exam) return false;

const start = new Date(props.exam.start);
const end = new Date(props.exam.end);

return now.value >= start && now.value < end;
});

const showCountdown = computed(() => {
if (!props.exam) return false;

const start = new Date(props.exam.start);
const fifteenMinutesBeforeStart = new Date(start.getTime() - 15 * 60 * 1000);

return now.value >= fifteenMinutesBeforeStart && now.value < start;
});

const remainingTime = computed(() => {
if (!props.exam) return '';

const end = new Date(props.exam.end);
const timeDiff = end.getTime() - now.value.getTime();
const minutes = Math.floor(timeDiff / (1000 * 60));
const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

return `${minutes}分${seconds}秒`;
});

const countdown = computed(() => {
if (!props.exam) return '';

const start = new Date(props.exam.start);
const timeDiff = start.getTime() - now.value.getTime();
const minutes = Math.floor(timeDiff / (1000 * 60));
const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

return `${minutes}分${seconds}秒`;
});

const countdownIsRed = computed(() => {
if (!props.exam) return false;

const start = new Date(props.exam.start);
const fifteenMinutesBeforeEnd = new Date(start.getTime() - 15 * 60 * 1000);

return now.value >= fifteenMinutesBeforeEnd && now.value < start;
});

// 每秒更新当前时间
const updateNow = () => {
now.value = new Date();
};
setInterval(updateNow, 1000);
updateNow();
</script>

<style scoped>
.text-h5 {
font-size: 2.5rem !important;
line-height: 1.5; /* 统一行距 */
}

.text--red {
color: red;
}

.text-white {
color: white;
}

.status-before {
color: orange;
}

.status-middle {
color: green;
}

.status-after {
color: red;
}

.subject-info-card {
margin-top: 20px;
}

/* 结束考试的卡片样式 */
.ended-card {
background-color: #f5f5f5;
height: 200px; /* 调整背景高度 */
display: flex;
justify-content: center;
align-items: center;
}

.ended-text {
font-size: 3rem;
font-weight: bold;
color: red;
text-align: center;
}
</style>
