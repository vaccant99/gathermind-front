import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const getAuthToken = () => localStorage.getItem('token');

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 현재 아이디 정보 조회
export const getMyInfoById = async (memberId, studyId) => {
  try {
    const response = await axios.get(
      `${API_URL}/member/role?memberId=${memberId}&studyId=${studyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my Info: ", error);
    throw new Error("Failed to fetch my Info.");
  }
};

// 멤버 조회
export const getMember = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/member/${id}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Member not found.");
      }
      throw new Error("Error occurred while fetching the member data.");
    } else {
      console.error("Network error or server unreachable: ", error);
      throw new Error("Network error or server unreachable.");
    }
  }
};

// 멤버 생성
export const createMember = async (memberId, password, email, nickname) => {
  try {
    const response = await axios.post(`${API_URL}/member/signup`, {
      memberId,
      password,
      email,
      nickname,
    });

    return response.data;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 로그인
export const loginMember = async (memberId, password) => {
  try {
    const response = await axios.post(`${API_URL}/member/login`, {
      memberId,
      password,
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 토큰으로 회원 정보 가져오기
export const getMemberByToken = async () => {


  console.log(getAuthToken())
  try {
    const response = await axios.get(`${API_URL}/member/me`, {
      headers: {  Authorization: `Bearer ${getAuthToken()}`,
     }, // 헤더에 토큰 추가
    }
    );

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

export const getMystudyByToken = async () => {


  console.log(getAuthToken())
  try {
    const response = await axios.get(`${API_URL}/member/my-studies`, {
      headers: {  Authorization: `Bearer ${getAuthToken()}`,
     }, // 헤더에 토큰 추가
    }
    );

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 회원 정보 수정
export const updateMember = async (filed, value) => {
  try {
    const response = await axios.put(
      `${API_URL}/member/update`,
      { filed: value },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};

// 회원 정보 수정
export const deleteMember = async () => {
  try {
    const response = await axios.put(`${API_URL}/member/delete-account`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Network error or server unreachable: ", error);
    throw new Error("Network error or server unreachable.");
  }
};