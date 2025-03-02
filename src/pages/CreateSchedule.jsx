import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createSchedule, getSchedule, updateSchedule } from "../services/apiService";
import ScheduleForm from "../components/ScheduleForm";
import "../styles/MeetingForm.css";
import "../styles/CreateSchedule.css";

const CreateSchedule = ({ isModify }) => {
  const navigate = useNavigate();
  // const {studyId} = useLocation(); // StudyInfo 페이지에서 StudyId 값 받아오기

  // StudyInfo 페이지에서 StudyId 값 받아오기
  // 24.11.11 suhwan
  const LocationDom = useLocation();
  const {id} = useParams();
  const { studyId } = LocationDom.state || {};

  const [scheduleInitData, setScheduleInitData] = useState(null);
    
  useEffect(() => {
      if (isModify) { // 수정 모드일 때 데이터 불러옴
          const fetchSchedule = async () => {
              try {
                  const scheduleInitData = await getSchedule(id);
                  console.log("일정 정보 조회 성공", scheduleInitData);
                  
                  setScheduleInitData(scheduleInitData);
              } catch (error) {
                  console.log("일정 정보를 불러오지 못했습니다.", error);
              }
          };
          fetchSchedule();
      }
  }, [isModify, id]);

  // 데이터 전송
  const handleSaveSchedule = async (scheduleData) => {
    try {
      var response = null;
      if (isModify) {
        response = await updateSchedule(id, scheduleData);
        console.log("일정 수정 완료");
      } else {
        response = await createSchedule(scheduleData);
        console.log("일정 생성 완료");
      }
    } catch (error) {
      console.log(`일정 ${isModify ? "수정" : "생성"} 실패`, error);
    }
    // navigate(`/study-info/${studyId}`);
    navigate(``);
  };

  return (
    <div className="container">
      <h1>{isModify ? "일정 수정하기" : "새로운 일정 생성"}</h1>
      {/* <ScheduleForm onSubmit={handleSaveSchedule} studyId={studyId} scheduleData={scheduleInitData} /> */}
      <ScheduleForm onSubmit={handleSaveSchedule} studyId={1} scheduleData={scheduleInitData} />
    </div>
  );
};

export default CreateSchedule;
