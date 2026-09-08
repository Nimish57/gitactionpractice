import path from 'node:path';
import * as XLSX from 'xlsx';

export type LoginData = {
  username: string;
  password: string;
};

export function readLoginData(): LoginData[] {
  const workbook = XLSX.readFile(path.join(__dirname, 'TestData.xlsx'));
  const [firstSheetName] = workbook.SheetNames;

  if (!firstSheetName) {
    throw new Error('TestData.xlsx does not contain a worksheet');
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    workbook.Sheets[firstSheetName],
    { defval: '' },
  );

  const loginData = rows.map((row, index) => {
    const username = String(row.username ?? '').trim();
    const password = String(row.password ?? '').trim();

    if (!username || !password) {
      throw new Error(`TestData.xlsx row ${index + 2} must contain username and password`);
    }

    return { username, password };
  });

  if (loginData.length === 0) {
    throw new Error('TestData.xlsx does not contain login data');
  }

  return loginData;
}
