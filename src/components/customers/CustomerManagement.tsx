"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { createHeaders, loadAuthTokens } from "@/lib/api";
import { ApiResponse, AuthTokens } from "@/types/auth";
import { Member, searchMemberRequest } from "@/types/member";
import { useAuth } from "@/contexts/AuthContext";
import { League } from "@/types/league";
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS } from "react-dom/client";

// 회원 인터페이스
interface Customer {
  id: number;
  nickname: string;
  name: string;
  email: string;
  accountType: "kakao" | "normal";
  gender: "male" | "female" | "other";
  footballLeague: string;
  footballTeam: string;
  isActive: boolean;
  createdAt: string;
}

// 샘플 회원 데이터
const sampleCustomers: Customer[] = [
  {
    id: 1,
    nickname: "축구왕김철수",
    name: "김철수",
    email: "kimcs@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "프리미어리그",
    footballTeam: "맨체스터 유나이티드",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    nickname: "영희축구",
    name: "박영희",
    email: "parkyh@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "K리그1",
    footballTeam: "FC 서울",
    isActive: true,
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    nickname: "미니축구",
    name: "이민수",
    email: "leems@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "라리가",
    footballTeam: "FC 바르셀로나",
    isActive: false,
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    nickname: "축구소녀",
    name: "정수진",
    email: "jungsj@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "세리에A",
    footballTeam: "유벤투스",
    isActive: true,
    createdAt: "2024-01-08",
  },
  {
    id: 5,
    nickname: "축구매니아",
    name: "최동우",
    email: "choidw@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "분데스리가",
    footballTeam: "바이에른 뮌헨",
    isActive: true,
    createdAt: "2024-01-05",
  },
  {
    id: 6,
    nickname: "골키퍼지수",
    name: "한지수",
    email: "hanjs@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "K리그1",
    footballTeam: "수원 삼성",
    isActive: true,
    createdAt: "2024-01-03",
  },
  {
    id: 7,
    nickname: "축구사랑",
    name: "윤태호",
    email: "yoon@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "프리미어리그",
    footballTeam: "리버풀",
    isActive: false,
    createdAt: "2024-01-01",
  },
  {
    id: 8,
    nickname: "축구공주",
    name: "강미래",
    email: "kangmr@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "라리가",
    footballTeam: "레알 마드리드",
    isActive: true,
    createdAt: "2023-12-28",
  },
  {
    id: 9,
    nickname: "월드컵드림",
    name: "조현우",
    email: "johw@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "K리그1",
    footballTeam: "울산 현대",
    isActive: true,
    createdAt: "2023-12-25",
  },
  {
    id: 10,
    nickname: "축구천재",
    name: "송하영",
    email: "songhy@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "세리에A",
    footballTeam: "AC 밀란",
    isActive: true,
    createdAt: "2023-12-22",
  },
  {
    id: 11,
    nickname: "골든부트",
    name: "임성민",
    email: "limsm@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "분데스리가",
    footballTeam: "도르트문트",
    isActive: false,
    createdAt: "2023-12-20",
  },
  {
    id: 12,
    nickname: "축구여신",
    name: "노예린",
    email: "noyr@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "프리미어리그",
    footballTeam: "맨체스터 시티",
    isActive: true,
    createdAt: "2023-12-18",
  },
  {
    id: 13,
    nickname: "킹축구",
    name: "장현석",
    email: "janghs@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "K리그1",
    footballTeam: "전북 현대",
    isActive: true,
    createdAt: "2023-12-15",
  },
  {
    id: 14,
    nickname: "축구마녀",
    name: "신보라",
    email: "shinbr@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "라리가",
    footballTeam: "아틀레티코 마드리드",
    isActive: true,
    createdAt: "2023-12-12",
  },
  {
    id: 15,
    nickname: "스트라이커",
    name: "오준혁",
    email: "ohjh@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "세리에A",
    footballTeam: "인터 밀란",
    isActive: false,
    createdAt: "2023-12-10",
  },
  {
    id: 16,
    nickname: "축구엔젤",
    name: "류다현",
    email: "ryudh@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "분데스리가",
    footballTeam: "레버쿠젠",
    isActive: true,
    createdAt: "2023-12-08",
  },
  {
    id: 17,
    nickname: "월드클래스",
    name: "홍길동",
    email: "honggd@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "프리미어리그",
    footballTeam: "첼시",
    isActive: true,
    createdAt: "2023-12-05",
  },
  {
    id: 18,
    nickname: "골든글러브",
    name: "김서연",
    email: "kimsy@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "K리그1",
    footballTeam: "포항 스틸러스",
    isActive: true,
    createdAt: "2023-12-03",
  },
];

