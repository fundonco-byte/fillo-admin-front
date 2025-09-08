"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Save,
  ArrowLeft,
  Upload,
  Activity,
  Check,
} from "lucide-react";
import { Member } from "@/types/member";
import { League, Team } from "@/types/league";
import { apiRequest } from "@/lib/api";
import { ApiResponse } from "@/types/auth";

interface MemberEditProps {
  memberId: string;
}

interface MemberUpdateRequest {
  memberId: number;
  nickName: string;
  address: string;
  birthDate: string;
  postalCode: string;
  phone: string;
  live: string;
  profileImage: string;
  gender: string;
  leagueId: number;
  leagueName: string;
  teamId: number;
  teamName: string;
  personalInfoAgreement: string;
  marketingAgreement: string;
}

const MemberEdit: React.FC<MemberEditProps> = ({ memberId }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // 폼 데이터
  const [formData, setFormData] = useState<Partial<MemberUpdateRequest>>({});
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  // 리그 및 팀 데이터
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);

  // 검증 오류
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 전화번호 유효성 검사
  const [phoneError, setPhoneError] = useState<string>("");

  useEffect(() => {
    fetchMemberInfo();
    fetchLeagues();
    fetchTeams();
  }, [memberId]);

  useEffect(() => {
    if (formData.leagueId !== undefined) {
      if (formData.leagueId === 0) {
        // 선호 리그 "없음" 선택 시 팀도 "없음"만 표시
        const noneTeam = teams.filter((team) => team.teamId === 0);
        setAvailableTeams(noneTeam);
        // 자동으로 "없음" 팀 선택
        setFormData((prev) => ({ ...prev, teamId: 0, teamName: "없음" }));
      } else {
        // 일반 리그 선택 시 해당 리그의 팀들 표시
        const filteredTeams = teams.filter(
          (team) => team.leagueId === formData.leagueId
        );
        setAvailableTeams(filteredTeams);

        // 선택된 리그가 변경되면 팀 선택 초기화
        if (
          formData.teamId &&
          !filteredTeams.find((team) => team.teamId === formData.teamId)
        ) {
          setFormData((prev) => ({ ...prev, teamId: undefined, teamName: "" }));
        }
      }
    }
  }, [formData.leagueId, teams]);

  const fetchMemberInfo = async () => {
    try {
      setLoading(true);
      const response: ApiResponse<Member> = await apiRequest(
        `/api/v1/member/info?m=${memberId}`,
        { method: "GET" }
      );

      if (response.statusCode === "FO-200") {
        setMember(response.data);
        setFormData({
          memberId: response.data.memberId,
          nickName: response.data.nickName,
          address: response.data.address || "",
          birthDate: response.data.birthDate,
          postalCode: response.data.postalCode || "",
          phone: response.data.phone || "",
          live: response.data.live,
          profileImage: response.data.profileImage || "",
          gender: response.data.gender,
          leagueId: response.data.leagueId,
          leagueName: response.data.leagueName,
          teamId: response.data.teamId,
          teamName: response.data.teamName,
          personalInfoAgreement: response.data.personalInfoAgreement,
          marketingAgreement: response.data.marketingAgreement,
        });
        setProfileImagePreview(response.data.profileImage || "");
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

  const fetchLeagues = async () => {
    // 임시 리그 데이터 (실제로는 API에서 가져와야 함)
    const mockLeagues: League[] = [
      { leagueId: 0, leagueName: "없음" },
      { leagueId: 1, leagueName: "프리미어리그" },
      { leagueId: 2, leagueName: "라리가" },
      { leagueId: 3, leagueName: "분데스리가" },
      { leagueId: 4, leagueName: "세리에A" },
      { leagueId: 5, leagueName: "리그1" },
    ];
    setLeagues(mockLeagues);
  };

  const fetchTeams = async () => {
    // 임시 팀 데이터 (실제로는 API에서 가져와야 함)
    const mockTeams: Team[] = [
      // 없음 선택지
      { teamId: 0, name: "없음", leagueId: 0 },
      // 프리미어리그
      { teamId: 1, name: "맨체스터 유나이티드", leagueId: 1 },
      { teamId: 2, name: "맨체스터 시티", leagueId: 1 },
      { teamId: 3, name: "리버풀", leagueId: 1 },
      { teamId: 4, name: "첼시", leagueId: 1 },
      { teamId: 5, name: "아스널", leagueId: 1 },
      // 라리가
      { teamId: 6, name: "레알 마드리드", leagueId: 2 },
      { teamId: 7, name: "바르셀로나", leagueId: 2 },
      { teamId: 8, name: "아틀레티코 마드리드", leagueId: 2 },
      // 분데스리가
      { teamId: 9, name: "바이에른 뮌헨", leagueId: 3 },
      { teamId: 10, name: "도르트문트", leagueId: 3 },
      // 세리에A
      { teamId: 11, name: "유벤투스", leagueId: 4 },
      { teamId: 12, name: "AC 밀란", leagueId: 4 },
      { teamId: 13, name: "인테르 밀란", leagueId: 4 },
      // 리그1
      { teamId: 14, name: "파리 생제르맹", leagueId: 5 },
      { teamId: 15, name: "올림피크 마르세유", leagueId: 5 },
    ];
    setTeams(mockTeams);
  };

  const handleInputChange = (field: keyof MemberUpdateRequest, value: any) => {
    // 전화번호의 경우 숫자만 허용
    if (field === "phone" && value) {
      // 숫자가 아닌 문자 제거
      value = value.replace(/[^0-9]/g, "");
      // 11자리까지만 허용
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    // 오류 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // 전화번호 유효성 검사
    if (field === "phone") {
      validatePhone(value);
    }
  };

  const handleLeagueChange = (leagueId: number) => {
    const selectedLeague = leagues.find(
      (league) => league.leagueId === leagueId
    );
    handleInputChange("leagueId", leagueId);
    handleInputChange("leagueName", selectedLeague?.leagueName || "");
  };

  const handleTeamChange = (teamId: number) => {
    const selectedTeam = availableTeams.find((team) => team.teamId === teamId);
    handleInputChange("teamId", teamId);
    handleInputChange("teamName", selectedTeam?.name || "");
  };

  // 전화번호 유효성 검사 함수
  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("");
      return true;
    }

    // 숫자만 허용
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("전화번호는 숫자만 입력 가능합니다.");
      return false;
    }

    // 11자리 검사
    if (phone.length !== 11) {
      setPhoneError("전화번호는 11자리를 입력해주세요.");
      return false;
    }

    setPhoneError("");
    return true;
  };

  // 주소 검색 함수 (다음 우편번호 서비스 사용)
  const handleAddressSearch = () => {
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 선택된 주소 정보를 폼에 설정
        const fullAddress =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        handleInputChange("address", fullAddress);
        handleInputChange("postalCode", data.zonecode);
      },
    }).open();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 필수 항목 검증 (nickName, address, postalCode, phone 제외)
    if (!formData.live) {
      newErrors.live = "계정 상태를 선택해주세요.";
    }

    if (formData.leagueId === undefined) {
      newErrors.leagueId = "선호 리그를 선택해주세요.";
    }

    if (formData.teamId === undefined) {
      newErrors.teamId = "선호 팀을 선택해주세요.";
    }

    if (!formData.personalInfoAgreement) {
      newErrors.personalInfoAgreement = "개인정보 이용 동의를 선택해주세요.";
    }

    if (!formData.marketingAgreement) {
      newErrors.marketingAgreement = "마케팅 동의를 선택해주세요.";
    }

    // 전화번호 유효성 검사
    if (formData.phone && !validatePhone(formData.phone)) {
      return false;
    }

    setErrors(newErrors);

    // 첫 번째 오류 필드에 포커스
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }

    return Object.keys(newErrors).length === 0 && !phoneError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      // 이미지 업로드 처리 (실제로는 별도 API 필요)
      let profileImageUrl = formData.profileImage;
      if (profileImageFile) {
        // 실제로는 이미지 업로드 API를 호출해야 함
        profileImageUrl = profileImagePreview; // 임시로 미리보기 URL 사용
      }

      const updateData: MemberUpdateRequest = {
        memberId: formData.memberId!,
        nickName: formData.nickName || "",
        address: formData.address || "",
        birthDate: formData.birthDate || "",
        postalCode: formData.postalCode || "",
        phone: formData.phone || "",
        live: formData.live || "",
        profileImage: profileImageUrl || "",
        gender: formData.gender === "남성" ? "M" : "F",
        leagueId: formData.leagueId || 0,
        leagueName: formData.leagueName || "",
        teamId: formData.teamId || 0,
        teamName: formData.teamName || "",
        personalInfoAgreement: formData.personalInfoAgreement || "",
        marketingAgreement: formData.marketingAgreement || "",
      };

      const response: ApiResponse = await apiRequest("/api/v1/member/update", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      if (response.statusCode === "FO-200") {
        alert("회원 정보가 성공적으로 수정되었습니다.");
        router.push("/customers");
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (err) {
      alert("회원 정보 수정 중 오류가 발생했습니다.");
      console.error("Error updating member:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push(`/customers/${memberId}`);
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
          onClick={() => router.push("/customers")}
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
          <h1 className="text-2xl font-bold text-gray-900">회원 정보 수정</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? "저장 중..." : "저장"}</span>
        </button>
      </div>

      {/* 수정 폼 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          {/* 프로필 이미지 및 기본 정보 */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Upload size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>가입일: {formatDate(member.createdAt)}</span>
              </div>

              {/* 닉네임 수정 */}
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  닉네임
                </label>
                <input
                  type="text"
                  value={formData.nickName || ""}
                  onChange={(e) =>
                    handleInputChange("nickName", e.target.value)
                  }
                  placeholder={member.nickName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 수정 정보 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 개인 정보 (읽기 전용) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                개인 정보 (수정 불가)
              </h3>

              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="font-medium text-gray-600">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">이름</p>
                  <p className="font-medium text-gray-600">{member.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">계정 유형</p>
                  <p className="font-medium text-gray-600">
                    {getAccountTypeLabel(member.accountType)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">생년월일</p>
                  <p className="font-medium text-gray-600">
                    {member.birthDate || "등록되지 않음"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">성별</p>
                  <p className="font-medium text-gray-600">{member.gender}</p>
                </div>
              </div>
            </div>

            {/* 수정 가능한 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                수정 가능한 정보
              </h3>

              {/* 주소 및 우편번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주소 및 우편번호
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.postalCode || ""}
                      readOnly
                      placeholder="우편번호"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.address || ""}
                    readOnly
                    placeholder="주소를 선택해주세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호
                </label>
                <input
                  type="text"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="전화번호 11자리를 입력하세요 (예: 01012345678)"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                    phoneError
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>

              {/* 계정 상태 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  계정 상태 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="live"
                      checked={formData.live === "y"}
                      onChange={(e) =>
                        handleInputChange("live", e.target.checked ? "y" : "n")
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">활성</span>
                  </label>
                </div>
                {errors.live && (
                  <p className="text-red-500 text-sm mt-1">{errors.live}</p>
                )}
              </div>
            </div>
          </div>

          {/* 선호 리그 및 팀 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선호 리그 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                {leagues.map((league) => (
                  <label key={league.leagueId} className="flex items-center">
                    <input
                      type="radio"
                      name="leagueId"
                      value={league.leagueId}
                      checked={formData.leagueId === league.leagueId}
                      onChange={(e) =>
                        handleLeagueChange(Number(e.target.value))
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">{league.leagueName}</span>
                  </label>
                ))}
              </div>
              {errors.leagueId && (
                <p className="text-red-500 text-sm mt-1">{errors.leagueId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선호 팀 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                {availableTeams.length > 0 ? (
                  availableTeams.map((team) => (
                    <label key={team.teamId} className="flex items-center">
                      <input
                        type="radio"
                        name="teamId"
                        value={team.teamId}
                        checked={formData.teamId === team.teamId}
                        onChange={(e) =>
                          handleTeamChange(Number(e.target.value))
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">{team.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    먼저 리그를 선택해주세요.
                  </p>
                )}
              </div>
              {errors.teamId && (
                <p className="text-red-500 text-sm mt-1">{errors.teamId}</p>
              )}
            </div>
          </div>

          {/* 동의 항목 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                개인정보 이용 동의 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="personalInfoAgreement"
                    value="y"
                    checked={formData.personalInfoAgreement === "y"}
                    onChange={(e) =>
                      handleInputChange("personalInfoAgreement", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">동의</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="personalInfoAgreement"
                    value="n"
                    checked={formData.personalInfoAgreement === "n"}
                    onChange={(e) =>
                      handleInputChange("personalInfoAgreement", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">미동의</span>
                </label>
              </div>
              {errors.personalInfoAgreement && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.personalInfoAgreement}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                마케팅 동의 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="marketingAgreement"
                    value="y"
                    checked={formData.marketingAgreement === "y"}
                    onChange={(e) =>
                      handleInputChange("marketingAgreement", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">동의</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="marketingAgreement"
                    value="n"
                    checked={formData.marketingAgreement === "n"}
                    onChange={(e) =>
                      handleInputChange("marketingAgreement", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">미동의</span>
                </label>
              </div>
              {errors.marketingAgreement && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.marketingAgreement}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit;
