"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

// 회원 인터페이스
interface Customer {
  id: string;
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
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
    nickname: "축구소녀",
    name: "정수진",
    email: "jungsj@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "세리에 A",
    footballTeam: "유벤투스",
    isActive: true,
    createdAt: "2024-01-08",
  },
  {
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
    nickname: "축구천재",
    name: "송하영",
    email: "songhy@example.com",
    accountType: "normal",
    gender: "female",
    footballLeague: "세리에 A",
    footballTeam: "AC 밀란",
    isActive: true,
    createdAt: "2023-12-22",
  },
  {
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
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
    id: "15",
    nickname: "스트라이커",
    name: "오준혁",
    email: "ohjh@example.com",
    accountType: "kakao",
    gender: "male",
    footballLeague: "세리에 A",
    footballTeam: "인터 밀란",
    isActive: false,
    createdAt: "2023-12-10",
  },
  {
    id: "16",
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
    id: "17",
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
    id: "18",
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

const accountTypes = ["전체", "카카오", "일반"];
const genders = ["전체", "남성", "여성", "기타"];
const footballLeagues = [
  "전체",
  "K리그1",
  "프리미어리그",
  "라리가",
  "세리에 A",
  "분데스리가",
];

const CustomerManagement: React.FC = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("전체");
  const [selectedGender, setSelectedGender] = useState("전체");
  const [selectedLeague, setSelectedLeague] = useState("전체");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const itemsPerPage = 15;

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = customers;

    // 검색 필터 (이메일 + 이름 + 닉네임)
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 계정 타입 필터
    if (selectedAccountType !== "전체") {
      const accountTypeMap: { [key: string]: string } = {
        카카오: "kakao",
        일반: "normal",
      };
      filtered = filtered.filter(
        (customer) =>
          customer.accountType === accountTypeMap[selectedAccountType]
      );
    }

    // 성별 필터
    if (selectedGender !== "전체") {
      const genderMap: { [key: string]: string } = {
        남성: "male",
        여성: "female",
      };
      filtered = filtered.filter(
        (customer) => customer.gender === genderMap[selectedGender]
      );
    }

    // 축구 리그 필터
    if (selectedLeague !== "전체") {
      filtered = filtered.filter(
        (customer) => customer.footballLeague === selectedLeague
      );
    }

    // 정렬
    switch (sortBy) {
      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "email":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      default:
        break;
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [
    customers,
    searchTerm,
    selectedAccountType,
    selectedGender,
    selectedLeague,
    sortBy,
  ]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // 회원 삭제 핸들러
  const handleDeleteCustomer = (customerId: string) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete)
      );
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  // 회원 생성 페이지로 이동
  const handleCreateCustomer = () => {
    router.push("/customers/create");
  };

  // 회원 수정 페이지로 이동
  const handleEditCustomer = (customerId: string) => {
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
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
          <p className="text-gray-600 mt-1">회원을 관리하고 편집하세요</p>
        </div>
        <button
          onClick={handleCreateCustomer}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>회원 생성</span>
        </button>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
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

          {/* 계정 타입 */}
          <select
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accountTypes.map((type) => (
              <option key={type} value={type}>
                {type}
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
                {gender}
              </option>
            ))}
          </select>

          {/* 축구 리그 */}
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {footballLeagues.map((league) => (
              <option key={league} value={league}>
                {league}
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
      </div>

      {/* 회원 리스트 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                <tr key={customer.id} className="hover:bg-gray-50">
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
                        onClick={() => handleEditCustomer(customer.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
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

        {/* 페이지네이션 */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
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
                <span className="font-medium">{filteredCustomers.length}</span>
                개 중 <span className="font-medium">{startIndex + 1}</span>-
                <span className="font-medium">
                  {Math.min(endIndex, filteredCustomers.length)}
                </span>
                개 표시
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
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
