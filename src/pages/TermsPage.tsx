import { Link } from 'react-router-dom';

function TermsPage() {
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
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800">이용약관</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 1 조 (목적)</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          이 약관은 텍스트 평가 도구(이하 "회사"라 함)가 제공하는 텍스트 평가 서비스(이하 "서비스"라 함)의 이용조건 및 절차, 회사와 이용자 간의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 2 조 (용어의 정의)</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
        </p>
        <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
          <li>"서비스"란 회사가 제공하는 텍스트 평가 및 분석 서비스를 의미합니다.</li>
          <li>"이용자"란 회사의 서비스를 이용하는 모든 사용자를 의미합니다.</li>
          <li>"콘텐츠"란 이용자가 서비스를 통해 평가 및 분석을 위해 제공하는 모든 텍스트 자료를 의미합니다.</li>
        </ol>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 3 조 (약관의 효력 및 변경)</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
        </p>
        <p className="text-gray-700 mb-3 leading-relaxed">
          2. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있으며, 계속 서비스를 이용하는 경우 변경된 약관에 동의한 것으로 간주됩니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 4 조 (서비스의 제공 및 변경)</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          1. 회사는 이용자에게 텍스트 평가 및 분석 서비스를 제공합니다.
        </p>
        <p className="text-gray-700 mb-3 leading-relaxed">
          2. 회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경할 수 있으며, 변경 사항은 서비스 내에 공지합니다.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          3. 회사는 시스템 점검, 보수, 교체 등의 사유로 서비스 제공을 일시적으로 중단할 수 있습니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 5 조 (이용자의 의무)</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          이용자는 다음 행위를 하여서는 안 됩니다:
        </p>
        <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
          <li>타인의 개인정보, 저작권 등 지적재산권을 침해하는 행위</li>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우</li>
          <li>서비스를 이용하여 타인을 비방하거나 명예를 훼손하는 행위</li>
        </ol>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 6 조 (책임제한)</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
        </p>
        <p className="text-gray-700 mb-3 leading-relaxed">
          2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          3. 회사는 이용자가 서비스를 통해 제공된 정보의 신뢰도, 정확성 등에 대해 보증하지 않으며, 이로 인해 발생한 손해에 대해 책임을 지지 않습니다.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">제 7 조 (준거법 및 재판관할)</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          1. 이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국의 법률을 적용합니다.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          2. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속관할법원으로 합니다.
        </p>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>최종 업데이트: 2025년 7월 27일</p>
      </div>
    </div>
  );
}

export default TermsPage;
