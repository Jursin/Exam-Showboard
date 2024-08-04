export interface TimeSlot {
  name: string;
  start: string;
  end: string;
}

export interface ExamSchedule {
  examName: string;
  roomName: string;
  message: string;
  examInfos: TimeSlot[];
}