const accountTypes = ["all", "kakao", "default"];

const genders = ["A", "M", "F"];

const footballLeagues: League[] = [
  {
    leagueId: 0,
    leagueName: "전체",
  },
];

const filterRequest: searchMemberRequest = {
  searchKeyword: "",
  accountType: "",
  gender: "",
  leagueId: 0,
  sort: "",
  page: 1,
};

const CustomerManagement: React.FC = () => {
  const { isAuthenticated, logout, tokenExpiredAfterProcess } = useAuth();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [filteringLeagues, setFilteringLeagues] =
    useState<League[]>(footballLeagues);
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("all");
  const [selectedGender, setSelectedGender] = useState("A");
  const [selectedLeague, setSelectedLeague] = useState(0);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(0);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingFilteringLeagues, setIsLoadingFilteringLeagues] =
    useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isInitialLoad = useRef(false); // API 호출이 한 번만 실행되도록 ref 사용
  const [filterRequestData, setFilterRequestData] =
    useState<searchMemberRequest>(filterRequest);
  const [tokenExpiredAlertCheck, setTokenExpiredAlertCheck] = useState(false);
  const itemsPerPage = 15;

  let authTokens: AuthTokens = {};

  const { loading, error, data, execute } = useApi({
    onSuccess: (data) => {
      if (data === "Token-Expired") {
        console.log("[회원 관리] 토큰이 만료되었습니다.");
        setTokenExpiredAlertCheck(true);
        setTimeout(() => setTokenExpiredAlertCheck(false), 8000);
        router.push("/");
      } else {
        console.log("[회원 관리] API 호출 성공:", data);
      }
    },
    onError: (error) => {
      console.error("[회원 관리] API 호출 오류:", {
        message: error.message,
        stack: error.stack,
        error: error,
      });
      // 토큰 만료가 아닌 다른 에러는 바로 에러 처리하지 않고 UI에서 처리
      // tokenExpiredAfterProcess();
    },
  });

  // API 호출 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    // 토큰이 메모리에 없으면 localStorage에서 로드
    if (!authTokens.authorization && !authTokens.refreshToken) {
      loadAuthTokens();
    }

    // 이미 로드되었다면 API 호출하지 않음
    if (isInitialLoad.current) {
      return;
    }

    // 기존 getCustomers 함수는 fetchMemberList로 대체됨

    // useEffect 안에서 만든 비동기 api 호출 함수 바로 실행
    // getCustomers(); // 기존 함수 대신 새로운 fetchMemberList 사용
    fetchMemberList(1);

    const getFilteringLeagueList = async () => {
      setIsLoadingFilteringLeagues(true);
      // setLoadError(null); // 회원 리스트 에러와 분리
      isInitialLoad.current = true; // API 호출 시작 시 플래그 설정 (중복 호출 방지용 ref)

      try {
        const leagueResponse = await execute("/api/v1/league/all", {
          headers: createHeaders(true),
          method: "GET",
        });

        console.log(
          "필터링 전용 리그 리스트 호출 API 응답 확인:",
          leagueResponse
        );

        // 토큰 만료 처리
        if (leagueResponse === "Token-Expired") {
          console.log("[리그 목록] 토큰이 만료되어 처리를 중단합니다.");
          return;
        }

        // 응답이 없는 경우 기본 리그 목록 사용
        if (!leagueResponse) {
          console.warn(
            "[리그 목록] API 응답이 없어 기본 리그 목록을 사용합니다."
          );
          return;
        }

        const res = leagueResponse;

        // 리그 목록 API 응답 처리
        if (res && res.statusCode === "FO-200") {
          const leagueData = res.data;

          // 응답 데이터 검증
          if (!leagueData || !Array.isArray(leagueData)) {
            console.warn("유효하지 않은 리그 API 응답:", leagueData);
            return;
          }

          // 데이터가 비어있는 경우 처리
          if (leagueData.length === 0) {
            console.log("반환된 리그 데이터가 없습니다.");
            return;
          }

          const filteringLeagueList = leagueData
            .map((league: League) => {
              // 각 멤버 데이터의 필수 필드 검증
              if (!league || typeof league.leagueId === "undefined") {
                console.warn("유효하지 않은 리그 데이터:", league);
                return null;
              }

              return league;
            })
            .filter(
              (league: League | null): league is League => league !== null
            ); // null 값 제거

          if (filteringLeagueList.length > 0) {
            setFilteringLeagues([...filteringLeagues, ...filteringLeagueList]); // 기존 샘플 데이터를 대체
            console.log(
              `${filteringLeagueList.length}개의 리그 데이터를 로드했습니다.`
            );
          }
        } else {
          console.warn(
            "리그 목록 API 응답 오류:",
            res?.statusCode,
            res?.statusMessage
          );
        }
      } catch (err) {
        console.error("필터링 리그 데이터 로드 중 오류 발생:", err);
        // 리그 목록 에러는 회원 목록 에러와 분리하여 처리
        console.log("리그 목록 로드 실패 - 기본 리그 데이터를 사용합니다.");
      } finally {
        setIsLoadingFilteringLeagues(false);
      }
    };

    getFilteringLeagueList();
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 로컬 필터링은 API에서 처리하므로 제거 (API 응답 데이터를 그대로 사용)

  // 필터 값을 API 요구사항에 맞게 변환하는 함수
  const convertFiltersForApi = () => {
    return {
      searchKeyword: searchTerm || "", // 빈 문자열로 기본값 설정
      accountType:
        selectedAccountType === "all"
          ? null
          : selectedAccountType === "kakao"
          ? "kakao"
          : "default",
      gender: selectedGender === "A" ? null : selectedGender, // "M" 또는 "F"
      leagueId: selectedLeague, // 0이면 전체, 다른 값이면 해당 리그 ID
      sort: sortBy, // "latest", "oldest", "email"
      page: currentPage,
    };
  };

  // 회원 리스트 API 호출 함수 (검색 및 페이징 공통 사용)
  const fetchMemberList = async (pageNumber?: number) => {
    setIsLoadingCustomers(true);
    setLoadError(null);

    try {
      const requestData = convertFiltersForApi();
      if (pageNumber) {
        requestData.page = pageNumber;
      }

      console.log("회원 리스트 API 요청 데이터:", requestData);

      // 관리자 회원 리스트 호출 api
      const apiResponse = await execute("/api/v1/member/list", {
        headers: createHeaders(true), // 토큰 헤더 주입
        method: "POST", // method 방식 지정
        body: JSON.stringify(requestData), // post 방식 호출 시 넘길 body 객체 데이터
      });

      console.log("회원 리스트 API 응답:", apiResponse);

      // 토큰 만료 처리
      if (apiResponse === "Token-Expired") {
        console.log("[회원 관리] 토큰이 만료되어 처리를 중단합니다.");
        return;
      }

      // 응답이 없는 경우 처리
      if (!apiResponse) {
        console.error("[회원 관리] API 응답이 없습니다.");
        setLoadError("서버에서 응답을 받지 못했습니다.");
        setCustomers([]);
        setFilteredCustomers([]);
        setTotalPages(1);
        setTotalItems(0);
        return;
      }

      const res = apiResponse;

      // API 응답 처리 - statusCode가 FO-200인 경우에만 정상 처리
      if (res && res.statusCode === "FO-200") {
        const memberData = res.data;
        console.log("정상 응답 데이터:", memberData);

        // 멤버 데이터 변환 함수
        const convertMemberToCustomer = (member: Member): Customer | null => {
          if (!member || typeof member.memberId === "undefined") {
            console.warn("유효하지 않은 멤버 데이터:", member);
            return null;
          }

          return {
            id: member.memberId,
            nickname: member.nickName || "",
            name: member.name || "",
            email: member.email || "",
            accountType: member.accountType === "카카오" ? "kakao" : "normal",
            gender: member.gender === "남성" ? "male" : "female",
            footballLeague: member.leagueName || "",
            footballTeam: member.teamName || "",
            isActive: member.live === "y" ? true : false,
            createdAt: member.createdAt || new Date().toISOString(),
          };
        };

        let members: Member[] = [];
        let processedCustomers: Customer[] = [];

        // 다양한 응답 형태 처리
        if (
          memberData &&
          memberData.members &&
          Array.isArray(memberData.members)
        ) {
          // 페이징 정보가 포함된 객체 형태의 응답
          members = memberData.members;
          setTotalPages(memberData.totalPages || 1);
          setTotalItems(memberData.totalItems || members.length);
          console.log(
            `페이징 정보: 총 ${memberData.totalItems || members.length}개, ${
              memberData.totalPages || 1
            }페이지`
          );
        } else if (Array.isArray(memberData)) {
          // 단순 배열 형태의 응답
          members = memberData;
          setTotalPages(1);
          setTotalItems(members.length);
          console.log("단순 배열 형태의 응답:", members.length + "개");
        } else if (memberData === null || memberData === undefined) {
          // 데이터가 없는 경우
          console.log("반환된 회원 데이터가 없습니다.");
          setCustomers([]);
          setFilteredCustomers([]);
          setTotalPages(1);
          setTotalItems(0);
          setLoadError(null); // 에러가 아닌 정상적인 빈 결과
          return;
        } else {
          console.warn("예상치 못한 응답 형태:", memberData);
          setLoadError("예상치 못한 응답 형태입니다.");
          return;
        }

        // 멤버 데이터 변환
        processedCustomers = members
          .map(convertMemberToCustomer)
          .filter(
            (customer: Customer | null): customer is Customer =>
              customer !== null
          );

        // 상태 업데이트
        setCustomers(processedCustomers);
        setFilteredCustomers(processedCustomers);
        setLoadError(null);

        console.log(
          `${processedCustomers.length}명의 회원 데이터를 성공적으로 로드했습니다.`
        );
      } else {
        // API 오류 처리
        const errorMessage =
          res?.statusMessage || "알 수 없는 오류가 발생했습니다";
        const statusCode = res?.statusCode || "UNKNOWN";

        console.error("API 응답 오류:", {
          statusCode,
          errorMessage,
          fullResponse: res,
        });

        // 특정 상태 코드에 따른 에러 메시지 처리
        switch (statusCode) {
          case "FO-401":
            setLoadError("인증이 필요합니다. 다시 로그인해주세요.");
            break;
          case "FO-403":
            setLoadError("접근 권한이 없습니다.");
            break;
          case "FO-404":
            setLoadError("요청한 데이터를 찾을 수 없습니다.");
            break;
          case "FO-500":
            setLoadError(
              "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            break;
          default:
            setLoadError(`API 오류 (${statusCode}): ${errorMessage}`);
        }

        // 오류 발생 시 빈 데이터로 설정
        setCustomers([]);
        setFilteredCustomers([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("회원 데이터 로드 중 네트워크 오류 발생:", error);
      setLoadError(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요."
      );
      setCustomers([]);
      setFilteredCustomers([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // 재시도 함수
  const handleRetryLoadMembers = () => {
    setRetryCount((prev) => prev + 1);
    setLoadError(null);
    fetchMemberList(currentPage);
  };

  // 검색 버튼 클릭 핸들러
  const handleMemberSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    await fetchMemberList(1);
  };

  // 페이지 변경 핸들러 (필터 값 유지하면서 페이지만 변경)
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    await fetchMemberList(pageNumber);
  };

  // 현재 페이지에 표시할 회원 데이터 (API에서 페이징 처리하는 경우 전체 데이터 표시)
  const currentCustomers = filteredCustomers;

  // 회원 삭제 핸들러
  const handleDeleteCustomer = (customerId: number) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete)
      );
      setShowDeleteModal(false);
      setCustomerToDelete(0);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(0);
  };

  // 회원 생성 페이지로 이동
  // const handleCreateCustomer = () => {
  //   router.push("/customers/create");
  // };

  // 회원 상세 페이지로 이동
  const handleViewCustomer = (customerId: number) => {
    router.push(`/customers/${customerId}`);
  };

  // 회원 수정 페이지로 이동
  const handleEditCustomer = (customerId: number) => {
    router.push(`/customers/edit/${customerId}`);
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 계정 타입 한글 변환
  const getAccountTypeLabel = (type: string) => {
    return type === "kakao" ? "카카오" : "일반";
  };

  // 성별 한글 변환
  const getGenderLabel = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      male: "남성",
      female: "여성",
      other: "기타",
    };
    return genderMap[gender] || gender;
  };

  return (
    <div className="space-y-6">
      {/* 토큰 만료 알림 */}
      {tokenExpiredAlertCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                계정 정보가 만료되었습니다. 다시 로그인 해주세요.
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
          <p className="text-gray-600 mt-1">회원을 관리하고 편집하세요</p>
        </div>
        {/* <button
          onClick={handleCreateCustomer}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>회원 생성</span>
        </button> */}
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <form onSubmit={handleMemberSearchSubmit}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 검색 */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="이메일, 이름, 닉네임으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 검색 버튼 */}
            <button
              type="submit"
              onClick={handleMemberSearchSubmit}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search size={20} />
              <span>검색</span>
            </button>

            {/* 계정 타입 */}
            <select
              value={selectedAccountType}
              onChange={(e) => setSelectedAccountType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all"
                    ? "전체"
                    : type === "kakao"
                    ? "카카오"
                    : "일반"}
                </option>
              ))}
            </select>

            {/* 성별 */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender === "A" ? "전체" : gender === "M" ? "남성" : "여성"}
                </option>
              ))}
            </select>

            {/* 축구 리그 */}
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(Number(e.target.value))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filteringLeagues.map((league) => (
                <option key={league.leagueId} value={league.leagueId}>
                  {league.leagueName}
                </option>
              ))}
            </select>

            {/* 정렬 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="email">이메일순</option>
            </select>
          </div>
        </form>
      </div>

      {/* 로딩 상태 및 에러 메시지 */}
      {isLoadingCustomers && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">
              회원 데이터를 로딩 중입니다...
            </span>
          </div>
        </div>
      )}

      {loadError && !isLoadingCustomers && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-600 mb-6">
            <svg
              className="mx-auto h-12 w-12 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">{loadError}</p>

            {/* 디버깅 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                디버깅 정보:
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• API 서버: http://localhost:8094</p>
                <p>• 엔드포인트: /api/v1/member/list</p>
                <p>• 방식: POST</p>
                <p>• 재시도 횟수: {retryCount}회</p>
                <p>
                  • 브라우저 개발자 도구 → 네트워크 탭에서 자세한 오류 확인 가능
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={handleRetryLoadMembers}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                다시 시도
              </button>
              <button
                onClick={() => {
                  setLoadError(null);
                  setCustomers(sampleCustomers);
                  setFilteredCustomers(sampleCustomers);
                  setTotalPages(Math.ceil(sampleCustomers.length / 15));
                  setTotalItems(sampleCustomers.length);
                }}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                샘플 데이터 사용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원 리스트 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* 빈 데이터 상태 표시 */}
        {!isLoadingCustomers && !loadError && currentCustomers.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-1">
                검색 결과가 없습니다
              </p>
              <p className="text-sm text-gray-500">
                다른 검색 조건으로 다시 시도해보세요
              </p>
            </div>
          </div>
        )}

        {/* 데이터가 있을 때만 테이블 표시 */}
        {currentCustomers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    회원 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    계정 타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    성별
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    축구 리그
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    축구 팀
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    계정 상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewCustomer(customer.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.nickname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.accountType === "kakao"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getAccountTypeLabel(customer.accountType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getGenderLabel(customer.gender)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.footballLeague}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.footballTeam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-1" />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.isActive ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCustomer(customer.id);
                          }}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="상세보기"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCustomer(customer.id);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="수정"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomer(customer.id);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 페이지네이션 - 데이터가 있고 페이지가 1개 이상일 때만 표시 */}
        {currentCustomers.length > 0 && totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                이전
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                다음
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  총{" "}
                  <span className="font-medium">
                    {totalItems || filteredCustomers.length}
                  </span>
                  개 중 현재 페이지에{" "}
                  <span className="font-medium">
                    {filteredCustomers.length}
                  </span>
                  개 표시
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              회원 삭제 확인
            </h3>
            <p className="text-gray-600 mb-6">
              정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
