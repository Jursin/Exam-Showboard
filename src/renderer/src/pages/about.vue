<template>
  <v-container class="main-container" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h4">关于考试看板</v-card-title>
          <v-card-text>
            <p>
              欢迎使用考试看板，这是一款用于展示考试信息的工具，帮助考生更好地了解考试信息与状态。
            </p>
            <p>本软件旨在为考生提供便捷的考试信息查看体验。</p>
            <p>开发者：Hello8963 & Mkstoler4096</p>
            <v-btn
              href="https://github.com/ProjectCampus-CH/dsz-exam-showboard-next"
              target="_blank"
              color="primary"
              class="mt-4"
            >
              在 GitHub 上查看源代码
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.main-container {
  padding: 20px;
  display: flex;
  align-items: center;
}
.v-card {
  width: 100%;
  max-width: 600px;
  margin: auto;
  transition: transform 0.3s ease-in-out;
}
.v-card:hover {
  transform: scale(1.05);
}
.v-btn {
  height: 48px;
}
</style>
