"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 서울·경기·인천 수도권 전지역 행정구역 데이터
const regionData: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로1동", "원효로2동", "효창동", "용문동", "이촌1동", "이촌2동", "이태원1동", "이태원2동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리2동", "왕십리도선동", "마장동", "사근동", "행당1동", "행당2동", "응봉동", "금호1가동", "금호2.3가동", "금호4가동", "옥수동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡1동", "중곡2동", "중곡3동", "중곡4동", "능동", "구의1동", "구의2동", "구의3동", "광장동", "자양1동", "자양2동", "자양3동", "자양4동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농1동", "전농2동", "답십리1동", "답십리2동", "장안1동", "장안2동", "청량리동", "회기동", "휘경1동", "휘경2동", "이문1동", "이문2동"] },
      jungnang: { name: "중랑구", dongs: ["면목본동", "면목2동", "면목3.4동", "면목5동", "면목7동", "상봉1동", "상봉2동", "중화1동", "중화2동", "묵1동", "묵2동", "망우본동", "망우3동", "신내1동", "신내2동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암1동", "돈암2동", "안암동", "보문동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "길음1동", "길음2동", "종암동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번1동", "번2동", "번3동", "수유1동", "수유2동", "수유3동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창1동", "창2동", "창3동", "창4동", "창5동", "도봉1동", "도봉2동", "쌍문1동", "쌍문2동", "쌍문3동", "쌍문4동", "방학1동", "방학2동", "방학3동"] },
      nowon: { name: "노원구", dongs: ["상계1동", "상계2동", "상계3.4동", "상계5동", "상계6.7동", "상계8동", "상계9동", "상계10동", "중계본동", "중계1동", "중계2.3동", "중계4동", "하계1동", "하계2동", "공릉1동", "공릉2동"] },
      eunpyeong: { name: "은평구", dongs: ["불광1동", "불광2동", "갈현1동", "갈현2동", "구산동", "대조동", "응암1동", "응암2동", "응암3동", "역촌동", "신사1동", "신사2동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제1동", "홍제2동", "홍제3동", "홍은1동", "홍은2동", "남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원1동", "망원2동", "연남동", "성산1동", "성산2동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동"] },
      gangseo: { name: "강서구", dongs: ["등촌1동", "등촌2동", "등촌3동", "화곡본동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡6동", "화곡8동", "우장산동", "가양1동", "가양2동", "가양3동", "발산1동", "공항동", "방화1동", "방화2동", "방화3동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "가리봉동", "고척1동", "고척2동", "개봉1동", "개봉2동", "개봉3동", "오류1동", "오류2동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", "시흥5동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포본동", "영등포동", "여의동", "당산1동", "당산2동", "도림동", "문래동", "양평1동", "양평2동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "대림1동", "대림2동", "대림3동"] },
      dongjak: { name: "동작구", dongs: ["노량진1동", "노량진2동", "상도1동", "상도2동", "상도3동", "상도4동", "흑석동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "대방동", "신대방1동", "신대방2동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "상현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초1동", "서초2동", "서초3동", "서초4동", "잠원동", "반포본동", "반포1동", "반포2동", "반포3동", "반포4동", "방배본동", "방배1동", "방배2동", "방배3동", "방배4동", "양재1동", "양재2동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼1동", "역삼2동", "개포1동", "개포2동", "개포4동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "대치4동", "신사동", "논현1동", "논현2동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡1동", "도곡2동"] },
      songpa: { name: "송파구", dongs: ["잠실본동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동", "풍납1동", "풍납2동", "거여1동", "거여2동", "마천1동", "마천2동", "방이1동", "방이2동", "오륜동", "오금동", "송파1동", "송파2동", "석촌동", "삼전동", "가락본동", "가락1동", "가락2동", "문정1동", "문정2동", "장지동", "위례동", "잠실동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일1동", "상일2동", "명일1동", "명일2동", "고덕1동", "고덕2동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동", "성내1동", "성내2동", "성내3동", "둔촌1동", "둔촌2동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자1동", "정자2동", "정자3동", "영화동", "송죽동", "조원1동", "조원2동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류1동", "세류2동", "세류3동", "권선1동", "권선2동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서1동", "화서2동", "지동", "우만1동", "우만2동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄1동", "매탄2동", "매탄3동", "매탄4동", "원천동", "영통1동", "영통2동", "영통3동", "망포1동", "망포2동", "광교1동", "광교2동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥1동", "신흥2동", "신흥3동", "태평1동", "태평2동", "태평3동", "태평4동", "수진1동", "수진2동", "단대동", "산성동", "양지동", "복정동", "위례동", "신촌동", "고등동", "창곡동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광1동", "금광2동", "은행1동", "은행2동", "상대원1동", "상대원2동", "상대원3동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내1동", "수내2동", "수내3동", "정자동", "정자1동", "정자2동", "정자3동", "서현1동", "서현2동", "이매1동", "이매2동", "야탑1동", "야탑2동", "야탑3동", "금곡동", "미금동", "구미동", "판교동", "삼평동", "백현동", "운중동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "창릉동", "능곡동", "행신1동", "행신2동", "행신3동", "화정1동", "화정2동", "대덕동", "고양동", "관산동", "성사동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산1동", "중산2동", "정발산동", "풍산동", "백석1동", "백석2동", "마두1동", "마두2동", "장항1동", "장항2동", "고봉동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산1동", "일산2동", "일산3동", "탄현1동", "탄현2동", "주엽1동", "주엽2동", "대화동", "송포동", "덕이동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "백암면", "동부동", "중앙동", "역삼동", "유림동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "구성동", "동백동", "보정동", "상갈동", "기흥동", "서농동", "중동", "상하동", "보라동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천1동", "풍덕천2동", "신봉동", "죽전1동", "죽전2동", "동천동", "상현1동", "상현2동", "성복동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동", "춘의동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["반월동", "사동", "일동", "이동", "본오동", "수암동", "장상동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["와동", "고잔동", "초지동", "원곡동", "백운동", "신길동", "성곡동", "대부동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양1동", "안양2동", "안양3동", "안양4동", "안양5동", "안양6동", "안양7동", "안양8동", "안양9동", "석수동", "박달동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산동", "부흥동", "달안동", "관양동", "평촌동", "평안동", "귀인동", "범계동", "호계동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "수동면", "조안면", "퇴계원읍", "별내면", "별내동", "금곡동", "양정동", "다산동", "평내동", "호평동", "오남읍"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "팔탄면", "장안면", "양감면", "정남면", "새솔동", "진안동", "병점동", "반월동", "기배동", "화산동", "동탄동"] },
      pyeongtaek: { name: "평택시", dongs: ["진위면", "서탄면", "고덕면", "청북읍", "포승읍", "현덕면", "팽성읍", "신장동", "서정동", "송탄동", "지산동", "원평동", "비전동", "소사동", "세교동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동", "흥선동", "자금동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "법원읍", "파주읍", "탄현면", "광탄면", "월롱면", "적성면", "파평면", "교하동", "운정동", "금촌동"] },
      gimpo: { name: "김포시", dongs: ["고촌읍", "통진읍", "대곶면", "월곶면", "하성면", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "군자동", "월곶동", "정왕동", "배곧동", "과림동", "연성동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "학온동"] },
      gwangju: { name: "광주시", dongs: ["오포읍", "초월읍", "퇴촌면", "남종면", "남한산성면", "송정동", "광남동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장동", "덕풍동", "감북동", "위례동", "미사동", "춘궁동", "초이동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "대야미동"] },
      osan: { name: "오산시", dongs: ["중앙동", "신장동", "세마동", "초평동", "대원동"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "부발읍", "장호원읍"] },
      anseong: { name: "안성시", dongs: ["공도읍", "죽산면", "삼죽면", "보개면", "금광면", "서운면", "미양면", "대덕면", "원곡면", "양성면", "안성동"] },
      yangju: { name: "양주시", dongs: ["회천동", "양주동", "백석읍", "은현면", "남면", "장흥면"] },
      pochon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "일동면", "이동면", "영중면", "창수면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동", "가남읍"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "보산동", "동두천동", "상패동", "중앙동", "송내동", "불현동"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "지평면", "용문면", "개군면"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "미산면", "왕징면", "신서면", "중면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      junggu: { name: "중구", dongs: ["신포동", "연안동", "신흥동", "도원동", "율목동", "동인천동", "개항동", "영종동", "영종1동", "영종2동", "운서동", "용유동"] },
      donggu: { name: "동구", dongs: ["만석동", "화수1.화평동", "화수2동", "송현1.2동", "송현3동", "송림1동", "송림2동", "송림3.5동", "송림4동", "송림6동", "금창동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의1.4동", "숭의2동", "숭의3동", "용현1.4동", "용현2동", "용현3동", "용현5동", "학익1동", "학익2동", "도화1동", "도화2.3동", "주안1동", "주안2동", "주안3동", "주안4동", "주안5동", "주안6동", "주안7동", "주안8동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련1동", "옥련2동", "선학동", "연수1동", "연수2동", "연수3동", "청학동", "동춘1동", "동춘2동", "동춘3동", "송도1동", "송도2동", "송도3동", "송도4동", "송도5동"] },
      namdong: { name: "남동구", dongs: ["구월1동", "구월2동", "구월3동", "구월4동", "간석1동", "간석2동", "간석3동", "간석4동", "만수1동", "만수2동", "만수3동", "만수4동", "만수5동", "만수6동", "장수서창동", "서창2동", "남촌도림동", "논현1동", "논현2동", "논현고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평1동", "부평2동", "부평3동", "부평4동", "부평5동", "부평6동", "산곡1동", "산곡2동", "산곡3동", "산곡4동", "청천1동", "청천2동", "갈산1동", "갈산2동", "삼산1동", "삼산2동", "부개1동", "부개2동", "부개3동", "일신동", "십정1동", "십정2동"] },
      gyeyang: { name: "계양구", dongs: ["효성1동", "효성2동", "계산1동", "계산2동", "계산3동", "계산4동", "작전1동", "작전2동", "작전서운동", "계양1동", "계양2동", "계양3동"] },
      seogu: { name: "서구", dongs: ["검암경서동", "연희동", "청라1동", "청라2동", "청라3동", "가정1동", "가정2동", "가정3동", "신현원창동", "석남1동", "석남2동", "석남3동", "가좌1동", "가좌2동", "가좌3동", "가좌4동", "검단동", "불로대곡동", "원당동", "당하동", "오류왕길동", "마전동", "아라동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] },
      ongjin: { name: "옹진군", dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] }
    }
  }
};

const initialLocalShops = [
  {
    id: 1,
    name: "오늘밤 테라피 케어",
    desc: "서울·경기·인천 전지역 신속 출장 방문! 정성 가득한 프리미엄 힐링 & 릴렉싱 케어",
    phone: "0507-1280-3199",
    price: "타이 60,000원부터~",
    image: "/shop1.jpg"
  },
  {
    id: 2,
    name: "퀸즈홈테라피 케어",
    desc: "품격 있는 쉼을 선사하는 최고급 천연 아로마 오일 프라이빗 맞춤 홈케어",
    phone: "0507-1280-3296",
    price: "아로마 70,000원부터~",
    image: "/shop2.jpg"
  },
  {
    id: 3,
    name: "한국미인테라피",
    desc: "재방문율 1위 베테랑 힐러! 안심 후불제 보장과 철저한 위생 관리의 럭셔리 케어",
    phone: "0507-1280-3140",
    price: "힐링 100,000원부터~",
    image: "/shop3.jpg"
  },
  {
    id: 4,
    name: "주주테라피",
    desc: "스웨디시 감성 케어 전문! 뭉친 피로를 부드럽게 녹여주는 고품격 테라피 프로그램",
    phone: "0507-1280-3197",
    price: "스웨디시 140,000원부터~",
    image: "/shop4.jpg"
  },
  {
    id: 5,
    name: "한국골든테라피",
    desc: "선입금 없는 100% 현장 후불제! 수도권 전지역 평균 25분 내 실시간 도착 보장",
    phone: "0507-1280-3360",
    price: "스페셜 110,000원부터~",
    image: "/shop5.jpg"
  }
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-black/60 rounded-2xl border border-white/5 overflow-hidden transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-gray-200 hover:text-amber-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-amber-400">Q.</span> {question}
        </span>
        <span className="text-amber-400 font-extrabold text-lg">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3 bg-black/40">
          <span className="text-amber-400 font-bold">A. </span>{answer}
        </div>
      )}
    </div>
  );
}

export default function MainClientUI() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  
  const [shuffledShops, setShuffledShops] = useState(initialLocalShops);

  useEffect(() => {
    const shuffled = [...initialLocalShops].sort(() => Math.random() - 0.5);
    setShuffledShops(shuffled);
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  const handleSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    
    // SEO 친화적 정적 URL 분기 (/region/district/dong 형식)
    const targetUrl = selectedDong
      ? `/${selectedRegion}/${encodeURIComponent(districtName)}/${encodeURIComponent(selectedDong)}`
      : `/${selectedRegion}/${encodeURIComponent(districtName)}`;
    
    window.location.href = targetUrl;
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs = selectedDistrict && currentDistricts[selectedDistrict] ? currentDistricts[selectedDistrict].dongs : [];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="홈테라 로고" 
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                홈테라
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">SEOUL · GYEONGGI · INCHEON</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-300 border border-amber-500/30 font-bold shadow-inner">
              🔥 24시 실시간 예약 가능
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 상단 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative h-60 md:h-80 flex items-center justify-center p-6">
            <div className="absolute inset-0 z-0">
              <img 
                src="/banner.jpg" 
                alt="메인 힐링 배너" 
                className="w-full h-full object-cover filter brightness-[0.35] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-amber-500 text-black font-extrabold text-xs tracking-widest shadow-lg animate-bounce">
                ✨ 100% 후불제 안심 보장 시스템
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                서울·경기·인천 <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">출장 케어 프라이빗 마사지</span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium max-w-lg mx-auto drop-shadow">
                서울·경기·인천에서 홈테라 출장마사지를 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 제휴업체 5개 박스 카드리스트 */}
        <section className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">BEST RECOMMENDED SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              🏆 홈테라 추천 제휴업체 (5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shuffledShops.map((lShop) => (
              <div key={lShop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                
                <Link href={`/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />

                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 표준 요금표 안내 테이블 */}
        <section className="bg-[#0f0f12] border border-amber-500/30 p-6 rounded-3xl space-y-4">
          <div className="text-center">
            <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">COURSE & PRICE</span>
            <h3 className="text-xl font-black text-white mt-1">홈테라 표준 기준 요금표</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-3 px-2">관리 코스</th>
                  <th className="py-3 px-2">60분</th>
                  <th className="py-3 px-2">90분</th>
                  <th className="py-3 px-2">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                <tr>
                  <td className="py-3 font-bold text-white">타이마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">60,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">80,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">100,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">아로마마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">70,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">90,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">110,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">힐링마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">100,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">110,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">130,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">스페셜마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">110,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">120,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">140,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">스웨디시</td>
                  <td className="py-3 text-amber-400 font-semibold">140,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">160,000원</td>
                  <td className="py-3 text-gray-600">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 text-center mt-2">
            ※ 출장 이동 거리 및 심야 시간대에 따라 일부 차이가 발생할 수 있으므로 예약 상담 시 최종 확인해 주세요.
          </p>
        </section>

        {/* 지역 선택 박스 */}
        <section className="pt-6 border-t border-white/10">
          <div className="bg-gradient-to-b from-[#18181b] to-[#0f0f11] border-2 border-amber-500/40 p-6 rounded-3xl max-w-xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 동네 검색 및 이동하기
              </label>
              <span className="text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                수도권 지역 전용 이동
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">1단계: 시·도 선택</span>
                <select 
                  value={selectedRegion} 
                  onChange={handleRegionChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1e1e1e] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">2단계: 구·시·군 선택</span>
                <select 
                  value={selectedDistrict} 
                  onChange={handleDistrictChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">구 / 시 / 군을 선택해주세요</option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e1e] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">3단계: 동 선택 (텍스트 필터)</span>
                <select 
                  value={selectedDong} 
                  onChange={(e) => setSelectedDong(e.target.value)} 
                  disabled={!selectedDistrict}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-30 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">동 전체 보기</option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e1e] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleSearch} 
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] mt-3 cursor-pointer transform active:scale-[0.98]"
              >
                🚀 해당 지역 제휴업체 보기
              </button>
            </div>
          </div>
        </section>

        {/* 🌟 네이버 크롤링 누락 방지용 주요 지역 내부 링크 */}
        <section className="bg-[#0b0b0e] border border-white/5 p-6 rounded-3xl space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>🗺️</span> 수도권 주요 지역별 바로가기
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">
              원하시는 지역을 선택하시면 해당 지역의 추천 샵 목록을 바로 확인하실 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {Object.entries(regionData).map(([rKey, rVal]) =>
              Object.entries(rVal.districts).slice(0, 10).map(([dKey, dVal]) => (
                <Link
                  key={dKey}
                  href={`/${rKey}/${encodeURIComponent(dVal.name)}`}
                  className="text-xs bg-neutral-900/90 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                >
                  {dVal.name} 마사지
                </Link>
              ))
            )}
          </div>
        </section>

        {/* 📚 [네이버 C-Rank / D.I.A. 상위 노출용 3,000자 전문 웰니스 인사이트 칼럼] */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              HOMETHERA WELLNESS THEORY & ESSENTIALS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              도심 생활 속 신체 밸런스 회복과 지속 가능한 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              자율신경계 균형, 근막 이완의 생리학적 기전, 라이프스타일 맞춤 프로그램 선택 및 프라이빗 케어 환경 분석
            </p>
          </div>

          {/* 챕터 1 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 현대인의 고정 좌식 생활과 만성 근막 긴장의 병리학적 기전
            </h3>
            <p>
              현대 사회의 근로 환경은 디지털 디바이스의 보급과 함께 급격한 정적 고정화를 겪고 있습니다. 서울과 수도권의 수많은 직장인들은 하루 평균 8시간 이상 모니터 앞에 앉아 생활하며, 이 과정에서 경추 굴곡과 흉추 후만이 결합된 전방 두부 자세를 취하게 됩니다. 머리의 하중이 1인치 앞으로 기울어질 때마다 목덜미 후두하근과 상부 승모근, 견갑거근에 가해지는 역학적 부하는 체중 대비 최대 4배까지 증가합니다.
            </p>
            <p>
              이러한 만성적 부하는 근섬유 내 미세 모세혈관의 혈류 흐름을 압박하여 허혈성 상태를 유발합니다. 혈액 공급이 원활하지 못한 근육 조직 내에는 젖산, 피루브산 등 대사 노폐물이 축적되며, 이는 근막 통증 유발점(Trigger Point)의 형성을 가속화합니다. 결과적으로 어깨 윗선의 지속적인 뻐근함, 견갑골 내측의 결림, 긴장성 두통과 만성 피로로 이어지는 악순환이 고착화됩니다.
            </p>
            <p>
              정기적인 바디 컨디셔닝은 단순한 표면 마찰을 넘어 근육의 기시부와 정지부를 따라 경직된 근막을 넓은 면적으로 스트레칭하고 연부 조직의 온도를 높여 혈류량을 증가시키는 데 목적이 있습니다. 정상적인 혈액 순환이 회복되면 굳어있던 근섬유가 이완되고 자율신경계의 과도한 흥분이 진정되어 신체 본래의 유연성과 가동 범위를 되찾게 됩니다.
            </p>
          </div>

          {/* 챕터 2 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 자율신경계 불균형과 심신 릴렉싱의 상호작용
            </h3>
            <p>
              과중한 업무 스트레스와 불규칙한 생활 리듬은 인체의 교감신경계를 만성 흥분 상태로 몰아넣습니다. 교감신경의 지속적인 과활성화는 스트레스 호르몬인 코르티솔과 아드레날린 분비를 촉진하고, 심박수 증가와 말초 혈관 수축을 야기하여 신체를 항시적인 전투 및 도피 상태(Fight or Flight)로 유지시킵니다. 이러한 상태가 장기화되면 야간 숙면을 방해하는 수면 장애, 소화 흡수 장애, 만성 무기력증이 동반됩니다.
            </p>
            <p>
              숙련된 테라피스트에 의한 균일하고 차분한 압력 자극은 피부 감각 수용기 중 마이스너 소체와 파치니 소체를 자극하여 뇌로 전달되는 감각 신호를 안정화시킵니다. 이는 부교감신경계를 활성화하여 심장 박동을 안정시키고 혈관을 확장시키며, 체내 행복 호르몬인 옥시토신과 세로토닌의 분비를 촉진합니다.
            </p>
            <p>
              신체가 진정한 이완 상태에 도달하면 뇌파는 각성 상태인 베타파에서 깊은 안정 상태인 알파파 및 세타파로 전환됩니다. 이는 단순한 신체적 편안함을 넘어 뇌의 인지적 피로를 리셋하고 면역계 세포의 재생 활동을 촉진하는 근본적인 힐링 환경을 조성합니다.
            </p>
          </div>

          {/* 챕터 3 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 기전 비교와 맞춤형 선택 가이드
            </h3>
            <p>
              전문 바디 웰니스 프로그램은 사용하는 매개체와 물리적 자극의 깊이에 따라 뚜렷한 기능적 특성을 가집니다. 이용자의 당일 체력 상태와 피로 원인에 맞추어 올바른 코스를 선택하는 것이 중요합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법입니다. 수기 압박과 요가 형태의 수동적 관절 신전 운동이 결합되어 굳어있는 햄스트링, 고관절 굴곡근, 척추 기립근의 운동 가동 범위를 물리적으로 넓혀줍니다. 평소 활동량이 적어 몸이 뻣뻣하고 시원한 관절 이완을 원하는 분에게 적합합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  식물성 베이스 오일을 도포하여 마찰 저항을 최소화한 상태에서 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉입니다. 피부 표층의 미세 순환을 촉진하고 통증 없이 림프절을 자극하여 부종 완화와 깊은 정신적 안도감을 선사합니다. 강한 압박에 거부감이 있는 분에게 추천됩니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  라벤더, 유칼립투스, 베르가못 등 식물에서 추출한 순수 에센셜 오일의 후각적 아로마콜로지 효과를 접목한 기법입니다. 피부 보습 장벽을 보호하는 동시에 피하 지방층 주변 림프액의 배농을 유도하여 붓기를 개선하고 환절기 피부 건조증을 예방합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육을 넘어 뼈와 관절에 맞닿아 있는 심부 근막의 단단한 매듭을 팔꿈치와 체중을 이용해 서서히 압박하는 기법입니다. 고질적인 목 결림이나 허리 통증을 유발하는 만성 유착 부위를 분리하여 깊은 속근육의 피로를 근본적으로 해소합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 챕터 4 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 프라이빗 1인 케어 환경이 선사하는 심리·시간적 효율성
            </h3>
            <p>
              전통적인 웰니스 서비스는 고객이 직접 매장을 방문하는 오프라인 중심이었으나, 현대 도시 생활에서는 이동 자체에 소모되는 물리적·정신적 비용이 상당합니다. 번화가의 교통 체증, 주차 공간 확보의 어려움, 대기 시간, 타인과의 대면 접촉은 휴식을 취하러 가는 과정 자체를 또 다른 피로 원인으로 만들 수 있습니다.
            </p>
            <p>
              개인 자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 프라이빗 케어는 외부의 소음과 자극을 원천 차단하여 부교감신경이 방해 없이 활성화될 수 있는 환경을 제공합니다. 관리사가 방문하여 세션을 진행함으로써 고객은 이동에 필요한 에너지를 보존할 수 있으며, 관리가 종료된 직후 환복이나 귀가 이동 없이 온전히 자신의 침상에서 깊은 숙면으로 전환할 수 있습니다.
            </p>
            <p>
              이러한 환경적 연속성은 근육이 따뜻하게 이완된 상태에서 찬 바람이나 외부 온도 변화에 노출되어 다시 수축하는 현상을 예방합니다. 교대 근무, 야간 업무, 혹은 바쁜 주말 일정을 소화하는 현대인들에게 시간 절약과 완전한 휴식을 동시에 보장하는 스마트한 자기 관리 솔루션입니다.
            </p>
          </div>

          {/* 챕터 5 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 신뢰할 수 있는 웰니스 플랫폼 이용 수칙
            </h3>
            <p>
              투명하고 건강한 힐링 문화를 지속하기 위해 홈테라는 모든 제휴 매장과 파트너 샵의 건전성과 운영 수칙을 주기적으로 모니터링합니다. 소비자의 권익 보호와 안전한 세션 진행을 위해 다음 가이드라인을 확인하시기 바랍니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">100% 현장 후불제 준수:</strong> 신뢰할 수 있는 공인 파트너는 불법적인 예약 선입금이나 불투명한 현장 추가금을 절대 요구하지 않으며, 공시된 표준 요금표를 엄격히 준수합니다.</li>
              <li><strong className="text-gray-200">기저 질환 사전 고지:</strong> 최근 관절 시술을 받았거나 골절 병력, 심혈관계 질환, 임신 중인 경우 세션 전 매니저 및 테라피스트에게 신체 상태를 고지하여 적절한 강도를 조율해야 합니다.</li>
              <li><strong className="text-gray-200">사후 수분 섭취와 체온 유지:</strong> 관리를 마친 후에는 림프 순환을 통해 체내로 배출된 대사 부산물이 원활히 배설될 수 있도록 미온수를 500ml 이상 섭취하고, 급격한 체온 저하를 방지하기 위해 따뜻한 실내 환경을 유지하시기 바랍니다.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 콘텐츠는 수도권 전역의 건강한 라이프스타일 구축과 올바른 신체 생리학적 테라피 정보 제공을 목적으로 홈테라 리서치 팀에 의해 작성 및 검수되었습니다.
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0d0d0f] border border-amber-500/30 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest">HOW TO USE</span>
            <h3 className="text-xl font-black text-white mt-1">홈테라 이용 방법</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">위치 확인</h4>
              <p className="text-xs text-gray-400 mt-1">출장 받으실 주소 및 건물명을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">원하시는 방문 희망 시간대를 문의합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">코스 선택</h4>
              <p className="text-xs text-gray-400 mt-1">타이·아로마·스웨디시 코스를 결정합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">안심 케어</h4>
              <p className="text-xs text-gray-400 mt-1">관리사 도착 후 현장 후불 결제로 진행됩니다.</p>
            </div>
          </div>
        </section>

        {/* 고객 실제 후기 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">REAL REVIEWS</span>
            <h3 className="text-xl font-black text-white mt-1">실제 이용 고객 후기</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0f0f12] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-black text-sm">★★★★★ 5.0</span>
                <span className="text-[11px] text-gray-500">서울 강남구 이용자</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                &quot;시간 약속 칼같이 맞춰오시고 너무 친절하셨어요. 뭉친 어깨와 허리가 시원하게 풀려서 정기적으로 이용 중입니다!&quot;
              </p>
            </div>
            <div className="bg-[#0f0f12] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-black text-sm">★★★★★ 5.0</span>
                <span className="text-[11px] text-gray-500">경기 분당구 이용자</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                &quot;예약금이나 선입금 없는 100% 후불제라 안심하고 부를 수 있어서 좋네요. 테라피스트 실력도 확실합니다.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Q&A */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ & QUESTIONS</span>
            <h3 className="text-xl font-black text-white mt-1">자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <FaqItem 
              question="방문까지 소요 시간은 얼마나 걸리나요?"
              answer="서울, 경기, 인천 주요 수도권 생활권 기준 평균 20분~30분 내외로 신속하게 방문 관리가 가능합니다."
            />
            <FaqItem 
              question="선입금이나 예약금이 있나요?"
              answer="홈테라에 등록된 제휴업체는 100% 안심 후불제로 운영되어 도착 전 선입금을 절대 요구하지 않습니다."
            />
          </div>
        </section>

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3360" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 제휴 및 예약 문의 (0507-1280-3360)
            </a>
          </div>

          <p className="text-gray-400 font-bold">홈테라는 건전하고 안전한 수도권 방문 홈케어 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 홈테라 ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}