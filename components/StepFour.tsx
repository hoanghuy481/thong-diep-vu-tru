// Bảng ghi nội dung thông điệp — sửa nội dung trực tiếp ở đây
const MESSAGE_ROWS = [
  { label: "Người gửi", content: "..." },
  { label: "Người nhận", content: "..." },
  { label: "Thông điệp", content: "..." },
];

export default function StepFour() {
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
      <div className="text-center">
        {/* title */}
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
          Trạm vũ trụ // Khoang tâm sự
        </p>
        <h2 className="font-coiny mt-3 text-lg font-bold text-stardust sm:text-xl">
          Những thông điệp cuối cùng
        </h2>
      </div>

      <div className=" glass-panel w-full max-w-2xl overflow-x-auto rounded-2xl p-4 sm:p-6">
        <p className="font-coiny font-bold text-ice ">
          {` Xem tới đây thì chắc là em cũng hiểu rồi đúng hong :)). Anh thực sự thích em lắm
          á, thời gian qua anh muốn bắt chuyện với em rất nhiều nhưng mà em biết đấy, 
          sự bận rộn luôn chiếm phần lớn, không chỉ anh mà cả em nữa. Cơ mà chắc là em cũng muốn biết
          vì sao anh lại thích em và từ lúc nào nhỉ? Nhưng cái này thì phải nói trực tiếp vì nó nhiều lắm 
          không thể kể hết trên này được 🤧.`}
          <br />
          Vài ngày nữa là 20 tháng 10 á 🌹, anh đoán trong tuần em sẽ bận nên
          khó để có một cuộc gặp gỡ được 😢. Nếu em có thể sắp xếp hoặc không
          thì anh mong đâu đó trong cuối tuần mình có thể gặp nhau 🫶. Còn giờ
          thì nghe nhạc đi, những bài này là những bài đã khiến anh luôn nghĩ về
          em đó...
        </p>
      </div>
    </div>
  );
}
