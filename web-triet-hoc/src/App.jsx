import React, { useState, useEffect } from 'react';
import {
  Eye,
  Search,
  Layers,
  Compass,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  ArrowUp,
  Sparkles,
  Scale,
  Sliders,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  RefreshCw,
  Filter
} from 'lucide-react';

export default function App() {
  // Tự động nạp Tailwind CSS nếu người dùng chưa kịp dán vào index.html
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
    document.title = 'THE UNSEEN — Bản chất & Hiện tượng qua Áp lực đồng trang lứa';
  }, []);

  // Trạng thái toàn trang
  const [xrayMode, setXrayMode] = useState(false);
  const [lensPosition, setLensPosition] = useState(50);
  const [selectedReaction, setSelectedReaction] = useState('C');
  const [activePressureTab, setActivePressureTab] = useState(0);
  const [dialecticStep, setDialecticStep] = useState(0);
  const [activeCaseProfile, setActiveCaseProfile] = useState('A');
  const [matrixFilter, setMatrixFilter] = useState('all');
  const [minhLayer, setMinhLayer] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedMyth, setSelectedMyth] = useState(0);
  const [reflectionChoice, setReflectionChoice] = useState(null);

  // Dữ liệu Phần 2: 3 áp lực phổ biến của sinh viên
  const studentPressures = [
    {
      title: '1. Điểm số & Chứng chỉ học thuật',
      surface:
        'Những bài đăng khoe GPA xuất sắc, học bổng mỗi kỳ, chứng chỉ IELTS 7.5+ / 8.5, HSK 6 hay giải thưởng nghiên cứu khoa học liên tục xuất hiện trên bảng tin.',
      impact:
        'Nỗi lo bị "tụt hậu", sợ trượt môn phải học lại tốn thời gian và chi phí, luôn căng thẳng vì cảm thấy phải giỏi toàn diện để chứng minh năng lực.'
    },
    {
      title: '2. Việc làm thêm & Thu nhập sớm',
      surface:
        'Bạn bè cùng trang lứa trúng tuyển thực tập tại các tập đoàn đa quốc gia hoặc tự chủ tài chính với mức thu nhập cao ngay khi còn ngồi trên ghế giảng đường.',
      impact:
        'Hoài nghi giá trị thực tế của bản thân trước nhà tuyển dụng, lo sợ mức lương sau khi ra trường không đủ trang trải hoặc không tương xứng với chi phí ăn học.'
    },
    {
      title: '3. Ngoại hình, Phong cách & Mối quan hệ',
      surface:
        'Hình ảnh check-in tại những quán cà phê sang trọng, phong cách ăn mặc thời thượng, mạng lưới quan hệ rộng và vị trí chủ nhiệm câu lạc bộ năng động.',
      impact:
        'Tự ti về ngoại hình và hoàn cảnh, lo sợ không đáp ứng tiêu chuẩn xã hội, dễ chạy theo việc tô vẽ vỏ bọc trên không gian mạng.'
    }
  ];

  // Phản ứng tương tác ở Phần 2
  const reactions = {
    A: {
      label: 'A. So sánh bản thân và lập tức đăng ký học, thi theo lộ trình của bạn bè',
      tag: 'Phản ứng chạy theo hiện tượng',
      analysis:
        'Khi sao chép nguyên xi lịch trình của người khác, bạn đang đồng nhất biểu hiện bên ngoài của họ với nhu cầu thực tế của mình. Điều này dễ dẫn đến quá tải và đánh mất định hướng cốt lõi.'
    },
    B: {
      label: 'B. Kết luận mình kém cỏi, thu mình lại và chán nản việc học',
      tag: 'Ngộ nhận từ bề nổi',
      analysis:
        'Bạn đang lấy "cuộn phim nổi bật đã cắt ghép" (Hiện tượng) của người khác để đem so sánh với "hậu trường đang hoàn thiện" của chính mình. Đây là phép so sánh khập khiễng về mặt nhận thức.'
    },
    C: {
      label: 'C. Tìm hiểu điều kiện thực tế, xác định mục tiêu và chọn nhịp độ phù hợp',
      tag: 'Tư duy biện chứng & Lịch sử – cụ thể',
      analysis:
        'Cách tiếp cận này đi từ quan sát Hiện tượng đến phân tích các điều kiện khách quan bên trong, giúp bạn học hỏi điểm tích cực mà không đánh mất nhịp độ phát triển riêng (own pace).'
    }
  };

  // Dữ liệu Phần 4: 5 bước nhận thức biện chứng
  const dialecticSteps = [
    {
      step: '01',
      name: 'HIỆN TƯỢNG',
      subtitle: 'Tiếp nhận biểu hiện bề ngoài',
      desc: 'Ghi nhận những gì xuất hiện trực tiếp trước giác quan: bảng điểm, bài đăng mạng xã hội, sự tự tin trên lớp học.',
      example: 'Thấy bạn cùng lớp vừa đăng chứng chỉ ngoại ngữ điểm cao kèm lời chia sẻ ngắn gọn.'
    },
    {
      step: '02',
      name: 'QUAN SÁT ĐA CHIỀU',
      subtitle: 'Tránh kết luận từ một khoảnh khắc',
      desc: 'Hiện tượng rất phong phú và biến đổi. Cần quan sát sự vật qua nhiều thời điểm, không gian thay vì chỉ nhìn một lát cắt trên mạng.',
      example: 'Nhận ra một bức ảnh thành công không thể hiện hết hàng trăm giờ tự học và cả những lần thi thử thất bại trước đó.'
    },
    {
      step: '03',
      name: 'SO SÁNH & ĐỐI CHIẾU',
      subtitle: 'Nhận diện hiện tượng thật và giả tướng',
      desc: 'Phân biệt đâu là biểu hiện phản ánh đúng thực lực, đâu là "hiện tượng giả" (giả tướng) đã qua tô vẽ hoặc bóp méo trên không gian mạng.',
      example: 'Phân biệt giữa người thực sự có nền tảng kiến thức vững với những bài đăng chỉ nhằm mục đích phô trương (flexing).'
    },
    {
      step: '04',
      name: 'PHÂN TÍCH ĐIỀU KIỆN',
      subtitle: 'Đặt trong hoàn cảnh lịch sử – cụ thể',
      desc: 'Xem xét xuất phát điểm, nguồn lực gia đình, thời gian tích lũy và mục tiêu nghề nghiệp khác nhau của mỗi cá nhân.',
      example: 'Bạn của bạn đã học tiếng Trung từ cấp 3 và có định hướng biên dịch, còn bạn mới bắt đầu từ năm nhất đại học.'
    },
    {
      step: '05',
      name: 'NHẬN THỨC BẢN CHẤT',
      subtitle: 'Nắm bắt quy luật và định vị hành động',
      desc: 'Hiểu được mối liên hệ tất nhiên bên trong: mọi thành quả bền vững đều đòi hỏi quá trình tích lũy tương xứng với điều kiện thực tế.',
      example: 'Ngừng hoảng loạn (FOMO), tập trung xây dựng lộ trình rèn luyện phù hợp với năng lực và mục tiêu của chính mình.'
    }
  ];

  // Dữ liệu Phần 5: Hồ sơ Bạn A & Bạn B
  const caseProfiles = {
    A: {
      code: 'HỒ SƠ 01 — KHÍA CẠNH HỌC TẬP',
      name: 'Câu chuyện của Bạn A',
      phenomenonTitle: 'Hiện tượng (Bề nổi quan sát được)',
      phenomenon:
        'Những bức ảnh khoe điểm GPA tuyệt đối, chứng chỉ IELTS 8.5, HSK 6 lung linh nhận bão tương tác trên mạng xã hội. Tạo cảm giác A là một "thiên tài" học hành nhẹ nhàng, làm gì cũng dễ dàng chiến thắng.',
      essenceTitle: 'Bản chất & Các yếu tố cần tìm hiểu phía sau',
      essence:
        'Kết quả của một quá trình tích lũy lâu dài, kỷ luật tự giác và sự đánh đổi. Đó có thể là những đêm dài ôn luyện đến 2 giờ sáng, nền tảng ngoại ngữ được đầu tư từ sớm và sự kiên trì âm thầm phía sau ống kính.',
      lesson:
        'Thành tích không tự nhiên xuất hiện. Đừng chỉ nhìn vào khoảnh khắc nhận bằng khen mà quên mất quá trình lao động nghiêm túc tạo ra nó.'
    },
    B: {
      code: 'HỒ SƠ 02 — KHÍA CẠNH ĐỜI SỐNG',
      name: 'Câu chuyện của Bạn B',
      phenomenonTitle: 'Hiện tượng (Bề nổi quan sát được)',
      phenomenon:
        'Cuộc sống "màu hồng" sang chảnh: liên tục check-in tại các quán cà phê view đẹp, nhà hàng cao cấp, du lịch đắt đỏ và sử dụng nhiều món đồ thời trang đắt tiền.',
      essenceTitle: 'Bản chất & Khả năng xuất hiện "Hiện tượng giả"',
      essence:
        'Trong nhiều trường hợp, đây có thể là "giả tướng" (hiện tượng xuyên tạc bản chất). Hoàn cảnh thực tế có thể rất bình thường, và để duy trì vỏ bọc hào nhoáng đó, nhân vật có thể đang đánh đổi bằng sức khỏe, làm thêm kiệt sức hoặc chịu áp lực tài chính.',
      lesson:
        'Những gì lấp lánh trên mạng xã hội có thể là sản phẩm của sự chọn lọc góc nhìn, không phải thước đo giá trị sống của bạn.'
    }
  };

  // Dữ liệu Bảng đối chiếu 3 cột ở Phần 5
  const comparisonMatrix = [
    {
      category: 'study',
      phenomenon: 'Bạn bè thường xuyên đăng thành tích học tập, học bổng và chứng chỉ ngoại ngữ cao.',
      factors: 'Quá trình tích lũy nhiều năm, điều kiện tiếp cận tài nguyên học tập hoặc áp lực kỳ vọng lớn từ gia đình.',
      action: 'Không vội kết luận mình kém cỏi; học hỏi phương pháp ôn tập và lập kế hoạch theo xuất phát điểm của bản thân.'
    },
    {
      category: 'career',
      phenomenon: 'Bạn cùng lớp sớm có việc làm thêm lương cao hoặc thực tập tại tập đoàn lớn.',
      factors: 'Mạng lưới hỗ trợ, định hướng đi làm sớm hoặc sự đánh đổi thời gian nghỉ ngơi, thời gian học chuyên ngành.',
      action: 'Xác định rõ ưu tiên hiện tại của mình là tích lũy nền tảng học thuật hay trải nghiệm thực tế để phân bổ thời gian.'
    },
    {
      category: 'social',
      phenomenon: 'Một người luôn xuất hiện với vẻ ngoài tự tin, năng động và cuộc sống hoàn hảo trên mạng.',
      factors: 'Cơ chế chọn lọc thông tin của mạng xã hội (chỉ đăng khoảnh khắc đẹp) và nhu cầu được công nhận.',
      action: 'Tránh lấy "cuộn phim cắt ghép" của người khác để phủ nhận quá trình nỗ lực thầm lặng của chính mình.'
    },
    {
      category: 'career',
      phenomenon: 'Số đông bạn bè cùng đổ xô đăng ký một khóa học, một cuộc thi hoặc một ngành nghề đang thời thượng.',
      factors: 'Tâm lý sợ bị bỏ lỡ (FOMO), hiệu ứng đám đông hoặc xu hướng truyền thông ngắn hạn.',
      action: 'Phân biệt giữa nhu cầu phát triển thực sự của bản thân với nỗi sợ khác biệt so với số đông.'
    }
  ];

  // Dữ liệu Phần 7: Ngộ nhận cần tránh
  const misconceptions = [
    {
      claim: '“Người thành công trên mạng xã hội chắc chắn có cuộc sống hoàn hảo.”',
      verdict: 'Nhận định phiến diện — Đồng nhất một vài hiện tượng chọn lọc với toàn bộ bản chất',
      explanation:
        'Mạng xã hội chỉ hiển thị những lát cắt đã qua chọn lọc. Một thành tựu học tập hay bức ảnh đẹp là có thật, nhưng không đồng nghĩa mọi khía cạnh sức khỏe, tinh thần hay các mối quan hệ của họ đều hoàn hảo.'
    },
    {
      claim: '“Nếu nhiều người cùng lựa chọn một con đường, đó chắc chắn là con đường tốt nhất.”',
      verdict: 'Chưa đủ cơ sở — Tách rời sự vật khỏi điều kiện lịch sử – cụ thể',
      explanation:
        'Một lộ trình phù hợp với số đông chưa chắc đã tương thích với năng lực, sở trường và hoàn cảnh thực tế của bạn. Chạy theo đám đông một cách máy móc sẽ dẫn đến khủng hoảng định hướng.'
    },
    {
      claim: '“Những gì thể hiện bên ngoài luôn phản ánh đầy đủ bản chất bên trong (hoặc ngược lại: ai khoe thành tích đều là giả tạo).”',
      verdict: 'Sai lầm cực đoan — Hoặc cả tin vào bề nổi, hoặc rơi vào hoài nghi cực đoan',
      explanation:
        'Triết học Mác – Lênin chỉ rõ: Hiện tượng phản ánh bản chất nhưng có thể phong phú, biến đổi hoặc bị khúc xạ. Không nên tin mù quáng vào bề ngoài, nhưng cũng không được quy chụp mọi thành công của người khác đều là giả dối.'
    },
    {
      claim: '“Muốn phát triển bản thân thì phải đạt được mọi thứ giống bạn bè cùng trang lứa.”',
      verdict: 'Lệch lạc về thước đo giá trị — Lấy hiện tượng bên ngoài thay cho sự phát triển nội tại',
      explanation:
        'Sự phát triển thực chất được đo bằng sự tiến bộ của chính bạn hôm nay so với hôm qua, dựa trên mục tiêu và giá trị cốt lõi mà bạn theo đuổi.'
    }
  ];

  const filteredMatrix =
    matrixFilter === 'all'
      ? comparisonMatrix
      : comparisonMatrix.filter((item) => item.category === matrixFilter);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#18181B] selection:bg-[#C84B31] selection:text-white">
      {/* THANH ĐIỀU HƯỚNG CỐ ĐỊNH */}
      <header className="sticky top-0 z-50 bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#D6D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-full bg-[#18181B] text-[#F7F4EF] flex items-center justify-center font-mono-code text-xs font-semibold group-hover:bg-[#C84B31] transition-colors">
              Φ
            </span>
            <div>
              <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#C84B31] block">
                Chuyên đề Triết học Mác – Lênin
              </span>
              <span className="font-serif-editorial font-bold text-lg tracking-tight leading-none">
                THE UNSEEN — Bản Chất & Hiện Tượng
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3F3F46]">
            <a href="#thuc-trang" className="hover:text-[#C84B31] transition-colors">01. Thực trạng</a>
            <a href="#ly-thuyet" className="hover:text-[#C84B31] transition-colors">02. Khái niệm</a>
            <a href="#bien-chung" className="hover:text-[#C84B31] transition-colors">03. Biện chứng</a>
            <a href="#giai-ma" className="hover:text-[#C84B31] transition-colors">04. Giải mã</a>
            <a href="#tinh-huong" className="hover:text-[#C84B31] transition-colors">05. Tình huống Minh</a>
            <a href="#phuong-phap" className="hover:text-[#C84B31] transition-colors">06. Bài học</a>
          </nav>

          {/* Công tắc Kính lúp Bản chất (X-Ray Mode) */}
          <button
            onClick={() => setXrayMode(!xrayMode)}
            aria-pressed={xrayMode}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono-code uppercase tracking-wider border transition-all ${
              xrayMode
                ? 'bg-[#C84B31] text-white border-[#C84B31] shadow-sm'
                : 'bg-[#EFECE6] text-[#18181B] border-[#D6D1C7] hover:border-[#18181B]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{xrayMode ? 'Kính lúp Bản chất: BẬT' : 'Bật Kính lúp Bản chất'}</span>
          </button>
        </div>
      </header>

      {/* PHẦN 1 — HERO SECTION: CÂU HỎI MỞ ĐẦU & LĂNG KÍNH TƯƠNG PHẢN */}
      <section id="hero" className="border-b border-[#D6D1C7] py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Cột trái: Tuyên ngôn biên tập */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE6] border border-[#D6D1C7] text-xs font-mono-code uppercase tracking-widest text-[#2D4A43]">
                <span>Ấn phẩm Giáo dục Tương tác</span>
                <span>•</span>
                <span>Cặp phạm trù Bản chất – Hiện tượng</span>
              </div>

              <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-[#18181B]">
                BẠN ĐANG SỐNG THEO CÁCH CỦA MÌNH, HAY THEO{' '}
                <span className="text-[#C84B31] italic">KỲ VỌNG CỦA NGƯỜI KHÁC?</span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[#2D4A43]">
                Bản chất và hiện tượng trong triết học — nhìn từ áp lực đồng trang lứa.
              </p>

              <p className="text-base sm:text-lg text-[#3F3F46] leading-relaxed max-w-2xl">
                Bạn nhìn thấy một người bạn đạt điểm cao, sở hữu chứng chỉ IELTS 8.5, HSK 6, có công việc tốt hay luôn tỏ ra hạnh phúc. Nhưng liệu những gì bạn nhìn thấy có phản ánh đầy đủ thực tế phía sau?
              </p>

              {xrayMode && (
                <div className="p-4 bg-[#2D4A43]/10 border-l-4 border-[#2D4A43] text-sm text-[#18181B]">
                  <strong className="font-mono-code text-xs uppercase tracking-wider text-[#2D4A43] block mb-1">
                    [Chú giải Kính lúp Triết học]
                  </strong>
                  Nhận thức thông thường dừng lại ở cảm giác trực quan (Hiện tượng). Tư duy khoa học đòi hỏi phải phân tích các mối liên hệ khách quan bên trong (Bản chất).
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#thuc-trang"
                  className="px-6 py-3.5 bg-[#18181B] text-[#F7F4EF] font-medium text-sm hover:bg-[#C84B31] transition-colors inline-flex items-center gap-2"
                >
                  <span>Khám phá vấn đề</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#ly-thuyet"
                  className="px-6 py-3.5 bg-transparent border border-[#18181B] text-[#18181B] font-medium text-sm hover:bg-[#EFECE6] transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Bắt đầu từ triết học</span>
                </a>
              </div>
            </div>

            {/* Cột phải: Mô-đun Lăng kính Tương phản Sáng - Tối */}
            <div className="lg:col-span-5">
              <div className="border border-[#18181B] bg-[#EFECE6] p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#D6D1C7] pb-3 mb-4">
                  <span className="font-mono-code text-xs uppercase tracking-wider text-[#52525B]">
                    Lăng kính Quan sát Trực quan
                  </span>
                  <span className="font-mono-code text-xs font-semibold text-[#C84B31]">
                    Độ sâu bóc tách: {lensPosition}%
                  </span>
                </div>

                {/* Khung đối chiếu 2 lớp */}
                <div className="relative rounded border border-[#D6D1C7] overflow-hidden bg-[#16181D] text-[#F7F4EF] min-h-[290px] flex flex-col justify-between p-5">
                  {lensPosition < 50 ? (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="inline-block px-2.5 py-1 bg-[#F7F4EF] text-[#18181B] font-mono-code text-[11px] uppercase tracking-wider font-semibold">
                        LỚP BỀ NỔI — HIỆN TƯỢNG QUAN SÁT ĐƯỢC
                      </span>
                      <h3 className="font-serif-editorial text-2xl font-bold text-white">
                        “Cuộn phim nổi bật” (Highlight Reel)
                      </h3>
                      <ul className="space-y-2.5 text-sm text-zinc-200">
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>GPA 4.0/4.0, học bổng xuất sắc, IELTS 8.5 / HSK 6</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>Thực tập tại tập đoàn lớn, tự chủ tài chính từ năm nhất</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>Check-in sang chảnh, luôn rạng rỡ và dẫn đầu mọi phong trào</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className="inline-block px-2.5 py-1 bg-[#C84B31] text-white font-mono-code text-[11px] uppercase tracking-wider font-semibold">
                        LỚP CHIỀU SÂU — BẢN CHẤT & ĐIỀU KIỆN CỤ THỂ
                      </span>
                      <h3 className="font-serif-editorial text-2xl font-bold text-white">
                        Quá trình tích lũy & Hoàn cảnh khách quan
                      </h3>
                      <ul className="space-y-2.5 text-sm text-zinc-200">
                        <li className="flex items-start gap-2">
                          <Layers className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>Hàng ngàn giờ tự học âm thầm đến 2 giờ sáng, kỷ luật bền bỉ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Layers className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>Xuất phát điểm, nguồn lực gia đình và định hướng cá nhân khác biệt</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Layers className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                          <span>Những áp lực, mệt mỏi hoặc góc khuất không bao giờ đăng lên mạng</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-700 mt-4">
                    <label htmlFor="hero-lens-slider" className="block text-xs font-mono-code text-zinc-400 mb-2">
                      Kéo thanh trượt sang phải để nhìn xuyên qua bề nổi:
                    </label>
                    <input
                      id="hero-lens-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={lensPosition}
                      onChange={(e) => setLensPosition(Number(e.target.value))}
                      className="lens-range"
                    />
                    <div className="flex justify-between gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setLensPosition(15)}
                        className={`text-xs font-mono-code px-2.5 py-1 border ${
                          lensPosition < 50
                            ? 'bg-white text-[#18181B] border-white'
                            : 'border-zinc-600 text-zinc-300'
                        }`}
                      >
                        1. Nhìn Hiện tượng
                      </button>
                      <button
                        type="button"
                        onClick={() => setLensPosition(85)}
                        className={`text-xs font-mono-code px-2.5 py-1 border ${
                          lensPosition >= 50
                            ? 'bg-[#C84B31] text-white border-[#C84B31]'
                            : 'border-zinc-600 text-zinc-300'
                        }`}
                      >
                        2. Soi chiếu Bản chất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 2 — TÌNH HUỐNG THỰC TẾ: KHI BẠN BẮT ĐẦU SO SÁNH */}
      <section id="thuc-trang" className="border-b border-[#D6D1C7] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
                Chương 01 / Thực trạng & Nhận diện
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold leading-tight">
                Khi bạn bắt đầu so sánh giữa đêm muộn
              </h2>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Trên mạng xã hội với văn hóa “flexing” lẫn trong lớp học với những cá nhân nổi bật, sinh viên liên tục đối diện với những lát cắt thành công của người cùng trang lứa.
              </p>
              <blockquote className="p-4 bg-[#EFECE6] border-l-4 border-[#C84B31] font-serif-editorial italic text-lg text-[#18181B]">
                “Bạn đang nhìn thấy toàn bộ cuộc sống của họ, hay chỉ nhìn thấy những gì họ lựa chọn thể hiện?”
              </blockquote>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* 3 Áp lực phổ biến nhất */}
              <div className="border border-[#D6D1C7] bg-white p-6">
                <div className="flex flex-wrap gap-2 border-b border-[#D6D1C7] pb-4 mb-5">
                  {studentPressures.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePressureTab(idx)}
                      className={`px-3.5 py-2 text-xs font-mono-code uppercase tracking-wider border transition-colors ${
                        activePressureTab === idx
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-[#F7F4EF] text-[#3F3F46] border-[#D6D1C7] hover:border-[#18181B]'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#F7F4EF] border border-[#D6D1C7]">
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#2D4A43] block mb-2">
                      Biểu hiện bề nổi (Hiện tượng xuất hiện)
                    </span>
                    <p className="text-sm leading-relaxed text-[#18181B]">
                      {studentPressures[activePressureTab].surface}
                    </p>
                  </div>
                  <div className="p-4 bg-[#F7F4EF] border border-[#D6D1C7]">
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#C84B31] block mb-2">
                      Tác động tâm lý tiêu cực (FOMO & Hoài nghi)
                    </span>
                    <p className="text-sm leading-relaxed text-[#18181B]">
                      {studentPressures[activePressureTab].impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tương tác lựa chọn cách phản ứng */}
              <div className="border border-[#18181B] bg-[#EFECE6] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs uppercase tracking-wider text-[#C84B31] font-semibold">
                    Tương tác tình huống: Nếu bạn ở trong hoàn cảnh này, bạn thường phản ứng thế nào?
                  </span>
                </div>

                <div className="space-y-2.5">
                  {Object.entries(reactions).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedReaction(key)}
                      className={`w-full text-left p-3.5 border text-sm font-medium transition-all flex items-center justify-between ${
                        selectedReaction === key
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#18181B] border-[#D6D1C7] hover:border-[#18181B]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono-code text-xs px-2 py-0.5 bg-[#C84B31] text-white shrink-0 ml-2">
                        Chọn
                      </span>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-white border-l-4 border-[#2D4A43] space-y-1">
                  <span className="font-mono-code text-xs uppercase tracking-wider text-[#2D4A43] font-semibold">
                    Góc nhìn phân tích ({reactions[selectedReaction].tag}):
                  </span>
                  <p className="text-sm text-[#3F3F46] leading-relaxed">
                    {reactions[selectedReaction].analysis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 3 — GIẢI MÃ KIẾN THỨC TRIẾT HỌC */}
      <section id="ly-thuyet" className="border-b border-[#D6D1C7] py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#2D4A43]">
              Chương 02 / Nền tảng Lý luận Triết học Mác – Lênin
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              Muốn hiểu vấn đề, trước hết phải hiểu Bản chất và Hiện tượng
            </h2>
            <p className="text-base text-[#52525B]">
              Cặp phạm trù này giúp chúng ta phân biệt giữa những biểu hiện quan sát được trực tiếp bên ngoài và hệ thống các mối liên hệ tất nhiên, tương đối ổn định quy định sự vận động ở bên trong.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Khối A: BẢN CHẤT */}
            <article className="border border-[#18181B] bg-[#F7F4EF] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#D6D1C7] pb-4">
                <div>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#2D4A43]">
                    Phạm trù 01
                  </span>
                  <h3 className="font-serif-editorial text-3xl font-bold text-[#18181B]">
                    A. BẢN CHẤT (Essence)
                  </h3>
                </div>
                <Layers className="w-8 h-8 text-[#2D4A43]" />
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#18181B] font-medium">
                <strong>Bản chất</strong> là phạm trù triết học dùng để chỉ sự tổng hợp tất cả những mặt, những mối liên hệ khách quan, tất nhiên, tương đối ổn định ở bên trong sự vật, quy định sự vận động và phát triển của sự vật đó.
              </p>

              <div className="space-y-2.5 pt-2">
                <h4 className="font-mono-code text-xs uppercase tracking-wider text-[#52525B]">
                  Các đặc điểm cơ bản của Bản chất:
                </h4>
                <ul className="space-y-2 text-sm text-[#3F3F46]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A43] shrink-0 mt-0.5" />
                    <span>Tồn tại khách quan ở bên trong sự vật, gắn liền với quá trình tích lũy nội tại.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A43] shrink-0 mt-0.5" />
                    <span>Được hình thành bởi những mối liên hệ bên trong có tính tất yếu, quyết định xu hướng phát triển.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A43] shrink-0 mt-0.5" />
                    <span>Tương đối ổn định so với những biểu hiện bên ngoài thường xuyên biến đổi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A43] shrink-0 mt-0.5" />
                    <span>Không phải lúc nào cũng nhận biết trực tiếp ngay lập tức chỉ bằng quan sát bề ngoài.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Khối B: HIỆN TƯỢNG */}
            <article className="border border-[#18181B] bg-[#F7F4EF] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#D6D1C7] pb-4">
                <div>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
                    Phạm trù 02
                  </span>
                  <h3 className="font-serif-editorial text-3xl font-bold text-[#18181B]">
                    B. HIỆN TƯỢNG (Phenomenon)
                  </h3>
                </div>
                <Eye className="w-8 h-8 text-[#C84B31]" />
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#18181B] font-medium">
                <strong>Hiện tượng</strong> là phạm trù triết học dùng để chỉ sự biểu hiện ra bên ngoài của các mặt, các mối liên hệ thuộc bản chất trong những điều kiện nhất định mà con người có thể quan sát trực tiếp được.
              </p>

              <div className="space-y-2.5 pt-2">
                <h4 className="font-mono-code text-xs uppercase tracking-wider text-[#52525B]">
                  Các đặc điểm cơ bản của Hiện tượng:
                </h4>
                <ul className="space-y-2 text-sm text-[#3F3F46]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                    <span>Là hình thức biểu hiện ra bên ngoài của bản chất trong những điều kiện cụ thể.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                    <span>Có thể được nhận biết trực tiếp thông qua giác quan, quan sát và trải nghiệm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                    <span>Phong phú, đa dạng và thường xuyên biến đổi nhanh hơn so với bản chất.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                    <span>Phản ánh bản chất nhưng trong điều kiện phức tạp có thể biểu hiện lệch lạc (hiện tượng giả / giả tướng).</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* Lưu ý học thuật chuẩn mực */}
          <div className="p-5 bg-[#EFECE6] border border-[#D6D1C7] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#2D4A43] shrink-0 mt-0.5" />
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              <strong>Lưu ý học thuật:</strong> Về căn bản, hiện tượng luôn phản ánh bản chất — bản chất thế nào thì hiện tượng biểu hiện ra như thế. Không được diễn giải cực đoan rằng bản chất luôn hoàn toàn trái ngược với hiện tượng hoặc mọi biểu hiện thành công bên ngoài của người khác đều là giả tạo.
            </p>
          </div>
        </div>
      </section>

      {/* PHẦN 4 — MỐI QUAN HỆ BIỆN CHỨNG (NỀN TỐI TƯƠNG PHẢN) */}
      <section id="bien-chung" className="py-16 bg-[#16181D] text-[#F7F4EF] border-b border-[#D6D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
              Chương 03 / Trọng tâm Học thuật
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
              Mối quan hệ biện chứng giữa Bản chất và Hiện tượng
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Không tồn tại bản chất thuần túy tách rời khỏi hiện tượng, và cũng không có hiện tượng nào hoàn toàn không biểu hiện một mặt nào đó của bản chất. Nhận thức đúng sự vật đòi hỏi phải đi từ hiện tượng đến việc tìm hiểu bản chất.
            </p>
          </div>

          {/* Sơ đồ tương tác 5 bước nhận thức */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {dialecticSteps.map((item, index) => (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setDialecticStep(index)}
                  className={`p-4 text-left border transition-all ${
                    dialecticStep === index
                      ? 'bg-[#C84B31] text-white border-[#C84B31]'
                      : 'bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <span className="font-mono-code text-xs block opacity-80">BƯỚC {item.step}</span>
                  <span className="font-serif-editorial text-lg font-bold block mt-1">{item.name}</span>
                  <span className="text-xs block mt-1 opacity-90">{item.subtitle}</span>
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 bg-zinc-900 border border-zinc-700 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <span className="font-mono-code text-xs uppercase tracking-wider text-[#C84B31]">
                  Giải thích cơ chế nhận thức — Bước {dialecticSteps[dialecticStep].step}
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  {dialecticSteps[dialecticStep].name}: {dialecticSteps[dialecticStep].subtitle}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {dialecticSteps[dialecticStep].desc}
                </p>
              </div>
              <div className="lg:col-span-5 p-4 bg-[#16181D] border-l-4 border-[#C84B31] space-y-1">
                <span className="font-mono-code text-xs uppercase tracking-wider text-zinc-400 block">
                  Liên hệ Áp lực đồng trang lứa:
                </span>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {dialecticSteps[dialecticStep].example}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 5 — ĐƯA TRIẾT HỌC VÀO VẤN ĐỀ ÁP LỰC ĐỒNG TRANG LỨA */}
      <section id="giai-ma" className="py-16 border-b border-[#D6D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
              Chương 04 / Bàn Phân tích Hồ sơ & Bảng Đối chiếu
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              Dùng “Kính lúp Bản chất & Hiện tượng” giải mã áp lực đồng trang lứa
            </h2>
            <p className="text-base text-[#52525B]">
              Sinh viên thường rơi vào hoảng loạn vì lấy <strong>“Hiện tượng”</strong> (bề nổi đã qua bộ lọc của người khác) đem so sánh với <strong>“Bản chất”</strong> (năng lực thực tại, những góc khuất, khó khăn) của chính mình.
            </p>
          </div>

          {/* Hồ sơ Bạn A và Bạn B */}
          <div className="border border-[#18181B] bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D6D1C7] pb-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCaseProfile('A')}
                  className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider border ${
                    activeCaseProfile === 'A'
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-[#F7F4EF] text-[#18181B] border-[#D6D1C7]'
                  }`}
                >
                  Câu chuyện của Bạn A (Học tập)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCaseProfile('B')}
                  className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider border ${
                    activeCaseProfile === 'B'
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-[#F7F4EF] text-[#18181B] border-[#D6D1C7]'
                  }`}
                >
                  Câu chuyện của Bạn B (Đời sống)
                </button>
              </div>
              <span className="font-mono-code text-xs text-[#2D4A43]">
                {caseProfiles[activeCaseProfile].code}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#F7F4EF] border border-[#D6D1C7] space-y-2">
                <span className="font-mono-code text-xs uppercase tracking-wider text-[#C84B31] font-semibold">
                  {caseProfiles[activeCaseProfile].phenomenonTitle}
                </span>
                <p className="text-sm leading-relaxed text-[#18181B]">
                  {caseProfiles[activeCaseProfile].phenomenon}
                </p>
              </div>
              <div className="p-5 bg-[#EFECE6] border border-[#2D4A43] space-y-2">
                <span className="font-mono-code text-xs uppercase tracking-wider text-[#2D4A43] font-semibold">
                  {caseProfiles[activeCaseProfile].essenceTitle}
                </span>
                <p className="text-sm leading-relaxed text-[#18181B]">
                  {caseProfiles[activeCaseProfile].essence}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F7F4EF] border-l-4 border-[#18181B] text-sm text-[#3F3F46]">
              <strong>Kết luận phương pháp luận:</strong> {caseProfiles[activeCaseProfile].lesson}
            </div>
          </div>

          {/* Bảng đối chiếu 3 cột */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-serif-editorial text-2xl font-bold">
                Bảng đối chiếu: Từ Quan sát Hiện tượng đến Ứng xử Hợp lý
              </h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#52525B]" />
                {['all', 'study', 'career', 'social'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMatrixFilter(cat)}
                    className={`px-3 py-1 text-xs font-mono-code uppercase border ${
                      matrixFilter === cat
                        ? 'bg-[#C84B31] text-white border-[#C84B31]'
                        : 'bg-white text-[#3F3F46] border-[#D6D1C7]'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat === 'study' ? 'Học tập' : cat === 'career' ? 'Sự nghiệp' : 'Mạng xã hội'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-[#18181B] bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#18181B] text-[#F7F4EF] font-mono-code text-xs uppercase tracking-wider">
                    <th className="p-4 border-r border-zinc-700 w-1/3">Cột 1: Hiện tượng quan sát được</th>
                    <th className="p-4 border-r border-zinc-700 w-1/3">Cột 2: Những yếu tố có thể nằm phía sau (Giả thuyết)</th>
                    <th className="p-4 w-1/3">Cột 3: Cách nhận thức và ứng xử</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6D1C7] text-sm">
                  {filteredMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F4EF] transition-colors">
                      <td className="p-4 border-r border-[#D6D1C7] font-medium text-[#18181B]">
                        {row.phenomenon}
                      </td>
                      <td className="p-4 border-r border-[#D6D1C7] text-[#3F3F46]">
                        {row.factors}
                      </td>
                      <td className="p-4 text-[#2D4A43] font-medium">
                        {row.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#52525B] italic">
              *Lưu ý học thuật: Những yếu tố ở cột thứ hai là các giả thuyết khách quan cần tìm hiểu thêm trong điều kiện cụ thể, không phải kết luận quy chụp chắc chắn về đời tư của người khác.
            </p>
          </div>
        </div>
      </section>

      {/* PHẦN 6 — PHÂN TÍCH TÌNH HUỐNG CHI TIẾT CỦA MINH */}
      <section id="tinh-huong" className="py-16 border-b border-[#D6D1C7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#2D4A43]">
              Chương 05 / Phân tích Tình huống 3 Lớp
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              Tình huống của Minh — Sinh viên năm hai trước cơn lốc chứng chỉ
            </h2>
            <p className="p-4 bg-[#F7F4EF] border-l-4 border-[#18181B] text-sm sm:text-base text-[#18181B]">
              <strong>Tình huống:</strong> “Minh là sinh viên năm hai. Khi thấy nhiều bạn cùng lớp đạt chứng chỉ ngoại ngữ và tham gia các cuộc thi, Minh cảm thấy mình đang tụt lại phía sau. Minh đăng ký nhiều hoạt động cùng lúc, học theo lịch của người khác và ngày càng mệt mỏi.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => setMinhLayer(1)}
              className={`cursor-pointer p-6 border transition-all ${
                minhLayer === 1
                  ? 'border-[#C84B31] bg-[#F7F4EF] shadow-sm'
                  : 'border-[#D6D1C7] bg-white hover:border-[#18181B]'
              }`}
            >
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#C84B31] font-semibold">
                LỚP 1 — HIỆN TƯỢNG
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold mt-1 mb-2">
                Biểu hiện quá tải bề ngoài
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Minh liên tục so sánh thành tích, ôm đồm đăng ký nhiều hoạt động cùng lúc, sao chép lịch học của bạn bè và rơi vào trạng thái kiệt sức, giảm hiệu quả học tập.
              </p>
            </div>

            <div
              onClick={() => setMinhLayer(2)}
              className={`cursor-pointer p-6 border transition-all ${
                minhLayer === 2
                  ? 'border-[#C84B31] bg-[#F7F4EF] shadow-sm'
                  : 'border-[#D6D1C7] bg-white hover:border-[#18181B]'
              }`}
            >
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#2D4A43] font-semibold">
                LỚP 2 — TÌM HIỂU YẾU TỐ BÊN TRONG
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold mt-1 mb-2">
                Giả thuyết về nguyên nhân gốc rễ
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Có thể Minh đang lo lắng về tương lai, sợ bị đánh giá, chưa xác định rõ mục tiêu nghề nghiệp cá nhân hoặc chịu ảnh hưởng từ kỳ vọng xung quanh (đây là các khả năng cần Minh tự đối thoại và làm rõ).
              </p>
            </div>

            <div
              onClick={() => setMinhLayer(3)}
              className={`cursor-pointer p-6 border transition-all ${
                minhLayer === 3
                  ? 'border-[#C84B31] bg-[#F7F4EF] shadow-sm'
                  : 'border-[#D6D1C7] bg-white hover:border-[#18181B]'
              }`}
            >
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#18181B] font-semibold">
                LỚP 3 — VẬN DỤNG NHẬN THỨC
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold mt-1 mb-2">
                Giải pháp từ tư duy biện chứng
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Minh cần rà soát lại hoàn cảnh, năng lực hiện tại, quỹ thời gian và mục tiêu của bản thân; giữ lại hoạt động cốt lõi phù hợp thay vì sao chép lộ trình của người khác.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#18181B] text-[#F7F4EF] text-center font-serif-editorial text-xl sm:text-2xl italic">
            “Hiểu hiện tượng giúp ta nhận ra vấn đề. Tìm hiểu bản chất giúp ta có cơ sở để lựa chọn cách giải quyết phù hợp.”
          </div>
        </div>
      </section>

      {/* PHẦN 7 — NHỮNG NGỘ NHẬN CẦN TRÁNH */}
      <section className="py-16 border-b border-[#D6D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
              Chương 06 / Kiểm chứng Tư duy Phản biện
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              Tương tác: “Đúng hay chưa đủ?” — Những ngộ nhận cần tránh
            </h2>
            <p className="text-sm text-[#52525B]">
              Nhấp vào từng nhận định thường gặp dưới đây để xem phân tích dưới góc nhìn cặp phạm trù Bản chất – Hiện tượng:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-3">
              {misconceptions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMyth(idx)}
                  className={`w-full text-left p-4 border transition-all ${
                    selectedMyth === idx
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#18181B] border-[#D6D1C7] hover:border-[#18181B]'
                  }`}
                >
                  <span className="font-mono-code text-xs text-[#C84B31] block mb-1">
                    Nhận định 0{idx + 1}
                  </span>
                  <span className="font-medium text-sm sm:text-base">{item.claim}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-6 border border-[#18181B] bg-white p-6 sm:p-8 flex flex-col justify-center space-y-4">
              <span className="inline-block px-3 py-1 bg-[#C84B31]/10 text-[#C84B31] font-mono-code text-xs uppercase tracking-wider font-semibold w-fit">
                {misconceptions[selectedMyth].verdict}
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#18181B]">
                {misconceptions[selectedMyth].claim}
              </h3>
              <p className="text-sm sm:text-base text-[#3F3F46] leading-relaxed">
                {misconceptions[selectedMyth].explanation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 8 — BÀI HỌC VÀ Ý NGHĨA PHƯƠNG PHÁP LUẬN */}
      <section id="phuong-phap" className="py-16 border-b border-[#D6D1C7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#2D4A43]">
              Chương 07 / Ý nghĩa Phương pháp luận & Lời khuyên Thực tế
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              Từ nhận thức Triết học đến Định vị Bản thân
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#D6D1C7] bg-[#F7F4EF] space-y-3">
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#C84B31] font-semibold">
                Trụ cột 01 / Thay đổi tư duy
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold">
                Nhìn nhận khách quan, vượt qua bề nổi
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Phân biệt rõ hiện tượng và bản chất; tôn trọng sự thật khách quan, quan sát nhiều biểu hiện trước khi kết luận và biến thành tích của người khác thành nguồn tham khảo tích cực thay vì áp lực tự ti.
              </p>
            </div>

            <div className="p-6 border border-[#D6D1C7] bg-[#F7F4EF] space-y-3">
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#2D4A43] font-semibold">
                Trụ cột 02 / Định vị bản thân
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold">
                Vận dụng quan điểm lịch sử – cụ thể
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Mỗi người có xuất phát điểm, hoàn cảnh và năng lực khác nhau. Hãy đánh giá bản thân dựa trên điều kiện thực tế, xác định rõ điểm mạnh, điểm yếu để lập kế hoạch tiến bộ từng ngày theo nhịp độ riêng (own pace).
              </p>
            </div>

            <div className="p-6 border border-[#D6D1C7] bg-[#F7F4EF] space-y-3">
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#18181B] font-semibold">
                Trụ cột 03 / Xây dựng lối sống
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold">
                Vun đắp giá trị cốt lõi bên trong
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Hạn chế so sánh trên mạng xã hội, quản lý thời gian cân bằng giữa học tập và sức khỏe. Giá trị thực chất của mỗi người nằm ở sự nỗ lực, trách nhiệm và quá trình hoàn thiện bản thân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHẦN 9 — KẾT THÚC CÓ SỨC GỢI MỞ */}
      <footer className="py-16 bg-[#18181B] text-[#F7F4EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#C84B31]">
            Lời kết & Phản tư cá nhân
          </span>

          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold leading-tight text-white">
            “ĐỪNG LẤY HIỆN TƯỢNG CỦA NGƯỜI KHÁC LÀM THƯỚC ĐO BẢN CHẤT CỦA CHÍNH MÌNH.”
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            Chúng ta thường nhìn thấy thành quả của người khác nhưng không nhìn thấy toàn bộ hành trình tạo nên thành quả ấy. Từ góc nhìn của cặp phạm trù bản chất và hiện tượng, điều quan trọng không phải là phủ nhận những gì ta nhìn thấy, mà là học cách quan sát sâu hơn, suy nghĩ khách quan hơn và kiên trì vun đắp giá trị bên trong qua từng ngày.
          </p>

          {/* Hộp câu hỏi phản tư */}
          <div className="p-6 bg-zinc-900 border border-zinc-700 max-w-2xl mx-auto space-y-4">
            <p className="font-serif-editorial italic text-xl text-white">
              Câu hỏi phản tư: “Bạn đang lựa chọn mục tiêu hiện tại vì điều đó thực sự có ý nghĩa với mình, hay vì bạn sợ mình khác với số đông?”
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setReflectionChoice(
                    'Bạn đang đi đúng hướng của tư duy tự chủ: mục tiêu xuất phát từ nhu cầu và điều kiện tất yếu bên trong (Bản chất) sẽ giúp bạn kiên trì bền vững.'
                  )
                }
                className="px-4 py-2 text-xs font-mono-code uppercase bg-[#2D4A43] text-white hover:opacity-90"
              >
                Vì mục tiêu thực sự có ý nghĩa với mình
              </button>
              <button
                type="button"
                onClick={() =>
                  setReflectionChoice(
                    'Nhận diện được nỗi sợ khác biệt (FOMO) chính là bước đầu tiên để bạn tách mình khỏi áp lực bề nổi và thiết lập lại lộ trình phù hợp với bản thân.'
                  )
                }
                className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C84B31] text-white hover:opacity-90"
              >
                Đôi khi vì sợ tụt lại so với số đông
              </button>
            </div>
            {reflectionChoice && (
              <p className="text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                {reflectionChoice}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#ly-thuyet"
              className="px-5 py-2.5 border border-zinc-600 text-xs font-mono-code uppercase tracking-wider hover:bg-white hover:text-[#18181B] transition-colors"
            >
              Xem lại kiến thức
            </a>
            <a
              href="#giai-ma"
              className="px-5 py-2.5 border border-zinc-600 text-xs font-mono-code uppercase tracking-wider hover:bg-white hover:text-[#18181B] transition-colors"
            >
              Thử phân tích tình huống khác
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-2.5 bg-[#C84B31] text-white text-xs font-mono-code uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Lên đầu trang</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}