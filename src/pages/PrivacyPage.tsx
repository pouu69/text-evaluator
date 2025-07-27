import { Link } from 'react-router-dom';

function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link to="/" className="text-primary-600 hover:text-primary-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          홈으로 돌아가기
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800">개인정보 처리방침</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 mb-6 leading-relaxed">
          텍스트 평가 도구(이하 "사이트"라 함)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하기 위하여 노력하고 있습니다. 본 사이트는 개인이 만든 비상업적 사이트로, 구글 광고 외에 수익이 없으며 개인이 직접 운영합니다. 사이트는 개인정보처리방침을 통하여 사이트가 이용자로부터 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 개인정보의 제3자 제공에 관한 사항을 알려드립니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">1. 수집하는 개인정보의 항목 및 수집방법</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          본 사이트는 별도의 회원 가입 절차 없이 서비스를 제공하며, 구글 광고에서 수집하는 항목 외에는 어떠한 개인정보도 서버에 저장하지 않습니다. 구글 광고를 통해 다음과 같은 정보가 수집될 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>IP 주소</li>
          <li>쿠키 정보</li>
          <li>브라우저 유형</li>
          <li>사용 기기 정보</li>
        </ul>
        <p className="text-gray-700 mb-6 leading-relaxed">
          개인정보 수집방법:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>사이트 방문 시 구글 광고 서비스에 의해 자동으로 수집</li>
          <li>서비스 이용 과정에서 자동으로 생성되어 수집되는 경우</li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">2. 개인정보의 수집 및 이용목적</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          구글 광고를 통해 수집된 정보는 다음의 목적을 위해 활용됩니다:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>맞춤형 광고 제공</li>
          <li>광고 성과 측정</li>
          <li>서비스 이용에 대한 통계 분석</li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">3. 개인정보의 보유 및 이용기간</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          본 사이트는 별도의 회원 가입 절차가 없고 어떠한 개인정보도 서버에 저장하지 않으므로, 개인정보의 보유 및 이용기간이 별도로 존재하지 않습니다. 구글 광고를 통해 수집되는 정보는 구글의 개인정보 처리방침에 따라 관리됩니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">4. 개인정보의 파기절차 및 방법</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          본 사이트는 별도의 개인정보를 수집하거나 저장하지 않으므로, 파기 절차 및 방법이 별도로 존재하지 않습니다. 구글 광고를 통해 수집된 정보는 구글의 개인정보 처리방침에 따라 관리됩니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">5. 개인정보 제공</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>이용자들이 사전에 동의한 경우</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">6. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며, 회사의 개인정보 처리에 동의하지 않는 경우 동의를 거부하거나 가입해지(회원탈퇴)를 요청하실 수 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">7. 개인정보에 관한 민원서비스</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          본 사이트는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 연락처를 제공합니다:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>연락처: pouu69@gmail.com</li>
        </ul>
        <p className="text-gray-700 mb-6 leading-relaxed">
          기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
          <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
          <li>경찰청 사이버안전국 (www.police.go.kr/www/security/cyber.jsp / 국번없이 182)</li>
        </ul>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>최종 업데이트: 2025년 7월 27일</p>
      </div>
    </div>
  );
}

export default PrivacyPage;
