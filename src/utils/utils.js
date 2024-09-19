import * as XLSX from "xlsx";

const typeMapping = {
  json: "application/json",
  xlsx: ".xlsx",
};

const openFile = async (type) => {
  try {
    const output = await new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = typeMapping[type];

      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          resolve(file);
          input.remove();
        } else {
          reject("No file selected");
          input.remove();
        }
      };

      input.click();
    });

    switch (type) {
      case "json": {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(JSON.parse(e.target.result));
          };
          reader.onerror = (e) => {
            reject(e.target.error);
          };
          reader.readAsText(output);
        });
      }
      case "xlsx": {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const aoaData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(aoaData);
          };

          reader.onerror = (e) => {
            reject(e.target.error);
          };

          reader.readAsArrayBuffer(output);
        });
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

const exportFile = async (type, data, filename = "export") => {
  switch (type) {
    case "json": {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
      break;
    }
    default:
      break;
  }
};

export { openFile, exportFile };
