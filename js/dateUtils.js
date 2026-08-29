// ============================================================
// Date helpers — แปลง event_date (YYYY-MM-DD) เป็นข้อความวันที่ภาษาไทย
// ใช้แทนป้าย "วันที่ 1 / วันที่ 2 / วันที่ 3" เดิม เพื่อให้ลูกค้าและแอดมิน
// เห็นวันที่จริงของงาน (เช่น 29 ส.ค.) แทนลำดับวันที่ดูยาก
// ============================================================

export const THAI_MONTHS_SHORT = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

export const THAI_MONTHS_FULL = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// "2026-08-29" -> "29 ส.ค."  (คืนค่า null ถ้าไม่มี/parse ไม่ได้)
export function formatShortThaiDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getDate()} ${THAI_MONTHS_SHORT[d.getMonth()]}`;
}

// "2026-08-29" -> "29 สิงหาคม"
export function formatFullThaiDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getDate()} ${THAI_MONTHS_FULL[d.getMonth()]}`;
}

// สร้างป้ายกำกับสำหรับ "วันงาน" 1 วัน โดยใช้วันที่จริงถ้ามี
// ถ้ายังไม่มีวันที่ (เช่น แถวที่แอดมินยังไม่กรอก) จะ fallback เป็น "วันที่ N"
export function dayLabelFromDate(dateStr, dayNumber) {
  return formatShortThaiDate(dateStr) || `วันที่ ${dayNumber}`;
}

// สร้างป้ายกำกับสำหรับ "ชุดวัน" หลายวัน (เช่น ตั๋ว 2 วันจากงาน 3 วัน)
// days: array ของ { day_number, event_date } ที่อยู่ใน combo นั้น เรียงตาม day_number แล้ว
export function comboLabelFromDays(days) {
  const parts = days.map((d) => formatShortThaiDate(d.event_date));
  if (parts.some((p) => !p)) {
    // ถ้ามีบางวันยังไม่มีวันที่ ให้ fallback เป็นรูปแบบเดิม
    return `วันที่ ${days.map((d) => d.day_number).join("+")}`;
  }
  return parts.join("+");
}
