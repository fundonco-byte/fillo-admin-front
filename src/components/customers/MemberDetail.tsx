"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Activity,
} from "lucide-react";
import { Member } from "@/types/member";
import { apiRequest } from "@/lib/api";
import { ApiResponse } from "@/types/auth";

interface MemberDetailProps {
  memberId: string;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId }) => {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchMemberInfo();
  }, [memberId]);

  const fetchMemberInfo = async () => {
    try {
      setLoading(true);
      const response: ApiResponse<Member> = await apiRequest(
        `/api/v1/member/info?m=${memberId}`,
        { method: "GET" }
      );

      if (response.statusCode === "FO-200") {
        setMember(response.data);
      } else {
        setError("회원 정보를 불러오는데 실패했습니다.");
      }
    } catch (err) {
      setError("회원 정보를 불러오는데 실패했습니다.");
      console.error("Error fetching member info:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/customers/${memberId}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response: ApiResponse = await apiRequest(
        `/api/v1/member/delete?m=${memberId}`,
        { method: "DELETE" }
      );

      if (response.statusCode === "FO-200") {
        alert("회원이 성공적으로 삭제되었습니다.");
        router.push("/customers");
      } else {
        alert("회원 삭제에 실패했습니다.");
      }
    } catch (err) {
      alert("회원 삭제 중 오류가 발생했습니다.");
      console.error("Error deleting member:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleBack = () => {
    router.push("/customers");
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "M":
        return "남성";
      case "F":
        return "여성";
      case "A":
        return "전체";
      default:
        return gender;
    }
  };

  const getAccountTypeLabel = (accountType: string) => {
    switch (accountType) {
      case "kakao":
        return "카카오";
      case "normal":
        return "일반";
      default:
        return accountType;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">
          {error || "회원 정보를 찾을 수 없습니다."}
        </p>
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">회원 상세정보</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            <span>정보 수정</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>계정 삭제</span>
          </button>
        </div>
      </div>

      {/* 회원 정보 카드 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          {/* 프로필 이미지 및 기본 정보 */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {member.profileImage ? (
                <img
                  src={member.profileImage}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <p className="text-lg text-gray-600 mb-1">@{member.nickName}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Activity size={14} />
                  <span>{member.live === "y" ? "활성" : "비활성"}</span>
                </span>
                <span>가입일: {formatDate(member.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* 상세 정보 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 개인 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                개인 정보
              </h3>

              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="font-medium">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">전화번호</p>
                  <p className="font-medium">
                    {member.phone || "등록되지 않음"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">생년월일</p>
                  <p className="font-medium">
                    {member.birthDate || "등록되지 않음"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">성별</p>
                  <p className="font-medium">{getGenderLabel(member.gender)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">계정 유형</p>
                  <p className="font-medium">
                    {getAccountTypeLabel(member.accountType)}
                  </p>
                </div>
              </div>
            </div>

            {/* 주소 및 기타 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                주소 및 기타
              </h3>

              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">주소</p>
                  <p className="font-medium">
                    {member.address || "등록되지 않음"}
                  </p>
                  {member.postalCode && (
                    <p className="text-sm text-gray-400">
                      우편번호: {member.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">선호 리그</p>
                  <p className="font-medium">
                    {member.leagueName || "선택되지 않음"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">선호 팀</p>
                  <p className="font-medium">
                    {member.teamName || "선택되지 않음"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">개인정보 이용 동의</p>
                  <p className="font-medium">
                    {member.personalInfoAgreement === "y" ? "동의" : "미동의"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">마케팅 동의</p>
                  <p className="font-medium">
                    {member.marketingAgreement === "y" ? "동의" : "미동의"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              계정 삭제 확인
            </h3>
            <p className="text-gray-600 mb-6">
              정말로 이 회원의 계정을 삭제하시겠습니까?
              <br />
              삭제된 데이터는 복구할 수 없습니다.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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

export default MemberDetail;
