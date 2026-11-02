/**
 * 굿모닝아이앤씨 홈페이지 문의 접수 → 구글시트 기록 + 이메일 알림
 *
 * 사용법은 같은 폴더의 README.md 참고.
 * 아래 TOKEN 값은 Vercel 환경변수 GOOGLE_SHEET_WEBHOOK_TOKEN 과 같아야 합니다.
 */
var TOKEN = "여기에-임의의-긴-문자열";
var NOTIFY_EMAIL = "goodos@goodos.co.kr";
var SHEET_NAME = "문의접수";
var HEADERS = [
  "접수일시", "회사명", "담당자", "연락처", "이메일", "문의분야", "문의내용", "개인정보동의", "처리상태",
];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return out({ ok: false, error: "unauthorized" });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    var when = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    // 시트 수식 주입 방지: = + - @ 로 시작하면 앞에 ' 를 붙입니다.
    var safe = function (v) { return /^[=+\-@]/.test(String(v)) ? "'" + v : v; };
    sheet.appendRow([
      when, safe(d.company), safe(d.name), safe(d.phone), safe(d.email),
      safe(d.sector), safe(d.message), d.agreed || "동의", "신규",
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: d.email,
      subject: "[홈페이지 문의] " + d.company + " / " + d.sector,
      body:
        "접수일시: " + when + "\n" +
        "회사명: " + d.company + "\n" +
        "담당자: " + d.name + "\n" +
        "연락처: " + d.phone + "\n" +
        "이메일: " + d.email + "\n" +
        "문의분야: " + d.sector + "\n\n" +
        "문의내용:\n" + d.message + "\n\n" +
        "시트: " + ss.getUrl(),
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 시트 정리용 (편집기에서 한 번만 실행): 파일 이름을 바꾸고,
 * 문의접수 탭을 맨 앞에 두어 열자마자 보이게 하며, 비어 있는 기본 시트는 삭제합니다.
 * 웹 앱 코드(doPost)는 바뀌지 않으므로 다시 배포할 필요가 없습니다.
 */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename("굿모닝아이앤씨");

  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(1);

  ss.getSheets().forEach(function (s) {
    var isEmpty = s.getLastRow() === 0 && s.getLastColumn() === 0;
    if (s.getName() !== SHEET_NAME && isEmpty && ss.getSheets().length > 1) {
      ss.deleteSheet(s);
    }
  });
}
