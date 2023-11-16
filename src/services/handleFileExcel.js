import { utils, writeFile, read } from "xlsx";
const exportFile = (ds) => {
  try {
    var wb = utils.book_new();
    let ws = utils.json_to_sheet(ds);
    utils.book_append_sheet(wb, ws, "Danh sách đăng ký tham gia");
    utils.sheet_add_aoa(
      ws,
      [["Mã số", "Tên", "Email", "Mã lớp", "Mã ngành", "Mã đơn vị"]],
      { origin: "A1" }
    );
    ws["!cols"] = [
      { wch: 9 },
      { wch: 22 },
      { wch: 25 },
      { wch: 9 },
      { wch: 25 },
      { wch: 9 },
    ];
    writeFile(wb, "UserJions.xlsx");
  } catch (error) {
    console.log(error.message);
  }
};

async function importFile(file, addDssv) {
  try {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(async function (sheetName) {
        const roa = utils.sheet_to_json(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          addDssv(
            roa.map((item) => ({
              mssv: item["Mã số"] || item["Mã số sinh viên"],
              ten: item["Tên"] || item["Tên sinh viên"],
              email: item["Email"],
              lop: item["Mã lớp"],
              nghanh: item["Mã ngành"],
              maDonVi: item["Mã đơn vị"],
            }))
          );
        }
      });
    };
  } catch (e) {
    console.error(e);
  }
}
async function importFileLink(url, addDssv) {
  const file = await (await fetch(url)).arrayBuffer();
  const workbook = read(file);
  workbook.SheetNames.forEach(async function (sheetName) {
    const roa = utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (roa.length > 0) {
      addDssv(
        roa.map((item) => ({
          mssv: item["Mã số"] || item["Mã số sinh viên"],
          ten: item["Tên"] || item["Họ tên"],
          email: item["Email"],
          lop: item["Mã lớp"],
          nghanh: item["Mã ngành"],
          maDonVi: item["Mã đơn vị"],
        }))
      );
    }
  });
}
export { exportFile, importFile, importFileLink };
